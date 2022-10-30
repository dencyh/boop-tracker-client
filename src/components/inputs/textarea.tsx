import React from "react";

interface ITextarea extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  name?: string;
  handleChange: ({ name, value }: { name: string; value: string }) => void;
}

const Textarea = ({ label, name = "", handleChange, ...rest }: ITextarea) => {
  return (
    <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-400">
      {label}
      <textarea
        className="mt-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        {...rest}
        onChange={(e) => handleChange({ name, value: e.target.value })}
      ></textarea>
    </label>
  );
};

export default Textarea;
