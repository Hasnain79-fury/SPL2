// pages/index.tsx
import Layout from '../components/layout/Layout';
import Link from 'next/link';

export default function Home() {
  return (
    <Layout>
      <div className="pt-[60px]"> {/* Offset for fixed navbar */}
        <div className="bg-[#282A35] text-white text-center py-32">
          <h1 className="text-6xl font-bold mb-8">
            Learn Programming in Bangla
          </h1>
          <p className="text-xl mb-8">
            CSBangla is optimized for learning and training in Bangla medium
          </p>
          <div className="space-x-4">
            <Link 
              href="/tutorials"
              className="bg-[#04AA6D] text-white px-8 py-4 rounded-full text-xl font-bold hover:bg-[#059862]"
            >
              Start Learning
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8">
          {/* Feature Cards */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4">Programming Basics</h3>
            <p className="text-gray-600 mb-4">
              Learn programming fundamentals in Bangla
            </p>
            <Link 
              href="/tutorials/basics"
              className="text-[#04AA6D] hover:underline"
            >
              Start Learning →
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4">Data Structures</h3>
            <p className="text-gray-600 mb-4">
              Master data structures with clear explanations
            </p>
            <Link 
              href="/tutorials/data-structures"
              className="text-[#04AA6D] hover:underline"
            >
              Start Learning →
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4">Algorithms</h3>
            <p className="text-gray-600 mb-4">
              Learn essential algorithms step by step
            </p>
            <Link 
              href="/tutorials/algorithms"
              className="text-[#04AA6D] hover:underline"
            >
              Start Learning →
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
