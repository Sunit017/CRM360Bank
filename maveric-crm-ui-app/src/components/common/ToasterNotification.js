import React from "react";
import { Toaster } from "react-hot-toast";

const ToasterNotification = () => {
  return (
    <Toaster
      // containerStyle={{ position: "relative" }}
      // position="top-center"
      containerStyle={{
        top: 85,
        left: 20,
        // // bottom: 20,
        // right: 20,
      }}
      reverseOrder={false}
      toastOptions={{
        className: "",
        style: {
          border: "1px solid #713200",
          padding: "10px",
          color: "#713200",
        },
      }}
    />
  );
};
export default ToasterNotification;
