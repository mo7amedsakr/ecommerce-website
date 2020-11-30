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
    password: 'Pa$$w0rd',
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
          auth(isLogin ? '/login' : '/register', data);
        }}
      >
        {isLogin ? <Login {...data} /> : <Signup {...data} />}
        <Button.Border
          onClick={toggleAuth}
          disabled={authLodaing}
          type="button"
        >
          {isLogin ? 'Create Account' : 'Login'}
        </Button.Border>
      </Form>
    </Backdrop>
  );
};

interface LoginProps extends IData {}

const Login: FC<LoginProps> = ({ email, password }) => {
  const { authLodaing } = useContext(AuthContext);

  return (
    <>
      <h2>Login</h2>
      <Input
        id="email"
        placeholder="your email"
        type="email"
        defaultValue={email}
        required
      />
      <Input
        id="password"
        placeholder="password"
        type="password"
        defaultValue={password}
        required
      />
      <Button.Full type="submit" disabled={authLodaing}>
        {authLodaing ? 'Loading...' : 'Login'}
      </Button.Full>
    </>
  );
};

interface SignupProps extends IData {}

const Signup: FC<SignupProps> = ({
  userName,
  email,
  password,
  passwordConfirm,
}) => {
  const { authLodaing } = useContext(AuthContext);

  return (
    <>
      <h2>Signup</h2>
      <Input
        id="userName"
        placeholder="your username"
        type="text"
        defaultValue={userName}
        required
      />
      <Input
        id="email"
        placeholder="your email"
        type="email"
        defaultValue={email}
        required
      />
      <Input
        id="password"
        placeholder="password"
        type="password"
        defaultValue={password}
        required
      />
      <Input
        id="passwordConfirm"
        placeholder="password confirm"
        type="password"
        defaultValue={passwordConfirm}
        required
      />
      <Button.Full type="submit" disabled={authLodaing}>
        {authLodaing ? 'Loading...' : 'Signup'}
      </Button.Full>
    </>
  );
};
