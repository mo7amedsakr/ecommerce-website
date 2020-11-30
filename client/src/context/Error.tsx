import React, {
  FC,
  createContext,
  useState,
  Dispatch,
  SetStateAction,
} from 'react';

interface IErrorContext {
  error: string | null;
  setError: Dispatch<SetStateAction<string | null>>;
}

export const ErrorContext = createContext<IErrorContext>({
  error: null,
  setError: () => {},
});

export const ErrorProvider: FC = (props) => {
  const [error, setError] = useState<string | null>(null);

  return (
    <ErrorContext.Provider value={{ error, setError }}>
      {props.children}
    </ErrorContext.Provider>
  );
};
