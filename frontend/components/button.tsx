"use client";

import React from "react";

interface BtnProps {
  onClick: () => void;
  children: React.ReactNode;
  classname: string;
}

const Button = ({ onClick, children, classname }: BtnProps) => {
  return (
    <button onClick={onClick} className={classname}>
      {children}
    </button>
  );
};

export default Button;
