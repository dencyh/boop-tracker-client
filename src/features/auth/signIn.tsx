import React, { FormEvent, useContext, useState } from "react";
import { Context } from "../../index";
import { observer } from "mobx-react-lite";
import SignHeader from "./signHeader";
import Input from "../../components/inputs/input";
import Button from "../../components/controls/button";
import AuthError from "./authError";

interface SignInProps {
  onSignOption: () => void;
}

type SignInValues = {
  email: string;
  password: string;
};

export interface SignInInputs {
  name: keyof SignInValues;
  type: string;
  placeholder?: string;
  errorMessage: string;
  serverError?: string;
  label: string;
  pattern?: string;
  required?: boolean;
  hideShow?: boolean;
}

const signInHeader = {
  header: "Sign in",
  text: "New user?",
  button: "Create an account"
};

const SignIn = ({ onSignOption }: SignInProps) => {
  const { store } = useContext(Context);
  const initialValues = {
    email: "",
    password: ""
  };
  const [values, setValues] = useState<SignInValues>(initialValues);

  const signInInputs: SignInInputs[] = [
    {
      name: "email",
      type: "email",
      placeholder: "elon@mars.com",
      errorMessage: "Must be an email",
      label: "Email"
    },
    {
      name: "password",
      type: "password",
      placeholder: "",
      errorMessage: "Enter password",
      label: "Password",
      hideShow: true
    }
  ];

  const handleChange = ({ name, value }: { name: string; value: string }) => {
    setValues({ ...values, [name]: value });
  };

  const handleSignIn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = values;
    const statusCode = await store.signIn(email, password);
    setResStatus(statusCode);
    setValues(initialValues);
  };

  const [resStatus, setResStatus] = useState<number>(200);

  return (
    <>
      {resStatus === 0 || resStatus >= 400 ? (
        <AuthError status={resStatus as 0} />
      ) : (
        ""
      )}
      <form onSubmit={(e) => handleSignIn(e)}>
        <SignHeader onSignOption={onSignOption} {...signInHeader} />
        <div className="mb-3">
          {signInInputs.map((input) => (
            <Input
              key={input.name}
              {...input}
              handleChange={handleChange}
              value={values[input.name]}
            />
          ))}
        </div>
        <Button name="Sumbit" type="submit" />
      </form>
    </>
  );
};

export default observer(SignIn);
