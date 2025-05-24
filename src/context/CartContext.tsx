import React, { createContext, useReducer, useContext } from "react";

type CartItem = {
  productId: string;
  quantity: number;
  price: number;
  name: string;
  image: string;
};

type CartState = {
  items: CartItem[];
  total: number;
};

type CartAction =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } }
  | { type: "CLEAR_CART" };

const initialState: CartState = {
  items: [],
  total: 0,
};

const CartContext = createContext<{
  items: CartItem[];
  total: number;
  addToCart: (productId: string, quantity: number, productData: { name: string, price: number, image: string }) => void;
  removeFromCart: (productId: string) => void; // 确保是 removeFromCart
  updateQuantity: (productId: string, quantity: number) => void; // 确保是 updateQuantity
  clearCart: () => void;
}>({
    // ... initial values
  items: [],
  total: 0,
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
});

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItem = state.items.find(
        (item) => item.productId === action.payload.productId,
      );
      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.productId === action.payload.productId
              ? { ...item, quantity: item.quantity + action.payload.quantity } // 使用传入的数量增加
              : item,
          ),
          total: state.total + action.payload.price * action.payload.quantity, // 更新总价
        };
      }
      return {
        ...state,
        items: [...state.items, action.payload], // 直接使用传入的 payload，包含用户选择的数量
        total: state.total + action.payload.price * action.payload.quantity, // 更新总价
      };
    }
    case "REMOVE_ITEM":
      const itemToRemove = state.items.find(
        (item) => item.productId === action.payload,
      );
      if (!itemToRemove) return state;
      return {
        ...state,
        items: state.items.filter((item) => item.productId !== action.payload),
        total: state.total - itemToRemove.price * itemToRemove.quantity,
      };
    case "UPDATE_QUANTITY": {
      const item = state.items.find(
        (item) => item.productId === action.payload.id,
      );
      if (!item) return state;
      const delta = action.payload.quantity - item.quantity;
      return {
        ...state,
        items: state.items.map((item) =>
          item.productId === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item,
        ),
        total: state.total + delta * item.price,
      };
    }
    case "CLEAR_CART":
      return {
        ...state,
        items: [],
        total: 0,
      };
    default:
      return state;
  }
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (productId: string, quantity: number, productData: { name: string, price: number, image: string }) => {
    dispatch({
      type: "ADD_ITEM",
      payload: {
        productId,
        quantity,
        price: productData.price,
        name: productData.name,
        image: productData.image, // 使用传入的图片路径
      },
    });
  };

  const removeFromCart = (productId: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: productId });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    dispatch({
      type: "UPDATE_QUANTITY",
      payload: { id: productId, quantity },
    });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        total: state.total,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
