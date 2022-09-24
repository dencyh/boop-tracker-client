import {useRef, useState} from "react";
import {useForm, SubmitHandler} from "react-hook-form";
import {FormHeader} from "./formHeader";
import {FormInput} from "./formInput";
import * as yop from "yup";

export interface IFormValues {
  email: string;
  password: string;
}

const errorMessages = {
  email: "Email is required",
};

export function SignUp() {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<IFormValues>();

  const onSubmit: SubmitHandler<IFormValues> = (data) => console.log(data);

  return (
    <div className='flex-1 p-10 max-w-lg'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormHeader />

        <FormInput label='email' register={register} required={true} errors={errors} />
        <FormInput label='password' register={register} />

        <button className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
          Submit
        </button>
      </form>
    </div>
  );
}
