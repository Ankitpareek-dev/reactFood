import React from "react";
import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router";

import useRestaurentMenu from "../utils/useRestaurentMenu";
import RestaurentCategory from "./RestaurentCategory";

const RestaurentMenu = () => {
  const [showIndex, setShowIndex] = useState(null);

  const { resId } = useParams();

  const resInfo = useRestaurentMenu();

  const res = resInfo?.[parseInt(resId)];

  if (resInfo === null) {
    return <Shimmer></Shimmer>;
  }

  const { name, avgRating, cuisines, menu } = res;

  return (
    <div className="text-center">
      <h1 className="text-4xl font-extrabold text-green-700 mb-4">{name}</h1>
      <h2 className="text-lg text-gray-600 mb-6 italic">
        {cuisines.join(", ")}
      </h2>
      {Object.entries(menu).map(([categoryTitle, items], index) => (
        <RestaurentCategory
          key={categoryTitle}
          title={categoryTitle}
          items={items}
          isOpen={index === showIndex ? true : false}
          setShowIndex={() => setShowIndex(showIndex === index ? null : index)}
        ></RestaurentCategory>
      ))}
    </div>
  );
};

export default RestaurentMenu;
