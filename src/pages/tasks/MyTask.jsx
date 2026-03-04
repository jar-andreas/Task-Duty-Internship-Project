import { Edit, Plus, Trash2 } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

export default function MyTask() {
  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div className="container mx-auto px-6 lg:px-20 py-10">
      <div className="flex items-center justify-between">
        <h1 className="font-medium text-3xl lg:text-4xl">My Tasks</h1>
        <div className="flex items-center gap-2">
          <Plus size={18} className="text-(--primary-color)" />
          <Link
            to="/new-task"
            className="text-(--primary-color) cursor-pointer font-medium rounded"
          >
            Add New Task
          </Link>
        </div>
      </div>
      <div className="mt-8 border border-gray-300 rounded-lg py-4 px-2 mb-6">
        <div className="flex items-center justify-between">
          <h3 className="text-red-500 font-light">Urgent</h3>
          <div className="flex flex-wrap gap-4 items-center">
            <Link
              to="/edit-task"
              className="flex gap-3 items-center bg-(--primary-color) text-white text-sm cursor-pointer rounded px-4 py-1"
            >
              <Edit size={18} />
              <p className="tracking-wide">Edit</p>
            </Link>
            <div className="flex gap-3 items-center text-(--primary-color) border border-(--primary-color) rounded px-4 py-1 text-sm cursor-pointer">
              <Trash2 size={18} />
              <button className="font-medium">Delete</button>
            </div>
          </div>
        </div>
        <hr className="my-4 border-gray-300" />
        <div className="my-4">
          <h1 className="text-xl font-medium">FinTech Website Update</h1>
          <p className="text-base-content opacity-65 mt-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet quis
            nibh posuere non tempor. Erat mattis gravida pulvinar nibh aliquam
            faucibus et magna. Interdum eu tempus ultricies cras neque mi. Eget
            tellus suspendisse et viverra.
          </p>
        </div>
      </div>
      <div className="mt-8 border border-gray-300 rounded-lg py-4 px-2 mb-6">
        <div className="flex items-center justify-between">
          <h3 className="text-(--important-green) font-light">Important</h3>
          <div className="flex flex-wrap gap-4 items-center">
            <Link
              to="/edit-task"
              className="flex gap-3 items-center bg-(--primary-color) text-white text-sm cursor-pointer rounded px-4 py-1"
            >
              <Edit size={18} />
              <p className="tracking-wide">Edit</p>
            </Link>
            <div className="flex gap-3 items-center text-(--primary-color) border border-(--primary-color) rounded px-4 py-1 text-sm cursor-pointer">
              <Trash2 size={18} />
              <button className="font-medium">Delete</button>
            </div>
          </div>
        </div>
        <hr className="my-4 border-gray-300" />
        <div className="my-4">
          <h1 className="text-xl font-medium">FinTech Website Update</h1>
          <p className="text-base-content opacity-65 mt-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet quis
            nibh posuere non tempor. Erat mattis gravida pulvinar nibh aliquam
            faucibus et magna. Interdum eu tempus ultricies cras neque mi. Eget
            tellus suspendisse et viverra.
          </p>
        </div>
      </div>
      <div className="mt-8 border border-gray-300 rounded-lg py-4 px-2 mb-6">
        <div className="flex items-center justify-between">
          <h3 className="text-red-500 font-light">Urgent</h3>
          <div className="flex flex-wrap gap-4 items-center">
            <Link
              to="/edit-task"
              className="flex gap-3 items-center bg-(--primary-color) text-white text-sm cursor-pointer rounded px-4 py-1"
            >
              <Edit size={18} />
              <p className="tracking-wide">Edit</p>
            </Link>
            <div className="flex gap-3 items-center text-(--primary-color) border border-(--primary-color) rounded px-4 py-1 text-sm cursor-pointer">
              <Trash2 size={18} />
              <button className="font-medium">Delete</button>
            </div>
          </div>
        </div>
        <hr className="my-4 border-gray-300" />
        <div className="my-4">
          <h1 className="text-xl font-medium">FinTech Website Update</h1>
          <p className="text-base-content opacity-65 mt-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet quis
            nibh posuere non tempor. Erat mattis gravida pulvinar nibh aliquam
            faucibus et magna. Interdum eu tempus ultricies cras neque mi. Eget
            tellus suspendisse et viverra.
          </p>
        </div>
      </div>
      <div className="mt-8 border border-gray-300 rounded-lg py-4 px-2 mb-6">
        <div className="flex items-center justify-between">
          <h3 className="text-(--important-green) font-light">Important</h3>
          <div className="flex flex-wrap gap-4 items-center">
            <Link
              to="/edit-task"
              className="flex gap-3 items-center bg-(--primary-color) text-white text-sm cursor-pointer rounded px-4 py-1"
            >
              <Edit size={18} />
              <p className="tracking-wide">Edit</p>
            </Link>
            <div className="flex gap-3 items-center text-(--primary-color) border border-(--primary-color) rounded px-4 py-1 text-sm cursor-pointer">
              <Trash2 size={18} />
              <button className="font-medium">Delete</button>
            </div>
          </div>
        </div>
        <hr className="my-4 border-gray-300" />
        <div className="my-4">
          <h1 className="text-xl font-medium">FinTech Website Update</h1>
          <p className="text-base-content opacity-65 mt-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet quis
            nibh posuere non tempor. Erat mattis gravida pulvinar nibh aliquam
            faucibus et magna. Interdum eu tempus ultricies cras neque mi. Eget
            tellus suspendisse et viverra.
          </p>
        </div>
      </div>
      <button
        onClick={scrollUp}
        className="underline text-(--primary-color) cursor-pointer my-2 text-center w-full"
      >
        Back To Top
      </button>
    </div>
  );
}
