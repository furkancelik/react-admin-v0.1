import React from "react";
import ContentHeader from "../../components/Layout/ContentHeader";
import Card from "../../components/Layout/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import Form from "./_form";
import { useQuery, useMutation } from "react-apollo-hooks";
import { PRODUCT } from "../../store/queries";

export default function ProductCreate({ history }) {
  const title = "Yeni Stok Ekle";
  const link = "/product";

  const [createItem] = useMutation(PRODUCT.create);

  async function onSubmit(input) {
    try {
      await createItem({
        variables: { data: input },
        refetchQueries: [{ query: PRODUCT.data }]
      });
      history.push(link, {
        flashMessage: {
          type: "success",
          title: "Başarıyla Kaydedildi"
        }
      });
    } catch (error) {
      alert(
        `Beklenmedik bir hata meydana geldi ve işleminiz gerçekleştirilemedi!\n ${error}`
      );
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
                <Form link={link} onSubmit={onSubmit} />
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
