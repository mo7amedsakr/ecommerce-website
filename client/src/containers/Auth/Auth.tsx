import React, { FC, useState, useContext } from 'react';
import { AuthContext, IData } from '../../context/Auth';
import { Backdrop } from '../../components/Backdrop/Backdrop';
import { Form } from './AuthStyle';
import { Input } from '../../components/Input/Input';
import { Button } from '../../components/Button/Button';

export interface AuthProps {}

export const Auth: FC<AuthProps> = (props) => {
  const { auth, authLodaing } = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(true);
  const [data, setData] = useState<IData>({
    email: 'test@user.com',
    password: 'testuser1234',
  });

  const toggleAuth = () => setIsLogin((prev) => !prev);

  const changeHandler = (e: React.FormEvent<HTMLFormElement>) => {
    if ((e.target as HTMLElement).tagName !== 'INPUT') return;
    const el = e.target as HTMLInputElement;
    setData((prev) => {
      return {
        ...prev,
        [el.id]: el.value,
      };
    });
  };

  return (
    <Backdrop>
      <Form
        onChange={changeHandler}
        onSubmit={(e) => {
          e.preventDefault();
          auth(isLogin ? '/login' : '/signup', data);
        }}
      >
        {isLogin ? <Login /> : <Signup />}
        <Button.Border onClick={toggleAuth} disabled={authLodaing}>
          {isLogin ? 'Create Account' : 'Login'}
        </Button.Border>
      </Form>
    </Backdrop>
  );
};

interface LoginProps {}

const Login: FC<LoginProps> = (props) => {
  const { authLodaing } = useContext(AuthContext);

  return (
    <>
      <h2>Login</h2>
      <Input
        id="email"
        placeholder="your email"
        type="email"
        defaultValue="test@user.com"
      />
      <Input
        id="password"
        placeholder="password"
        type="password"
        defaultValue="testuser1234"
      />
      <Button.Full type="submit" disabled={authLodaing}>
        {authLodaing ? 'Loading...' : 'Login'}
      </Button.Full>
    </>
  );
};

interface SignupProps {}

const Signup: FC<SignupProps> = (props) => {
  const { authLodaing } = useContext(AuthContext);

  return (
    <>
      <h2>Signup</h2>
      <Input id="name" placeholder="your name" type="text" />
      <Input id="email" placeholder="your email" type="email" />
      <Input id="password" placeholder="password" type="password" />
      <Input
        id="passwordConfirm"
        placeholder="password confirm"
        type="password"
      />
      <Button.Full type="submit" disabled={authLodaing}>
        {authLodaing ? 'Loading...' : 'Signup'}
      </Button.Full>
    </>
  );
};
