import React from "react";

export interface IBaseInput
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  errorMessage?: string;
  serverError?: string;
}
