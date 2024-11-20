import { useState, useEffect } from 'react';
import { addToLocalStorage, getFromLocalStorage } from '../utils/localStorage';

export const useCart = () => {
  const [cart, setCart] = useState(getFromLocalStorage('cart') || []);

  useEffect(() => {
    addToLocalStorage('cart', cart);
  }, [cart]);

  const addToCart = (product) => {
    const newCart = [...cart, { ...product, quantity: 1 }];
    setCart(newCart);
  };

  const removeFromCart = (id) => {
    const newCart = cart.filter(product => product.id !== id);
    setCart(newCart);
  };

  const updateQuantity = (id, quantity) => {
    const newCart = cart.map(product =>
      product.id === id ? { ...product, quantity } : product
    );
    setCart(newCart);
  };

  const clearCart = () => setCart([]);

  const totalPrice = cart.reduce((total, product) => total + (product.price * product.quantity), 0);

  return { cart, addToCart, removeFromCart, updateQuantity, clearCart, totalPrice };
};
