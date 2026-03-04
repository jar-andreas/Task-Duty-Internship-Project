import Nav from "@/components/Nav";
import { Outlet } from "react-router-dom";

export default function TaskFormLayout() {
  return (
    <>
      <Nav />
      <div className="pt-14 md:pt-20">
        <Outlet />
      </div>
    </>
  );
}
