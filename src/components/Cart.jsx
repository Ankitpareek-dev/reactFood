import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../utils/cartSlice";

function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector((store) => store.cart.items || []);

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="max-w-2xl mx-auto my-10 p-6 bg-white rounded-2xl shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-green-700">🛒 Your Cart</h1>
        <button
          onClick={handleClearCart}
          className="text-sm px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
        >
          Clear Cart
        </button>
      </div>

      {cartItems.length === 0 ? (
        <p className="text-gray-500 text-center">Your cart is empty.</p>
      ) : (
        <ul className="space-y-3">
          {cartItems.map((item, index) => (
            <li
              key={index}
              className="px-5 py-3 bg-green-100 text-green-900 rounded-full shadow-sm text-lg font-medium hover:bg-green-200 transition"
            >
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Cart;
