import React, { useContext, useState } from "react";
import Button from "../../components/controls/button";
import Input from "../../components/inputs/input";
import ServerMessage from "../../components/ServerMessage";
import { isEqual } from "lodash";
import { Context } from "../..";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";

const SettingsForm = () => {
  const { store } = useContext(Context);
  const { user } = store;

  const navigate = useNavigate();

  const [editingPassword, setEditingPassword] = useState(false);

  const [messageVisible, setMessageVisible] = useState(false);

  let initValues = {
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

  const handleChange = ({ name, value }: { name: string; value: string }) => {
    setValues({ ...values, [name]: value });
  };

  const handleEditPassword = () => {
    setValues((state) => ({ ...state, password: "" }));
    setEditingPassword(true);
  };

  const handleCancel = () => {
    navigate("/bugs");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEqual(values, initValues)) return null;

    const { firstName, lastName, email } = values;
    let { password } = values;
    if (!editingPassword) {
      password = "";
    }
    console.log(password);
    const res = await store.updateUser({
      firstName,
      lastName,
      email,
      password
    });
    setMessageVisible(true);
    setEditingPassword(false);

    initValues = { ...values, password: "placeholder", confirmPassword: "" };
    setValues(initValues);
    setResponse(res);

    setTimeout(() => setMessageVisible(false), 2000);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [response, setResponse] = useState<any>({});
  return (
    <>
      <form className="mt-6" onSubmit={(e) => handleSubmit(e)}>
        <div className="flex flex-wrap">
          {userInfo.map((input) => (
            <div key={input.name} className="mr-12 w-96">
              <Input
                {...input}
                value={values[input.name]}
                handleChange={handleChange}
              />
            </div>
          ))}
        </div>
        <div>
          {editingPassword ? (
            userPassword.map((input) => (
              <div key={input.name} className="mr-12 w-96">
                <Input
                  {...input}
                  value={values[input.name]}
                  handleChange={handleChange}
                />
              </div>
            ))
          ) : (
            <div className="flex items-center">
              <Input
                {...userPassword[0]}
                value={values[userPassword[0].name]}
                handleChange={handleChange}
                disabled
              />
              <div className="ml-4 translate-y-1">
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
    </>
  );
};

export default observer(SettingsForm);
