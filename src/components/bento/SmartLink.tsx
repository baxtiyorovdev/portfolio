import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";

type SmartLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: string;
  children: ReactNode;
};

/** next/link for internal routes, a new-tab anchor for everything external. */
export function SmartLink({ href, children, ...rest }: SmartLinkProps) {
  const isInternal = href.startsWith("/") || href.startsWith("#");
  const isProtocol = href.startsWith("mailto:") || href.startsWith("tel:");

  if (isInternal) {
    return (
      <Link href={href} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <a
      href={href}
      {...(isProtocol ? {} : { target: "_blank", rel: "noreferrer noopener" })}
      {...rest}
    >
      {children}
    </a>
  );
}
