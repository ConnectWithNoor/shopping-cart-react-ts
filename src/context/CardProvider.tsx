import { Children, createContext, useMemo, useReducer } from 'react';

export type CartItemType = {
  sku: string;
  name: string;
  price: number;
  quantity: number;
};

type CartStateType = {
  cart: CartItemType[];
};

const initCartState: CartStateType = { cart: [] };

const REDUCER_ACTION_TYPE = {
  ADD: 'ADD',
  REMOVE: 'REMOVE',
  QUANTITY: 'QUANTITY',
  SUBMIT: 'SUBMIT',
} as const;

export type ReducerActionType = typeof REDUCER_ACTION_TYPE;
export type ReducerAction = {
  type: keyof ReducerActionType;
  payload?: CartItemType;
};

const reducer = (
  state: CartStateType,
  action: ReducerAction
): CartStateType => {
  switch (action.type) {
    case 'ADD': {
      if (!action.payload)
        throw new Error('Action Payload missing in ADD action');

      const { sku, name, price } = action.payload;
      const filteredCart = state.cart.filter((cart) => cart.sku !== sku);

      const itemExists = state.cart.find((item) => item.sku === sku);
      const quantity = itemExists ? itemExists.quantity + 1 : 1;

      return {
        ...state,
        cart: [...filteredCart, { sku, name, price, quantity }],
      };
    }
    case 'REMOVE': {
      if (!action.payload)
        throw new Error('Action Payload missing in REMOVE action');

      const { sku } = action.payload;
      const filteredCart = state.cart.filter((cart) => cart.sku !== sku);

      return {
        ...state,
        cart: [...filteredCart],
      };
    }
    case 'QUANTITY': {
      if (!action.payload)
        throw new Error('Action Payload missing in QUANTITY action');

      const { sku, quantity } = action.payload;
      const itemExists = state.cart.find((item) => item.sku === sku);

      if (!itemExists)
        throw new Error('Item must exist in order to update the quantity');

      const filteredCart = state.cart.filter((cart) => cart.sku !== sku);

      const updatedItem: CartItemType = {
        ...itemExists,
        quantity,
      };

      return {
        ...state,
        cart: [...filteredCart, updatedItem],
      };
    }
    case 'SUBMIT': {
      return {
        ...state,
        cart: [],
      };
    }

    default:
      return state;
  }
};

const useCardContext = (initCartState: CartStateType) => {
  const [state, dispatch] = useReducer(reducer, initCartState);

  const REDUCER_ACTION = useMemo(() => REDUCER_ACTION_TYPE, []);

  const totalItems = state.cart.reduce(
    (prevValue, cartItem) => prevValue + cartItem.quantity,
    0
  );

  const totalPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(
    state.cart.reduce(
      (prevValue, cartItem) => prevValue + cartItem.price * cartItem.price,
      0
    )
  );

  const cart = state.cart.sort((a, b) => {
    const itemA = Number(a.sku.slice(-4));
    const itemB = Number(b.sku.slice(-4));

    return itemA - itemB;
  });

  return {
    dispatch,
    REDUCER_ACTION,
    totalItems,
    totalPrice,
    cart,
  };
};

export type UseCardContextType = ReturnType<typeof useCardContext>;

const initCartContextState: UseCardContextType = {
  dispatch: () => {},
  REDUCER_ACTION: REDUCER_ACTION_TYPE,
  totalItems: 0,
  totalPrice: '',
  cart: [],
};

export const CartContext =
  createContext<UseCardContextType>(initCartContextState);

type ChildrenType = {
  children?: React.ReactElement | React.ReactElement[];
};

export const CartProvider = ({ children }: ChildrenType) => {
  return (
    <CartContext.Provider value={useCardContext(initCartState)}>
      {children}
    </CartContext.Provider>
  );
};
