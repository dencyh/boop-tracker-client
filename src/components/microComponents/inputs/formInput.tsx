import { Path, UseFormRegister } from "react-hook-form";
import { IFormValues } from "../../../pages/views/auth/signUp";
import React from "react";

type InputProps = {
  label: Path<IFormValues>;
  register: UseFormRegister<IFormValues>;
  required?: boolean;
  pattern?: any;
  errors?: any;
};
export function FormInput({
  label,
  register,
  required,
  pattern,
  errors
}: InputProps) {
  return (
    <div className="mb-6">
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
        Your {label}
      </label>

      <input
        {...register(label, { required, pattern })}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />

      {/* <span className='text-xs'>{errors.email?.type === "required" && "Email name is required"}</span> */}
    </div>
  );
}
