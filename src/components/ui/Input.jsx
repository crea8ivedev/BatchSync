import React from "react";
import { Field, ErrorMessage, useFormikContext } from "formik";
import { cn } from "../../utils/tailwindMarge/cn";

const Input = ({
  name,
  label,
  type = "text",
  required = false,
  min,
  step,
  placeholder,
  className = "",
  size = "lg",
  ...props
}) => {
  const { setFieldValue, errors, touched } = useFormikContext();

  const handleNumberChange = (e) => {
    const value = e.target.value;

    if (type === "number") {
      if (value === "" || value === "-") {
        setFieldValue(name, "");
        return;
      }
      const numValue = parseFloat(value);
      if (!isNaN(numValue) && numValue >= 0) {
        setFieldValue(name, numValue);
      } else if (numValue < 0) {
        setFieldValue(name, 0);
      }
    } else {
      setFieldValue(name, value);
    }
  };

  const sizeClasses = {
    sm: "px-2 py-1 text-sm",
    md: "px-3 py-2",
    lg: "px-4 py-3 text-lg",
  };

  const hasError = errors[name] && touched[name];
  const inputClasses = cn(
    "w-full border rounded-md focus:outline-none",
    sizeClasses[size],
    hasError ? "border-red-500" : "border-gray-300",
    className
  );

  return (
    <div className="block">
      {label && (
        <label htmlFor={name} className="block mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <Field
        id={name}
        name={name}
        type={type}
        min={min}
        step={step}
        placeholder={placeholder}
        onChange={type === "number" ? handleNumberChange : undefined}
        className={inputClasses}
        {...props}
      />
      <ErrorMessage name={name} component="div" className="text-red-500 text-sm mt-1" />
    </div>
  );
};

export default Input;
