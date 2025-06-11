import { CND_RESTAURENT_URL } from "../utils/constants";

export default function RestaurentCard(props) {
  const { resData } = props;
  const { name, cuisines, avgRating, deliveryTime, imageId } = resData;
  return (
    <div className="res-card">
      <img className="res-logo" src={CND_RESTAURENT_URL}></img>
      <h3>{name}</h3>
      <h4>{cuisines}</h4>
      <h4>{avgRating} ⭐</h4>
      <h4>{deliveryTime} minutes</h4>
    </div>
  );
}
