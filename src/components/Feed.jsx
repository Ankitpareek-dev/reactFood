import axios from "axios";
import RestaurantCard from "./RestaurantCard";
import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import RestaurentPanel from "./restaurentPanel";
import { Link } from "react-router-dom";
import useRestaurantStore from "../utils/restaurantStore";
import useCheckLoginStatus from "../hooks/useCheckLoginStatus";
function Feed() {
  const setRestaurants = useRestaurantStore((state) => state.setRestaurants);
  const [resData, setResData] = useState([]);
  useCheckLoginStatus();
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const res = await axios.get(BASE_URL + "/feed", {
          withCredentials: true,
        });

        setResData(res.data);
        setRestaurants(res.data);
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchRestaurants();
  }, []);
  console.log(resData);
  return (
    <div className="shadow-md border border-gray-200 rounded-[1.4rem] m-auto max-w-7xl grid gap-6 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {resData.map((r) => (
        <Link key={r._id} to={`/feed/view/${r._id}`}>
          <RestaurantCard data={r} />
        </Link>
      ))}
    </div>
  );
}

export default Feed;
