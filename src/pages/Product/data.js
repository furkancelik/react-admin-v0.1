import React from "react";
import ContentHeader from "../../components/Layout/ContentHeader";
import Card from "../../components/Layout/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactTable from "../../include/ReactTable";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import { PRODUCT } from "../../store/queries";
import { useQuery, useMutation } from "react-apollo-hooks";
import { PUBLIC_DIR } from "../../config";
export default function ProductData({ location }) {
  const title = "Stok Yönetimi";
  const link = "/product";
  const { data, error, loading } = useQuery(PRODUCT.data);
  const [remove] = useMutation(PRODUCT.remove);

  function removeItem(id) {
    return async function(e) {
      e.preventDefault();
      if (window.confirm("Silmek istediğinize eminmisniz?")) {
        try {
          await remove({
            variables: { id },
            optimisticResponse: {
              removeProduct: true
            },
            update: state => {
              const { products } = state.readQuery({
                query: PRODUCT.data
              });
              state.writeQuery({
                query: PRODUCT.data,
                data: {
                  products: products.filter(({ id: itemId }) => id !== itemId)
                }
              });
            }
          });
        } catch (error) {
          alert(
            `Beklenmedik bir hata meydana geldi ve işleminiz gerçekleştirilemedi!\n ${error}`
          );
        }
      }
    };
  }

  return (
    <Layout>
      <ContentHeader title={title} />
      <div className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <Card
                title={title}
                buttons={() => {
                  return (
                    <Link
                      className={"btn btn-primary btn-sm"}
                      to={`${link}/create`}>
                      Yeni Ekle
                    </Link>
                  );
                }}>
                <ReactTable
                  loading={loading}
                  data={data && data.products}
                  columns={[
                    {
                      Header: "",
                      accessor: "images",
                      Cell: ({ value }) => {
                        let image = "";
                        if (value.length > 0) {
                          if (value[0]) {
                            image = PUBLIC_DIR(value[0]);
                          } else {
                            image = "/no-product.png";
                          }
                        } else {
                          image = "/no-product.png";
                        }
                        return (
                          <img
                            src={image}
                            className={"img-fluid rounded mx-auto d-block"}
                            style={{ height: 80 }}
                          />
                        );
                      }
                    },
                    {
                      Header: "Ürün",
                      accessor: "name"
                    },
                    {
                      Header: "Barkod",
                      accessor: "barcode"
                    },
                    {
                      Header: "Stok",
                      accessor: "stock"
                    },
                    {
                      Header: "Fiyat",
                      accessor: "price"
                    },
                    {
                      Header: "İşlemler",
                      accessor: "id",
                      Cell: ({ value, original }) => (
                        <>
                          <Link
                            className={"btn btn-primary btn-sm mr-2"}
                            to={{
                              pathname: `${link}/edit/${value}`
                            }}>
                            <FontAwesomeIcon icon={["fas", "edit"]} /> Düzenle
                          </Link>
                          <Link
                            className={"btn btn-primary btn-sm mr-2"}
                            to={{
                              pathname: `${link}/detail/${value}`
                            }}>
                            <FontAwesomeIcon icon={["fas", "eye"]} /> Detay
                          </Link>
                          <button
                            data-id={value}
                            className={"btn btn-danger btn-sm mr-2"}
                            onClick={removeItem(value)}>
                            <FontAwesomeIcon icon={["fas", "trash"]} /> Sil
                          </button>
                        </>
                      )
                    }
                  ]}
                />
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
