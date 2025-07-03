// SignupRestaurant.jsx
import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../utils/constants";

export default function SignupRestaurant() {
  const [restaurant, setRestaurant] = useState({
    name: "",
    email: "",
    password: "",
    cuisines: [],
  });
  console.log(restaurant);
  const handleAddCuisine = () => {
    setRestaurant((prev) => ({
      ...prev,
      cuisines: [...prev.cuisines, { cuisine: "", categories: [] }],
    }));
  };

  const handleChange = (e) => {
    setRestaurant({ ...restaurant, [e.target.name]: e.target.value });
  };

  const handleCuisineChange = (index, value) => {
    const updated = [...restaurant.cuisines];
    updated[index].cuisine = value;
    setRestaurant({ ...restaurant, cuisines: updated });
  };

  const handleAddCategory = (cuisineIndex) => {
    const updated = [...restaurant.cuisines];
    updated[cuisineIndex].categories.push({ heading: "", items: [] });
    setRestaurant({ ...restaurant, cuisines: updated });
  };

  const handleCategoryChange = (cuisineIndex, categoryIndex, value) => {
    const updated = [...restaurant.cuisines];
    updated[cuisineIndex].categories[categoryIndex].heading = value;
    setRestaurant({ ...restaurant, cuisines: updated });
  };

  const handleAddItem = (cuisineIndex, categoryIndex) => {
    const updated = [...restaurant.cuisines];
    updated[cuisineIndex].categories[categoryIndex].items.push({
      name: "",
      description: "",
      price: 0,
    });
    setRestaurant({ ...restaurant, cuisines: updated });
  };

  const handleItemChange = (ci, catI, itemI, field, value) => {
    const updated = [...restaurant.cuisines];
    updated[ci].categories[catI].items[itemI][field] =
      field === "price" ? +value : value;
    setRestaurant({ ...restaurant, cuisines: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        BASE_URL + "/signup/restaurant",
        restaurant,
        { withCredentials: true }
      );

      console.log(res);
    } catch (err) {
      console.error("Error submitting:", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 max-w-5xl mx-auto space-y-10 bg-white shadow-xl rounded-2xl mt-10"
    >
      <div className="space-y-4">
        <h1 className="text-2xl font-bold text-gray-800">
          Register Restaurant
        </h1>
        <input
          name="name"
          value={restaurant.name}
          onChange={handleChange}
          placeholder="Restaurant Name"
          className="w-full p-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm"
        />
        <input
          name="email"
          value={restaurant.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full p-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm"
        />
        <input
          name="password"
          value={restaurant.password}
          onChange={handleChange}
          placeholder="Password"
          type="password"
          className="w-full p-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm"
        />
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-700">Cuisines</h2>
          <button
            type="button"
            onClick={handleAddCuisine}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl text-sm"
          >
            + Add Cuisine
          </button>
        </div>

        {restaurant.cuisines.map((cuisine, ci) => (
          <div key={ci} className="border p-4 rounded-xl bg-gray-50 space-y-4">
            <input
              value={cuisine.cuisine}
              onChange={(e) => handleCuisineChange(ci, e.target.value)}
              placeholder="Cuisine Type (e.g., Italian)"
              className="w-full p-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm"
            />
            <button
              type="button"
              onClick={() => handleAddCategory(ci)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-xl text-xs"
            >
              + Add Category
            </button>

            {cuisine.categories.map((cat, catI) => (
              <div key={catI} className="pl-4 space-y-3">
                <input
                  value={cat.heading}
                  onChange={(e) =>
                    handleCategoryChange(ci, catI, e.target.value)
                  }
                  placeholder="Category Heading"
                  className="w-full p-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm"
                />

                <button
                  type="button"
                  onClick={() => handleAddItem(ci, catI)}
                  className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-xl text-xs"
                >
                  + Add Item
                </button>

                {cat.items.map((item, itemI) => (
                  <div key={itemI} className="grid grid-cols-3 gap-3">
                    <input
                      value={item.name}
                      onChange={(e) =>
                        handleItemChange(
                          ci,
                          catI,
                          itemI,
                          "name",
                          e.target.value
                        )
                      }
                      placeholder="Item Name"
                      className="p-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm"
                    />
                    <input
                      value={item.description}
                      onChange={(e) =>
                        handleItemChange(
                          ci,
                          catI,
                          itemI,
                          "description",
                          e.target.value
                        )
                      }
                      placeholder="Description"
                      className="p-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm"
                    />
                    <input
                      type="number"
                      value={item.price}
                      onChange={(e) =>
                        handleItemChange(
                          ci,
                          catI,
                          itemI,
                          "price",
                          e.target.value
                        )
                      }
                      placeholder="Price"
                      className="p-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm"
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="text-center">
        <button
          type="submit"
          className="bg-orange-600 hover:bg-orange-700 text-white font-semibold px-8 py-3 rounded-2xl text-sm shadow-md"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
