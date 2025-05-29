'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import classNames from 'classnames';

export default function NavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();

  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={classNames('nav-link  text-light ', {
        'fw-bold': isActive,
        ' fw-light': !isActive,
      })}
    >
      <span className=" text-uppercase">{label}</span> 
    </Link>
  );
}