/* eslint-disable react/prop-types */
import './ProductsPage.css';

const ProductFilterBar = ({
  selectedCategory,
  setSelectedCategory,
  sortOrder,
  setSortOrder,
}) => {
  const categories = [
    { name: 'All', value: '' },
    { name: "Men's Clothing", value: "men's clothing" },
    { name: "Women's Clothing", value: "women's clothing" },
    { name: 'Jewelery', value: 'jewelery' },
    { name: 'Electronics', value: 'electronics' },
  ];
  const sortOptions = [
    { name: 'Low to High', value: 'asc' },
    { name: 'High to Low', value: 'desc' },
  ];

  const filterByCategory = (category) => {
    setSelectedCategory(category);
  };
  const sortByPrice = (order) => {
    setSortOrder(order);
  };

  return (
    <div className="product_filter_bar">
      <h4 className="category_title">{selectedCategory || 'All'}</h4>
      <div className="categories">
        {categories.map((category) => (
          <button
            key={category.value}
            className={`category_btn ${
              selectedCategory === category.value ? 'active' : ''
            }`}
            onClick={() => filterByCategory(category.value)}
          >
            {category.name}
          </button>
        ))}
      </div>
      <h4 className="sort_title">PRICE</h4>
      <div className="price_sorting_bar">
        {sortOptions.map((option) => (
          <button
            key={option.value}
            className={`sort_by_price_btn ${
              sortOrder === option.value ? 'active' : ''
            }`}
            onClick={() => sortByPrice(option.value)}
          >
            {option.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductFilterBar;
