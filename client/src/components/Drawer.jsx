import { useAuth } from "@/hooks/useAuth";
import { LogOut, Menu, X } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Drawer({handleLogout}) {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Menu onClick={() => setIsOpen(true)} />
      <div
        className={`drawer fixed top-0 left-0 z-40 ${isOpen ? "drawer-open" : ""}`}
      >
        <input id="my-drawer-1" type="checkbox" className="drawer-toggle" />
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-1"
            aria-label="close sidebar"
            className="drawer-overlay"
            onClick={() => setIsOpen(false)}
          ></label>
          <div className="menu bg-white min-h-screen w-70 p-4">
            <Link to="/">
              <img src="Group 2.png" alt="Logo" />
            </Link>
            <button
              className="absolute right-2 top-4 btn cursor-pointer btn-circle btn-sm btn-ghost"
              onClick={() => setIsOpen(false)}
            >
              <X />
            </button>
            <div className="mt-6 flex flex-col gap-4">
              {user ? (
                <div className="">
                  <h1 className="font-semibold text-xl capitalize">
                    Hi, {user.username}
                  </h1>
                  <div className="space-y-3 border-t border-(--primary-color) flex flex-col h-[calc(100dvh-150px)] my-3">
                    <Link
                      to="/new-task"
                      onClick={() => setIsOpen(false)}
                      className="font-medium text-xl mt-3"
                    > 
                      New Task
                    </Link>
                    <Link
                      to="/my-tasks"
                      onClick={() => setIsOpen(false)}
                      className="font-medium text-xl"
                    >
                      All Tasks
                    </Link>
                    <div className="mt-auto border-t pt-4">
                      <button className="font-medium text-xl text-red-500 tracking-wide flex items-center gap-2" onClick={handleLogout}>
                        <LogOut size={20} />
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <Link
                    to="/auth/signup"
                    onClick={() => setIsOpen(false)}
                    className=" font-medium text-xl mt-4"
                  >
                    Sign Up
                  </Link>
                  <Link
                    to="/auth/login"
                    onClick={() => setIsOpen(false)}
                    className=" font-medium text-xl"
                  >
                    Log In
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
