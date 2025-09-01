"use client";

import { social } from "@/lib/site";
import {
  Facebook,
  Instagram,
  Linkedin,
  Github,
  Twitter,
  Youtube,
  Mail,
  Phone,
  type LucideProps,
} from "lucide-react";
import React from "react";

const iconMap: Record<keyof typeof social, React.ComponentType<LucideProps>> = {
  facebook: Facebook,
  instagram: Instagram,
  linkedin: Linkedin,
  github: Github,
  x: Twitter,
  youtube: Youtube,
  email: Mail,
  phone: Phone,
};

type Props = {
  size?: number;
  className?: string;
  variant?: "solid" | "ghost";
};

export default function SocialLinks({ size = 20, className = "", variant = "ghost" }: Props) {
  const baseClasses =
    "inline-flex items-center justify-center rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-950";
  
  const variantClasses = {
    solid:
      "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 p-2",
    ghost:
      "text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 p-1",
  };

  const validLinks = Object.entries(social).reduce<
    Array<{
      key: string;
      href: string;
      isExternal: boolean;
      Icon: React.ComponentType<LucideProps>;
      label: string;
    }>
  >((acc, [key, value]) => {
    const Icon = iconMap[key as keyof typeof social];
    const trimmedValue = value?.trim();

    // Skip if value is empty, whitespace, or a placeholder
    if (!trimmedValue || trimmedValue.includes('_PLACEHOLDER')) {
      return acc;
    }

    let href = trimmedValue;
    let isExternal = false;

    switch (key) {
      case "email":
        href = href.startsWith("mailto:") ? href : `mailto:${href}`;
        break;
      case "phone":
        href = `tel:${href.replace(/\s/g, "")}`;
        break;
      default:
        // For other links, ensure they are valid http(s) URLs
        if (href.startsWith("http")) {
          isExternal = true;
        } else {
          return acc; // Skip invalid URL formats
        }
    }

    acc.push({
      key,
      href,
      isExternal,
      Icon,
      label: `Látogasd meg a(z) ${key} oldalamat`,
    });

    return acc;
  }, []);

  return (
    <nav aria-label="Közösségi linkek">
      <ul className={`flex items-center ${className}`}>
        {validLinks.map(({ key, href, isExternal, Icon, label }) => (
          <li key={key}>
            <a
              href={href}
              title={label}
              aria-label={label}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer me" : undefined}
              className={`${baseClasses} ${variantClasses[variant]}`}
            >
              <Icon size={size} />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
