import React from "react";
import ContentHeader from "../../components/Layout/ContentHeader";
import Card from "../../components/Layout/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import Form from "./_form";
import { useQuery, useMutation } from "react-apollo-hooks";
import { PRODUCT } from "../../store/queries";
import Loading from "../../components/Loading";
import { PUBLIC_DIR } from "../../config";

export default function ProductDetail({
  history,
  match: {
    params: { id }
  }
}) {
  const title = "Stok Detayları";
  const link = "/product";
  const { data, error, loading } = useQuery(PRODUCT.item, {
    variables: { id }
  });

  function renderDetail() {
    if (data && data.product) {
      const { name, images, barcode, stock, sku, price } = data.product;

      return (
        <div className="card-body">
          <div className="form-group row">
            {/* <label className="col-sm-2 control-label">Ürün Resmi</label> */}
            <div className="col-sm-10">
              {console.log(images.length)}
              {images.length > 0 &&
                images.map(img => (
                  <img
                    className={"img-fluid rounded mr-2"}
                    src={PUBLIC_DIR(img)}
                  />
                ))}
              {images.length === 0 && (
                <img
                  style={{ height: 100 }}
                  className={"img-fluid rounded mr-2"}
                  src={"/no-product.png"}
                />
              )}
            </div>
          </div>

          <div className="form-group row">
            <label className="col-sm-2 control-label">Ürün Adı</label>
            <div className="col-sm-10">{name}</div>
          </div>

          <div className="form-group row">
            <label className="col-sm-2 control-label">Stok Kodu</label>
            <div className="col-sm-10">{sku}</div>
          </div>

          <div className="form-group row">
            <label className="col-sm-2 control-label">Barkod Numarası</label>
            <div className="col-sm-10">{barcode}</div>
          </div>

          <div className="form-group row">
            <label className="col-sm-2 control-label">Fiyat</label>
            <div className="col-sm-10">{price}</div>
          </div>

          <div className="form-group row">
            <label className="col-sm-2 control-label">Stok</label>
            <div className="col-sm-10">{stock}</div>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }

  return (
    <Layout>
      <ContentHeader title={title} />
      <div className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <Card title={title}>
                {loading && <Loading />}
                {renderDetail()}
                <div className="card-footer">
                  <Link to={link} className="btn btn-primary">
                    Geri
                  </Link>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
