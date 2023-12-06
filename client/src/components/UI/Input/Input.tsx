import React, { ChangeEvent } from 'react';
import classes from './Input.module.scss';

interface InputProps {
  type: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  className?: string;
  variant?: 'submit' | 'message';
}

const Input: React.FC<InputProps> = ({
  label,
  type,
  value,
  onChange,
  placeholder,
  className,
  variant
}) => {
  return (
    <span className={`${classes.inputWrapper} ${className || ''}`}>
      <label>{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`${classes.input} ${variant ? classes[variant] : ''} ${className || ''}`}
        required
      />
    </span>
  );
};

export default Input;
