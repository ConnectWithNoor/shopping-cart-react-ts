import { createContext, useState } from 'react';

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

const initState: ProductType[] = [
  {
    sku: 'item0001',
    name: 'Widget',
    price: 9.99,
  },
  {
    sku: 'item0002',
    name: 'Premium Widget',
    price: 19.99,
  },
  {
    sku: 'item0003',
    name: 'Deluxe Widget',
    price: 29.99,
  },
];

const initContextState: ProductStateType = { products: initState };

const ProductsContext = createContext<ProductStateType>(initContextState);

export const ProductProvider = ({
  children,
}: ChildrenType): React.ReactElement => {
  const [products, setProducts] = useState<ProductType[]>(initState);

  return (
    <ProductsContext.Provider value={{ products }}>
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsContext;
