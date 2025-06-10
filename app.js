// import React from "react";
import ReactDOM from "react-dom/client";

const Header = () => {
  return (
    <div className="header">
      <div className="logo-container">
        <img
          className="logo"
          src="https://png.pngtree.com/png-vector/20220623/ourmid/pngtree-food-logo-png-image_5296974.png"
        />
      </div>

      <div className="nav-items">
        <ul>
          <li>Home</li>
          <li>About Us</li>
          <li>Contact Us</li>
          <li>Cart</li>
        </ul>
      </div>
    </div>
  );
};

const resList = [
  {
    id: 0,
    name: "Spice Villa",
    cuisine: ["North Indian", "Chinese"],
    avgRating: 4.5,
    costForTwo: 400,
    deliveryTime: "30-40 mins",
    imageId: "sample",
  },
  {
    id: 1,
    name: "Burger Nation",
    cuisine: ["American", "Fast Food"],
    avgRating: 4.2,
    costForTwo: 300,
    deliveryTime: "20-30 mins",
    imageId: "food/burger",
  },
  {
    id: 2,
    name: "Tandoori Nights",
    cuisine: ["Mughlai", "Barbecue"],
    avgRating: 4.7,
    costForTwo: 600,
    deliveryTime: "40-50 mins",
    imageId: "food/chicken",
  },
  {
    id: 3,
    name: "Green Leaf",
    cuisine: ["Vegan", "Salads"],
    avgRating: 4.3,
    costForTwo: 350,
    deliveryTime: "25-35 mins",
    imageId: "food/salad",
  },
  {
    id: 4,
    name: "Pizza Mania",
    cuisine: ["Italian", "Pizza"],
    avgRating: 4.1,
    costForTwo: 500,
    deliveryTime: "30-45 mins",
    imageId: "food/pizza",
  },
  {
    id: 5,
    name: "Sushi Central",
    cuisine: ["Japanese"],
    avgRating: 4.6,
    costForTwo: 700,
    deliveryTime: "45-55 mins",
    imageId: "food/sushi",
  },
  {
    id: 6,
    name: "The Dosa House",
    cuisine: ["South Indian"],
    avgRating: 4.4,
    costForTwo: 250,
    deliveryTime: "20-25 mins",
    imageId: "food/dosa",
  },
  {
    id: 7,
    name: "Wrap & Roll",
    cuisine: ["Fast Food", "Snacks"],
    avgRating: 4.0,
    costForTwo: 200,
    deliveryTime: "15-20 mins",
    imageId: "food/wrap",
  },
  {
    id: 8,
    name: "Biryani Express",
    cuisine: ["Hyderabadi", "Biryani"],
    avgRating: 4.8,
    costForTwo: 450,
    deliveryTime: "35-45 mins",
    imageId: "food/biryani",
  },
  {
    id: 9,
    name: "Chaat Junction",
    cuisine: ["Street Food", "Chaat"],
    avgRating: 4.1,
    costForTwo: 180,
    deliveryTime: "10-15 mins",
    imageId: "food/chat",
  },
];

export default resList;

const RestaurentCard = (props) => {
  const { resData } = props;
  const { name, cuisine, stars, deliveryTime, imageId } = resData;
  return (
    <div className="res-card">
      <img
        className="res-logo"
        src={`https://res.cloudinary.com/demo/image/upload/${imageId}.jpg`}
      ></img>
      <h3>{name}</h3>
      <h4>{cuisine}</h4>
      <h4>{stars} ⭐</h4>
      <h4>{deliveryTime} minutes</h4>
    </div>
  );
};
const Body = () => {
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
};
const AppLayout = () => {
  return (
    <div className="app">
      <Header />
      <Body />
    </div>
  );
};

//creating root
const root = ReactDOM.createRoot(document.getElementById("root"));

//rendering root
root.render(<AppLayout />);
