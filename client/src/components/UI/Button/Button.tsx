import React, { ButtonHTMLAttributes } from 'react';
import classes from './Button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: 'submit' | 'message';
}

const Button: React.FC<ButtonProps> = ({ children, className, variant, ...restProps }) => {
  return (
    <button className={`${classes.button} ${variant ? classes[variant] : ''} ${className || ''}`} {...restProps}>
      {children}
    </button>
  );
};

export default Button;