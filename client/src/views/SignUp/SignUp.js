import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { AppState, AppActions } from "../../stores";

const SignUp = ({ auth, authActions }) => {
  return (
    <>
      <h6>Sign Up</h6>
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

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
