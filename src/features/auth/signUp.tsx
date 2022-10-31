import React, { FormEvent, useContext, useEffect, useState } from "react";
import { Context } from "../../index";
import Button from "../../components/controls/button";
import Input from "../../components/inputs/input";
import SignHeader from "./signHeader";
import { SignInInputs } from "./signIn";
import * as yup from "yup";

let signUpSchema = yup.object().shape({
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
  password: yup
    .string()
    .required("Cannot be empty")
    .matches(/[A-Z]+/, "Must have at least one capital letter")
    .matches(/[a-z]+/, "Must have at least one lowercase letter")
    .matches(/\d+/, "Must have at least one number")
    .min(6, "Must be at least 6 characters"),
  email: yup.string().required("Cannot be empty").email("Must be an email"),
  lastName: yup.string().required("Cannot be empty"),
  firstName: yup.string().required("Cannot be empty")
});

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
    },
    {
      name: "password",
      type: "password",
      label: "Password",
      hideShow: true
    },
    {
      name: "confirmPassword",
      type: "password",
      label: "Confirm password",
      hideShow: true
    }
  ];

  const { store } = useContext(Context);
  const [errors, setErrors] = useState({});

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

  const handleChange = ({ name, value }: { name: string; value: string }) => {
    setValues({ ...values, [name]: value });
  };

  const [submitErrors, setSubmitErrors] = useState(false);

  const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) {
      setSubmitErrors(true);
      return;
    }
    const { firstName, lastName, email, password } = values;
    store.signUp(firstName, lastName, email, password);
  };

  return (
    <form onSubmit={(e) => handleSignUp(e)}>
      <SignHeader onSignOption={onSignOption} {...signUpHeader} />
      <div className="mb-6">
        {signUpInputs.map((input: SignUpInputs) => (
          <Input
            key={input.name}
            errorMessage={errors[input.name]}
            {...input}
            value={values[input.name]}
            handleChange={handleChange}
            submitErrors={submitErrors}
          />
        ))}
      </div>
      <Button name="Sumbit" type="submit" />
    </form>
  );
};

export default signUp;
