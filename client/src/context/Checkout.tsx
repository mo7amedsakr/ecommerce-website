import React, { FC, createContext, useState, useContext } from 'react';
import axios from '../axios';
import { ErrorContext } from './Error';

interface ICheckoutContext {
  addressForm: IAddressForm;
  updateAddressForm: (e: React.ChangeEvent<HTMLInputElement>) => void;
  paymentForm: IPaymentForm;
  updatePaymentForm: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeOrder: () => Promise<void>;
}

interface IAddressForm {
  name: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

interface IPaymentForm {
  cardName: string;
  cardNumber: string;
  expDate: string;
  cvv: string;
  [key: string]: string;
}

const initAddressForm: IAddressForm = {
  name: 'Test User',
  address1: 'Address 1',
  address2: 'Address 2',
  city: 'City',
  state: 'State',
  zip: '12345',
  country: 'Country',
};

const initPaymentForm: IPaymentForm = {
  cardName: 'Test User',
  cardNumber: '1234 4567 1234 4567',
  cvv: '123',
  expDate: '07/22',
};

export const CheckoutContext = createContext<ICheckoutContext>({
  addressForm: initAddressForm,
  updateAddressForm: () => {},
  paymentForm: initPaymentForm,
  updatePaymentForm: () => {},
  placeOrder: async () => {},
});

export const CheckoutProvider: FC = (props) => {
  const [addressForm, setAddressForm] = useState<IAddressForm>(initAddressForm);
  const [paymentForm, setPaymentForm] = useState<IPaymentForm>(initPaymentForm);
  const { setError } = useContext(ErrorContext);

  const updateAddressForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setAddressForm((prev) => {
      return { ...prev, [id]: value };
    });
  };

  const updatePaymentForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setPaymentForm((prev) => {
      return { ...prev, [id]: value };
    });
  };

  const placeOrder = async () => {
    // dummy place order because l'm lazy
    try {
      await axios.delete('/users/carts');
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <CheckoutContext.Provider
      value={{
        addressForm,
        updateAddressForm,
        paymentForm,
        updatePaymentForm,
        placeOrder,
      }}
    >
      {props.children}
    </CheckoutContext.Provider>
  );
};
