import { createContext, useState, useEffect } from 'react';

export type ProductType = {
  sku: string;
  name: string;
  price: number;
};

export type ProductStateType = {
  products: ProductType[];
};

type ChildrenType = {
  children?: React.ReactElement | React.ReactElement[];
};

// const initState: ProductType[] = [
//   {
//     sku: 'item0001',
//     name: 'Widget',
//     price: 9.99,
//   },
//   {
//     sku: 'item0002',
//     name: 'Premium Widget',
//     price: 19.99,
//   },
//   {
//     sku: 'item0003',
//     name: 'Deluxe Widget',
//     price: 29.99,
//   },
// ];
const initState: ProductType[] = [];

const initContextState: ProductStateType = { products: [] };

const ProductsContext = createContext<ProductStateType>(initContextState);

export const ProductProvider = ({
  children,
}: ChildrenType): React.ReactElement => {
  const [products, setProducts] = useState<ProductType[]>(initState);

  useEffect(() => {
    const fetchProducts = async (): Promise<ProductType[]> => {
      const data = await fetch('http://localhost:3500/products')
        .then((res) => res.json())
        .catch((err) => {
          if (err instanceof Error) console.error(err);
        });

      return data;
    };

    fetchProducts().then((products) => setProducts(products));
  }, []);

  return (
    <ProductsContext.Provider value={{ products }}>
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsContext;
