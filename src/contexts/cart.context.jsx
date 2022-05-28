import { createContext, useState, useEffect } from 'react';

const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id);

  if (existingCartItem) {
    return cartItems.map((cartItem) => (
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem)
    )
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
}

const adjustQuantityById = (cartItems, cartItemId, amount) => {
  const existingCartItem = cartItems.find((cartItem) => cartItem.id === cartItemId);

  if (existingCartItem) {
    if (existingCartItem.quantity + amount === 0) {
      return removeCartItem(cartItems, cartItemId);
    }
    return cartItems.map((cartItem) => (
      cartItem.id === cartItemId ? { ...cartItem, quantity: cartItem.quantity + amount } : cartItem
    ))
  }
}

const removeCartItem = (cartItems, cartItemIdToRemove) => {
  return cartItems.filter((cartItem) => cartItem.id !== cartItemIdToRemove);
}

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => { },
  cartItems: [],
  addItemToCart: () => { },
  removeItemFromCart: () => { },
  cartCount: 0,
  cartTotal: 0,
})

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd))
  }

  const adjustCartItemQuantity = (cartItemId, amount) => {
    setCartItems(adjustQuantityById(cartItems, cartItemId, amount))
  }

  const removeItemFromCart = (cartItemIdToRemove) => {
    setCartItems(removeCartItem(cartItems, cartItemIdToRemove))
  }

  useEffect(() => {
    const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
    setCartCount(newCartCount);
  }, [cartItems])

  useEffect(() => {
    const newCartTotal = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0)
    setCartTotal(newCartTotal);
  }, [cartItems])

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    adjustCartItemQuantity,
    removeItemFromCart,
    cartItems,
    cartCount,
    cartTotal
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}