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
const Home = ({ facebook, facebookActions }) => {
  const classes = useStyles();
  return (
    <>
      {
        <Button className={classes.buttonStyles} variant="contained" color="secondary" fullWidth>
          Please click Me
        </Button>
      }
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    facebook: AppState.facebook,
  };
};

const mapDispatchToProps = (dispatch) => ({
  facebookActions: bindActionCreators(AppActions.facebookActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
