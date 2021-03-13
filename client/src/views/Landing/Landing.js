import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Landing = (props) => {
  return (
    <>
      <h1 style={{ color: "black" }}>Landing Page</h1>
      <ul>
        <li>
          <Link to="/login">Go to Log In View</Link>
        </li>
        <li>
          <Link to="/signup">Go to Sign Up View</Link>
        </li>
        <li>
          <Link to="/test">Go to 404 Page</Link>
        </li>
      </ul>
    </>
  );
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
