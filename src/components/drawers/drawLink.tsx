import React from "react";
import Link from "next/link";

type Props = {
  href: string;
  text: string;
  children?: React.ReactNode;
  className?: string;
};

export const DrawLink = ({ href, text, children, className }: Props) => {
  return (
    <div className={` ${className}`}>
      {children}
      <Link href={href}>{text}</Link>
    </div>
  );
};
