import { useAuth } from "@/hooks/useAuth";
import { ChevronDown, LogOut, User } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

export default function UserAvatar() {
  const { user, handleLogout } = useAuth();
  return (
    <div className="flex gap-4 items-center">
      <img src="/Group 6.png" alt="profile picture" className="w-12" />
      <div className="hidden md:block dropdown dropdown-end">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-ghost m-1 tracking-wide uppercase"
        >
          Hi, {user?.username} <ChevronDown />
        </div>
        <ul
          tabIndex="-1"
          className="dropdown-content menu bg-white z-50 rounded-box w-40 p-2 shadow-sm"
        >
          <li>
            <a href="#" to="/profile">
              <div className="flex gap-2 items-center">
                <User size={18} />
                <span className="font-medium tracking-wide">Profile</span>
              </div>
            </a>
          </li>
          <li>
            <button
              className="flex items-center gap-2 text-red-500"
              role="button"
              aria-label="logout button"
              onClick={handleLogout}
            >
              <LogOut size={18} />
              <span className="font-medium tracking-wide">Logout</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
