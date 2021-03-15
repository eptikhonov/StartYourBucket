import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent, Button, Link, TextField, useMediaQuery } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { AppState, AppActions } from "../../stores";

const useStyles = makeStyles({
  card: {
    width: "400px",
    padding: "25px 40px",
  },
  cardTitle: {
    textAlign: "center",
    color: "#5E6C85",
    fontSize: "16px",
    letterSpacing: "-0.01em",
    marginTop: "10px",
    marginBottom: "25px",
  },
  form: {
    "& .MuiTextField-root": {
      margin: "1.25em",
      marginLeft: "0",
    },
    fontSize: "14px",
  },
  button: {
    color: "#fff",
    boxShadow: "none",
    width: "100%",
    marginBottom: "0px",
    background: "#5AAC44",
    textTransform: "none",
    fontWeight: "bold",
    marginTop: "1.25em",
  },
  hr: {
    display: "block",
    height: "1px",
    border: "0",
    borderTop: "1px solid hsl(0,0%,80%)",
    margin: "1em 0",
    marginTop: "25px",
    padding: "0",
  },
  ul: {
    textAlign: "center",
    fontSize: "14px",
    display: "block",
    padding: "0",
  },
  li: {
    display: "inline-block",
    listStyle: "none",
    fontWeight: "100",
  },
  liBreak: {
    margin: "0 8px 0px 4px",
  },
  link: {
    textDecoration: "none",
    color: "#0052CC",
    cursor: "pointer",
  },
  input: {
    height: "44px",
  },
  alertError: {
    marginTop: "1.25em",
  },
});

const LogInModal = ({ auth, authActions, history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showErrModal, setErrModal] = useState({ display: false, msg: "" });

  const isMobileWidth = useMediaQuery("(max-width:640px)");
  const classes = useStyles();

  return (
    <div>
      <Card className={classes.card} elevation={0} style={{ boxShadow: isMobileWidth ? "" : "rgb(0 0 0 / 10%) 0 0 10px" }}>
        <CardContent>
          <h1 className={classes.cardTitle}>Log in to StartYourBucket</h1>
          <form className={classes.form}>
            <TextField className={classes.input} required fullWidth label="Email" type="email" variant="outlined" onChange={(e) => setEmail(e.target.value)} value={email} />
            <TextField
              className={classes.input}
              required
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            {showErrModal.display ? (
              <Alert className={classes.alertError} severity="error" onClose={() => setErrModal({ display: false, msg: "" })}>
                {showErrModal.msg}
              </Alert>
            ) : null}

            <Button
              className={classes.button}
              onClick={async () => {
                const loginResult = await authActions.login({ email, password });
                if (loginResult.valid) history.push("/home");
                else {
                  setErrModal({ display: true, msg: loginResult.error });
                }
              }}
              variant="contained"
              color="secondary"
              fullWidth
            >
              Log In
            </Button>
            <hr className={classes.hr}></hr>
            <ul className={classes.ul}>
              <li className={classes.li}>
                <Link className={classes.link} href="#" onClick={() => null}>
                  Can't log in?
                </Link>
              </li>
              <li className={classes.li}>
                <span>&ensp;&#8226;&ensp;</span>
              </li>
              <li className={classes.li}>
                <Link className={classes.link} onClick={() => history.push("/signup")}>
                  Sign up for an account
                </Link>
              </li>
            </ul>
          </form>
        </CardContent>
      </Card>
    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(LogInModal);
