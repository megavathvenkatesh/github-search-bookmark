import type { Repo } from '../types/repo';
import RepoCard from './RepoCard';

export default function RepoList({ repos }: { repos: Repo[] }) {
  if (repos.length === 0) {
    return <div className="text-center py-12 text-slate-500">No repositories to show.</div>;
  }
  return (
    <div className="grid gap-4">
      {repos.map((r) => (
        <RepoCard key={r.id} repo={r} />
      ))}
    </div>
  );
}
