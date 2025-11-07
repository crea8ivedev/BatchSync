import React from "react";
import { Field, ErrorMessage, useFormikContext } from "formik";
import { cn } from "../../utils/tailwindMarge/cn";

const NumberInput = ({
  name,
  label,
  required = false,
  min = 0,
  step = 1,
  placeholder,
  className = "",
  size = "md",
  ...props
}) => {
  const { setFieldValue, errors, touched } = useFormikContext();

  const handleChange = (e) => {
    const value = e.target.value;

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
  };

  const hasError = errors[name] && touched[name];

  const sizeClasses = {
    sm: "px-2 py-1 text-sm",
    md: "px-3 py-2",
    lg: "px-4 py-3 text-lg",
  };

  const inputClasses = cn(
    "w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",
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
        type="number"
        min={min}
        step={step}
        placeholder={placeholder}
        onChange={handleChange}
        className={inputClasses}
        {...props}
      />
      <ErrorMessage
        name={name}
        component="div"
        className={cn("text-red-500 mt-1", size === "sm" ? "text-xs" : "text-sm")}
      />
    </div>
  );
};

export default NumberInput;
