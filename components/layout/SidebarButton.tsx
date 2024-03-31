'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '../ui/button';

export default function SidebarButton({
  icon,
  label,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  href: string;
}) {
  const pathname = usePathname();

  const isActive = pathname === href;
  const buttonVariant = isActive ? 'secondary' : 'ghost';

  return (
    <Button variant={buttonVariant} className='w-full justify-start' asChild>
      <Link href={href}>
        {icon}
        <span className='ml-2'>{label}</span>
      </Link>
    </Button>
  );
}
