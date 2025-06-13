import React from "react";
class UserClass extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 0,
      count2: 2,
    };
    console.log(props);
  }
  render() {
    const { name, userLocation } = this.props;
    const { count, count2 } = this.state;
    return (
      <div className="user-card">
        <h1>This is the description of the user</h1>
        <h2>Count: {count}</h2>
        <h2>Count-2: {count2}</h2>
        <h2>Name: {name}</h2>
        <h2>Location: {userLocation}</h2>
        <h3>It's a class-based Component</h3>
      </div>
    );
  }
}

export default UserClass;
