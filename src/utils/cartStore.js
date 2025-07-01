import create from "zustand";
import { persist } from "zustand/middleware";

const useCartStore = create(
  persist((get, set) => ({
    cart: [],
    addCart: (item) => {
      const cart = get().cart;
      const existingItem = cart.find((i) => i.itemName === item.itemName);

      if (existingItem) {
        console.log("alreadyexists");
      }
    },
    removeCart: () =>
      set({
        cart: null,
      }),
  }))
);

export default useCartStore;
