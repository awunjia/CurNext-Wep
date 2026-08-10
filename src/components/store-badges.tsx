import Image from "next/image";

type StoreBadgeProps = {
  href: string;
  className?: string;
};

export function AppStoreBadge({ href, className }: StoreBadgeProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      aria-label="Download on the App Store"
    >
      <Image
        src="/badges/app-store-badge.svg"
        alt="Download on the App Store"
        width={120}
        height={40}
        className="h-9 w-auto dark:hidden sm:h-10"
        unoptimized
      />
      <Image
        src="/badges/app-store-badge-white.svg"
        alt="Download on the App Store"
        width={120}
        height={40}
        className="hidden h-9 w-auto dark:block sm:h-10"
        unoptimized
      />
    </a>
  );
}

export function GooglePlayBadge({ href, className }: StoreBadgeProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      aria-label="Get it on Google Play"
    >
      <Image
        src="/badges/google-play-badge.svg"
        alt="Get it on Google Play"
        width={135}
        height={40}
        className="h-9 w-auto sm:h-10"
        unoptimized
      />
    </a>
  );
}
