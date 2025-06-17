import React from "react";
import { useState } from "react";
import ItemList from "./ItemList";

const RestaurentCategory = ({ title, items }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCategory = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="w-6/12 mx-auto my-4 bg-grey shadow-lg p-4 border-4 border-[#00a63e] rounded-3xl">
      {/* {console.log(menu)} */}
      <div
        onClick={() => {
          toggleCategory();
        }}
        className="flex justify-between"
      >
        <div className="font-bold text-lg"> {title}</div>
        <span>{isOpen ? "▲" : "▼"}</span>
      </div>

      {isOpen && (
        <ul>
          {items.map((item, index) => (
            <ItemList key={index} name={item}></ItemList>
          ))}
        </ul>
      )}

      {/* {values.map((value) => {
        <ItemList data={value}></ItemList>;
      })} */}
    </div>
  );
};

export default RestaurentCategory;
