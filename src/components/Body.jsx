import RestaurentCard from "./RestaurentCard";
import { resList } from "../utils/mockData";

export default function Body() {
  return (
    <div className="body">
      <div className="search">Search</div>
      <div className="res-container">
        {resList.map((restaurent) => (
          <RestaurentCard resData={restaurent} key={restaurent.id} />
        ))}
      </div>
    </div>
  );
}
