import RestaurentCard from "./RestaurentCard";
import { resList } from "../utils/mockData";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";

export default function Body() {
  const [listOfRestaurents, setListOfRestaurents] = useState([]);
  const [filteredRestaurent, setFilteredRestaurent] = useState();
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    apiData();
  }, []);

  console.log("body rendred");

  const apiData = async () => {
    const data = await fetch(
      "https://mocki.io/v1/7a36d283-af88-4a03-944f-40deeb7efa6a"
    );

    const json = await data.json();
    console.log(json);
    setListOfRestaurents(json);
    setFilteredRestaurent(json);
  };

  return listOfRestaurents.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="filter">
        <div className="search">
          <input
            type="text"
            className="search-box"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          ></input>
          <button
            onClick={() => {
              const filteredRestaurent = listOfRestaurents.filter((res) =>
                res.name.toLowerCase().includes(searchText.toLowerCase())
              );
              setFilteredRestaurent(filteredRestaurent);
            }}
          >
            Search
          </button>
        </div>
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
        {filteredRestaurent.map((restaurent) => (
          <RestaurentCard resData={restaurent} key={restaurent.id} />
        ))}
      </div>
    </div>
  );
}
