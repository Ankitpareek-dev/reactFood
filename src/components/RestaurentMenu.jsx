import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router";
import { RESTAURENT_LIST_URL } from "../utils/constants";

const RestaurentMenu = () => {
  const [resInfo, setResInfo] = useState(null);
  const { resId } = useParams();

  console.log(resId);

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    const data = await fetch(RESTAURENT_LIST_URL);
    const json = await data.json();
    setResInfo(json);
  };

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
