import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";

import "./Navbar.css";

const Dropdown = ({
  title,
  items,
  isOpen,
  onOpen,
  onClose,
}) => {
  return (
    <div
      className="nav-dropdown"
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
    >
      <button className="dropdown-btn">
        {title}
        <ChevronDown
          size={16}
          className={isOpen ? "rotate" : ""}
        />
      </button>

      <div
        className={`dropdown-menu ${
          isOpen ? "dropdown-open" : ""
        }`}
      >
        {items.map((item) => (
          <Link
            key={item.title}
            to={item.path}
            className="dropdown-item"
          >
            <h4>{item.title}</h4>
            <p>{item.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};
export default Dropdown;