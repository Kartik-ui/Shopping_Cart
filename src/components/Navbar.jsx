import { useEffect, useRef, useState } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { FaAngleDown, FaShoppingCart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { CartState } from 'src/context/Context';

const Navbar = () => {
  const navigate = useNavigate();
  const {
    state: { cart },
    dispatch,
  } = CartState();

  const dropdownRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleClickOutside = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      !event.target.closest('#dropdownDividerButton')
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDropdownToggle = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <nav
      id="navbar"
      className="fixed left-0 right-0 top-0 z-50 bg-blue-500 shadow-lg"
    >
      <div className="mx-4 flex items-center justify-between p-4 md:mx-20">
        <a
          href="/"
          className="text-xl font-semibold text-white transition duration-300 hover:text-yellow-300 md:text-2xl"
        >
          Home
        </a>

        <h1 className="text-xl font-bold text-white transition-colors duration-300 hover:text-yellow-300 md:text-3xl">
          ShopCurse
        </h1>

        <div className="relative">
          <button
            id="dropdownDividerButton"
            onClick={handleDropdownToggle}
            className="flex w-24 items-center gap-2 rounded-lg bg-green-700 px-4 py-2.5 text-center text-xs font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 md:w-28 md:px-5 md:py-2.5 md:text-sm"
          >
            <FaShoppingCart fontSize="1.6rem" />
            <span>{cart.length}</span>
            <FaAngleDown />
          </button>

          {isOpen && (
            <div
              id="dropdownDivider"
              className="absolute right-0 z-10 mt-2 max-h-[86vh] w-80 divide-y divide-gray-100 overflow-y-auto rounded-lg bg-white shadow-lg md:w-96"
              ref={dropdownRef}
            >
              <ul
                className="py-2 text-sm text-gray-700"
                aria-labelledby="dropdownDividerButton"
              >
                {cart?.length > 0 ? (
                  <>
                    {cart?.map((item) => (
                      <span
                        key={item.id}
                        className="mx-3 mb-4 flex items-center justify-between"
                      >
                        <img
                          src={item.image}
                          alt="Product Image"
                          className="h-12 w-12 rounded-full object-cover"
                        />
                        <div className="flex flex-1 flex-col px-3">
                          <span className="font-semibold">{item.title}</span>
                          <span>{String(item.price)?.split('.')?.[0]}</span>
                        </div>
                        <AiFillDelete
                          fontSize="1.25rem"
                          className="cursor-pointer"
                          onClick={() =>
                            dispatch({
                              type: 'REMOVE_FROM_CART',
                              payload: item,
                            })
                          }
                        />
                      </span>
                    ))}
                    <div className="p-2">
                      <button
                        className="w-full rounded-lg bg-blue-700 px-4 py-2 text-white hover:bg-blue-500"
                        onClick={() => navigate('/cart')}
                      >
                        Go To Cart
                      </button>
                    </div>
                  </>
                ) : (
                  <span className="p-3">Cart is Empty!</span>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
