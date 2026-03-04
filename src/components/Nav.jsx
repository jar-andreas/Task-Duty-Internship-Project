import React from "react";
import { Link, useLocation } from "react-router-dom";
import Drawer from "./Drawer";

export default function Nav() {
  const location = useLocation();

  const isHomePage = location.pathname === "/";
  const isMyTasksPage = location.pathname === "/my-tasks";
  const isEditOrNewTaskPage =
    location.pathname === "/edit-task" || location.pathname === "/new-task";
  return (
    <header className="fixed top-0 left-0 w-full bg-white z-50">
      <div className="container mx-auto px-6 lg:px-20 py-4">
        <div className="flex items-center justify-between">
          <Link to="/">
            <img src="/Group 2.png" alt="Logo" className="w-30" />
          </Link>
          <div className="hidden md:flex items-center gap-6">
            {isHomePage && (
              <>
                <Link to="/new-task" className="font-semibold text-sm">
                  New Task
                </Link>
                <Link to="/my-tasks" className="font-semibold text-sm">
                  All Tasks
                </Link>
              </>
            )}
            {isMyTasksPage && (
              <Link to="/new-task" className="font-semibold text-sm">
                New Task
              </Link>
            )}

            {isEditOrNewTaskPage && (
              <Link to="/my-tasks" className="font-semibold text-sm">
                All Task
              </Link>
            )}

            <img src="/Group 6.png" alt="profile picture" className="w-12" />
          </div>
          <div className="md:hidden flex items-center gap-2">
            <img src="/Group 6.png" alt="profile picture" className="w-10" />
            <Drawer />
          </div>
        </div>
      </div>
      <div className="container mx-auto">
        <hr className="text-gray-300" />
      </div>
    </header>
  );
}
