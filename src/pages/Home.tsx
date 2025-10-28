import { useEffect, useMemo, useState } from 'react';
import { searchRepos } from '../api/github';
import RepoList from '../components/RepoList';
import SearchBar from '../components/SearchBar';
import { useBookmarks } from '../context/BookmarkContext';
import useDebounce from '../hooks/useDebounce';
import type { Repo } from '../types/repo';

export default function Home() {
  const [q, setQ] = useState('');
  const debounced = useDebounce(q, 350);
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showBookmarksOnly, setShowBookmarksOnly] = useState(false);
  const { bookmarks } = useBookmarks();

  useEffect(() => {
    let abort = new AbortController();
    async function run() {
      setError(null);
      setLoading(true);
      try {
        const data = await searchRepos(debounced, abort.signal);
        setRepos(data);
      } catch (err: any) {
        if (err.name === 'AbortError') return;
        setError(err.message || 'Unknown error');
      } finally {
        setLoading(false);
      }
    }
    if (debounced.trim()) {
      run();
    } else {
      setRepos([]);
      setLoading(false);
    }
    return () => abort.abort();
  }, [debounced]);

  const displayed = useMemo(() => (showBookmarksOnly ? bookmarks : repos), [showBookmarksOnly, bookmarks, repos]);

  return (
    <div className="container">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-extrabold text-indigo-700 mb-1">🚀 GitHub Repo Search</h1>
        <p className="text-gray-600">Find open-source projects and bookmark your favorites locally.</p>
      </div>
      <SearchBar value={q} onChange={setQ} />

      <div className="flex items-center justify-between mb-4 gap-3">
        <div className="flex items-center gap-3 text-sm text-gray-600">
          <label className="inline-flex items-center gap-2">
            <input
              type="checkbox"
              checked={showBookmarksOnly}
              onChange={(e) => setShowBookmarksOnly(e.target.checked)}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span>Bookmarked only</span>
          </label>
          <span>•</span>
          <span>{showBookmarksOnly ? `${bookmarks.length} bookmarked` : `${repos.length} results`}</span>
        </div>
        {loading && <div className="text-sm text-indigo-500 animate-pulse">Loading repositories…</div>}
      </div>
      {error && (
        <div className="bg-red-100 text-red-700 border border-red-300 p-3 rounded-md mb-4">
          Error: {error}
        </div>
      )}
      {repos.length === 0 && !loading && !error ? (
        <div className="text-center py-12 text-gray-500 italic">🔍 Start typing to search repositories...</div>
      ) : (
        <RepoList repos={displayed} />
      )}
    </div>
  );
}
