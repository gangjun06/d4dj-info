import React from "react";
import Link from "next/link";

type props = {
  children: React.ReactNode;
};

export const MainLayout = ({ children }: props) => {
  return <>{children}</>;
};
