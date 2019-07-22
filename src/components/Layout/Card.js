import React from "react";

export function CardBody({ children }) {
  return <div className="card-body">{children}</div>;
}

export function CardTitle({ children }) {
  return <h6 className="card-title">{children}</h6>;
}

export default function Card({ title, children, buttons }) {
  return (
    <div className="card">
      <div className="card-header" style={{ display: "flex" }}>
        <div
          style={{
            display: "flex",
            flex: 1,
            alignItems: "center"
          }}>
          <h5 className="m-0">{title}</h5>
        </div>
        <div
          style={{
            display: "flex",
            flex: 1,
            alignItems: "center",
            justifyContent: "flex-end"
          }}>
          {buttons && buttons()}
        </div>
      </div>

      {children}
      {/* <div className="card-body p-3"> 
       <h6 className="card-title">Special title treatment</h6>

        <p className="card-text">
          With supporting text below as a natural lead-in to additional content.
        </p>
        <a href="#" className="btn btn-primary">
          Go somewhere
        </a> 
       </div> */}
    </div>
  );
}
