import React from "react";

type FormInputProps = {
  name: string;
  inputType: string;
  label: string | React.ReactNode;
  value: string;
  error: string | null;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
};

export const FormInput = ({
  name,
  inputType,
  label,
  value,
  error,
  onChange,
  className,
}: FormInputProps) => {
  return (
    <div className="flex flex-col">
      <label
        htmlFor={name}
        className={`block text-sm font-medium text-gray-700 dark:text-w mb-1 ${className}`}
      >
        {label}
      </label>
      <input
        type={inputType}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
      />
      {error && <div className="mt-1 text-sm text-red-600"> {error}</div>}
    </div>
  );
};
