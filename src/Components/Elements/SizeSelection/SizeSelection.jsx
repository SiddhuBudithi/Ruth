import React from "react";
import "./SizeSelection.css";

const SizeSelection = ({ sizes, selectedSize, onSelectSize }) => {
  return (
    <div className="size-selection-container">
      <h3>Select Size:</h3>
      <div className="size-options">
        {sizes.map((size, index) => (
          <button
            key={index}
            className={`size-option ${selectedSize === size ? "selected" : ""}`}
            onClick={() => onSelectSize(size)}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SizeSelection;
