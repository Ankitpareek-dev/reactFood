import { useEffect, useState } from "react";
import axios from "axios";

const YourOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("http://localhost:5000/orders", {
          withCredentials: true,
        });
        setOrders(res.data);
      } catch (err) {
        console.error("Failed to fetch orders", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 bg-white min-h-screen">
      <h1 className="text-4xl font-bold text-gray-900 mb-10">📦 Your Orders</h1>

      {loading ? (
        <p className="text-gray-500">Loading orders...</p>
      ) : orders.length === 0 ? (
        <p className="text-gray-500">You haven’t placed any orders yet.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order, idx) => (
            <div
              key={idx}
              className="bg-gray-50 border border-gray-200 rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                {/* Left Section */}
                <div className="mb-4 sm:mb-0">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-1">
                    {order.itemName}
                  </h2>
                  <p className="text-sm text-gray-600 max-w-md">
                    {order.itemDescription}
                  </p>
                </div>

                {/* Right Section */}
                <div className="text-right space-y-1 sm:space-y-0">
                  <p className="text-sm text-gray-500">
                    Qty:{" "}
                    <span className="text-gray-800 font-medium">
                      {order.itemQuantity}
                    </span>
                  </p>
                  <p className="text-sm text-gray-500">
                    ₹{order.itemPrice} × {order.itemQuantity}
                  </p>
                  <p className="text-lg font-bold text-gray-900">
                    ₹{order.itemPrice * order.itemQuantity}
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-400">
                  Ordered on:{" "}
                  {new Date(order.createdAt).toLocaleString(undefined, {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </p>
                <span
                  className={`text-xs font-medium px-3 py-1 rounded-full capitalize border ${
                    order.status === "pending"
                      ? "bg-yellow-50 text-yellow-800 border-yellow-200"
                      : order.status === "approved"
                      ? "bg-green-50 text-green-700 border-green-200"
                      : order.status === "completed"
                      ? "bg-blue-50 text-blue-700 border-blue-200"
                      : "bg-red-50 text-red-700 border-red-200"
                  }`}
                >
                  {order.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default YourOrder;
