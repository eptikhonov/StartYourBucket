import * as React from "react";
import { connect } from "react-redux";

const GenericNotFound = (props) => {
  return (
    <>
      <h1 style={{ color: "black" }}>This page was not found.</h1>
    </>
  );
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(GenericNotFound);
