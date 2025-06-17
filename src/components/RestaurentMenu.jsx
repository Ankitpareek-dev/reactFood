import React from "react";
import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router";

import useRestaurentMenu from "../utils/useRestaurentMenu";
import RestaurentCategory from "./RestaurentCategory";

const RestaurentMenu = () => {
  const { resId } = useParams();

  const resInfo = useRestaurentMenu();

  const res = resInfo?.[parseInt(resId)];

  if (resInfo === null) {
    return <Shimmer></Shimmer>;
  }

  const { name, avgRating, cuisines, menu } = res;

  // console .log(categories);
  // console.log(menu);
  return (
    // {const { name, avgRating, cuisines, menu } = resInfo[parseInt(resId)]}
    <div className="text-center">
      <h1 className="font-bold my-10 text-2xl">{name}</h1>
      <h2 className="font-bold text-lg">{cuisines.join(", ")}</h2>
      {Object.entries(menu).map(([categoryTitle, items]) => (
        <RestaurentCategory
          key={categoryTitle}
          title={categoryTitle}
          items={items}
        ></RestaurentCategory>
      ))}
    </div>
  );
};

export default RestaurentMenu;
