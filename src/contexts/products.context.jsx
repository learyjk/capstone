import PRODUCTS from '../shop-data.json';
import { createContext, useEffect, useState } from "react";

export const ProductsContext = createContext({
  products: [],
  setProducts: () => { }
});

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState(PRODUCTS);
  const value = { products };

  useEffect(() => {

  }, [])

  return (
    <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
  )
}
