import React from "react";

type ProjectItemProps = {
  title: string;
};

const ProjectItem = ({ title }: ProjectItemProps) => {
  return (
    <li className="flex justify-start w-full bg-white p-5 font-medium text-gray-500 border border-r-0 border-gray-200 rounded-l-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 mb-2 ">
      {title}
    </li>
  );
};

export default ProjectItem;
