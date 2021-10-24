import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

type props = {
  children: React.ReactNode;
};

export const MainLayout = ({ children }: props) => {
  return (
    <>
      <Navbar>{children}</Navbar>
    </>
  );
};
