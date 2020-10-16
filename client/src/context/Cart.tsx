import React, {
  FC,
  createContext,
  useState,
  useContext,
  useCallback,
} from 'react';
import { ErrorContext } from './Error';
import axios from '../axios';

interface ICartContext {
  cart: ICart;
  isLoading: boolean;
  getCart: () => Promise<void>;
  addToCart: (data: IAddToCart) => Promise<void>;
  removeFromCart: (id: string) => Promise<void>;
  updateCartItem: (
    id: string,
    index: number,
    data: IUpdateCartItem
  ) => Promise<void>;
}

export interface ICartItem {
  id: string;
  quantity: number;
  maxquantity: number;
  size: string;
  color: string;
  name: string;
  price: string;
  image: string;
}

interface ICart {
  items: ICartItem[];
  total: number;
  length: number;
}

interface IAddToCart {
  productId: string;
  color: string;
  size: string;
  quantity: number;
}

interface IUpdateCartItem {
  quantity: number;
}

export const CartContext = createContext<ICartContext>({
  cart: { items: [], total: 0, length: 0 },
  isLoading: false,
  getCart: async () => {},
  addToCart: async () => {},
  removeFromCart: async () => {},
  updateCartItem: async () => {},
});

export const CartProvider: FC = (props) => {
  const [cart, setCart] = useState<ICartContext['cart']>({
    items: [],
    total: 0,
    length: 0,
  });
  const [isLoading, setIsLoading] = useState<ICartContext['isLoading']>(false);

  const { setError } = useContext(ErrorContext);

  const getCart = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await axios.get('/users/carts');
      setCart(res.data.data);
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  }, [setError]);

  const addToCart = async (data: IAddToCart) => {
    if (!data.color || !data.size || !data.productId) {
      return setError('Cart item not valid.');
    }
    setIsLoading(true);
    try {
      await axios.post('/users/carts', data);
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromCart = async (id: string) => {
    setIsLoading(true);
    try {
      await axios.delete(`/users/carts/${id}`);
      setCart(({ items, total, length }) => {
        const newItems = items.filter((item) => {
          if (item.id === id) {
            total -= item.quantity * +item.price;
            return false;
          }
          return true;
        });

        return {
          items: newItems,
          length: length - 1,
          total,
        };
      });
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  const updateCartItem = async (
    id: string,
    index: number,
    data: IUpdateCartItem
  ) => {
    if (data.quantity < 1) {
      return setError('Quantity must be at least 1.');
    }
    setIsLoading(true);
    try {
      await axios.patch(`/users/carts/${id}`, data);
      const item = cart.items[index];
      setCart((prev) => {
        prev.total -= item.quantity * +item.price;
        prev.total += data.quantity * +item.price;
        item.quantity = data.quantity;
        return { ...prev };
      });
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        isLoading,
        getCart,
        addToCart,
        removeFromCart,
        updateCartItem,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};
