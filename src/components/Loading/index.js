import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Loading() {
  return (
    <div
      style={{
        paddingTop: 20,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
      <FontAwesomeIcon
        icon={["fas", "spinner"]}
        spin
        style={{ marginRight: 10 }}
        size={"lg"}
      />{" "}
      <span style={{ fontSize: 20 }}>Yükleniyor...</span>
    </div>
  );
}
