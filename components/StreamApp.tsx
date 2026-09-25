"use client";import {useMemo,useState} from "react";import Player from "./Player";import {sources,Source} from "@/lib/sources";
type Channel={name:string;url:string;logo?:string;group?:string};
export default function StreamApp(){const [source,setSource]=useState<Source|null>(null),[channels,setChannels]=useState<Channel[]>([]),[selected,setSelected]=useState<Channel|null>(null),[loading,setLoading]=useState(false),[error,setError]=useState(""),[search,setSearch]=useState("");const open=async(s:Source)=>{setSource(s);setSelected(null);setSearch("");setLoading(true);setError("");try{const r=await fetch(`/api/playlist?id=${s.id}`);const data=await r.json();if(!r.ok)throw new Error(data.error||"Playlist could not load");setChannels(data.channels||[])}catch(e){setChannels([]);setError(e instanceof Error?e.message:"Playlist could not load")}finally{setLoading(false)}};const shown=useMemo(()=>channels.filter(c=>c.name.toLowerCase().includes(search.toLowerCase())),[channels,search]);return <><header className="header"><div className="shell bar"><div className="logo">AT <b>LIVE</b> STREAM</div><small className="muted">Developed by Azmi Travels</small></div></header><main>{!source?<><section style={{padding:"56px 0 36px",background:"radial-gradient(circle at top right,#481630,#070b16 48%)"}}><div className="shell"><div style={{color:"#fb2554",fontWeight:800}}>● LIVE TELEVISION</div><h1 style={{fontSize:"clamp(34px,5vw,58px)",margin:"10px 0"}}>Choose a category</h1><p className="muted">Open any category to see all available channels in its playlist, then select a channel to watch.</p></div></section><section className="shell" style={{padding:"32px 20px 60px"}}><div className="grid">{sources.map(s=><button className="category" key={s.id} onClick={()=>open(s)}><div className="categoryTop">{s.icon}</div><div className="categoryText">{s.category}<div className="muted" style={{fontWeight:400,fontSize:12,marginTop:4}}>{s.name}</div></div></button>)}</div></section></>:<section className="shell" style={{padding:"30px 20px 60px"}}><button className="back" onClick={()=>{setSource(null);setSelected(null)}}>← All categories</button><h1 style={{marginBottom:5}}>{source.icon} {source.category} Channels</h1><p className="muted">Select any channel below to play it.</p>{loading&&<p className="muted">Loading channels…</p>}{error&&<p className="notice">{error}</p>}{!loading&&!error&&<><input className="search" value={search} onChange={e=>setSearch(e.target.value)} placeholder={`Search ${source.category} channels…`}/><p className="muted">{shown.length} channels found</p><div className="grid">{shown.map((c,i)=><button className="card" key={`${c.url}-${i}`} onClick={()=>setSelected(c)}><div className="thumb">{c.logo?<img src={c.logo} alt="" style={{width:"100%",height:"100%",objectFit:"contain",padding:12}}/>:source.icon}</div><div className="meta"><h3>{c.name}</h3><div className="muted" style={{fontSize:11,marginTop:6}}>{c.group||source.category}</div></div></button>)}</div></>}</section>}</main>

{selected && (
  <div className="playerOverlay">
    <div className="playerModal">
      <button
        className="closePlayer"
        onClick={() => setSelected(null)}
        aria-label="Close player"
        title="Close player"
      >
        ×
      </button>

      <Player
        title={selected.name}
        url={selected.url}
      />
    </div>
  </div>
)}

<footer className="shell muted" style={{padding:"26px 20px",borderTop:"1px solid #263451"}}>© 2026 AT Live Stream · Developed by Azmi Travels</footer></> }