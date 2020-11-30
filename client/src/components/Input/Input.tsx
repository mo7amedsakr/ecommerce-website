import React, { FC } from 'react';
import styled from 'styled-components';

import { Button } from '../Button/Button';

export interface InputFormProps {
  type: 'email' | 'text';
  placeholder: string;
  label: string;
}

export const Input = styled.input`
  padding: 1rem;
  background-color: ${(props) => props.theme.colors.lightGray};
  &::placeholder {
    text-transform: capitalize;
  }
`;

export const InputForm: FC<InputFormProps> = (props) => {
  return (
    <form style={{ display: 'felx' }}>
      <Input type={props.type} placeholder={props.placeholder} />
      <Button.Full type="submit">{props.label}</Button.Full>
    </form>
  );
};
