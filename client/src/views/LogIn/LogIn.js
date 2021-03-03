import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { AppState, AppActions } from "../../stores";
import { Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  buttonStyles: {
    color: "blue",
    backgroundColor: "lightblue",
    fontSize: "30px",
  },
});

const LogIn = ({ auth, authActions, history }) => {
  const classes = useStyles();
  return (
    <>
      <Button
        className={classes.buttonStyles}
        onClick={async () => {
          const isLoggedIn = await authActions.login({ email: "erictikhonov@outlook.com", password: "bucketeer" });
          if (isLoggedIn) history.push("/home");
        }}
        variant="contained"
        color="secondary"
        fullWidth
      >
        Log In
      </Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
