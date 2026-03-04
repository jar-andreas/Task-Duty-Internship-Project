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
      <div className="mt-10">
        <fieldset className="border border-gray-300 rounded w-full">
          <legend className="ml-5 text-lg text-(--lorem-color) mb-2">
            Task Title
          </legend>
          <textarea
            placeholder="E.g. Project Defense, Assignment..."
            className="w-full h-8 outline-none px-5 text-xs border-none rounded resize-none"
          />
        </fieldset>
      </div>
      <div className="mt-10">
        <fieldset className="border border-gray-300 rounded w-full">
          <legend className="ml-5 text-lg text-(--lorem-color) mb-2">
            Description
          </legend>
          <textarea
            placeholder="Briefly describe your task..."
            className="w-full h-40 outline-none px-5 text-xs border-none rounded resize-none"
          />
        </fieldset>
      </div>
      <div className="mt-10 relative">
        <fieldset className="border border-gray-300 rounded w-full">
          <legend className="ml-5 text-lg text-(--lorem-color)">Tags</legend>
          <div className="flex items-center justify-between h-8 mt-2 mb-4 px-5">
            <div className="flex items-center gap-4 ">
              <span className="bg-(--tags-color) text-white rounded px-4 py-1 text-xs cursor-pointer">
                Urgent
              </span>
              <span className="bg-(--tags-color) text-white rounded px-4 py-1 text-xs cursor-pointer">
                Important
              </span>
            </div>
            <ChevronDown size={30} className="cursor-pointer text-(--tags-color)"/>
          </div>
        </fieldset>
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
