import { ButtonHTMLAttributes } from "react";

export interface BaseControl
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  name?: string;
}
