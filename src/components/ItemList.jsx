import React from "react";
const ItemList = ({ name }) => {
  return (
    <div className="font-bold my-4 p-3 bg-[#00a63e] rounded-3xl shadow-2xl text-[#ffffff]">
      {name}
    </div>
  );
};

export default ItemList;
