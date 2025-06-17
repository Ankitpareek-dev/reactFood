import React from "react";
import { useState } from "react";

const User = ({ name, userLocation }) => {
  const [count] = useState(0);
  const [count2] = useState(2);
  return (
    <div className="user-card">
      <h1>This is the description of the user</h1>
      <h2>Count: {count}</h2>
      <h2>Count-2: {count2}</h2>
      <h2>Name: {name}</h2>
      <h2>Location: {userLocation}</h2>
      <h3>It's a functional Component</h3>
    </div>
  );
};

export default User;
