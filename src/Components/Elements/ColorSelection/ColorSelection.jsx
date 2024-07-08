import React from 'react';
import './ColorSelection.css'; // Ensure you have corresponding CSS for this

const ColorSelection = ({ colors, selectedColor, onSelectColor }) => {
  return (
    <div className="color-selection">
      <h3>Select Color:</h3>
      <div className="color-options">
        {colors.map((color, index) => (
          <div
            key={index}
            className={`color-option ${selectedColor === color ? 'selected' : ''}`}
            style={{ backgroundColor: color }} // Assuming `color` is a string representing the color code
            onClick={() => onSelectColor(color)}
            title={color} // Tooltip showing color name
          ></div>
        ))}
      </div>
    </div>
  );
};

export default ColorSelection;
