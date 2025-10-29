import React, { useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";

export const deliveryFee = 2;

const Cart = () => {
  const {
    cartItems,
    food_list,
    removeFromCart,
    getTotalCartAmount,
    getTotalQuantity,
  } = useContext(StoreContext);
  const totalQuantity = getTotalQuantity();
  const navigate = useNavigate();

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title cart-heading">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {totalQuantity === 0 ? (
          <p className="NoItems">No Items in cart</p>
        ) : (
          food_list
            .map((item, index) => {
              // Check if this item exists in cart with any size
              const cartEntries = Object.entries(cartItems).filter(
                ([cartKey, quantity]) => {
                  const [itemId] = cartKey.split("_");
                  return itemId === item._id && quantity > 0;
                }
              );

              if (cartEntries.length > 0) {
                return cartEntries.map(([cartKey, quantity]) => {
                  const [itemId, size] = cartKey.split("_");
                  let itemPrice = item.price;

                  // Calculate price with size
                  if (item.sizes && Array.isArray(item.sizes)) {
                    const sizeOption = item.sizes.find((s) => s.size === size);
                    if (sizeOption) {
                      itemPrice += sizeOption.price;
                    }
                  }

                  return (
                    <React.Fragment key={cartKey}>
                      <div
                        className="cart-items-title cart-items-item"
                        key={cartKey}
                      >
                        <img src={item.image} alt="food img" />
                        <p>{item.name}</p>
                        <p>{itemPrice} ج.م</p>
                        <p>{quantity}</p>
                        <p>{itemPrice * quantity} ج.م</p>
                        <p
                          className="Remove"
                          onClick={() => removeFromCart(item._id, size)}
                        >
                          <img
                            src={assets.remove_icon_cross}
                            alt="remove_icon_cross"
                          />
                        </p>
                      </div>
                      <hr key={`hr-${cartKey}`} />
                    </React.Fragment>
                  );
                });
              }
              return null;
            })
            .flat()
            .filter(Boolean)
        )}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>{getTotalCartAmount()} ج.م</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Free</p>
              <p>{getTotalCartAmount() === 0 ? 0 : deliveryFee} ج.م</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>
                {getTotalCartAmount() === 0
                  ? 0
                  : getTotalCartAmount() + deliveryFee}{" "}
                ج.م
              </b>
            </div>
          </div>
          <button
            disabled={getTotalCartAmount() === 0}
            onClick={() => navigate("/order")}
          >
            PROCEED TO CHECKOUT
          </button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>If you have a promocode, Enter it here</p>
            <div className="cart-promocode-input">
              <input
                type="text"
                placeholder="Promo Code"
                aria-label="Enter promo code"
                className="promocode-text-input"
              />
              <button
                aria-label="Apply promo code"
                className="promocode-submit-button"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
