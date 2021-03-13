import * as React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const Bucket = (props) => {
  const { bucketId } = props.match.params;
  return (
    <>
      <h1 style={{ color: "black" }}>Bucket: {bucketId}</h1>
      <Link to="/b/12345/test">Go to 404 Page</Link>
    </>
  );
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Bucket);
