import Card from 'src/components/Card';
import Filter from 'src/components/Filter';
import { CartState } from 'src/context/Context';

const Hero = () => {
  const {
    state: { products },
    productState: { sort, searchQuery, category },
  } = CartState();

  const transformProducts = () => {
    let sortedProducts = products;

    if (sort) {
      sortedProducts = sortedProducts?.sort((a, b) =>
        sort === 'lowToHigh' ? a.price - b.price : b.price - a.price
      );
    }

    if (searchQuery) {
      sortedProducts = sortedProducts?.filter((item) =>
        item.title
          .trim()
          .toLowerCase()
          .includes(searchQuery.toLowerCase().trim())
      );
    }

    if (category && category !== 'All') {
      sortedProducts = sortedProducts?.filter(
        (item) => item.category === category
      );
    }

    return sortedProducts;
  };

  return (
    <section
      id="hero"
      className="mx-4 my-16 flex flex-col gap-4 pt-16 lg:mx-20"
    >
      <Filter />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {transformProducts()?.map((item) => (
          <Card key={item.id} product={item} />
        ))}
      </div>
    </section>
  );
};

export default Hero;
