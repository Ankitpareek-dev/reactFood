import RestaurentCard from "./RestaurentCard";
import { resList } from "../utils/mockData";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import { RESTAURENT_LIST_URL } from "../utils/constants";
import { Link } from "react-router";
import useOnlineStatus from "../utils/useOnlineStatus";
export default function Body() {
  const [listOfRestaurents, setListOfRestaurents] = useState([]);
  const [filteredRestaurent, setFilteredRestaurent] = useState();
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    apiData();
  }, []);

  console.log("body rendred");

  const apiData = async () => {
    const data = await fetch(RESTAURENT_LIST_URL);

    const json = await data.json();
    console.log(json);
    setListOfRestaurents(json);
    setFilteredRestaurent(json);
  };

  const onlineStatus = useOnlineStatus();

  if (onlineStatus === false) return <h1>internet connection Lost</h1>;
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
          <Link key={restaurent.id} to={"/restaurent/" + restaurent.id}>
            <RestaurentCard resData={restaurent} />
          </Link>
        ))}
      </div>
    </div>
  );
}
