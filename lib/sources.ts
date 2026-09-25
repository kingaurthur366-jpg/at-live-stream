export type Source = {
  id: string;
  name: string;
  category: string;
  url: string;
  icon: string;
};

export const sources: Source[] = [
  {
    id: "movies",
    name: "AT Movies Live",
    category: "Movies",
    url: "https://iptv-org.github.io/iptv/categories/movies.m3u",
    icon: "🎬"
  },
  {
    id: "sports",
    name: "AT Sports Live",
    category: "Sports",
    url: "https://iptv-org.github.io/iptv/categories/sports.m3u",
    icon: "🏆"
  },
  {
    id: "news",
    name: "AT News Live",
    category: "News",
    url: "https://iptv-org.github.io/iptv/categories/news.m3u",
    icon: "📰"
  },
  {
    id: "kids",
    name: "AT Kids Live",
    category: "Kids",
    url: "https://iptv-org.github.io/iptv/categories/kids.m3u",
    icon: "🌈"
  },
  {
    id: "family",
    name: "AT Family Live",
    category: "Family",
    url: "https://iptv-org.github.io/iptv/categories/family.m3u",
    icon: "👨‍👩‍👧‍👦"
  },
  {
    id: "education",
    name: "AT Education Live",
    category: "Education",
    url: "https://iptv-org.github.io/iptv/categories/education.m3u",
    icon: "📚"
  },
  {
    id: "hindi",
    name: "AT Hindi Live",
    category: "Hindi",
    url: "https://iptv-org.github.io/iptv/languages/hin.m3u",
    icon: "ह"
  },
  {
    id: "urdu",
    name: "AT Urdu Live",
    category: "Urdu",
    url: "https://iptv-org.github.io/iptv/languages/urd.m3u",
    icon: "ا"
  },
  {
    id: "english",
    name: "AT English Live",
    category: "English",
    url: "https://iptv-org.github.io/iptv/languages/eng.m3u",
    icon: "EN"
  }
];