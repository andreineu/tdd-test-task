import React, { ButtonHTMLAttributes } from "react";

import styles from "./Button.module.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  color?: "primary" | "success";
}

export const Button: React.FC<ButtonProps> = ({
  children,
  color = "primary",
  ...props
}) => {
  const classes = [
    styles.button,
    color === "success" ? styles["button-success"] : ""
  ].join(" ");
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};
