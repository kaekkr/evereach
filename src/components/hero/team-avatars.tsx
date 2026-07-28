"use client";

import Link from "next/link";
import Image from "next/image";

export interface TeamMember {
  id: string;
  src: string;
  alt: string;
  href: string;
}

const DEFAULT_MEMBERS: TeamMember[] = [
  {
    id: "preview-1",
    src: "/meyirzhan.jpg",
    alt: "Meyirzhan",
    href: "https://www.linkedin.com/in/meiirzhan-amangeldi",
  },
  {
    id: "preview-2",
    src: "/lesha.jpg",
    alt: "Aleks",
    href: "https://www.linkedin.com/in/aleks-hrabovskyi/",
  },
  {
    id: "preview-3",
    src: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?q=80&w=200&auto=format&fit=crop",
    alt: "Karassay",
    href: "https://www.linkedin.com/in/karassay-raushanbek/",
  },
];

interface TeamAvatarsProps {
  members?: TeamMember[];
}

export function TeamAvatars({ members = DEFAULT_MEMBERS }: TeamAvatarsProps) {
  return (
    <span className="inline-block align-middle mx-1.5 sm:mx-2 -translate-y-0.5">
      <span className="flex items-center">
        {members.slice(0, 3).map((item, index) => {
          const isExternal = item.href.startsWith("http");

          return (
            <span
              key={item.id}
              className={`inline-block w-8 h-8 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full overflow-hidden border border-white/20 shadow-xl relative bg-neutral-900 transition-transform duration-200 hover:scale-110 hover:z-30 ${index > 0 ? "-ml-3 sm:-ml-5" : ""
                }`}
              style={{ zIndex: 10 - index }}
            >
              <Link
                href={item.href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                aria-label={item.alt}
                className="block w-full h-full relative"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 640px) 32px, (max-width: 768px) 48px, 56px"
                  className="object-cover"
                  priority
                />
              </Link>
            </span>
          );
        })}
      </span>
    </span>
  );
}
