import create from "zustand";
import { persist } from "zustand/middleware";
const useRestaurantStore = create(
  persist(
    (set) => ({
      restaurants: [],
      setRestaurants: (data) => set({ restaurants: data }),
    }),
    {
      name: "restaurants",
    }
  )
);

export default useRestaurantStore;
