// components/layout/Sidebar.tsx
import Link from 'next/link';
import { useRouter } from 'next/router';

const topics = [
  { title: 'Programming Basics', path: '/tutorials/basics' },
  { title: 'Data Structures', path: '/tutorials/data-structures' },
  { title: 'Algorithms', path: '/tutorials/algorithms' },
  { title: 'Object-Oriented Programming', path: '/tutorials/oop' },
  { title: 'Database', path: '/tutorials/database' },
  { title: 'Web Development', path: '/tutorials/web-dev' },
];

export default function Sidebar() {
  const router = useRouter();

  return (
    <div className="w3-sidebar">
      <div className="p-4">
        <h3 className="text-xl font-bold mb-4">Topics</h3>
        <ul>
          {topics.map((topic) => (
            <li key={topic.path}>
              <Link
                href={topic.path}
                className={`block py-2 px-4 hover:bg-[#04AA6D] ${
                  router.pathname === topic.path ? 'bg-[#04AA6D]' : ''
                }`}
              >
                {topic.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
