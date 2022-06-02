import React from "react";

export default function ErrorMessage(props) {
  return (
    <h1 style={{ textAlign: "center", marginTop: "25%" }} className={"error"}>
      😱 {props.error} 😊
    </h1>
  );
}
