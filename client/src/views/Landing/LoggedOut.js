import * as React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { AppState, AppActions } from "../../stores";

const LoggedOut = ({ auth, authActions }) => {
  return (
    <>
      <h1 style={{ color: "black" }}>You’re all logged out</h1>
      <Link to="/login">Log In</Link>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: AppState.auth,
  };
};

const mapDispatchToProps = (dispatch) => ({
  authActions: bindActionCreators(AppActions.authActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoggedOut);
