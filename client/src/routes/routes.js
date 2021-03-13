import mainRoutes from "./Main/Main.js";
import userRoutes from "./User/User.js";
import teamRoutes from "./Team/Team.js";
import bucketRoutes from "./Bucket/Bucket.js";
import landingRoutes from "./Landing/landing.js";

const routes = [...mainRoutes, ...userRoutes, ...teamRoutes, ...bucketRoutes, ...landingRoutes];

export default routes;
