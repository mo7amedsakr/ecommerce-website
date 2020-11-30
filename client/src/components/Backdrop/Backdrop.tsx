import React, { FC, useContext, useRef } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { AuthContext } from '../../context/Auth';

export interface BackdropProps {}

const Div = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: ${(props) => props.theme.colors.backdrop};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Backdrop: FC<BackdropProps> = (props) => {
  const { toggleAuthModal } = useContext(AuthContext);

  const backdropRef = useRef<HTMLDivElement>(null);

  const render = (
    <Div
      ref={backdropRef}
      onClick={(e) => {
        if (e.target !== backdropRef.current) return;
        toggleAuthModal();
      }}
    >
      {props.children}
    </Div>
  );

  return createPortal(render, document.getElementById('portal')!);
};
