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
  userName: string;
  email: string;
}

export interface IData {
  userName?: string;
  email: string;
  password: string;
  passwordConfirm?: string;
}

interface IAuthContext {
  user: IUser | null;
  setUser: Dispatch<SetStateAction<IUser | null>>;
  toggleAuthModal: () => void;
  isAuthModalOpen: boolean;
  auth: (path: '/login' | '/register', data: IData) => void;
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

  const auth = async (path: '/login' | '/register', data: IData) => {
    setIsLoading(true);
    try {
      const res = await axios.post<IUser>(`/auth${path}`, data);
      const { userName, email } = res.data;
      setUser({ userName, email });
      toggleAuthModal();
    } catch (error) {
      setError(error.response.data);
    } finally {
      setIsLoading(false);
    }
  };

  const getMe = useCallback(async () => {
    try {
      const res = await axios.get<IUser>('/users/get-me');
      const { userName, email } = res.data;
      setUser({ userName, email });
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
