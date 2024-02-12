import { ChevronRightIcon } from "@radix-ui/react-icons";
import { clsx } from 'clsx';
import Link from 'next/link';

interface Breadcrumb {
  label: string;
  href: string;
  active?: boolean;
}

export default function Breadcrumbs({ breadcrumbs }: { breadcrumbs: Breadcrumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 block">
      <ol className={clsx('flex text-sm')}>
        {breadcrumbs.map((breadcrumb, index) => (
          <li
            key={breadcrumb.href}
            aria-current={breadcrumb.active}
            className={clsx(
              breadcrumb.active ? 'text-foreground flex' : 'text-foreground/70 flex',
            )}
          >
            <Link href={breadcrumb.href}>{breadcrumb.label}</Link>
            {index < breadcrumbs.length - 1 ? (
              <span className="mx-2 grid content-end"><ChevronRightIcon className="w-[18px] h-[18px]"/></span>
            ) : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}
