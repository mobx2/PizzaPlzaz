import React, { useState } from "react";
import { FaWhatsapp, FaPhone, FaPlus } from "react-icons/fa";
import "./FloatingActionButton.css";

const FloatingActionButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleMainClick = () => {
    setIsOpen(!isOpen);
  };

  const handleWhatsAppClick = (e) => {
    e.stopPropagation();
    window.open("https://wa.me/201060044426", "_blank");
  };

  const handlePhoneClick = (e) => {
    e.stopPropagation();
    window.location.href = "tel:17485";
  };

  return (
    <div className="floating-action-button">
      {/* WhatsApp Button */}
      <div
        className={`fab-button whatsapp ${isOpen ? "show" : ""}`}
        onClick={handleWhatsAppClick}
        title="WhatsApp"
      >
        <FaWhatsapp />
      </div>

      {/* Phone Button */}
      <div
        className={`fab-button phone ${isOpen ? "show" : ""}`}
        onClick={handlePhoneClick}
        title="Call Us"
      >
        <FaPhone />
      </div>

      {/* Main FAB */}
      <div className="fab-button main" onClick={handleMainClick}>
        <FaPlus className={`fab-icon ${isOpen ? "rotated" : ""}`} />
      </div>

      <p className="tawasal">تواصل معنا</p>
    </div>
  );
};

export default FloatingActionButton;
