import React from "react";

export default function Title({ children }) {
  return (
    <div className="col-sm-6">
      <h1 className="m-0 text-dark">{children}</h1>
    </div>
  );
}
