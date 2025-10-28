import React from 'react';

type Props = {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
};

export default React.memo(function SearchBar({ value, onChange, placeholder = 'Search GitHub repositories...' }: Props) {
  return (
    <div className="mb-4">
      <input
        className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-400"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Search repositories"
      />
    </div>
  );
});
