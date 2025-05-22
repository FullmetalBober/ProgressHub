'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

export default function SidebarButton({
  icon,
  label,
  href,
  badge,
}: Readonly<{
  icon?: React.ReactNode;
  label: string;
  href: string;
  badge?: number;
}>) {
  const pathname = usePathname();
  const isActive = useMemo(() => pathname.startsWith(href), [pathname, href]);
  const buttonVariant = isActive ? 'secondary' : 'ghost';

  return (
    <Button
      variant={buttonVariant}
      className='w-full my-0.5 justify-start'
      asChild
    >
      <Link href={href}>
        {icon}
        <span className='ml-2'>
          {label} {badge && <Badge>{badge}</Badge>}
        </span>
      </Link>
    </Button>
  );
}
