import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="container mx-auto px-6 lg:px-20 py-10">
      <div className="flex flex-col lg:flex-row lg:gap-16 items-center w-full">
        <div className="w-full text-center lg:text-start lg:w-1/2">
          <h1 className="font-medium text-3xl lg:text-4xl">
            Manage your Tasks on
            <span className="text-(--primary-color)">
              <br />
              TaskDuty
            </span>
          </h1>
          <p className="my-6 text-lg text-(--lorem-color)">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Non tellus,
            sapien, morbi ante nunc euismod ac felis ac. Massa et, at platea
            tempus duis non eget. Hendrerit tortor fermentum bibendum mi nisl
            semper porttitor. Nec accumsan
          </p>
          <Link
            to="/my-tasks"
            className="bg-(--primary-color) rounded text-white px-3 py-1"
          >
            Go to my Tasks
          </Link>
        </div>
        <div className="w-full lg:w-1/2">
          <img src="/Component 1.png" alt="" className="w-full mt-10 lg:mt-0" />
        </div>
      </div>
    </div>
  );
}
