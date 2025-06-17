import React from "react";
import { CND_RESTAURENT_URL } from "../utils/constants";

export default function RestaurentCard(props) {
  const { resData } = props;
  const { name, cuisines, avgRating, deliveryTime, imageId } = resData;
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden w-72 hover:scale-105 transition-transform duration-200">
      <img
        className="w-full h-48 object-cover"
        src={CND_RESTAURENT_URL}
        alt={name}
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
        <h4 className="text-sm text-gray-600 mb-1">{cuisines.join(", ")}</h4>
        <div className="flex justify-between items-center text-sm text-gray-700 mt-2">
          <span className="font-medium">{avgRating} ⭐</span>
          <span>{deliveryTime} mins</span>
        </div>
      </div>
    </div>
  );
}

export const withPromotedLabel = (RestaurentCard) => {
  return (props) => {
    return (
      <div>
        <label className="absolute bg-black text-white m-2 p-2 rounded-lg">
          Promoted
        </label>
        <RestaurentCard {...props} />
      </div>
    );
  };
};
