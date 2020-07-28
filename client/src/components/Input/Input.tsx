import React, { FC } from 'react';
import { Form } from './InputStyle';
import { Button } from '../Button/Button';

export interface InputProps {
  type: 'email' | 'text';
  placeholder: string;
  label: string;
}

export const Input: FC<InputProps> = (props) => {
  return (
    <Form>
      <input type={props.type} placeholder={props.placeholder} />
      <Button.Full type="submit">{props.label}</Button.Full>
    </Form>
  );
};
