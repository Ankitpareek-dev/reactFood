import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useParams } from "react-router-dom";
import useRestaurantStore from "../utils/restaurantStore";
import axios from "axios";
import useCartStore from "../utils/cartStore";
import useUserStore from "../utils/userStore";

export default function RestaurantPage() {
  const [cuisineData, setCuisineData] = useState([]);
  const [openCategories, setOpenCategories] = useState({});
  const restaurants = useRestaurantStore((state) => state.restaurants);

  const addCart = useCartStore((state) => state.addCart);
  const user = useUserStore((state) => state.user);
  const { restaurantId } = useParams();
  const restaurant = restaurants.find((r) => r._id === restaurantId);

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

  const toggleCategory = (categoryId) => {
    setOpenCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  const handleAddToCart = ({ itemName, itemDescription, itemPrice }) => {
    addCart({
      restaurantId: restaurant._id,
      userId: user.userId,
      itemName: itemName,
      itemDescription: itemDescription,
      itemPrice: itemPrice,
    });
  };

  return (
    <div className="max-w-7xl mx-auto p-6 shadow-md rounded-[1.4rem] border border-gray-200">
      {/* Restaurant Header */}
      <div className="mx-auto max-w-4xl flex flex-col md:flex-row items-center md:items-start gap-6 mb-8 p-6 shadow-md rounded-[1.4rem] border border-gray-200">
        <img
          src={restaurant.photoUrl}
          alt={restaurant.name}
          className="w-48 h-48 object-cover rounded-[1.4rem] shadow-md"
        />
        <div className="text-center md:text-left space-y-2">
          <h1 className="text-3xl font-bold">{restaurant.name}</h1>
          <p className="text-gray-600">
            <span className="font-semibold">Email:</span> {restaurant.email}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Role:</span> {restaurant.role}
          </p>
          <div>
            <span className="font-semibold text-gray-700">Cuisines:</span>
            <ul className="list-disc ml-4 text-gray-600">
              {restaurant.cuisineTitles?.map((cuisine, idx) => (
                <li key={idx}>{cuisine}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Cuisines */}
      {cuisineData.map((cuisine, index) => (
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
                        <h4 className="text-lg font-semibold">{item.name}</h4>
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
      ))}
    </div>
  );
}
