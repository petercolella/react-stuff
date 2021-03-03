import React, { useEffect } from "react";
import M from "materialize-css";

const DropdownComponent = ({ category }) => {
  useEffect(() => {
    M.AutoInit();
  }, []);

  const options = [
    "Choose your option",
    "Frozen",
    "Produce",
    "Pantry",
    "Personal Care",
  ];

  return (
    <div className="row">
      <div className="input-field col s12">
        <select defaultValue={category || "Choose your option"}>
          {options.map((option) => {
            return (
              <option key={option} value={option}>
                {option}
              </option>
            );
          })}
        </select>
        <label>Category</label>
      </div>
    </div>
  );
};

export default DropdownComponent;
