import React, { useState } from "react";
import "../styles/Year.css";

export const Year = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [first, setFirst] = useState("");
  
  const options = [
    { value: "option1", label: "2024" },
    { value: "option1", label: "2023" },
    { value: "option2", label: "2022" },
    { value: "option3", label: "2021" },
    { value: "option3", label: "2020" },
    { value: "option3", label: "2019" },
    { value: "option3", label: "2018" },
    { value: "option3", label: "2017" },
    { value: "option3", label: "2016" },
  ];

  const toggleDropdown = () => setIsOpen(!isOpen);
  
  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };
  
  global.years = selectedOption ? selectedOption.label : ""; // Check if selectedOption exists before accessing its label
  console.log(global.years);
  
  return (
    <div>
      <div className="dropdown">
        <button
          className="dropdown__toggle"
          onMouseEnter={() => setIsOpen(true)}
          onClick={toggleDropdown}
        >
          {selectedOption && selectedOption.label ? selectedOption.label : "Year"}
        </button>
        {isOpen && (
          <ul className="dropdown__menu">
            {options.map((option) => (
              <li
                key={option.value}
                className="dropdown__menu-item"
                onClick={() => handleOptionClick(option)}
              >
                <span>{option.label}</span>
                <span className="dropdown__menu-item-description">
                  {option.description}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
