// components/common/SEO.tsx
import Head from 'next/head';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string[];
}

export default function SEO({ title, description, keywords = [] }: SEOProps) {
  return (
    <Head>
      <title>{`${title} - CSBangla`}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="language" content="bn" />
    </Head>
  );
}
