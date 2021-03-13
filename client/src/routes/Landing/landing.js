import Landing from "../../views/Landing/Landing.js";
import LogIn from "../../views/Landing/LogIn.js";
import Signup from "../../views/Landing/SignUp.js";
import LoggedOut from "../../views/Landing/LoggedOut.js";

const landingRoutes = [
  {
    path: "/",
    exact: true,
    isLanding: true,
    name: "Landing",
    component: Landing,
    layout: "/",
  },
  {
    path: "/login",
    isLanding: true,
    name: "Log In",
    component: LogIn,
    layout: "/",
  },
  {
    path: "/signup",
    isLanding: true,
    name: "Sign Up",
    component: Signup,
    layout: "/",
  },
  {
    path: "/signup",
    isLanding: true,
    name: "Sign Up",
    component: Signup,
    layout: "/",
  },
  {
    path: "/logged-out",
    isLanding: true,
    name: "Logged Out",
    component: LoggedOut,
    layout: "/",
  },
];

export default landingRoutes;
