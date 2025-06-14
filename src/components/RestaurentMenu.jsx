import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router";

import useRestaurentMenu from "../utils/useRestaurentMenu";

const RestaurentMenu = () => {
  const { resId } = useParams();

  const resInfo = useRestaurentMenu();

  return resInfo === null ? (
    <Shimmer></Shimmer>
  ) : (
    <div className="menu">
      <h1>{resInfo[parseInt(resId)].name}</h1>
      <h2>{resInfo[parseInt(resId)].avgRating}</h2>
      <h2>{resInfo[parseInt(resId)].cuisines.join(", ")}</h2>
      <ul>
        {resInfo[parseInt(resId)].menu.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default RestaurentMenu;
