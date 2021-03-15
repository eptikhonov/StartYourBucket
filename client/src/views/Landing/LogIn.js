import { makeStyles, Container, Typography, Box, useMediaQuery } from "@material-ui/core";
import * as React from "react";
import { LogInModal } from "../../components";
import logo from "../../assets/images/logo.png";

const useStyles = makeStyles({
  logoContainer: {
    display: "block",
    textAlign: "center",
  },
  logoImg: {
    width: "50px",
    height: "50px",
    display: "inline-block",
    verticalAlign: "middle",
  },
  logoText: {
    color: "#253858",
    display: "inline-block",
    verticalAlign: "middle",
    fontSize: "50px",
    fontWeight: "bold",
    paddingLeft: "15px",
    height: "50px",
    width: "auto",
    padding: "0",
    margin: "0",
  },
});

const LogIn = (props) => {
  const isMobileWidth = useMediaQuery("(max-width:640px)");
  const classes = useStyles();
  return (
    <>
      <Container className={classes.logoContainer} style={{ margin: isMobileWidth ? "0" : "40px 0 40px 0" }}>
        <img className={classes.logoImg} alt="logo" src={logo} />
        <Typography component="span">
          <Box lineHeight={1} className={classes.logoText}>
            StartYourBucket
          </Box>
        </Typography>
      </Container>
      <Container style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <LogInModal {...props} />
      </Container>
    </>
  );
};

export default LogIn;
