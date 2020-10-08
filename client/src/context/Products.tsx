import React, {
  FC,
  createContext,
  useState,
  useCallback,
  useContext,
} from 'react';
import axios from '../axios';
import { ErrorContext } from './Error';

interface Products {
  id: string;
  name: string;
  sizes: string[];
  colors: string[];
  images: string[];
  price: string;
  quantity: number;
  description: string;
  slug: string;
  discount_price: string | null;
  collection: 'accessories' | 'footwear' | 'tshirts' | 'pants';
}

export const ProductsContext = createContext<{
  products: { [key: string]: Array<Products> };
  getProducts: (pathname: string) => void;
}>({
  products: {},
  getProducts: async (pathname: string) => {},
});

export const ProductsProvider: FC = (props) => {
  const { setError } = useContext(ErrorContext);

  const [products, setProducts] = useState<{ [key: string]: Array<Products> }>(
    {}
  );

  const getProducts = useCallback(
    async (pathname: string) => {
      const collection = pathname.replace('/', '');
      const url =
        '/products' + (collection !== '' ? '?collection=' + collection : '');
      try {
        const res = await axios.get(url);
        setProducts((prev) => {
          return { ...prev, [pathname]: res.data.data };
        });
      } catch (error) {
        console.log(error.response.data.message);
        setError(error.response.data.message);
      }
    },
    [setError]
  );

  return (
    <ProductsContext.Provider value={{ products, getProducts }}>
      {props.children}
    </ProductsContext.Provider>
  );
};
