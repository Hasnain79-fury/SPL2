// pages/blogs/index.tsx
import { useEffect, useState } from 'react';
import Layout from '../../components/layout/Layout';
import Link from 'next/link';
import { api } from '../../utils/api';

export default function BlogsPage() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await api.getAllBlogs();
        setBlogs(data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <Layout title="Blogs - CSBangla">
      <div className="pt-[60px]">
        <div className="tutorial-container">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold">Blogs</h1>
            <Link 
              href="/blogs/create"
              className="w3-btn w3-btn-green"
            >
              Create Blog
            </Link>
          </div>

          <div className="grid gap-6">
            {blogs.map((blog: any) => (
              <div 
                key={blog._id} 
                className="bg-white rounded-lg shadow-md p-6"
              >
                <h2 className="text-2xl font-bold mb-2">
                  <Link 
                    href={`/blogs/${blog._id}`}
                    className="text-[#04AA6D] hover:underline"
                  >
                    {blog.title}
                  </Link>
                </h2>
                <p className="text-gray-600 mb-4">
                  {blog.blog_text.substring(0, 200)}...
                </p>
                <div className="flex flex-wrap gap-2 mb-2">
                  {blog.tags.map((tag: string, index: number) => (
                    <span 
                      key={index}
                      className="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="text-sm text-gray-500">
                  By {blog.author?.username || 'Anonymous'} • 
                  {new Date(blog.createdAt).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
