import RestaurentCard from "./RestaurentCard";
import { resList } from "../utils/mockData";
import { useState } from "react";

export default function Body() {
  const [listOfRestaurents, setListOfRestaurents] = useState([
    {
      data: {
        id: "335575",
        name: "KFC",
        cloudinaryImageId: "abcejfhnejf78e7",
        cuisines: ["burger", "fries", "pizza", "snacks"],
        costForTwo: 400,
        deliveryTime: 36,
        avgRating: "4.5",
      },
    },
    {
      data: {
        id: "33575",
        name: "Dominos",
        cloudinaryImageId: "abcejfhnejf78e7",
        cuisines: ["burger", "fries", "pizza", "snacks"],
        costForTwo: 400,
        deliveryTime: 36,
        avgRating: "3.8",
      },
    },
  ]);
  let listOfRestaurentsJS = [
    {
      data: {
        id: "335575",
        name: "KFC",
        cloudinaryImageId: "abcejfhnejf78e7",
        cuisines: ["burger", "fries", "pizza", "snacks"],
        costForTwo: 400,
        deliveryTime: 36,
        avgRating: "4.5",
      },
    },
    {
      data: {
        id: "33575",
        name: "Dominos",
        cloudinaryImageId: "abcejfhnejf78e7",
        cuisines: ["burger", "fries", "pizza", "snacks"],
        costForTwo: 400,
        deliveryTime: 36,
        avgRating: "3.8",
      },
    },
  ];

  return (
    <div className="body">
      <div className="filter">
        <button
          className="filter-btn"
          onClick={() => {
            setListOfRestaurents();
            const filteredList = listOfRestaurents.filter(
              (res) => res.data.avgRating > 4
            );
            setListOfRestaurents(filteredList);
            console.log(listOfRestaurents);
          }}
        >
          Top Rated Restaurents
        </button>
      </div>
      <div className="res-container">
        {listOfRestaurents.map((restaurent) => (
          <RestaurentCard resData={restaurent} key={restaurent.data.id} />
        ))}
      </div>
    </div>
  );
}
