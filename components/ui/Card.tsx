import React from "react";

type CardProps = {
  children: React.ReactNode;
  className?: string;
  title?: React.ReactNode;
};

export default function Card({ children, className = "", title }: CardProps) {
  return (
    <div
      className={
        "bg-white rounded shadow p-4 transition-all duration-300 hover:shadow-lg " +
        className
      }
    >
      {title ? <div className="text-lg font-medium mb-2">{title}</div> : null}
      <div>{children}</div>
    </div>
  );
}
