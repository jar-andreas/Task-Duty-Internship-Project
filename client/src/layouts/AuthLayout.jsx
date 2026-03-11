import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <section className="container mx-auto grid grid-cols-12 min-h-screen relative">
      <div className="hidden lg:block col-span-6">
        <img
          src="/auth.png"
          alt=""
          className="w-full h-screen object-cover"
        />
      </div>
      <div className="col-span-12 lg:col-span-6 p-4 md:p-0">
        <Outlet />
      </div>
    </section>
  );
}
