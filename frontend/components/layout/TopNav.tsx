// components/layout/TopNav.tsx
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function TopNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  return (
    <nav className="bg-[#282A35] text-white fixed top-0 w-full z-50 h-[60px] flex items-center px-4">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center">
          <Link href="/" className="text-2xl font-bold mr-8">
            CSBangla
          </Link>
          <div className="hidden md:flex space-x-4">
            <Link href="/tutorials" className="hover:bg-[#04AA6D] px-4 py-2 rounded">
              Tutorials
            </Link>
            <Link href="/blogs" className="hover:bg-[#04AA6D] px-4 py-2 rounded">
              Blogs
            </Link>
            <Link href="/forum" className="hover:bg-[#04AA6D] px-4 py-2 rounded">
              Forum
            </Link>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <Link href="/auth/login" className="hover:bg-[#04AA6D] px-4 py-2 rounded">
            Log in
          </Link>
          <Link 
            href="/auth/signup" 
            className="bg-[#04AA6D] hover:bg-[#059862] px-4 py-2 rounded"
          >
            Sign up
          </Link>
        </div>
      </div>
    </nav>
  );
}
