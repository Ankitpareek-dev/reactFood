export default function RestaurentCard(props) {
  const { resData } = props;
  const { name, cuisine, avgRating, deliveryTime, imageId } = resData;
  return (
    <div className="res-card">
      <img
        className="res-logo"
        src={`https://res.cloudinary.com/demo/image/upload/${imageId}.jpg`}
      ></img>
      <h3>{name}</h3>
      <h4>{cuisine}</h4>
      <h4>{avgRating} ⭐</h4>
      <h4>{deliveryTime} minutes</h4>
    </div>
  );
}
