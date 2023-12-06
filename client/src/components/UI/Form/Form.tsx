import React, { ChangeEvent } from 'react';
import Input from '../Input/Input';
import Button from '../Button/Button';
import classes from './Form.module.scss';

interface FormProps {
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  handleSubmit: (event: React.FormEvent) => void;
  title?: string;
  lblTitle?: string;
  btnTitle?: string;
  variant?: 'submit' | 'message';
  inputVariant?: 'submit' | 'message';
}

const Form: React.FC<FormProps> = ({
  handleInputChange,
  value,
  handleSubmit,
  title,
  lblTitle,
  btnTitle,
  variant,
  inputVariant
}) => {
  return (
    <form onSubmit={handleSubmit} className={`${classes.form} ${variant ? classes[variant] : ''}`}>
      <h2>{title}</h2>
      <Input label={lblTitle} type='text' value={value} onChange={handleInputChange} variant={inputVariant} />
      <Button type='submit' variant='submit'>
        {btnTitle}
      </Button>
    </form>
  );
};

export default Form;
