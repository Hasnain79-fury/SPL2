// components/common/SearchBar.tsx
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function SearchBar() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/search?q=${encodeURIComponent(searchTerm)}`);
  };

  return (
    <form onSubmit={handleSearch} className="w-full max-w-lg">
      <div className="relative">
        <input
          type="search"
          className="w-full p-3 pl-10 rounded-lg border focus:outline-none focus:border-[#04AA6D]"
          placeholder="Search tutorials, blogs, and more..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          type="submit"
          className="absolute right-2 top-2 bg-[#04AA6D] text-white p-2 rounded"
        >
          Search
        </button>
      </div>
    </form>
  );
}
