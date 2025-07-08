import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const tabs = [
  { id: "menu", label: "Menu" },
  { id: "active", label: "Active Orders" },
  { id: "all", label: "All Orders" },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("menu");
  const [cuisineData, setCuisineData] = useState([]);
  const [openCategories, setOpenCategories] = useState({});
  const toggleCategory = (categoryId) => {
    setOpenCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  const { restaurantId } = useParams();
  useEffect(() => {
    const getRestaurantData = async () => {
      try {
        const res = await axios.get(BASE_URL + `/feed/view/${restaurantId}`, {
          withCredentials: true,
        });
        setCuisineData(res.data);
      } catch (err) {
        console.error(err.message);
      }
    };
    getRestaurantData();
  }, [restaurantId]);

  return (
    <div
      className="min-h-screen font-sans antialiased bg-[oklch(0.994_0_0)] text-[oklch(0_0_0)]"
      style={{
        fontFamily: '"Plus Jakarta Sans", sans-serif',
        letterSpacing: "-0.025em",
      }}
    >
      {/* Fixed Sidebar */}
      <aside className="fixed top-[6rem] left-0 w-64 h-[calc(100vh-6rem)] p-6 bg-[oklch(0.93_0.0094_286.2156)] rounded-tr-[1.4rem] rounded-br-[1.4rem] shadow-xl z-30">
        <h2 className="text-2xl font-bold mb-10 tracking-tight">Dashboard</h2>
        <nav className="space-y-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full text-left px-5 py-3 rounded-[1.4rem] font-semibold transition-colors text-sm
                ${
                  activeTab === tab.id
                    ? "bg-[oklch(0.5393_0.2713_286.7462)] text-white shadow"
                    : "bg-white text-black border border-[oklch(0.93_0.0094_286.2156)] hover:bg-[oklch(0.95_0_0)]"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main content (left padded for sidebar) */}
      <main className="pl-64 px-4 md:px-8 py-8 mt-16">
        <div className="w-full max-w-7xl mx-auto">
          <div className="bg-white p-8 rounded-[1.4rem] shadow-xl border border-[oklch(0.93_0.0094_286.2156)] min-h-[70vh]">
            <div>
              <h1 className="text-4xl font-extrabold mb-6">Menu</h1>
            </div>
            {activeTab === "menu" &&
              cuisineData.map((cuisine, index) => (
                <div>
                  <div
                    key={index}
                    className="mb-10 p-4 shadow-md rounded-[1.4rem] border border-gray-200 bg-white"
                  >
                    {/* ✅ Improved Minimal Cuisine Title */}
                    <h2 className="text-2xl font-semibold text-gray-800 border-l-4 border-indigo-500 pl-3 mb-6">
                      {cuisine.cuisines}
                    </h2>

                    {cuisine.categories.map((category) => (
                      <div
                        key={category._id}
                        className="mb-6 p-4 shadow-sm rounded-[1rem] border border-gray-200 bg-gray-50"
                      >
                        {/* Toggleable Category Heading */}
                        <button
                          onClick={() => toggleCategory(category._id)}
                          className="flex justify-between items-center w-full text-left px-4 py-2 mb-3 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors duration-200 border border-gray-200"
                        >
                          <span className="text-lg font-semibold text-gray-800 tracking-wide">
                            {category.heading}
                          </span>
                          <span className="text-gray-500 text-sm">
                            {openCategories[category._id] ? "▲" : "▼"}
                          </span>
                        </button>

                        {/* Items with Transition */}
                        <div
                          className={`transition-all duration-300 ease-in-out overflow-hidden ${
                            openCategories[category._id]
                              ? "max-h-[1000px] opacity-100"
                              : "max-h-0 opacity-0"
                          }`}
                        >
                          <div className="grid gap-4 md:grid-cols-2">
                            {category.items.map((item) => (
                              <div
                                key={item._id}
                                className="flex justify-between items-start p-4 border border-gray-200 rounded-xl shadow-sm bg-white"
                              >
                                <div className="">
                                  <h4 className="text-lg font-semibold">
                                    {item.name}
                                  </h4>
                                  <p className="text-sm text-gray-500">
                                    {item.description}
                                  </p>
                                  <p className="mt-1 text-green-600 font-medium">
                                    ₹{item.price}
                                  </p>
                                </div>

                                <div className="flex h-full items-center">
                                  <button
                                    className="px-4 h-8 text-sm font-medium bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 shadow"
                                    onClick={() => {
                                      handleAddToCart({
                                        itemName: item.name,
                                        itemDescription: item.description,
                                        itemPrice: item.price,
                                      });
                                    }}
                                  >
                                    Add +
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            {activeTab === "active" && <div>active tab</div>}
            {activeTab === "all" && (
              <div>
                <h1 className="text-4xl font-extrabold mb-6">All Orders</h1>
                <p className="text-lg text-gray-700">
                  Order history and past deliveries.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
