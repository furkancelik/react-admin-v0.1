import React from "react";
import ContentHeader from "../../components/Layout/ContentHeader";
import Layout from "../../components/Layout";

export default function ErrorPage() {
  return (
    <Layout>
      <ContentHeader title={"404 Sayfa Bulunamadı"} />
      <div className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <section className="content">
                <div className="error-page">
                  <h2 className="headline text-warning"> 404</h2>
                  <div className="error-content" style={{ paddingTop: 40 }}>
                    <h3>Oops! Aradığınız Sayfayı Bulamadık.</h3>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
