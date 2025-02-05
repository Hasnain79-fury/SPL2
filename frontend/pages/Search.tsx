// pages/search.tsx
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout from '../components/layout/Layout';
import { api } from '../utils/api';

export default function SearchResults() {
  const router = useRouter();
  const { q } = router.query;
  const [results, setResults] = useState({
    tutorials: [],
    blogs: [],
    forum: []
  });

  useEffect(() => {
    if (q) {
      const fetchResults = async () => {
        try {
          const searchResults = await api.search(q.toString());
          setResults(searchResults);
        } catch (error) {
          console.error('Search error:', error);
        }
      };
      fetchResults();
    }
  }, [q]);

  return (
    <Layout title={`Search Results for "${q}" - CSBangla`}>
      <div className="pt-[60px]">
        <div className="tutorial-container">
          <h1 className="text-3xl font-bold mb-6">
            Search Results for "{q}"
          </h1>

          {/* Tutorial Results */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Tutorials</h2>
            {results.tutorials.map((tutorial: any) => (
              <div key={tutorial._id} className="mb-4 p-4 bg-white rounded shadow">
                {/* Tutorial content */}
              </div>
            ))}
          </section>

          {/* Blog Results */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Blogs</h2>
            {results.blogs.map((blog: any) => (
              <div key={blog._id} className="mb-4 p-4 bg-white rounded shadow">
                {/* Blog content */}
              </div>
            ))}
          </section>

          {/* Forum Results */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Forum Posts</h2>
            {results.forum.map((post: any) => (
              <div key={post._id} className="mb-4 p-4 bg-white rounded shadow">
                {/* Forum post content */}
              </div>
            ))}
          </section>
        </div>
      </div>
    </Layout>
  );
}
