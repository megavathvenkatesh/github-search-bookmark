import React from 'react';
import type { Repo } from '../types/repo';
import BookmarkToggle from './BookmarkToggle';

export default React.memo(function RepoCard({ repo }: { repo: Repo }) {
  return (
    <div className="p-5 bg-white rounded-2xl shadow hover:shadow-lg transition-all border border-gray-100 flex gap-4 items-start hover:-translate-y-1">
      <img
        src={repo.owner.avatar_url}
        alt={repo.owner.login}
        className="w-14 h-14 rounded-full object-cover border-2 border-indigo-200"
      />
      <div className="flex-1">
        <div className="flex items-start justify-between">
          <a
            href={repo.html_url}
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-indigo-600 hover:underline"
          >
            {repo.full_name}
          </a>
          <BookmarkToggle repo={repo} />
        </div>
        <p className="text-sm text-gray-600 mt-1">{repo.description ?? 'No description provided'}</p>
        <div className="flex gap-4 text-sm text-gray-500 mt-3">
          <span>⭐ {repo.stargazers_count}</span>
          <span>{repo.language ?? '—'}</span>
        </div>
      </div>
    </div>
  );
});
