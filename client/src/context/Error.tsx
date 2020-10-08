import React, {
  FC,
  createContext,
  useState,
  Dispatch,
  SetStateAction,
} from 'react';

export const ErrorContext = createContext<{
  error: string | null;
  setError: Dispatch<SetStateAction<string | null>>;
}>({
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
