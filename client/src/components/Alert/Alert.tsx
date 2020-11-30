import React, { FC, useContext, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ErrorContext } from '../../context/Error';
import styled from 'styled-components';

export interface AlertProps {}

const Div = styled.div`
  position: fixed;
  top: 5%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${(props) => props.theme.colors.alertError};
  color: ${(props) => props.theme.colors.white};
  z-index: 10;
  font-size: 2rem;
  padding: 1rem;
`;

export const Alert: FC<AlertProps> = (props) => {
  const { error, setError } = useContext(ErrorContext);

  useEffect(() => {
    const time = setTimeout(() => {
      setError(null);
    }, 5000);
    return () => {
      clearTimeout(time);
    };
  }, [error, setError]);

  return createPortal(
    error ? <Div>{error}</Div> : null,
    document.getElementById('portal')!
  );
};
