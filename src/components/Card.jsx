import Rating from 'src/components/Rating';
import { CartState } from 'src/context/Context';

const Card = ({ product }) => {
  const {
    state: { cart },
    dispatch,
  } = CartState();

  return (
    <div className="flex w-full max-w-sm transform flex-col justify-between rounded-lg border border-gray-200 bg-white shadow-md transition-transform hover:scale-105 hover:border-gray-300 hover:shadow-lg">
      <a href="#">
        <img
          className="h-64 w-full transform rounded-t-lg object-contain p-8 transition-transform hover:scale-110"
          src={product.image}
          alt="product image"
        />
      </a>
      <div className="flex flex-grow flex-col px-5 pb-5">
        <a href="#">
          <h5 className="text-lg font-semibold tracking-tight text-black md:text-xl">
            {product.title}
          </h5>
        </a>
        <div className="mb-5 mt-2.5 flex items-center justify-between">
          <Rating rating={product.rating.rate} />
          <div className="text-sm md:text-base">{product.category}</div>
        </div>

        <div className="mb-5 mt-2.5 flex-grow text-sm text-gray-700 md:text-base">
          {product.description}
        </div>

        <div className="mt-auto flex items-center justify-between">
          <span className="text-2xl font-bold text-black md:text-3xl">
            ${String(product.price)?.split('.')?.[0]}
          </span>
          {cart?.some((item) => item.id === product.id) ? (
            <button
              className="rounded-lg bg-red-700 px-4 py-2.5 text-center text-xs font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 md:px-5 md:py-2.5 md:text-sm"
              onClick={() =>
                dispatch({ type: 'REMOVE_FROM_CART', payload: product })
              }
            >
              Remove from cart
            </button>
          ) : (
            <button
              className="rounded-lg bg-blue-700 px-4 py-2.5 text-center text-xs font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 md:px-5 md:py-2.5 md:text-sm"
              disabled={!product.rating.count}
              onClick={() =>
                dispatch({ type: 'ADD_TO_CART', payload: product })
              }
            >
              Add to cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
