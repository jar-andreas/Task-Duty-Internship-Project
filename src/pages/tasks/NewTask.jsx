import { ChevronDown, ChevronLeft } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function NewTask() {
  const navigate = useNavigate();
  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div className="container mx-auto px-6 lg:px-20 py-10">
      <div className="flex items-center gap-1">
        <ChevronLeft
          onClick={() => navigate(-1)}
          className="cursor-pointer"
          size={30}
        />
        <h1 className="font-medium text-3xl lg:text-4xl">New Task</h1>
      </div>
      <div className="relative mt-10">
        <input
          type="text"
          placeholder="E.g. Project Defense, Assignment..."
          className="input h-16 input-bordered w-full px-7 py-4 outline-none"
        />
        <label className="absolute -top-3 left-7 bg-white text-lg text-(--lorem-color)">
          Task Title
        </label>
      </div>
      <div className="relative mt-10">
        <textarea
          placeholder="Briefly describe your task..."
          className="textarea textarea-lg h-45 w-full outline-none px-7 py-4 placeholder:text-sm placeholder:font-light placeholder:text-(--lorem-color) rounded resize-none"
        />
        <label className="absolute -top-3 left-7 bg-white text-lg text-(--lorem-color)">
          Description
        </label>
      </div>
      <div className="mt-10 relative">
        <div className="border border-gray-300 p-6 rounded">
          <label className="absolute -top-3 left-7 bg-white text-lg text-(--lorem-color)">
            Tags
          </label>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 ">
              <span className="bg-(--tags-color) text-white rounded px-4 py-1 text-xs cursor-pointer">
                Urgent
              </span>
              <span className="bg-(--tags-color) text-white rounded px-4 py-1 text-xs cursor-pointer">
                Important
              </span>
            </div>
            <ChevronDown size={30} className="text-(--tags-color)" />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <button className="bg-(--primary-color) text-white text-lg rounded w-full px-6 py-2 mt-10">
          Done
        </button>
        <button
          onClick={scrollUp}
          className="underline text-(--primary-color) cursor-pointer my-2 text-center w-full"
        >
          Back To Top
        </button>
      </div>
    </div>
  );
}
