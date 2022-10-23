import { ButtonHTMLAttributes } from "react";

export interface IBaseControl
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  name?: string;
  color?: string;
}
