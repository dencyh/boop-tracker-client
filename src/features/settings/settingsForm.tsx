import React, { useContext, useEffect, useState } from "react";
import Button from "../../components/controls/button";
import Input from "../../components/inputs/input";
import ServerMessage from "../../components/ServerMessage";
import { isEqual } from "lodash";
import { Context } from "../..";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { signUpSchema } from "../auth/signUp";

const SettingsForm = () => {
  const { store } = useContext(Context);
  const { user } = store;

  const navigate = useNavigate();

  const [editingPassword, setEditingPassword] = useState(false);

  const [messageVisible, setMessageVisible] = useState(false);

  let initValues = {
    firstName: user?.firstName || "First name",
    lastName: user?.lastName || "Last name",
    email: user?.email || "test@test.com",
    password: "123123Aa",
    confirmPassword: "123123Aa",
    placeholderPassword: "placeholder"
  };

  const [values, setValues] = useState(initValues);
  console.log("password:", values.password);
  console.log("confirmation:", values.confirmPassword);

  const userInfo = [
    {
      name: "firstName",
      type: "text",
      placeholder: "First name",
      label: "First name"
    },
    {
      name: "lastName",
      type: "text",
      placeholder: "Last name",
      label: "Last name"
    },
    {
      name: "email",
      type: "email",
      placeholder: "elon@mars.com",
      label: "Email"
    }
  ];

  const placeholderPass = {
    name: "placeholderPassword",
    type: "password",
    placeholder: "",
    label: "Password"
  };
  const userPassword = [
    {
      name: "password",
      type: "password",
      placeholder: "",
      label: "Password",
      hideShow: true
    },
    {
      name: "confirmPassword",
      type: "password",
      placeholder: "",
      label: "Confirm password",
      hideShow: true
    }
  ];

  const handleChange = ({ name, value }: { name: string; value: string }) => {
    setValues({ ...values, [name]: value });
  };

  const handleEditPassword = () => {
    setValues((state) => ({ ...state, confirmPassword: "", password: "" }));
    setEditingPassword(true);
  };

  const handleCancel = () => {
    navigate("/bugs");
  };

  const [errors, setErrors] = useState({});
  const [submitErrors, setSubmitErrors] = useState(false);
  useEffect(() => {
    validate();
  }, [values]);

  const validate = () => {
    signUpSchema
      .validate(values, { abortEarly: false })
      .then(() => setErrors({}))
      .catch((e) => {
        const { inner } = e;

        const errorsObj = Array.isArray(inner)
          ? inner.reduce((acc, item) => {
              const { path, errors } = item;
              if (!acc[path] && errors.length) {
                acc[path] = errors[0];
              }
              return acc;
            }, {})
          : {};

        console.log(errorsObj);
        setErrors(errorsObj);
      });
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) {
      setSubmitErrors(true);
      return;
    }
    if (isEqual(values, initValues)) return null;

    const { firstName, lastName, email } = values;
    let { password } = values;
    if (!editingPassword) {
      password = "";
    }

    const res = await store.updateUser({
      firstName,
      lastName,
      email,
      password
    });
    setMessageVisible(true);
    setEditingPassword(false);

    initValues = {
      ...values,
      placeholderPassword: "placeholder"
    };
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
                  errorMessage={errors[input.name]}
                  value={values[input.name]}
                  handleChange={handleChange}
                  submitErrors={submitErrors}
                />
              </div>
            ))
          ) : (
            <div className="flex items-center">
              <Input
                {...placeholderPass}
                value={values[placeholderPass.name]}
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
