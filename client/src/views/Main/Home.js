import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import { AppState, AppActions } from "../../stores";

const Home = (props) => {
  return (
    <>
      <h1 style={{ color: "black" }}>Welcome Home</h1>
      <ul>
        <li>
          <Link to="/u/12345">Go to User View</Link>
        </li>
        <li>
          <Link to="/t/12345">Go to Team View</Link>
        </li>
        <li>
          <Link to="/b/12345">Go to Bucket View</Link>
        </li>
        <li>
          <Link to="/test">Go to 404 Page</Link>
        </li>
        <li>
          <Link to="/logged-out" onClick={() => props.authActions.logOut()}>
            Log Out
          </Link>
        </li>
      </ul>
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
