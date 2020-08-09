import React, { FC } from 'react';
import { Container as MUIContainer } from '@material-ui/core';
import { Container } from './AuthStyle';
import { Input } from '../../components/Input/Input';
import { Button } from '../../components/Button/Button';
import { Link } from 'react-router-dom';

export interface AuthProps {
  Login: FC;
  Signup: FC;
}

const MainAuth: FC = (props) => {
  return (
    <MUIContainer maxWidth="sm">
      <Container
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        {props.children}
      </Container>
    </MUIContainer>
  );
};

export const Auth: AuthProps = {
  Login: (props) => {
    return (
      <MainAuth>
        <h1>Login</h1>

        <Input placeholder="Email" type="email" defaultValue="test@user.com" />
        <Input placeholder="Password" type="password" defaultValue="testuser" />
        <Button.Full>Login</Button.Full>
        <Link to="/signup" type="submit">
          Create Account Signup
        </Link>
      </MainAuth>
    );
  },

  Signup: (props) => {
    return (
      <MainAuth>
        <h1>Signup</h1>
        <Input placeholder="Name" type="text" />
        <Input placeholder="Email" type="email" />
        <Input placeholder="Password" type="password" />
        <Input placeholder="Password Confirm" type="password" />
        <Button.Full>Signup</Button.Full>
        <Link to="/login" type="submit">
          Create Account Login
        </Link>
      </MainAuth>
    );
  },
};
