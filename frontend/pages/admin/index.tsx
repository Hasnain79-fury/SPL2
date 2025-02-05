// pages/admin/index.tsx
import { useState, useEffect } from 'react';
import Layout from '../../components/layout/Layout';
import { api } from '../../utils/api';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    pendingPosts: 0,
    totalBlogs: 0,
    totalComments: 0
  });

  useEffect(() => {
    const fetchAdminStats = async () => {
      try {
        const data = await api.getAdminStats();
        setStats(data);
      } catch (error) {
        console.error('Error fetching admin stats:', error);
      }
    };
    fetchAdminStats();
  }, []);

  return (
    <Layout title="Admin Dashboard - CSBangla">
      <div className="pt-[60px]">
        <div className="tutorial-container">
          <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-gray-500">Total Users</h3>
              <p className="text-3xl font-bold">{stats.totalUsers}</p>
            </div>
            {/* Add more stat cards */}
          </div>

          {/* Pending Approvals */}
          <div className="bg-white p-6 rounded-lg shadow mb-8">
            <h2 className="text-2xl font-bold mb-4">Pending Approvals</h2>
            {/* Add pending posts list */}
          </div>

          {/* Recent Activity */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
            {/* Add activity list */}
          </div>
        </div>
      </div>
    </Layout>
  );
}
