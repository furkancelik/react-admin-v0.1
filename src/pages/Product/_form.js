import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FileEditor from "../../components/FileEditor";
import Loading from "../../components/Loading";
import _ from "lodash";

export default function ProductForm({
  link = "",
  value = null,
  onSubmit = null,
  loading: formLoading
}) {
  const [input, setInput] = useState({
    name: "",
    images: [],
    barcode: "",
    stock: 0,
    sku: "",
    price: ""
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (formLoading === false && value !== null) {
      setInput(
        _.pick(value, ["name", "images", "barcode", "stock", "sku", "price"])
      );
    }
  }, [formLoading]);

  function handleChange(e) {
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    //validate işlemini yaptırt
    onSubmit &&
      (await onSubmit({
        ...input,
        price: parseInt(input.price),
        stock: parseInt(input.stock),
        images: input.images.filter(v => v !== "")
      }));
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="form-horizontal">
      {formLoading && <Loading />}
      <fieldset
        disabled={loading || formLoading}
        style={{ opacity: loading || formLoading ? 0.6 : 1 }}>
        <div className="card-body">
          <div className="form-group row">
            <label className="col-sm-2 control-label">Ürün Adı</label>
            <div className="col-sm-10">
              <input
                type="text"
                name={"name"}
                value={input.name}
                onChange={handleChange}
                className="form-control"
              />
            </div>
          </div>

          <div className="form-group row">
            <label className="col-sm-2 control-label">Stok Kodu</label>
            <div className="col-sm-10">
              <input
                type="text"
                name={"sku"}
                value={input.sku}
                onChange={handleChange}
                className="form-control"
              />
            </div>
          </div>

          <div className="form-group row">
            <label className="col-sm-2 control-label">Barkod Numarası</label>
            <div className="col-sm-10">
              <input
                type="text"
                name={"barcode"}
                value={input.barcode}
                onChange={handleChange}
                className="form-control"
              />
            </div>
          </div>

          {/*  TODO:ürün resmi ekle */}
          <div className="form-group row">
            <label className="col-sm-2 control-label">Ürün Resmi</label>
            <div className="col-sm-10">
              <button
                onClick={() => {
                  setInput(i => ({ ...i, images: [...i.images, ""] }));
                }}
                type="button"
                className={"btn btn-primary btn-sm mb-2"}>
                Resim Ekle
              </button>
              {input.images.map((img, index) => (
                <div
                  className={"my-2"}
                  style={{ display: "flex", alignItems: "center" }}>
                  <FileEditor
                    key={index}
                    id={`image-${index}`}
                    defaultValue={input.images[index]}
                    onChange={image => {
                      setInput({
                        ...input,
                        images: input.images.map((v, i) =>
                          i === index ? image : v
                        )
                      });
                    }}
                  />
                  <button
                    onClick={() => {
                      setInput(i => ({
                        ...i,
                        images: i.images.filter(
                          (v, imgIndex) => imgIndex !== index
                        )
                      }));
                    }}
                    type="button"
                    className={"mx-2 btn btn-danger btn-sm"}>
                    Sil
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="form-group row">
            <label className="col-sm-2 control-label">Stok</label>
            <div className="col-sm-10">
              <input
                type="number"
                name={"stock"}
                value={input.stock}
                onChange={handleChange}
                className="form-control"
              />
            </div>
          </div>

          <div className="form-group row">
            <label className="col-sm-2 control-label">Fiyat</label>
            <div className="col-sm-10">
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text">₺</span>
                </div>
                <input
                  type="number"
                  name={"price"}
                  value={input.price}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="card-footer">
          <button type="submit" className="btn btn-primary">
            {!loading ? (
              "Kaydet"
            ) : (
              <FontAwesomeIcon icon={["fas", "spinner"]} spin />
            )}
          </button>
          <Link to={link} className="btn btn-default float-right">
            İptal
          </Link>
        </div>
      </fieldset>
    </form>
  );
}
