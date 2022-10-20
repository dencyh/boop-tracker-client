import React, { FormEvent, useContext, useState } from "react";
import { Context } from "../..";
import Button from "../../components/controls/button";
import Input from "../../components/inputs/input";
import Error from "../../components/misc/error";
import ServerMessage from "../../components/ServerMessage";
import AuthError from "../auth/authError";
import InitialsAvatar from "../bugs/bugInside/initialsAvatar";
import SettingsHeader from "./settingsHeader";
import { isEqual } from "lodash";
import { observer } from "mobx-react-lite";

const Settings = () => {
  const { store } = useContext(Context);
  console.log(store.user);
  const { user } = store;

  const [editingPassword, setEditingPassword] = useState(false);

  const [messageVisible, setMessageVisible] = useState(false);

  const initValues = {
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    password: "placeholder",
    confirmPassword: ""
  };

  const [values, setValues] = useState(initValues);

  const userInfo = [
    {
      name: "firstName",
      type: "text",
      placeholder: "First name",
      errorMessage: "Can not be empty",
      label: "First name",
      required: true
    },
    {
      name: "lastName",
      type: "text",
      placeholder: "Last name",
      errorMessage: "Can not be empty",
      label: "Last name",
      required: true
    },
    {
      name: "email",
      type: "email",
      placeholder: "elon@mars.com",
      errorMessage: "Must be an email",
      label: "Email",
      required: true
    }
  ];

  const userPassword = [
    {
      name: "password",
      type: "password",
      placeholder: "",
      errorMessage:
        "Must be minimum six characters, at least one letter and one number",
      label: "Password",
      pattern: "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{6,}$",
      required: true
    },
    {
      name: "confirmPassword",
      type: "password",
      placeholder: "",
      errorMessage: "Passwords don't match",
      label: "Confirm password",
      pattern: values.password,
      required: true
    }
  ];

  const onChange = (e: FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setValues({ ...values, [target.name]: target.value });
  };

  const handleEditPassword = () => {
    setValues((state) => ({ ...state, password: "" }));
    setEditingPassword(true);
  };

  const handleCancel = () => {};

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEqual(values, initValues)) return null;

    const { firstName, lastName, email, password } = values;
    const res = await store.updateUser({
      firstName,
      lastName,
      email,
      password
    });
    setMessageVisible(true);
    setResponse(res);

    setTimeout(() => setMessageVisible(false), 2000);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [response, setResponse] = useState<any>({});

  return (
    <>
      <div className="relative w-full p-8 px-12">
        <h1 className="mb-4 pb-6 text-2xl font-bold text-gray-600">Settings</h1>
        <SettingsHeader />
        <form className="mt-6" onSubmit={(e) => handleSubmit(e)}>
          <div className="flex flex-wrap">
            {userInfo.map((input) => (
              <div key={input.name} className="mr-12">
                <Input
                  {...input}
                  value={values[input.name]}
                  onChange={onChange}
                />
              </div>
            ))}
          </div>
          <div>
            {editingPassword ? (
              userPassword.map((input) => (
                <div key={input.name} className="mr-12">
                  <Input
                    {...input}
                    value={values[input.name]}
                    onChange={onChange}
                  />
                </div>
              ))
            ) : (
              <div className="flex items-center">
                <Input
                  {...userPassword[0]}
                  value={values[userPassword[0].name]}
                  onChange={onChange}
                  disabled
                />
                <div className="translate-y-1">
                  <Button name="Reset" onClick={handleEditPassword} />
                </div>
              </div>
            )}
          </div>
          <div className="mt-6">
            <Button name="Save" />
            <Button
              onClick={handleCancel}
              name="Cancel"
              color="bg-white ring text-black ring-1 ring-inset ring-gray-300 hover:bg-gray-100"
            />
          </div>
        </form>
        <div>
          {messageVisible && response?.status ? (
            <ServerMessage
              message={response.data?.message}
              status={response.status}
            />
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default observer(Settings);
