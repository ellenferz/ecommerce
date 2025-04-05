"use client";
import { createContext, useContext, useState, ReactNode, useEffect } from "react";

type CartItem = {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  quantity: number;v
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  finalizePurchase: () => void;
  calculateTotal: () => number;                                                             
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const itemExistente = prev.find((cartItem) => cartItem.id === item.id);
      if (itemExistente) {
        return prev.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + (item.quantity || 1) }
            : cartItem
        );
      } else {
        return [...prev, { ...item, quantity: item.quantity || 1 }];
      }
    });
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) return;
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const finalizePurchase = () => {
    alert("Compra finalizada com sucesso!");
    setCart([]);
    localStorage.removeItem("cart");
  };

  const calculateTotal = () => {
    return parseFloat(
      cart.reduce((total, item) => {
        const itemTotal = (item.price || 0) * (item.quantity || 1);
        return total + itemTotal;
      }, 0).toFixed(2)
    );
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, finalizePurchase, calculateTotal }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("Erro");
  }
  return context;
};

