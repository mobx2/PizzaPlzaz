import React, { useState } from "react";
import { Fab, Grow, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import PhoneIcon from "@mui/icons-material/Phone";

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
    <Stack
      spacing={1}
      sx={{
        position: "fixed",
        bottom: { xs: "30px", sm: "20px" },
        right: "20px",
        zIndex: 1000,
        alignItems: "flex-end",
      }}
    >
      {/* WhatsApp FAB */}
      <Grow in={isOpen} style={{ transformOrigin: "50% 100%" }}>
        <Fab
          size="small"
          color="success"
          aria-label="whatsapp"
          onClick={handleWhatsAppClick}
          sx={{
            display: isOpen ? "flex" : "none",
            bgcolor: "#25D366", // WhatsApp green
            "&:hover": {
              bgcolor: "#128C7E", // Darker WhatsApp green
              transform: "scale(1.1)",
            },
          }}
        >
          <WhatsAppIcon />
        </Fab>
      </Grow>

      {/* Phone FAB */}
      <Grow
        in={isOpen}
        style={{ transformOrigin: "50% 100%" }}
        {...(isOpen ? { timeout: 200 } : {})}
      >
        <Fab
          size="small"
          color="primary"
          aria-label="phone"
          onClick={handlePhoneClick}
          sx={{
            display: isOpen ? "flex" : "none",
            bgcolor: "#2196F3", // Material UI blue
            "&:hover": {
              bgcolor: "#1976D2", // Darker blue
              transform: "scale(1.1)",
            },
          }}
        >
          <PhoneIcon />
        </Fab>
      </Grow>

      {/* Main FAB */}
      <Fab
        aria-label="add"
        onClick={handleMainClick}
        sx={{
          bgcolor: "#ff6347",
          "&:hover": {
            bgcolor: "#FF0000",
            transform: "scale(1.1)",
            transition: "all 0.2s ease-in-out",
          },
        }}
      >
        <AddIcon
          sx={{
            transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
            transition: "transform 0.3s ease-in-out",
          }}
        />
      </Fab>
      <p>
      تواصل معنا
      </p>
    </Stack>
  );
};

export default FloatingActionButton;
