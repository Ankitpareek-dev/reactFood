import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useParams } from "react-router-dom";
import useRestaurantStore from "../utils/restaurantStore";

export default function RestaurantPage() {
  const restaurants = useRestaurantStore((state) => state.restaurants);
  const { restaurantId } = useParams();
  const restaurant = restaurants.find((r) => r._id === restaurantId);
  console.log(restaurant);

  useEffect(() => {
    const getRestaurantData = async () => {
      try {
        const res = await fetch.get(BASE_URL + `/feed/view/${restaurantId}`, {
          withCredentials: true,
        });
        // console.log(res);
      } catch (err) {}
    };
    getRestaurantData();
  }, []);

  return <div>res page</div>;
}
