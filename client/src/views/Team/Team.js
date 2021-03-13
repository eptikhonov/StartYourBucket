import * as React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const Team = (props) => {
  const { teamId } = props.match.params;
  console.log(props);
  return (
    <>
      <h1 style={{ color: "black" }}>Team: {teamId}</h1>
      <ul>
        <li>
          <Link to="/t/12345">Go to Team View</Link>
        </li>
        <li>
          <Link to="/t/12345/buckets">Go to Team Buckets View</Link>
        </li>
        <li>
          <Link to="/t/12345/profile">Go to Team Profile View</Link>
        </li>
        <li>
          <Link to="/t/12345/account">Go to Team Account View</Link>
        </li>
        <li>
          <Link to="/t/12345/members">Go to Team Members View</Link>
        </li>
        <li>
          <Link to="/t/12345/test">Go to 404 Page</Link>
        </li>
      </ul>
    </>
  );
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Team);
