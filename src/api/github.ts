
import type { Repo } from '../types/repo';
const GITHUB_TOKEN = ''; 

export async function searchRepos(query: string, signal?: AbortSignal): Promise<Repo[]> {
  if (!query.trim()) return [];

  const url = `https://api.github.com/search/repositories?q=${encodeURIComponent(query)}&per_page=30`;

  const res = await fetch(url, {
    signal,
    headers: GITHUB_TOKEN
      ? { Authorization: `token ${GITHUB_TOKEN}` }
      : {},
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GitHub API error: ${res.status} ${text}`);
  }

  const data = await res.json();
  return data.items as Repo[];
}

