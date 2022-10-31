import React, { FormEvent, useContext, useState } from "react";
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
        "Must be minimum six characters, at least one capital and one lowercase letter and one number",
      label: "Password",
      pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d\\w\\W]{6,}$",
      required: true,
      hideShow: true
    },
    {
      name: "confirmPassword",
      type: "password",
      placeholder: "",
      errorMessage: "Passwords don't match",
      label: "Confirm password",
      pattern: values.password,
      hideShow: true
    }
  ];

  const { store } = useContext(Context);

  const handleSignUp = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { firstName, lastName, email, password } = values;
    store.signUp(firstName, lastName, email, password);
  };

  const handleChange = ({ name, value }: { name: string; value: string }) => {
    setValues({ ...values, [name]: value });
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
            handleChange={handleChange}
          />
        ))}
      </div>
      <Button name="Sumbit" type="submit" />
    </form>
  );
};

export default signUp;
