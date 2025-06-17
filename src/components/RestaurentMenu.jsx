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
      <h1 className="font-bold my-10 text-2xl">{name}</h1>
      <h2 className="font-bold text-lg">{cuisines.join(", ")}</h2>
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
