import { useEffect, useState } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { toast } from 'react-toastify';
import Rating from 'src/components/Rating';
import { CartState } from 'src/context/Context';

const Cart = () => {
  const {
    state: { cart },
    dispatch,
  } = CartState();

  const [total, setTotal] = useState(0);
  const [discount, setDiscount] = useState('');

  useEffect(() => {
    setTotal(
      cart.reduce(
        (acc, curr) =>
          acc + Number(String(curr.price)?.split('.')?.[0]) * curr.qty,
        0
      )
    );
  }, [cart]);

  return (
    <section
      id="cart"
      className="mx-5 my-16 flex flex-col justify-between gap-4 pt-16 md:flex-row lg:mx-20"
    >
      <div className="w-full">
        <ul className="rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-900">
          {cart?.map((item, index) => (
            <li
              key={item.id}
              className={`grid grid-cols-1 gap-4 rounded-t-lg border-b border-gray-200 p-4 sm:grid-cols-[2fr_1fr] md:grid-cols-[3fr_1fr_1fr_1fr_1fr] ${
                index === cart.length - 1 ? 'rounded-b-lg' : ''
              }`}
            >
              <div className="flex items-center gap-4">
                <img
                  className="h-20 w-20 object-contain"
                  src={item.image}
                  alt="Product Image"
                />
                <span className="text-left">{item.title}</span>
              </div>
              <div className="flex items-center justify-start sm:justify-center">
                ${String(item.price)?.split('.')?.[0]}
              </div>
              <div className="flex items-center justify-start sm:justify-center">
                <Rating rating={item.rating.rate} />
              </div>
              <div className="flex items-center justify-start gap-2 sm:justify-center">
                <button
                  className="rounded-lg bg-red-400 px-4 py-2"
                  onClick={() =>
                    dispatch({ type: 'REDUCE_CART_QTY', payload: item })
                  }
                >
                  -
                </button>
                <span>{item.qty}</span>
                <button
                  className="rounded-lg bg-green-400 px-4 py-2"
                  onClick={() =>
                    dispatch({ type: 'ADD_CART_QTY', payload: item })
                  }
                >
                  +
                </button>
              </div>
              <div className="flex items-center justify-start sm:justify-center">
                <button
                  onClick={() =>
                    dispatch({
                      type: 'REMOVE_FROM_CART',
                      payload: item,
                    })
                  }
                >
                  <AiFillDelete fontSize="1.25rem" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex h-[85vh] w-full flex-col rounded-lg bg-gray-700 p-5 text-white md:w-[50%] lg:w-[30%]">
        <span className="p-5 text-center text-lg font-bold sm:text-xl md:text-2xl">
          Subtotal ({cart.length}) items
        </span>
        <span className="p-4 text-base font-semibold sm:text-lg md:text-xl">
          <label htmlFor="discount">Discount Coupon</label>
          <input
            type="text"
            name="discount"
            id="discount"
            placeholder="Ex- PROFILEFYI"
            className="mt-2 w-full rounded-lg border border-gray-300 p-2 text-black"
            disabled={!cart.length}
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
          />
          {discount === 'PROFILEFYI' ? (
            <span className="mt-2 block text-green-500">
              You got 10% discount!
            </span>
          ) : discount ? (
            <span className="mt-2 block text-red-500">Invalid coupon</span>
          ) : (
            ''
          )}
        </span>
        <span className="p-4 text-base font-semibold sm:text-lg md:text-xl">
          Total:{' '}
          <span className="font-bold">
            $
            {discount === 'PROFILEFYI'
              ? (total - (total * 10) / 100).toFixed(2)
              : total.toFixed(2)}
          </span>
        </span>
        <button
          className="w-full rounded-lg bg-blue-700 px-4 py-2 text-sm text-white hover:bg-blue-500 sm:text-base"
          disabled={cart.length === 0}
          onClick={() => toast.success('Order placed successfully')}
        >
          Proceed to Checkout
        </button>
      </div>
    </section>
  );
};

export default Cart;
