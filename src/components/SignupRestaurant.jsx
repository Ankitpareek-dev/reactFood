import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";

export default function SignupRestaurant() {
  const [restaurant, setRestaurant] = useState({
    name: "",
    email: "",
    password: "",
    cuisines: [],
    image: "",
  });

  const navigate = useNavigate();
  const [uploading, setUploading] = useState(false);

  const handleAddCuisine = () => {
    setRestaurant((prev) => ({
      ...prev,
      cuisines: [...prev.cuisines, { cuisine: "", categories: [] }],
    }));
  };

  const handleRemoveCuisine = (index) => {
    setRestaurant((prev) => ({
      ...prev,
      cuisines: prev.cuisines.filter((_, i) => i !== index),
    }));
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

  const handleRemoveCategory = (cuisineIndex, categoryIndex) => {
    const updated = [...restaurant.cuisines];
    updated[cuisineIndex].categories = updated[cuisineIndex].categories.filter(
      (_, i) => i !== categoryIndex
    );
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

  const handleRemoveItem = (cuisineIndex, categoryIndex, itemIndex) => {
    const updated = [...restaurant.cuisines];
    updated[cuisineIndex].categories[categoryIndex].items = updated[
      cuisineIndex
    ].categories[categoryIndex].items.filter((_, i) => i !== itemIndex);
    setRestaurant({ ...restaurant, cuisines: updated });
  };

  const handleItemChange = (ci, catI, itemI, field, value) => {
    const updated = [...restaurant.cuisines];
    updated[ci].categories[catI].items[itemI][field] =
      field === "price" ? +value : value;
    setRestaurant({ ...restaurant, cuisines: updated });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "restaurant_upload"); // Your unsigned preset here

    try {
      setUploading(true);
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dw9ioogav/image/upload",
        formData
      );
      setRestaurant((prev) => ({ ...prev, image: res.data.secure_url }));
    } catch (err) {
      console.error("Image upload failed:", err);
    } finally {
      setUploading(false);
    }
  };

  const handleChange = (e) => {
    setRestaurant({ ...restaurant, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(BASE_URL + "/signup/restaurant", restaurant, {
        withCredentials: true,
      });
      navigate("/feed");
    } catch (err) {
      console.error("Error submitting:", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 mt-20 max-w-lg mx-auto space-y-6 bg-white shadow-lg rounded-2xl"
    >
      <h1 className="text-2xl font-semibold text-center text-gray-800">
        Register Restaurant
      </h1>

      <input
        name="name"
        value={restaurant.name}
        onChange={handleChange}
        placeholder="Restaurant Name"
        className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm"
      />
      <input
        name="email"
        value={restaurant.email}
        onChange={handleChange}
        placeholder="Email"
        className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm"
      />
      <input
        name="password"
        type="password"
        value={restaurant.password}
        onChange={handleChange}
        placeholder="Password"
        className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm"
      />
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm"
      />
      {uploading && <p className="text-sm text-gray-500">Uploading image...</p>}
      {restaurant.image && (
        <img
          src={restaurant.image}
          alt="Uploaded Preview"
          className="w-32 h-32 object-cover rounded-lg mx-auto"
        />
      )}

      <div className="space-y-5">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-700">Cuisines</h2>
          <button
            type="button"
            onClick={handleAddCuisine}
            className="text-sm text-orange-500 hover:underline"
          >
            + Add Cuisine
          </button>
        </div>

        {restaurant.cuisines.map((cuisine, ci) => (
          <div key={ci} className="bg-gray-50 p-4 rounded-xl space-y-4">
            <div className="flex justify-between items-center">
              <input
                value={cuisine.cuisine}
                onChange={(e) => handleCuisineChange(ci, e.target.value)}
                placeholder="Cuisine (e.g., Italian)"
                className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm"
              />
              <button
                type="button"
                onClick={() => handleRemoveCuisine(ci)}
                className="ml-3 text-xs text-gray-500 hover:underline"
              >
                Remove Cuisine
              </button>
            </div>

            {cuisine.categories.map((cat, catI) => (
              <div
                key={catI}
                className="bg-white p-4 rounded-lg space-y-3 shadow-sm"
              >
                <div className="flex justify-between items-center">
                  <input
                    value={cat.heading}
                    onChange={(e) =>
                      handleCategoryChange(ci, catI, e.target.value)
                    }
                    placeholder="Category Heading"
                    className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveCategory(ci, catI)}
                    className="ml-3 text-xs text-gray-500 hover:underline"
                  >
                    Remove Category
                  </button>
                </div>

                {cat.items.map((item, itemI) => (
                  <div
                    key={itemI}
                    className="grid grid-cols-3 gap-2 items-center"
                  >
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
                      className="p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm"
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
                      className="p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm"
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
                      className="p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(ci, catI, itemI)}
                      className="col-span-3 text-xs text-gray-500 hover:underline text-right"
                    >
                      Remove Item
                    </button>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() => handleAddItem(ci, catI)}
                  className="text-xs text-green-600 hover:underline"
                >
                  + Add Item
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={() => handleAddCategory(ci)}
              className="text-xs text-blue-600 hover:underline"
            >
              + Add Category
            </button>
          </div>
        ))}
      </div>

      <div className="text-center">
        <button
          type="submit"
          className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-10 py-3 rounded-xl text-sm shadow-md"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
