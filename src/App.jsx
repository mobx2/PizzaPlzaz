import { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Footer from "./components/Footer/Footer";
import LoginPopup from "./components/LoginPopup/LoginPopup";
// import ScrollToTop from "./components/ScrollToTop/ScrollToTop"
import FloatingActionButton from "./components/FloatingActionButton/FloatingActionButton";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import createRtlCache from "./theme/rtl";

// Create rtl cache
const rtlCache = createRtlCache();
// import NavExtras from "./components/NavExtras/NavExtras";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  // Create RTL theme
  const theme = createTheme({
    direction: "rtl",
    // You can add other theme customizations here
  });

  return (
    <CacheProvider value={rtlCache}>
      <ThemeProvider theme={theme}>
        {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}
        <div className="app">
          <Navbar setShowLogin={setShowLogin} />
          {/* <NavExtras /> */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/order" element={<PlaceOrder />} />
          </Routes>
        </div>
        <Footer />
        {/* <ScrollToTop /> */}
        <FloatingActionButton />
      </ThemeProvider>
    </CacheProvider>
  );
};

export default App;
