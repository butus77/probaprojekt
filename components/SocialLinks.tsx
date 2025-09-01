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

function isHttpUrl(v: string) {
  return /^https?:\/\//i.test(v);
}
function isEmailLike(v: string) {
  // nagyon laza ellenőrzés: van benne @ és nincs whitespace
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}
function isTelLike(v: string) {
  // enged számokat, +, zárójelek, szóköz, kötőjel
  return /^[\d+\s().-]+$/.test(v);
}

export default function SocialLinks({ size = 20, className = "", variant = "ghost" }: Props) {
  const base =
    "inline-flex items-center justify-center rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-950";
  const variantClasses =
    variant === "solid"
      ? "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 p-2"
      : "text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 p-1";

  // Normalizálás + szűrés kulcsonként
  const normalized = (Object.entries(social) as [keyof typeof social, unknown][])
    .map(([key, raw]) => {
      if (typeof raw !== "string") return null;
      const url = raw.trim();
      if (!url) return null;

      // webes profilok
      if (key === "facebook" || key === "instagram" || key === "linkedin" || key === "github" || key === "x" || key === "youtube") {
        if (!isHttpUrl(url)) return null; // csak http(s)
        return { key, href: url, http: true };
      }

      // email
      if (key === "email") {
        if (url.startsWith("mailto:")) return { key, href: url, http: false };
        if (isEmailLike(url)) return { key, href: `mailto:${url}`, http: false };
        return null;
      }

      // telefon
      if (key === "phone") {
        if (url.startsWith("tel:")) return { key, href: url, http: false };
        if (isTelLike(url)) return { key, href: `tel:${url.replace(/\s+/g, "")}`, http: false };
        return null;
      }

      return null;
    })
    .filter(Boolean) as Array<{ key: keyof typeof social; href: string; http: boolean }>;

  return (
    <nav aria-label="Közösségi linkek">
      <ul className={`flex items-center gap-2 ${className}`}>
        {normalized.map(({ key, href, http }) => {
          const Icon = iconMap[key];
          const label =
            key === "email"
              ? "E-mail küldése"
              : key === "phone"
              ? "Telefonhívás indítása"
              : `Megnyitás: ${key}`;

          return (
            <li key={key}>
              <a
                href={href}
                title={label}
                aria-label={label}
                {...(http ? { target: "_blank", rel: "noopener noreferrer me" } : {})}
                className={`${base} ${variantClasses}`}
              >
                <Icon size={size} />
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

