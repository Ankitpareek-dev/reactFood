import React from "react";
import User from "./User";
import UserClass from "./UserClass";

function About() {
  return (
    <div>
      <h1>About page</h1>
      <h2>Description for about us page</h2>
      <User name="Ankit" userLocation="Sardarshahar" />
      <UserClass name="Ankit" userLocation="Sardarshahar" />
    </div>
  );
}

export default About;
