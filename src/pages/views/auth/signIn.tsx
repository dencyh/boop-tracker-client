import React, { FC, FormEvent, useContext, useEffect, useState } from "react";
import { Context } from "../../../index";
import { observer } from "mobx-react-lite";
import SignHeader from "./signHeader";
import Input from "../../../components/inputs/input";
import Button from "../../../components/controls/button";

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
}

const SignIn = ({ onSignOption }: SignInProps) => {
  const { store } = useContext(Context);
  const [values, setValues] = useState<SignInValues>({
    email: "",
    password: ""
  });

  const signInInputs: SignInInputs[] = [
    {
      name: "email",
      type: "email",
      placeholder: "elon@mars.com",
      errorMessage: "Must be an email",
      serverError: "",
      label: "Email"
    },
    {
      name: "password",
      type: "password",
      placeholder: "",
      serverError: "",
      errorMessage: "Passwrod should be at least 6 characters",
      label: "Password"
    }
  ];
  const [inputs, setInputs] = useState(signInInputs);

  const onChange = (e: FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setValues({ ...values, [target.name]: target.value });
  };

  const handleSignIn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = values;
    const response = await store.signIn(email, password);
    if (response === "email not found") {
      setResError("email");
    } else if (response === "wrong password") {
      setResError("password");
    } else {
      setResError("other");
    }
  };

  const [resError, setResError] = useState<string>("");
  const serverErrors = {
    email: "Couldn't find an account matching the email",
    password: "Wrong password",
    other: "Something went wrong. Try again"
  };

  useEffect(() => {
    console.log(resError);
    setInputs(
      signInInputs.map((input) =>
        input.name === resError
          ? { ...input, serverError: serverErrors[resError] }
          : input
      )
    );
  }, [resError]);

  return (
    <form onSubmit={(e) => handleSignIn(e)}>
      <SignHeader onSignOption={onSignOption} />
      <div className="mb-3">
        {inputs.map((input) => (
          <Input
            key={input.name}
            {...input}
            onChange={onChange}
            value={values[input.name]}
          />
        ))}
      </div>
      <Button name="Sumbit" type="submit" />
      {resError === "other" ? (
        <p className="mt-4 text-xs text-red-600">{serverErrors[resError]}</p>
      ) : (
        ""
      )}
    </form>
  );
};

export default observer(SignIn);
