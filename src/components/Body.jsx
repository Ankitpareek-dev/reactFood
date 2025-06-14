import RestaurentCard from "./RestaurentCard";
import { resList } from "../utils/mockData";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import { RESTAURENT_LIST_URL } from "../utils/constants";
import { Link } from "react-router";
import useOnlineStatus from "../utils/useOnlineStatus";
export default function Body() {
  const [listOfRestaurents, setListOfRestaurents] = useState([]);
  const [filteredRestaurent, setFilteredRestaurent] = useState();
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    apiData();
  }, []);

  console.log("body rendred");

  const apiData = async () => {
    const data = await fetch(RESTAURENT_LIST_URL);

    const json = await data.json();
    console.log(json);
    setListOfRestaurents(json);
    setFilteredRestaurent(json);
  };

  const onlineStatus = useOnlineStatus();

  if (onlineStatus === false) return <h1>internet connection Lost</h1>;
  return listOfRestaurents.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="bg-gray-50 min-h-screen py-6">
      <div className="max-w-screen-xl mx-auto px-4">
        {/* 🔍 Search + Filter Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
          <div className="flex gap-3 w-full md:w-auto">
            <input
              type="text"
              placeholder="Search restaurants..."
              className="text-black px-4 py-2 border border-gray-300 rounded-md shadow-sm w-full md:w-80 focus:outline-none focus:ring-2 focus:ring-green-500"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <button
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition"
              onClick={() => {
                const filtered = originalList.filter((res) =>
                  res.name.toLowerCase().includes(searchText.toLowerCase())
                );
                setFilteredRestaurent(filtered);
              }}
            >
              Search
            </button>
          </div>

          <button
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition"
            onClick={() => {
              const topRated = originalList.filter((res) => res.avgRating > 4);
              setFilteredRestaurent(topRated);
            }}
          >
            Top Rated Restaurants
          </button>
        </div>

        {/* 🍽️ Restaurant Cards Grid */}
        <div className="flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {filteredRestaurent.map((restaurent) => (
              <Link key={restaurent.id} to={"/restaurent/" + restaurent.id}>
                <RestaurentCard resData={restaurent} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
