"use client";

import { Facebook, Linkedin, Mail, Twitter } from 'lucide-react';

// Note: lucide-react does not have a dedicated WhatsApp icon, so we omit it or use a generic one.

type Props = {
  url: string;
  title: string;
  className?: string;
};

export default function ShareButtons({ url, title, className }: Props) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const links = [
    {
      name: 'Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      icon: Facebook,
    },
    {
      name: 'X',
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      icon: Twitter,
    },
    {
      name: 'LinkedIn',
      href: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`,
      icon: Linkedin,
    },
    {
      name: 'Email',
      href: `mailto:?subject=${encodedTitle}&body=Nézd meg ezt a cikket: ${encodedUrl}`,
      icon: Mail,
    },
  ];

  const baseClasses =
    "flex items-center gap-2 rounded-lg border border-gray-300 dark:border-gray-700 px-3 py-1.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500";

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      <span className="text-sm font-semibold">Megosztás:</span>
      {links.map((link) => (
        <a
          key={link.name}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className={baseClasses}
          aria-label={`Megosztás ${link.name} platformon`}
        >
          <link.icon size={16} />
          <span>{link.name}</span>
        </a>
      ))}
    </div>
  );
}
