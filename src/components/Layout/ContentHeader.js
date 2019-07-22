import React from "react";
import BreadCrumb from "./BreadCrumb";
import Title from "./Title";

export default function ContentHeader({ title, breadCrumb }) {
  return (
    <div className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">
          {title && <Title>{title}</Title>}
          {breadCrumb && <BreadCrumb breadCrumb={breadCrumb} />}
        </div>
      </div>
    </div>
  );
}
