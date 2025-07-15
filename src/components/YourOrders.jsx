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

  const getStatusClass = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-50 text-yellow-700 border-yellow-300";
      case "approved":
        return "bg-green-50 text-green-700 border-green-300";
      case "completed":
        return "bg-blue-50 text-blue-700 border-blue-300";
      case "cancelled":
        return "bg-red-50 text-red-700 border-red-300";
      default:
        return "bg-gray-50 text-gray-500 border-gray-300";
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-20 px-6 py-12 bg-white min-h-screen">
      <h1 className="text-4xl font-extrabold mb-6">Your Orders</h1>

      {loading ? (
        <p className="text-gray-500">Loading orders...</p>
      ) : orders.length === 0 ? (
        <p className="text-lg text-gray-600">
          You haven’t placed any orders yet.
        </p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="p-5 rounded-xl border border-gray-200 shadow bg-white"
            >
              <div className="flex justify-between mb-3">
                <h3 className="text-xl font-semibold text-gray-800">
                  Order ({order.items.length} item
                  {order.items.length > 1 ? "s" : ""})
                </h3>
                <span className="text-sm text-gray-500">
                  {new Date(order.createdAt).toLocaleString()}
                </span>
              </div>

              <div className="space-y-2">
                {order.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center bg-gray-50 p-3 rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-gray-700">
                        {item.itemName}
                      </p>
                      <p className="text-sm text-gray-500">
                        {item.itemDescription}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">
                        Qty: {item.itemQuantity}
                      </p>
                      <p className="text-green-700 font-semibold">
                        ₹{item.itemPrice}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center mt-4">
                <div className="font-bold text-green-800">
                  Total: ₹
                  {order.items.reduce(
                    (sum, i) => sum + i.itemPrice * i.itemQuantity,
                    0
                  )}
                </div>

                <span
                  className={`text-xs font-medium px-3 py-1 rounded-full border ${getStatusClass(
                    order.status
                  )}`}
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
