import React, {
  FC,
  useEffect,
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
    setIsLoading(true);
    try {
      const res = await axios.post(`/users${path}`, data);
      const { name, email } = res.data.data;
      setUser({ name, email });
      toggleAuthModal();
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  const getMe = useCallback(async () => {
    try {
      const res = await axios.get('/users/getMe');
      const { name, email } = res.data.data;
      setUser({ name, email });
    } catch (error) {
      // console.log(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getMe();
  }, [getMe]);

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
