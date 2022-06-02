import React from "react";

export default function ErrorMessage(props) {
  return <h1 className={"error"}>😱 {props.error} 😊</h1>;
}
