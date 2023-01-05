import Link from "next/link";
import { ReactNode } from "react";

type NextLink = {
  path: string;
  children: ReactNode;
};

export default function NextLink({ path, children }: NextLink) {
  return (
    <Link href={path} style={{ textDecoration: "none", color: 'inherit' }}>
      {children}
    </Link>
  );
}
