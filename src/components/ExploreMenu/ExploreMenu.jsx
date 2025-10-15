import React from "react";
import "./ExploreMenu.css";
import MenuList from "../MenuList/MenuList";

const ExploreMenu = ({ category, setCategory }) => {
  return (
    <div className="explore-menu" id="explore-menu">
      <h1>Explore Our Menu</h1>
      {/* <p className="explore-menu-text">
        Choose from a diverse menu featuring a delectable array of dishes. Our
        mission is to satisfy your cravings and elevate your dining experience,
        one delicious meal at a time.
      </p> */}
      <div className="explore-menu-list">
        <MenuList category={category} setCategory={setCategory} />
      </div>
      <hr />
    </div>
  );
};

export default ExploreMenu;
