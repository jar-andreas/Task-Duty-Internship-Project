import Nav from "@/components/Nav";
import React from "react";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <>
      <Nav />
      <div className="pt-20">
        <Outlet />
      </div>
    </>
  );
}
