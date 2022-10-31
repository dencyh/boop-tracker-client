import React, { FormEvent, useContext, useEffect, useState } from "react";
import { Context } from "../../index";
import { observer } from "mobx-react-lite";
import SignHeader from "./signHeader";
import Input from "../../components/inputs/input";
import Button from "../../components/controls/button";
import AuthError from "./authError";
import * as yup from "yup";

let signInSchema = yup.object().shape({
  password: yup.string().required("Cannot be empty"),
  email: yup.string().required("Cannot be empty").email("Must be an email")
});

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
  const [errors, setErrors] = useState({});

  useEffect(() => {
    validate();
  }, [values]);

  const validate = () => {
    signInSchema
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
        setErrors(errorsObj);
        console.log(errorsObj);
      });
    return Object.keys(errors).length === 0;
  };

  const signInInputs: SignInInputs[] = [
    {
      name: "email",
      type: "email",
      placeholder: "elon@mars.com",
      label: "Email"
    },
    {
      name: "password",
      type: "password",
      placeholder: "",
      label: "Password",
      hideShow: true
    }
  ];

  const handleChange = ({ name, value }: { name: string; value: string }) => {
    setValues({ ...values, [name]: value });
  };

  const [submitErrors, setSubmitErrors] = useState(false);

  const handleSignIn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) {
      setSubmitErrors(true);
      return;
    }
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
              errorMessage={errors[input.name]}
              {...input}
              handleChange={handleChange}
              value={values[input.name]}
              submitErrors={submitErrors}
            />
          ))}
        </div>
        <Button name="Sumbit" type="submit" />
      </form>
    </>
  );
};

export default observer(SignIn);
