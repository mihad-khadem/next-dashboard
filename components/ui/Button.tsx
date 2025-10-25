"use client";

import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
};

export default function Button({
  children,
  onClick,
  className = "",
  type = "button",
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={
        "inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 focus:outline-none " +
        className
      }
    >
      {children}
    </button>
  );
}
