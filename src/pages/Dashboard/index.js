import React from "react";
import Card, { CardBody, CardTitle } from "../../components/Layout/Card";
import ContentHeader from "../../components/Layout/ContentHeader";

export default function Dashboard() {
  return (
    <>
      <ContentHeader
        title={"Dashboard"}
        breadCrumb={[
          { title: "Single Page", link: "#" },
          { title: "Single Page" }
        ]}
      />

      <div className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <Card title={"Dashboard"}>
                <CardBody>
                  <CardTitle>asd</CardTitle>
                  <p className="card-text">
                    With supporting text below as a natural lead-in to
                    additional content.
                  </p>
                  <a href="#/" className="btn btn-primary">
                    Go somewhere
                  </a>
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
