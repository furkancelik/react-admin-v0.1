import React from "react";

export default function BreadCrumb({ breadCrumb }) {
  return (
    <div className="col-sm-6">
      <ol className="breadcrumb float-sm-right">
        {breadCrumb.map(({ title, link }, index) => (
          <li
            key={index}
            className={
              index === 0 ? "breadcrumb-item active" : "breadcrumb-item"
            }>
            {link ? <a href={link}>{title}</a> : title}
          </li>
        ))}
      </ol>
    </div>
  );
}
