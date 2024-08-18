import { createContext, useContext, useEffect, useReducer } from 'react';
import { toast } from 'react-toastify';
import { cartReducer, productReducer } from 'src/context/Reducer';

const Cart = createContext();

const Context = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    products: [],
    cart: [],
  });

  const [productState, productDispatch] = useReducer(productReducer, {
    searchQuery: '',
  });

  useEffect(() => {
    const fetchItems = async () => {
      try {
        let response = await fetch('https://fakestoreapi.com/products');
        response = await response.json();
        dispatch({ type: 'SET_PRODUCTS', payload: response });
      } catch (error) {
        toast.error(error.message);
      }
    };
    fetchItems();
  }, []);

  return (
    <Cart.Provider value={{ state, dispatch, productState, productDispatch }}>
      {children}
    </Cart.Provider>
  );
};

export const CartState = () => {
  return useContext(Cart);
};

export default Context;
