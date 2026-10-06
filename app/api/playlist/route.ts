import { NextRequest, NextResponse } from "next/server";
import { sources } from "@/lib/sources";

export const dynamic = 'force-dynamic';

type Channel = { name: string; url: string; logo?: string; group?: string };
const attr = (s: string, key: string) => s.match(new RegExp(`${key}="([^"]*)"`))?.[1];

const decode = (s: string) =>
  s.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
   .replace(/&quot;/g, '"').replace(/&#39;/g, "'");

function parseM3U(text: string): Channel[] {
  const lines = text.split(/\r?\n/);
  const out: Channel[] = [];
  let info = "";
  for (const raw of lines) {
    const line = raw.trim();
    if (line.startsWith("#EXTINF:")) {
      info = line;
      continue;
    }
    if (info && line && !line.startsWith("#")) {
      out.push({
        name: info.slice(info.lastIndexOf(",") + 1).trim() || "Live Channel",
        url: line,
        logo: attr(info, "tvg-logo"),
        group: attr(info, "group-title")
      });
      info = "";
    }
  }
  return out.filter(x => /^https?:\/\//i.test(x.url));
}

async function playlistVideos(listId: string): Promise<Channel[]> {
  const out: Channel[] = [];
  const key = process.env.YOUTUBE_API_KEY;

  if (key) {
    let token = "";
    for (let page = 0; page < 6; page++) {
      const api =
        `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50` +
        `&playlistId=${listId}&key=${key}` +
        (token ? `&pageToken=${token}` : "");
      const r = await fetch(api, { cache: "no-store" });
      if (!r.ok) break;
      const data = await r.json();
      for (const it of data.items ?? []) {
        const sn = it.snippet;
        const vid = sn?.resourceId?.videoId;
        if (!vid || sn.title === "Private video" || sn.title === "Deleted video") continue;
        out.push({
          name: sn.title,
          url: `https://www.youtube.com/watch?v=${vid}`,
          logo: `https://i.ytimg.com/vi/${vid}/hqdefault.jpg`,
          group: "Playlist"
        });
      }
      token = data.nextPageToken ?? "";
      if (!token) break;
    }
    if (out.length) return out;
  }

  // Key na ho ya API fail ho to purani feed (sirf 15 videos)
  const r = await fetch(`https://www.youtube.com/feeds/videos.xml?playlist_id=${listId}`, { cache: "no-store" });
  if (!r.ok) return out;
  const xml = await r.text();
  for (const m of xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)) {
    const id = m[1].match(/<yt:videoId>([\w-]{11})<\/yt:videoId>/)?.[1];
    const title = m[1].match(/<title>([\s\S]*?)<\/title>/)?.[1] ?? "Video";
    if (id) {
      out.push({
        name: decode(title),
        url: `https://www.youtube.com/watch?v=${id}`,
        logo: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
        group: "Playlist"
      });
    }
  }
  return out;
}

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  const source = sources.find(s => s.id === id);

  if (!source) return NextResponse.json({ error: "Unknown category" }, { status: 404 });

  if (source.id === "live") {
    try {
      const r = await fetch(process.env.LIVE_LINK_FILE ?? "", { cache: "no-store" });
      if (!r.ok) throw new Error("Link file unavailable");

      const links = (await r.text())
        .split(/\r?\n/)
        .map(l => l.trim())
        .filter(l => /^https?:\/\//i.test(l));

      if (!links.length) throw new Error("No link found");

      const channels: Channel[] = [];
      for (const link of links) {
        const list = link.match(/[?&]list=([\w-]+)/)?.[1];
        if (list && /youtube\.com\/playlist\?/i.test(link)) {
          const vids = await playlistVideos(list);
          if (vids.length) {
            channels.push(...vids);
            continue;
          }
        }
        channels.push({ name: source.name, url: link });
      }

      return NextResponse.json(
        { category: source.category, channels },
        { headers: { "Cache-Control": "no-store, max-age=0" } }
      );
    } catch (e) {
      console.error("LIVE ERROR:", e, "| LIVE_LINK_FILE =", process.env.LIVE_LINK_FILE);
      return NextResponse.json(
        { error: "Live link is not set right now." },
        { status: 404 }
      );
    }
  }

  try {
    const response = await fetch(source.url, {
      cache: "no-store",
      headers: { "User-Agent": "AT-Live-Stream/1.0" }
    });

    if (!response.ok) throw new Error("Upstream source unavailable");

    const channels = parseM3U(await response.text());

    return NextResponse.json(
      { category: source.category, channels },
      { headers: { "Cache-Control": "no-store, max-age=0" } }
    );
  } catch {
    return NextResponse.json(
      { error: "This playlist is unavailable right now. Please try again later." },
      { status: 502 }
    );
  }
}