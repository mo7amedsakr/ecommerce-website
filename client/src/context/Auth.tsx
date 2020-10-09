import React, {
  FC,
  useContext,
  useCallback,
  createContext,
  useState,
  Dispatch,
  SetStateAction,
} from 'react';

import { ErrorContext } from './Error';

import axios from '../axios';

interface IUser {
  name: string;
  email: string;
}

export interface IData {
  name?: string;
  email: string;
  password: string;
  passwordConfirm?: string;
}

interface IAuthContext {
  user: IUser | null;
  setUser: Dispatch<SetStateAction<IUser | null>>;
  toggleAuthModal: () => void;
  isAuthModalOpen: boolean;
  auth: (path: '/login' | '/signup', data: IData) => void;
  getMe: () => void;
  authLodaing: boolean;
}

export const AuthContext = createContext<IAuthContext>({
  user: null,
  setUser: () => {},
  toggleAuthModal: () => {},
  isAuthModalOpen: false,
  auth: () => {},
  getMe: () => {},
  authLodaing: true,
});

export const AuthProvider: FC = (props) => {
  const { setError } = useContext(ErrorContext);

  const [user, setUser] = useState<IUser | null>(null);
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const toggleAuthModal = () => setShow((prev) => !prev);

  const auth = async (path: '/login' | '/signup', data: IData) => {
    try {
      setIsLoading(true);
      const res = await axios.post(`/users${path}`, data);
      const { name, email } = res.data.data;
      setUser({ name, email });
      toggleAuthModal();
      setIsLoading(false);
    } catch (error) {
      setError(error.response.data.message);
      setIsLoading(false);
      console.log(error.response.data.message);
    }
  };

  const getMe = useCallback(async () => {
    try {
      const res = await axios.get('/users/getMe');
      const { name, email } = res.data.data;
      setUser({ name, email });
      setIsLoading(false);
    } catch (error) {
      // setError(error.response.data.message);
      setIsLoading(false);
      console.log(error.response.data.message);
    }
  }, [setError]);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        toggleAuthModal,
        isAuthModalOpen: show,
        auth,
        getMe,
        authLodaing: isLoading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
