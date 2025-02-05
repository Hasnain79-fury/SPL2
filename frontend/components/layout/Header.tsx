// components/layout/Header.tsx
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Header() {
  const router = useRouter();

  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            CSBangla
          </Link>
          
          <div className="space-x-4">
            <Link href="/blogs" className="text-gray-600 hover:text-blue-600">
              Blogs
            </Link>
            <Link href="/auth/login" className="text-gray-600 hover:text-blue-600">
              Login
            </Link>
            <Link href="/auth/signup" className="text-gray-600 hover:text-blue-600">
              Sign Up
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
