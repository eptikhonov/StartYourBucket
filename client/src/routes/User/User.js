import User from "../../views/User/User.js";

const userRoutes = [
  {
    path: "/:userId",
    name: "User",
    component: User,
    layout: "/u",
  },
  {
    path: "/:userId/profile",
    name: "User Profile",
    component: User,
    layout: "/u",
  },
  {
    path: "/:userId/account",
    name: "User Account",
    component: User,
    layout: "/u",
  },
];

export default userRoutes;
