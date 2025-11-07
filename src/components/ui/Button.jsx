import React from "react";
import { cn } from "../../utils/tailwindMarge/cn";

const Button = ({
  children,
  variant = "primary",
  size = "md",
  type = "button",
  disabled = false,
  onClick,
  className = "",
  fullWidth = false,
  ...props
}) => {
  const baseClasses =
    " rounded-[6px] transition-colors  disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer";

  const variants = {
    primary: " border-secondary border-1 border-solid text-white hover:text-secondary hover:bg-transperent bg-secondary focus:ring-blue-500",
  secondary: "border-[#FFF3D4] border-1 border-solid text-[#FFF3D4] text-yellow-500 hover:border-yellow-500 bg-[#FFF3D4] focus:ring-gray-500 hover:bg-transperent ",
    success: "border-green-600 border-1 border-solid text-white hover:text-green-600 hover:bg-gray-500  bg-green-700 focus:ring-green-500 hover:bg-transperent",
    warning: "border-yellow-500 border-1 border-solid text-white  hover:text-yellow-500 bg-yellow-500 focus:ring-yellow-500 hover:bg-transperent",
    danger: "bg-red-500 text-white hover:bg-red-600 focus:ring-red-500 bg-transperent",
    outline:
      "bg-transparent border-2 border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500",
    ghost: "bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-500",
    link: "bg-transparent text-black hover:text-black hover:no-underline underline focus:ring-blue-500",
  };

  const sizes = {
    sm: "px-2 py-1 text-sm",
    md: "px-8 py-2",
    lg: "px-4 py-3 text-lg",
  };

  const buttonClasses = cn(
    baseClasses,
    variants[variant],
    sizes[size],
    fullWidth && "w-full",
    className
  );

  return (
    <button type={type} disabled={disabled} onClick={onClick} className={buttonClasses} {...props}>
      {children}
    </button>
  );
};

export default Button;
