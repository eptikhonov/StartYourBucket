import Team from "../../views/Team/Team.js";

const teamRoutes = [
  {
    path: "/:teamId",
    name: "Team",
    component: Team,
    layout: "/t",
  },
  {
    path: "/:teamId/profile",
    name: "Team Profile",
    component: Team,
    layout: "/t",
  },
  {
    path: "/:teamId/account",
    name: "Team Account",
    component: Team,
    layout: "/t",
  },
  {
    path: "/:teamId/members",
    name: "Team Members",
    component: Team,
    layout: "/t",
  },
  {
    path: "/:teamId/buckets",
    name: "Team Buckets",
    component: Team,
    layout: "/t",
  },
];

export default teamRoutes;
