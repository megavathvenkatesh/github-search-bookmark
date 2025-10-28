import React from 'react';
import { useBookmarks } from '../context/BookmarkContext';
import type { Repo } from '../types/repo';

export default React.memo(function BookmarkToggle({ repo }: { repo: Repo }) {
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const bookmarked = isBookmarked(repo.id);

  return (
    <button
      aria-pressed={bookmarked}
      onClick={() => toggleBookmark(repo)}
      className={`transition-all text-2xl ${
        bookmarked ? 'text-yellow-400 hover:scale-110' : 'text-gray-400 hover:text-yellow-400 hover:scale-110'
      }`}
      title={bookmarked ? 'Remove bookmark' : 'Add bookmark'}
    >
      {bookmarked ? '★' : '☆'}
    </button>
  );
});

