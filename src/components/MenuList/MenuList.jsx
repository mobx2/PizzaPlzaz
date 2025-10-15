import React from "react";
import "./MenuList.css";
import { menu_list } from "../../assets/assets";

const MenuList = ({ category, setCategory, onItemClick }) => {
  const handleClick = (item) => {
    setCategory((prev) => (prev === item.menu_name ? "All" : item.menu_name));
    if (onItemClick) {
      onItemClick();
    }
  };

  return (
    <div className="menu-list-container">
      {menu_list.map((item, index) => {
        return (
          <div
            key={index}
            className="menu-list-item"
            onClick={() => handleClick(item)}
          >
            <img
              src={item.menu_image}
              className={category === item.menu_name ? "active" : ""}
              alt={item.menu_name}
            />
            <p>{item.menu_name}</p>
          </div>
        );
      })}
    </div>
  );
};

export default MenuList;
