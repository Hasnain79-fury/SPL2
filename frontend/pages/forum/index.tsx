// pages/forum/index.tsx
import { useState, useEffect } from 'react';
import Layout from '../../components/layout/Layout';
import { api } from '../../utils/api';

export default function Forum() {
  const [topics, setTopics] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchForumData = async () => {
      try {
        const [topicsData, categoriesData] = await Promise.all([
          api.getForumTopics(),
          api.getForumCategories()
        ]);
        setTopics(topicsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching forum data:', error);
      }
    };
    fetchForumData();
  }, []);

  return (
    <Layout title="Forum - CSBangla">
      <div className="pt-[60px]">
        <div className="tutorial-container">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Forum</h1>
            <button className="w3-btn w3-btn-green">
              Create New Topic
            </button>
          </div>

          {/* Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {categories.map((category: any) => (
              <div key={category._id} className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-bold mb-2">{category.name}</h2>
                <p className="text-gray-600">{category.description}</p>
              </div>
            ))}
          </div>

          {/* Recent Topics */}
          <div className="bg-white rounded-lg shadow">
            <h2 className="text-xl font-bold p-6 border-b">Recent Topics</h2>
            <div className="divide-y">
              {topics.map((topic: any) => (
                <div key={topic._id} className="p-6">
                  <h3 className="text-lg font-semibold mb-2">{topic.title}</h3>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>By {topic.author.username}</span>
                    <span>{topic.replies} replies</span>
                    <span>{new Date(topic.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
