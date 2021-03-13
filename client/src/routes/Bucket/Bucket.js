import Bucket from "../../views/Bucket/Bucket.js";

const bucketRoutes = [
  {
    path: "/:bucketId",
    name: "Bucket",
    component: Bucket,
    layout: "/b",
  },
];

export default bucketRoutes;
