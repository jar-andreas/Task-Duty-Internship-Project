import React from "react";
import { Link, NavLink } from "react-router-dom";
import Drawer from "./Drawer";
import { useAuth } from "@/hooks/useAuth";
import UserAvatar from "./UserAvatar";

export default function Nav() {
  const { user, handleLogout } = useAuth();
  return (
    <header className="fixed top-0 left-0 w-full bg-white z-50">
      <div className="container mx-auto px-6 w-full lg:px-20 py-4 flex justify-between items-center">
        <Link to="/">
          <img src="/Group 2.png" alt="Logo" className="w-30" />
        </Link>
        {user ? (
          <>
            <div className="hidden lg:flex gap-8 items-center font-medium">
              <NavLink
                to="/new-task"
                className={({ isActive }) =>
                  isActive ? "text-(--primary-color) font-semibold" : "hover:text-(--primary-color) transition-colors ease-in-out duration-150"
                }
              >
                New Task
              </NavLink>
              <NavLink
                to="/my-tasks"
                className={({ isActive }) =>
                  isActive ? "text-(--primary-color) font-semibold" : "hover:text-(--primary-color) transition-colors ease-in-out duration-150"
                }
              >
                All Tasks
              </NavLink>
            </div>
          </>
        ) : null}

        <div className="flex items-center gap-4">
          {user ? (
            <UserAvatar />
          ) : (
            <>
              <div className="hidden md:flex gap-4 items-center font-medium">
                <NavLink
                  to="auth/signup"
                  className="hover:text-(--primary-color) transition-colors ease-in-out duration-150"
                >
                  Sign Up
                </NavLink>
                <NavLink
                  to="/auth/login"
                  className="hover:text-(--primary-color) transition-colors ease-in-out duration-150"
                >
                  Log In
                </NavLink>
              </div>
            </>
          )}
          <div className="md:hidden">
            <Drawer handleLogout={handleLogout} />
          </div>
        </div>
      </div>
      <div className="container mx-auto">
        <hr className="text-gray-300" />
      </div>
    </header>
  );
}
