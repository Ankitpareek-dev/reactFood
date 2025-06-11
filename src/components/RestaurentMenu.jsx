import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router";

const RestaurentMenu = () => {
  const [resInfo, setResInfo] = useState(null);
  const { resId } = useParams();

  console.log(resId);

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    const data = await fetch(
      "https://mocki.io/v1/7a36d283-af88-4a03-944f-40deeb7efa6a"
    );
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
        {resInfo[parseInt(resId)].menu.map((item) => {
          return <li key={resInfo.id}>{item}</li>;
        })}
      </ul>
    </div>
  );
};

export default RestaurentMenu;
