import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { Repo } from '../types/repo';

const KEY = 'bookmarks_v1';

type BookmarkContextType = {
  bookmarks: Repo[];
  isBookmarked: (id: number) => boolean;
  toggleBookmark: (repo: Repo) => void;
};

const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined);

export const BookmarkProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bookmarks, setBookmarks] = useState<Repo[]>(() => {
    try {
      const raw = localStorage.getItem(KEY);
      return raw ? (JSON.parse(raw) as Repo[]) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(bookmarks));
    } catch {
      // ignore
    }
  }, [bookmarks]);

  const isBookmarked = useCallback((id: number) => bookmarks.some((b) => b.id === id), [bookmarks]);

  const toggleBookmark = useCallback(
    (repo: Repo) => {
      setBookmarks((prev) => {
        if (prev.some((p) => p.id === repo.id)) {
          return prev.filter((p) => p.id !== repo.id);
        } else {
          return [repo, ...prev];
        }
      });
    },
    [setBookmarks]
  );

  const value = useMemo(() => ({ bookmarks, isBookmarked, toggleBookmark }), [bookmarks, isBookmarked, toggleBookmark]);

  return <BookmarkContext.Provider value={value}>{children}</BookmarkContext.Provider>;
};

export function useBookmarks() {
  const ctx = useContext(BookmarkContext);
  if (!ctx) throw new Error('useBookmarks must be used inside BookmarkProvider');
  return ctx;
}
