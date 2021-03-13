import * as React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const User = (props) => {
  const { userId } = props.match.params;
  console.log(props);
  return (
    <>
      <h1 style={{ color: "black" }}>User: {userId}</h1>
      <ul>
        <li>
          <Link to="/u/12345">Go to User View</Link>
        </li>
        <li>
          <Link to="/u/12345/profile">Go to User Profile View</Link>
        </li>
        <li>
          <Link to="/u/12345/account">Go to User Settings View</Link>
        </li>
        <li>
          <Link to="/u/12345/test">Go to 404 Page</Link>
        </li>
      </ul>
    </>
  );
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(User);
