export interface WikipediaSummary {
  type: string;
  title: string;
  displaytitle: string;
  namespace: { id: number; text: string };
  wikibase_item: string;
  titles: {
    canonical: string;
    normalized: string;
    display: string;
  };
  pageid: number;
  thumbnail?: {
    source: string;
    width: number;
    height: number;
  };
  originalimage?: {
    source: string;
    width: number;
    height: number;
  };
  lang: string;
  dir: string;
  revision: string;
  tid: string;
  timestamp: string;
  description?: string;
  description_source?: string;
  content_urls: {
    desktop: { page: string; revisions: string; edit: string; talk: string };
    mobile: { page: string; revisions: string; edit: string; talk: string };
  };
  extract: string;
  extract_html: string;
}

export interface WikipediaSearchResult {
  ns: number;
  title: string;
  pageid: number;
  size: number;
  wordcount: number;
  snippet: string;
  timestamp: string;
}

export interface WikipediaSearchResponse {
  batchcomplete: string;
  continue?: {
    sroffset: number;
    continue: string;
  };
  query: {
    searchinfo: { totalhits: number };
    search: WikipediaSearchResult[];
  };
}

export interface WikipediaFeaturedContent {
  tfa?: WikipediaSummary;
  mostread?: {
    date: string;
    articles: WikipediaSummary[];
  };
  image?: {
    title: string;
    thumbnail: { source: string; width: number; height: number };
    image: { source: string; width: number; height: number };
    description?: { text: string; lang: string };
  };
  news?: Array<{
    links: WikipediaSummary[];
    story: string;
  }>;
  onthisday?: Array<{
    text: string;
    pages: WikipediaSummary[];
    year: number;
  }>;
}

export interface WikipediaSection {
  toclevel: number;
  level: string;
  line: string;
  number: string;
  index: string;
  fromtitle: string;
  byteoffset: number;
  anchor: string;
}

export interface WikipediaSectionsResponse {
  parse: {
    title: string;
    pageid: number;
    sections: WikipediaSection[];
  };
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  subcategories: string[];
  articles: string[];
}
