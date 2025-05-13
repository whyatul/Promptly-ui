"use client";

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  name: string;
}

const Button: React.FC<ButtonProps> = ({ name, className, ...props }) => {
  return (
    <button
      className={`mt-6 px-6 py-3 bg-sky-blue text-white font-semibold rounded-lg shadow-md hover:bg-sky-blue-darker transition-colors duration-200 ${className || ''}`}
      {...props}
    >
      {name}
    </button>
  );
};

export default Button;
