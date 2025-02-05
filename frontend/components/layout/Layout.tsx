// components/layout/Layout.tsx
import Head from 'next/head';
import Sidebar from './Sidebar';
import TopNav from './TopNav';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}

export default function Layout({ children, title = 'CS Bangla' }: LayoutProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <link href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@400;600;700&display=swap" rel="stylesheet" />
      </Head>
      <TopNav />
      <Sidebar />
      <main className="main-content">
        {children}
      </main>
    </>
  );
}
