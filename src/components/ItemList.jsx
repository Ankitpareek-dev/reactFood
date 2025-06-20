import React from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../utils/cartSlice";
const ItemList = ({ name }) => {
  const dispatch = useDispatch();
  const handleAddItem = () => {
    dispatch(addItem({ name }));
  };
  return (
    <div className="flex items-center gap-4 p-4">
      <div className="flex-1 font-semibold text-lg px-5 py-2 bg-[#00a63e] rounded-full shadow-lg text-white">
        {name}
      </div>
      <button
        onClick={() => handleAddItem}
        className="px-4 py-2 bg-[#0e8b30] text-white rounded-full hover:bg-[#0c7729] transition-all duration-200 shadow-md cursor-pointer"
      >
        Add item
      </button>
    </div>
  );
};

export default ItemList;
