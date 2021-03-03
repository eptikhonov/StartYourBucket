import Home from "../views/Home/Home.js";
import Landing from "../views/Landing/Landing.js";
import LogIn from "../views/LogIn/LogIn.js";
import Signup from "../views/SignUp/SignUp.js";

const routes = [
  {
    path: "/home",
    name: "Home",
    component: Home,
    layout: "/",
  },
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
    name: "Log In",
    component: Signup,
    layout: "/",
  },
];

export default routes;
