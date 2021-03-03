import React, { useEffect, useState } from "react";
import M from "materialize-css";

const DropdownComponent = () => {
  const [loaded, setLoaded] = useState(false);
  const [category, setCategory] = useState("");

  const options = [
    "Choose your option",
    "Frozen",
    "Produce",
    "Pantry",
    "Personal Care",
  ];

  useEffect(() => {
    M.AutoInit();
  }, []);

  useEffect(() => {
    // API Call mimick
    setTimeout(() => {
      setCategory("Frozen");
      setLoaded(true);
      M.FormSelect.init(document.querySelectorAll("select"));
    }, 1000);
  }, []);

  return (
    <div className="row">
      {loaded && (
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
      )}
    </div>
  );
};

export default DropdownComponent;
