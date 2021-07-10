import React from "react";

export default function DetailBoxMovie(props) {
  const { detail } = props;
  return (
    <div className="flex flex-col bg-gray-200 rounded-lg ring ring-black dark:bg-gray-900 dark:ring-gray-800 p-2 sm:p-4 lg:p-6">
      <div className="flex">
        <span className=" sm:w-2/12">Title</span>
        <span>:</span>
        <span className="sm:ml-2 sm:w-7/12 uppercase">
          {detail.title || detail.name}
        </span>
      </div>
      <div className="flex">
        <span className=" sm:w-2/12">Original Title</span>
        <span>:</span>
        <span className="sm:ml-2 sm:w-7/12 uppercase">
          {detail.original_title || detail.original_name}
        </span>
      </div>
      <div className="flex">
        <span className=" sm:w-2/12">Genres</span>
        <span>:</span>
        <span className="sm:ml-2 sm:w-7/12 text-gray-500">
          {detail.genres.map((genre) => genre.name).join(", ")}
        </span>
      </div>
      <div className="flex">
        <span className=" sm:w-2/12">Realease On</span>
        <span>:</span>
        <span className="sm:ml-2 sm:w-7/12">Scarlet Nexus</span>
      </div>
    </div>
  );
}
