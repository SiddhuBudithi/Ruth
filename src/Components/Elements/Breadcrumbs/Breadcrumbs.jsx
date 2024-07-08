import React from 'react';
import { Link } from 'react-router-dom';
import './Breadcrumbs.css';

const Breadcrumbs = ({ categories }) => {
  if (!Array.isArray(categories) || categories.length === 0) {
    return null;
  }

  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        {categories.map((category, index) => (
          <li key={index} className={`breadcrumb-item ${index === categories.length - 1 ? 'active' : ''}`}>
            {index === categories.length - 1 ? (
              category.label
            ) : (
              <Link to={category.path}>{category.label}</Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
