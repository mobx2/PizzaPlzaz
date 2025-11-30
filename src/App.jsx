import { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Footer from "./components/Footer/Footer";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import AppLoading from "./components/AppLoading/AppLoading";
// import ScrollToTop from "./components/ScrollToTop/ScrollToTop"
import FloatingActionButton from "./components/FloatingActionButton/FloatingActionButton";

// import NavExtras from "./components/NavExtras/NavExtras";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <AppLoading>
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
    </AppLoading>
  );
};

export default App;
