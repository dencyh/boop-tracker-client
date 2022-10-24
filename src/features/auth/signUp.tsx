import React, { FormEvent, useContext, useRef, useState } from "react";
import { Context } from "../../index";
import Button from "../../components/controls/button";
import Input from "../../components/inputs/input";
import SignHeader from "./signHeader";
import { SignInInputs } from "./signIn";

type SignInProps = {
  onSignOption: () => void;
};

type SignUpValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

interface SignUpInputs extends Omit<SignInInputs, "name"> {
  name: keyof SignUpValues;
}

const signUpHeader = {
  header: "Sign up",
  text: "Already have an account?",
  button: "Sign in"
};

const signUp = ({ onSignOption }: SignInProps) => {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const signUpInputs: SignUpInputs[] = [
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
    },
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
      pattern: values.password
    }
  ];

  const { store } = useContext(Context);

  const handleSignUp = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { firstName, lastName, email, password } = values;
    store.signUp(firstName, lastName, email, password);
  };

  const onChange = (e: FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setValues({ ...values, [target.name]: target.value });
  };

  return (
    <form onSubmit={(e) => handleSignUp(e)}>
      <SignHeader onSignOption={onSignOption} {...signUpHeader} />
      <div className="mb-6">
        {signUpInputs.map((input: SignUpInputs) => (
          <Input
            key={input.name}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}
      </div>
      <Button name="Sumbit" type="submit" />
    </form>
  );
};

export default signUp;
