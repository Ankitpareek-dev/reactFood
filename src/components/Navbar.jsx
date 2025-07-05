import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import useCartStore from "../utils/cartStore";
import useUserStore from "../utils/userStore"; // <-- make sure this path is correct
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const cart = useCartStore((state) => state.cart);
  const removeCart = useCartStore((state) => state.removeCart);

  const user = useUserStore((state) => state.user);
  const removeUser = useUserStore((state) => state.removeUser);
  const navigate = useNavigate();

  const total = cart.reduce(
    (acc, item) => acc + item.itemPrice * item.itemQuantity,
    0
  );
  const handlePlaceOrder = async (cart) => {
    try {
      const res = await axios.post(BASE_URL + "/order", cart, {
        withCredentials: true,
      });
      alert("order saved ");
      removeCart();
    } catch (err) {
      console.err(err);
    }
  };
  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true }); // 👈 ensure cookie is sent
      removeUser();
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <nav className="w-full flex justify-center px-4 md:px-8 mt-4">
      <div
        className="w-full max-w-7xl py-3 px-6 rounded-[1.4rem] shadow-md border relative"
        style={{
          backgroundColor: "oklch(0.994 0 0)",
          borderColor: "oklch(0.93 0.0094 286.2156)",
        }}
      >
        <div className="flex items-center justify-between relative">
          {/* Logo */}
          <div className="text-xl font-bold" style={{ color: "oklch(0 0 0)" }}>
            🍔 FoodApp
          </div>

          {/* Center Nav Links */}
          <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex space-x-6">
            <Link
              to="/"
              className="text-base font-medium"
              style={{ color: "oklch(0 0 0)" }}
            >
              Home
            </Link>
            <Link
              to="/menu"
              className="text-base font-medium"
              style={{ color: "oklch(0 0 0)" }}
            >
              Menu
            </Link>
            <Link
              to="/contact"
              className="text-base font-medium"
              style={{ color: "oklch(0 0 0)" }}
            >
              Contact
            </Link>
            {user && (
              <>
                <Link
                  to="/yourorders"
                  className="text-base font-medium"
                  style={{ color: "oklch(0 0 0)" }}
                >
                  Your Orders
                </Link>
              </>
            )}
          </div>

          {/* Right Side Controls */}
          <div className="flex items-center gap-6">
            {user && (
              <div className="hidden md:flex flex-col items-end">
                <span
                  className="text-sm font-medium"
                  style={{ color: "oklch(0 0 0)" }}
                >
                  Welcome, {user.name || "User"}
                </span>
                <button
                  onClick={() => {
                    handleLogout();
                  }}
                  className="text-xs font-medium"
                  style={{ color: "oklch(0.75 0.15 25)" }}
                >
                  Logout
                </button>
              </div>
            )}

            {/* Cart Dropdown */}
            <div className="relative">
              <button
                onClick={() => setOpen((prev) => !prev)}
                className="text-base font-medium"
                style={{ color: "oklch(0 0 0)" }}
              >
                🛒 Cart ({cart.length})
              </button>

              {open && (
                <div
                  className={`absolute right-0 mt-2 w-72 rounded-[1rem] shadow-md border z-50 transform transition-all duration-300 ${
                    open
                      ? "opacity-100 scale-100 pointer-events-auto"
                      : "opacity-0 scale-95 pointer-events-none"
                  }`}
                  style={{
                    backgroundColor: "oklch(0.994 0 0)",
                    borderColor: "oklch(0.93 0.0094 286.2156)",
                  }}
                >
                  <div className="max-h-80 overflow-y-auto p-4 space-y-4">
                    {cart.length === 0 ? (
                      <p
                        className="text-sm"
                        style={{ color: "oklch(0 0 0 / 0.6)" }}
                      >
                        Your cart is empty.
                      </p>
                    ) : (
                      cart.map((item, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-start"
                        >
                          <div>
                            <p
                              className="font-semibold"
                              style={{ color: "oklch(0 0 0)" }}
                            >
                              {item.itemName}
                            </p>
                            <p
                              className="text-sm"
                              style={{ color: "oklch(0 0 0 / 0.6)" }}
                            >
                              {item.itemQuantity} × ₹{item.itemPrice}
                            </p>
                          </div>
                          <p
                            className="text-sm font-medium"
                            style={{ color: "oklch(0 0 0)" }}
                          >
                            ₹{item.itemQuantity * item.itemPrice}
                          </p>
                        </div>
                      ))
                    )}
                  </div>

                  {cart.length > 0 && (
                    <>
                      {/* Total */}
                      <div className="border-t px-4 py-3 flex justify-between font-semibold">
                        <span style={{ color: "oklch(0 0 0)" }}>Total</span>
                        <span style={{ color: "oklch(0 0 0)" }}>₹{total}</span>
                      </div>

                      {/* Clear Cart Button */}
                      <div className="border-t px-4 py-3">
                        <button
                          onClick={() => {
                            removeCart();
                            setOpen(false);
                          }}
                          className="text-sm font-medium"
                          style={{
                            color: "oklch(0.75 0.15 25)",
                          }}
                        >
                          Clear Cart
                        </button>
                      </div>

                      {/* Place Order Button */}
                      <div className="border-t px-4 py-3">
                        <button
                          onClick={() => {
                            handlePlaceOrder(cart);
                          }}
                          className="text-sm font-medium w-full py-2 rounded-lg"
                          style={{
                            backgroundColor: "oklch(0.75 0.15 25)",
                            color: "oklch(1 0 0)",
                          }}
                        >
                          Place Order
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
