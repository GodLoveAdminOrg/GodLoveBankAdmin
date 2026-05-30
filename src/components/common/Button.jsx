import React from "react";

const Button = ({
  children,
  size = "md", // sm | md
  variant = "#631D15", // primary | outline
  startIcon,
  endIcon,
  onClick,
  className = "",
  disabled = false,
  type = "button",
}) => {
  // Size Classes (Bootstrap spacing utilities)
  const sizeClasses = {
    sm: "btn-sm",
    md: "btn-md",
  };

  // Variant Classes (Bootstrap button styles)
  const variantClasses = {
    primary: "btn btn-primary",
    outline: "btn btn-outline-danger",
  };

  return (
    <button
      type={type}
      className={`${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {startIcon && <span className="me-2">{startIcon}</span>}
      {children}
      {endIcon && <span className="ms-2">{endIcon}</span>}
    </button>
  );
};

export default Button;
