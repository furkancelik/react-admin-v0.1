import React from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default props => (
  <div className="card-body p-0">
    <ReactTable
      filterable={true}
      {...props}
      LoadingComponent={() =>
        props.loading && (
          <div
            style={{
              zIndex: 2,
              display: "flex",
              backgroundColor: "#FFFFFFEE",
              position: "absolute",
              width: "100%",
              height: "100%",
              textAlign: "center"
            }}>
            <div
              style={{
                flex: 1,
                alignSelf: "center"
              }}>
              <FontAwesomeIcon icon="spinner" spin /> Yükleniyor..
            </div>
          </div>
        )
      }
      defaultPageSize={10}
      previousText="Geri"
      nextText="İleri"
      loadingText="Yükleniyor..."
      noDataText="Kayıt Bulunamadı"
      pageText="Sayfa"
      ofText="/"
      rowsText="Satır"
    />
  </div>
);
