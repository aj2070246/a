// src/components/Header.js
import { AppBar, Toolbar, Typography, Menu, MenuItem, Button } from "@mui/material";
import { useState } from "react";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null); // برای باز و بسته کردن منو
  const open = Boolean(anchorEl);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget); // باز کردن منو
  };

  const handleMenuClose = () => {
    setAnchorEl(null); // بستن منو
  };

  return (
    <AppBar position="static" sx={{ direction: "rtl" }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          سایت من
        </Typography>
        <Button color="inherit" onClick={handleMenuClick}>
          منو
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <MenuItem onClick={handleMenuClose}>خانه</MenuItem>
          <MenuItem onClick={handleMenuClose}>درباره ما</MenuItem>
          <MenuItem onClick={handleMenuClose}>خدمات</MenuItem>
          <MenuItem onClick={handleMenuClose}>تماس با ما</MenuItem>
          <MenuItem onClick={handleMenuClose}>پروفایل</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;