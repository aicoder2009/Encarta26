import type { WikipediaSummary, WikipediaSearchResponse, WikipediaFeaturedContent } from '@/types/wikipedia';

const WIKIPEDIA_API_BASE = 'https://en.wikipedia.org/api/rest_v1';
const WIKIPEDIA_ACTION_API = 'https://en.wikipedia.org/w/api.php';

export async function getArticleSummary(title: string): Promise<WikipediaSummary> {
  const encodedTitle = encodeURIComponent(title.replace(/ /g, '_'));
  const response = await fetch(`${WIKIPEDIA_API_BASE}/page/summary/${encodedTitle}`, {
    next: { revalidate: 3600 },
    headers: { 'Accept': 'application/json' },
  });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch article summary for "${title}": ${response.status}`);
  }
  
  return response.json();
}

export async function searchArticles(query: string): Promise<WikipediaSearchResponse> {
  const params = new URLSearchParams({
    action: 'query',
    list: 'search',
    srsearch: query,
    format: 'json',
    origin: '*',
    srlimit: '10',
  });
  
  const response = await fetch(`${WIKIPEDIA_ACTION_API}?${params}`, {
    next: { revalidate: 300 },
    headers: { 'Accept': 'application/json' },
  });
  
  if (!response.ok) {
    throw new Error(`Search failed for "${query}": ${response.status}`);
  }
  
  return response.json();
}

export async function getDailyFeatured(): Promise<WikipediaFeaturedContent> {
  const now = new Date();
  const year = now.getUTCFullYear();
  const month = String(now.getUTCMonth() + 1).padStart(2, '0');
  const day = String(now.getUTCDate()).padStart(2, '0');
  
  const response = await fetch(`${WIKIPEDIA_API_BASE}/feed/featured/${year}/${month}/${day}`, {
    next: { revalidate: 3600 },
    headers: { 'Accept': 'application/json' },
  });
  
  if (!response.ok) {
    return {};
  }
  
  return response.json();
}

export async function getArticleSections(title: string): Promise<unknown> {
  const params = new URLSearchParams({
    action: 'parse',
    page: title,
    prop: 'sections',
    format: 'json',
    origin: '*',
  });
  
  const response = await fetch(`${WIKIPEDIA_ACTION_API}?${params}`, {
    next: { revalidate: 3600 },
    headers: { 'Accept': 'application/json' },
  });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch sections for "${title}": ${response.status}`);
  }
  
  return response.json();
}
