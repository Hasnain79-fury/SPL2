// pages/dashboard/index.tsx
import { useEffect, useState } from 'react';
import Layout from '../../components/layout/Layout';
import { api } from '../../utils/api';

export default function Dashboard() {
  const [userData, setUserData] = useState({
    favorites: [],
    recentActivity: [],
    progress: {},
    contributions: []
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await api.getUserDashboardData();
        setUserData(data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };
    fetchUserData();
  }, []);

  return (
    <Layout title="Dashboard - CSBangla">
      <div className="pt-[60px]">
        <div className="tutorial-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Progress Card */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-bold mb-4">Learning Progress</h2>
              {/* Add progress visualization */}
            </div>

            {/* Favorite Lists */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-bold mb-4">Favorite Lists</h2>
              {/* Add favorites list */}
            </div>

            {/* Recent Activity */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
              {/* Add activity list */}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
