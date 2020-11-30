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
  removeFromCart: (id: number) => Promise<void>;
  updateCartItem: (
    id: number,
    index: number,
    data: IUpdateCartItem
  ) => Promise<void>;
}

interface ICartItemProduct {
  name: string;
  slug: string;
  price: number;
  image: string;
  quantity: number;
}

export interface ICartItem {
  id: number;
  quantity: number;
  size: string;
  color: string;
  product: ICartItemProduct;
}

interface ICart {
  items: ICartItem[];
  totalPrice: number;
  length: number;
}

interface IAddToCart {
  productId: number;
  color: string;
  size: string;
}

interface IUpdateCartItem {
  quantity: number;
}

export const CartContext = createContext<ICartContext>({
  cart: { items: [], totalPrice: 0, length: 0 },
  isLoading: false,
  getCart: async () => {},
  addToCart: async () => {},
  removeFromCart: async () => {},
  updateCartItem: async () => {},
});

export const CartProvider: FC = (props) => {
  const [cart, setCart] = useState<ICartContext['cart']>({
    items: [],
    totalPrice: 0,
    length: 0,
  });
  const [isLoading, setIsLoading] = useState<ICartContext['isLoading']>(false);

  const { setError } = useContext(ErrorContext);

  const getCart = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await axios.get('/carts');
      setCart({ ...res.data, length: res.data.items.length });
    } catch (error) {
      setError(error.response.data);
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
      await axios.post('/carts/add-to-cart', data);
    } catch (error) {
      setError(error.response.data);
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromCart = async (id: number) => {
    setIsLoading(true);
    try {
      await axios.delete(`/carts/item/${id}`);
      setCart(({ items, totalPrice, length }) => {
        const newItems = items.filter((item) => {
          if (item.id === id) {
            totalPrice -= item.quantity * +item.product.price;
            return false;
          }
          return true;
        });

        return {
          items: newItems,
          length: length - 1,
          totalPrice,
        };
      });
    } catch (error) {
      setError(error.response.data);
    } finally {
      setIsLoading(false);
    }
  };

  const updateCartItem = async (
    id: number,
    index: number,
    data: IUpdateCartItem
  ) => {
    if (data.quantity < 1) {
      return setError('Quantity must be at least 1.');
    }
    setIsLoading(true);
    try {
      await axios.patch(`/carts/item/${id}`, data);
      const item = cart.items[index];
      setCart((prev) => {
        prev.totalPrice -= item.quantity * +item.product.price;
        prev.totalPrice += data.quantity * +item.product.price;
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
