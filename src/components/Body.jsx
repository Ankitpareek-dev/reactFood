import RestaurentCard from "./RestaurentCard";
import { resList } from "../utils/mockData";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";

export default function Body() {
  const [listOfRestaurents, setListOfRestaurents] = useState([]);

  useEffect(() => {
    apiData();
  }, []);

  const apiData = async () => {
    const data = await fetch(
      "https://mocki.io/v1/2ed8f886-6353-4225-88de-6d7053908d6c"
    );

    const json = await data.json();
    console.log(json);
    setListOfRestaurents(json);
  };

  if (listOfRestaurents.length === 0) {
    return <Shimmer />;
  }
  return (
    <div className="body">
      <div className="filter">
        <button
          className="filter-btn"
          onClick={() => {
            const filteredList = listOfRestaurents.filter(
              (res) => res.avgRating > 4
            );
            setListOfRestaurents(filteredList);
            console.log(filteredList);
          }}
        >
          Top Rated Restaurents
        </button>
      </div>
      <div className="res-container">
        {listOfRestaurents.map((restaurent) => (
          <RestaurentCard resData={restaurent} key={restaurent.id} />
        ))}
      </div>
    </div>
  );
}
