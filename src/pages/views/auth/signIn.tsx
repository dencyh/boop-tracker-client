import React, { FC, FormEvent, useContext, useState } from "react";
import { Context } from "../../../index";
import { observer } from "mobx-react-lite";

const SignIn: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { store } = useContext(Context);

  const handleSignIn = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    store.signIn(email, password);
  };

  return (
    <div className="flex justify-between items-center container mx-auto max-w-5xl">
      <div className="flex-1 p-10 max-w-lg">
        <form onSubmit={(e) => handleSignIn(e)}>
          <h3 className="text-3xl font-semibold mb-5">Sign in</h3>
          <p className="mb-5">
            New user?{" "}
            <a href="/" className="text-blue-600 dark:text-blue-500 underline">
              Create an account
            </a>
          </p>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Your email
            </label>
            <input
              type="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@flowbite.com"
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <p className="mt-2 text-xs">
              We could not find an account with that email address.{" "}
              <a
                href="/"
                className="text-blue-600 dark:text-blue-500 underline"
              >
                Sign up?
              </a>
            </p>
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Your password
            </label>
            <input
              type="password"
              id="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <p className="mt-2 text-xs text-red-500 dark:text-red-500">
              Wrong password. Try again
            </p>
          </div>
          <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Submit
          </button>
        </form>
      </div>

      <div className="flex-1 text-center max-w-lg p-10">
        <h2 className="text-4xl font-semibold mb-5">Features info</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam
          tempora voluptates facilis quaerat possimus. Beatae magnam nobis totam
          ipsum commodi ipsa tempore, voluptatem quaerat odio culpa praesentium
          perferendis neque a.
        </p>
      </div>
    </div>
  );
};

export default observer(SignIn);
