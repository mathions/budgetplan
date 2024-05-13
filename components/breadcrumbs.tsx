import { ChevronRightIcon } from "@radix-ui/react-icons";
import { ArrowRight, Folder } from "iconsax-react";
import { clsx } from "clsx";
import Link from "next/link";

interface Breadcrumb {
  label: string;
  href: string;
  active?: boolean;
}

export default function Breadcrumbs({
  breadcrumbs,
}: {
  breadcrumbs: Breadcrumb[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 block">
      <ol className={clsx("flex text-sm")}>
        {breadcrumbs.map((breadcrumb, index) => (
          <li
            key={breadcrumb.href}
            aria-current={breadcrumb.active}
            className={clsx(
              breadcrumb.active ? "text-textstrong flex" : "text-textweak flex"
            )}
          >
            <Link href={breadcrumb.href} className="flex">
              <span className="mx-1 grid content-center">
                <Folder className="w-4 h-4" />
              </span>
              {breadcrumb.label}
            </Link>
            {index < breadcrumbs.length - 1 ? (
              <span className="mx-1 grid content-center">
                <ArrowRight className="w-4 h-4" />
              </span>
            ) : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}
