import React from "react";

export interface IBaseInput
  extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  handleChange: ({ name, value }: { name: string; value: string }) => void;
  label?: string;
  errorMessage?: string;
  serverError?: string;
  hideShow?: boolean;
  submitErrors?: boolean;
}
