import { createContext, useReducer } from 'react';
import { createAction } from '../utils/reducer/reducer.utils.js';

const CART_ACTION_TYPES = {
  SET_CART_ITEMS: 'SET_CART_ITEMS',
  SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
}

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
}

const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return { ...state, ...payload };
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return { ...state, isCartOpen: payload }
    default:
      throw new Error(`Unhandled type of ${type} in cartReducer`)
  }
}

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

const adjustQuantityById = (cartItems, { cartItemId, amount }) => {
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
  const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);
  const { isCartOpen, cartItems, cartCount, cartTotal } = state

  const updateCartItemsReducer = (newCartItems) => {
    const newCartCount = newCartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
    const newCartTotal = newCartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0)

    dispatch(
      createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
        cartItems: newCartItems,
        cartTotal: newCartTotal,
        cartCount: newCartCount
      })
    )
  }

  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd)
    updateCartItemsReducer(newCartItems)
  }

  const adjustCartItemQuantity = (cartItemId, amount) => {
    const newCartItems = adjustQuantityById(cartItems, cartItemId, amount)
    updateCartItemsReducer(newCartItems)
  }

  const removeItemFromCart = (cartItemIdToRemove) => {
    const newCartItems = removeCartItem(cartItems, cartItemIdToRemove)
    updateCartItemsReducer(newCartItems)
  }

  const setIsCartOpen = (bool) => {
    createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool)
  }

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