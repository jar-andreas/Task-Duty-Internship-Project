import { Menu, X } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Drawer() {
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
          <div className="menu bg-base-100 text-base-content min-h-screen w-70 p-4">
            <Link to="/">
              <img src="Group 2.png" alt="Logo" />
            </Link>
            <button
              className="absolute right-2 top-4 btn cursor-pointer btn-circle btn-sm btn-ghost"
              onClick={() => setIsOpen(false)}
            >
              <X />
            </button>
            <div className="mt-6 flex flex-col gap-4 border-t border-base-300 pb-4">
              <Link
                to="/new-task"
                onClick={() => setIsOpen(false)}
                className=" font-medium text-xl mt-4"
              >
                New Task
              </Link>

              <Link
                to="/my-tasks"
                onClick={() => setIsOpen(false)}
                className=" font-medium text-xl"
              >
                All Tasks
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
