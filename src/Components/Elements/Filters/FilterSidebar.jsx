import React from 'react';
import './FilterSidebar.css';

const FilterSidebar = ({ categories, brands, prices, colors, onCategoryChange, onBrandSearch, onPriceChange, onColorSearch }) => {
  // Assume each of these functions are defined to handle the changes and searches
  // You would need to implement the state and functionality in the parent component

  return (
    <div className="filter-sidebar">
      <h2>FILTERS</h2>

      <div className="filter-section">
        <h3>CATEGORIES</h3>
        <ul>
          {categories.map((category) => (
            <li key={category.id}>
              <input 
                type="checkbox" 
                id={category.name} 
                checked={category.checked}
                onChange={() => onCategoryChange(category.id)} />
              <label htmlFor={category.name}>{category.name} ({category.count})</label>
            </li>
          ))}
        </ul>
      </div>

      <div className="filter-section">
        <h3>BRAND</h3>
        <input 
          type="text" 
          placeholder="Search brand" 
          onChange={(e) => onBrandSearch(e.target.value)} 
        />
        <ul>
          {brands.map((brand) => (
            <li key={brand.id}>
              <input 
                type="checkbox" 
                id={brand.name} 
                checked={brand.checked}
                onChange={() => onBrandChange(brand.id)} />
              <label htmlFor={brand.name}>{brand.name} ({brand.count})</label>
            </li>
          ))}
          <li className="more-brands">+ more</li>
        </ul>
      </div>

      <div className="filter-section">
        <h3>PRICE</h3>
        <ul>
          {prices.map((priceRange) => (
            <li key={priceRange.id}>
              <input 
                type="checkbox" 
                id={priceRange.label} 
                checked={priceRange.checked}
                onChange={() => onPriceChange(priceRange.id)} />
              <label htmlFor={priceRange.label}>{priceRange.label}</label>
            </li>
          ))}
        </ul>
      </div>

      <div className="filter-section">
        <h3>COLOR</h3>
        <input 
          type="text" 
          placeholder="Search color" 
          onChange={(e) => onColorSearch(e.target.value)}
        />
        <ul>
          {colors.map((color) => (
            <li key={color.id}>
              <input 
                type="checkbox" 
                id={color.name} 
                checked={color.checked}
                onChange={() => onColorChange(color.id)} />
              <label htmlFor={color.name}>{color.name} ({color.count})</label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FilterSidebar;
