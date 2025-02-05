// pages/tutorials/[topic].tsx
import { useRouter } from 'next/router';
import Layout from '../../components/layout/Layout';

export default function TutorialPage() {
  const router = useRouter();
  const { topic } = router.query;

  return (
    <Layout title={`${topic} Tutorial - CSBangla`}>
      <div className="pt-[60px]">
        <div className="tutorial-container">
          <h1 className="text-4xl font-bold mb-8 capitalize">
            {topic?.toString().replace('-', ' ')}
          </h1>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Introduction</h2>
            <p className="text-gray-700 mb-4">
              Learn about {topic} in simple Bangla language.
            </p>

            <div className="example-box">
              <h3 className="text-xl font-bold mb-2">Example</h3>
              <div className="code-box">
                <pre>
                  <code>
                    // Your example code here
                    console.log("Hello World");
                  </code>
                </pre>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Practice Exercise</h2>
            <div className="bg-white border rounded p-4">
              {/* Add interactive exercise component here */}
              <p>Try solving this problem...</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
