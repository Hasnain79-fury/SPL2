import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  const navigation = {
    main: [
      { name: 'Home', href: '/' },
      { name: 'About', href: '/about' },
      { name: 'Blogs', href: '/blogs' },
      { name: 'Forum', href: '/forum' },
      { name: 'Contact', href: '/contact' },
    ],
    resources: [
      { name: 'Documentation', href: '/docs' },
      { name: 'Guides', href: '/guides' },
      { name: 'FAQ', href: '/faq' },
    ],
    social: [
      { name: 'Facebook', icon: FaFacebook, href: '#' },
      { name: 'Twitter', icon: FaTwitter, href: '#' },
      { name: 'Instagram', icon: FaInstagram, href: '#' },
      { name: 'LinkedIn', icon: FaLinkedin, href: '#' },
    ],
  };

  return (
    <footer className="bg-gray-900">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-white text-2xl font-bold">BlogSite</h2>
            <p className="mt-4 text-gray-400 text-sm">
              Share your knowledge and experiences with our community. Join us in creating
              valuable content and engaging discussions.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
              Navigation
            </h3>
            <ul className="mt-4 space-y-4">
              {navigation.main.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} 
                    className="text-base text-gray-300 hover:text-white">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
              Resources
            </h3>
            <ul className="mt-4 space-y-4">
              {navigation.resources.map((item) => (
                <li key={item.name}>
                  <Link href={item.href}
                    className="text-base text-gray-300 hover:text-white">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Links */}
        <div className="mt-8 border-t border-gray-700 pt-8">
          <div className="flex space-x-6 justify-center md:justify-start">
            {navigation.social.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-400 hover:text-gray-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="sr-only">{item.name}</span>
                <item.icon className="h-6 w-6" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 text-center md:text-left">
          <p className="text-base text-gray-400">
            &copy; {new Date().getFullYear()} BlogSite. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;