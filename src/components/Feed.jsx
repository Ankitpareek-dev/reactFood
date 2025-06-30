import axios from "axios";
import RestaurantCard from "./RestaurantCard";
import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import RestaurentPanel from "./restaurentPanel";

function Feed() {
  const [resData, setResData] = useState([]);
  useEffect(() => {
    const fetchRetaurants = async () => {
      try {
        const res = await axios.get(BASE_URL + "/feed", {
          withCredentials: true,
        });

        setResData(res.data);
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchRetaurants();
  }, []);
  console.log(resData);
  return (
    <div className="shadow-md border border-gray-200 rounded-[1.4rem] m-auto max-w-7xl grid gap-6 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {resData.map((r) => (
        <RestaurantCard key={r._id} data={r} />
      ))}
    </div>
  );
}

export default Feed;
