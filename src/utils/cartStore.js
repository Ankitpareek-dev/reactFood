import create from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

const useCartStore = create(
  persist(
    immer((set) => ({
      cart: [],
      addCart: (item) => {
        set((state) => {
          const existingItem = state.cart.find(
            (i) => i.itemName === item.itemName
          );

          if (!existingItem) {
            state.cart.push({
              ...item, // Spread the actual object
              itemQuantity: 1,
            });
          } else {
            existingItem.itemQuantity += 1;
          }
        });
      },

      removeCart: () => {
        set((state) => {
          state.cart = [];
        });
      },
    })),
    {
      name: "cart", // localStorage key
    }
  )
);

export default useCartStore;
