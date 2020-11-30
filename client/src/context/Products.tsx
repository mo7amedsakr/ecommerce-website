import React, {
  FC,
  createContext,
  useState,
  useCallback,
  useContext,
} from 'react';
import axios from '../axios';
import { ErrorContext } from './Error';

export interface IProduct {
  id: number;
  name: string;
  sizes: string[];
  colors: string[];
  images: string[];
  price: number;
  quantity: number;
  description: string;
  slug: string;
  collectionName: 'accessories' | 'footwear' | 'tshirts' | 'pants';
}

interface IProductsContext {
  products: IProduct[];
  getProducts: (collection: string, page: number) => Promise<void>;
  isLoading: boolean;
  getProduct: (slug: string) => Promise<void>;
  product: IProduct | null;
}

export const ProductsContext = createContext<IProductsContext>({
  products: [],
  getProducts: async () => {},
  isLoading: true,
  getProduct: async () => {},
  product: null,
});

export const ProductsProvider: FC = (props) => {
  const { setError } = useContext(ErrorContext);
  const [products, setProducts] = useState<IProductsContext['products']>([]);
  const [isLoading, setIsLoading] = useState<IProductsContext['isLoading']>(
    true
  );
  const [product, setProduct] = useState<IProductsContext['product']>(null);

  const getProducts = useCallback(
    async (collection: string, page: number) => {
      setIsLoading(true);
      const params: any = {
        page: page.toString(),
      };
      if (collection !== '' && collection) {
        params.collectionName = collection;
      }
      const searchParams = new URLSearchParams(params).toString();

      try {
        const res = await axios.get('/products?' + searchParams);
        if (page === 1) {
          setProducts(res.data);
        } else {
          setProducts((prev) => [...prev, ...res.data]);
        }
      } catch (error) {
        setError(error?.response?.data ?? 'Somthing went worng.');
      } finally {
        setIsLoading(false);
      }
    },
    [setError]
  );

  const getProduct = useCallback(
    async (slug: string) => {
      setIsLoading(true);
      try {
        const res = await axios.get(`/products/${slug}`);
        setProduct(res.data);
      } catch (error) {
        setError(error?.response?.data ?? 'Somthing went worng!');
      } finally {
        setIsLoading(false);
      }
    },
    [setError]
  );

  return (
    <ProductsContext.Provider
      value={{
        products,
        getProducts,
        isLoading,
        getProduct,
        product,
      }}
    >
      {props.children}
    </ProductsContext.Provider>
  );
};
