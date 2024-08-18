import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { CartState } from 'src/context/Context';

const Filter = () => {
  const {
    state: { products },
    productState: { sort, searchQuery, category },
    productDispatch,
    dispatch,
  } = CartState();

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const uniqueCategories = [
      ...new Set(products?.map((item) => item.category)),
    ];
    setCategories(uniqueCategories);
  }, [products]);

  const fetchItems = async () => {
    try {
      let response = await fetch('https://fakestoreapi.com/products');
      response = await response.json();
      dispatch({ type: 'SET_PRODUCTS', payload: response });
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <form className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="flex items-center">
        <input
          type="radio"
          name="lowToHigh"
          id="lowToHigh"
          className="mr-2"
          onChange={() =>
            productDispatch({ type: 'SORT_BY_PRICE', payload: 'lowToHigh' })
          }
          checked={sort === 'lowToHigh'}
        />
        <label htmlFor="lowToHigh" className="text-sm md:text-base">
          Sort Low to High
        </label>
      </div>
      <div className="flex items-center">
        <input
          type="radio"
          name="highToLow"
          id="highToLow"
          className="mr-2"
          onChange={() =>
            productDispatch({ type: 'SORT_BY_PRICE', payload: 'highToLow' })
          }
          checked={sort === 'highToLow'}
        />
        <label htmlFor="highToLow" className="text-sm md:text-base">
          Sort High to Low
        </label>
      </div>
      <div className="w-full md:w-auto">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search..."
          className="w-full rounded-md border border-gray-300 p-2 text-sm md:w-64 md:text-base"
          value={searchQuery}
          onChange={(e) =>
            productDispatch({
              type: 'FILTER_BY_SEARCH',
              payload: e.target.value,
            })
          }
        />
      </div>
      <div>
        <select
          name="category"
          id="category"
          value={category}
          onChange={(e) =>
            productDispatch({
              type: 'FILTER_BY_CATEGORY',
              payload: e.target.value,
            })
          }
          className="w-full rounded-md border border-gray-300 bg-white p-2 text-sm text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 md:w-64 md:text-base"
        >
          <option value="All" defaultChecked>
            All
          </option>
          {categories?.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
      <div>
        <button
          className="rounded-lg bg-blue-700 p-2 text-white hover:bg-blue-500"
          onClick={(e) => {
            e.preventDefault();
            productDispatch({ type: 'CLEAR_FILTERS' });
            fetchItems();
          }}
        >
          Clear Filters
        </button>
      </div>
    </form>
  );
};

export default Filter;
