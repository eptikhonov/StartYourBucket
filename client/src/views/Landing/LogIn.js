import * as React from "react";
import { LogInModal } from "../../components";

const LogIn = (props) => {
  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        WebkitTransform: "translate(-50%, -50%)",
        transform: "translate(-50%, -50%)",
      }}
    >
      <LogInModal {...props} />
    </div>
  );
};

export default LogIn;
