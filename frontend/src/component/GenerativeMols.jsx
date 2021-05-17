import { Pagination, Modal, Spin, Alert } from "antd";
import React, { useDebugValue, useState } from "react";
import { processImage, getSimilar } from "../api/api";

export const GenerativeMols = (props) => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  let total = props.genChem.length;
  let totalPage = Math.ceil(total / pageSize);
  const [chem, setChem] = useState("");
  const [state, setState] = useState({
    similar: [],
    pageState: "Ready",
  });

  const changePageSettings = (page, pageSize) => {
    setPage(page);
    setPageSize(pageSize)
  };

  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <div>
      {state.chem}
      {total > 0 && (
        <Pagination
          showTotal={(total, range) =>
            `${range[0]}-${range[1]} of ${total} items`
          }
          total={total}
          onChange={changePageSettings}
          defaultPageSize={pageSize}
          defaultCurrent={1}
        ></Pagination>
      )}
      <div
        className={
          "d-flex flex-wrap bd-highlight example-parent justify-content-center " +
          props.className
        }
      >
        {props.genChem
          .slice((page - 1) * pageSize, page * pageSize)
          .map((item) => (
            <figure className="m-3">
              <img
                src={
                  `http://localhost:5555/get-image/gen_` +
                  item[0].replace("#", "$") +
                  `.png`
                }
                onClick={() => {
                  processImage([chem], state, setState);
                  setIsModalVisible(true);
                  setChem(item[0]);
                  getSimilar(item[0], state, setState);
                }}
              ></img>
              <figcaption className="my-2" style={{ textAlign: "center" }}>
                QED: {item[1]}
              </figcaption>
            </figure>
          ))}
      </div>

      <Modal
        title={chem}
        visible={isModalVisible}
        onOk={() => {
          setIsModalVisible(false);
          const queryParams = { Chem: chem };
          const queryString = new URLSearchParams(queryParams).toString();

          window.location.href = `/retrosynthesis?${queryString}`;
        }}
        onCancel={() => {
          setIsModalVisible(false);
          setState({ ...state, pageState: "Ready" });
        }}
        okText="Predict"
        cancelText="Cancel"
      >
        <div>
          <img style={{display:'block', margin:'auto'}}
            src={
              `http://localhost:5555/get-image/gen_` +
              chem.replace("#", "$") +
              `.png`
            }
            onClick={() => {
              processImage([chem], state, setState);
              const queryString = new URLSearchParams(chem).toString();

              window.open(
                `https://pubchem.ncbi.nlm.nih.gov/#query=${queryString}`
              );
            }}
          ></img>
        </div>
        {state.pageState === "Loading" ? (
          <Spin tip="Loading..." size="large">
            <Alert message="" description="" type="" />
          </Spin>
        ) : (
          // <h1>{state.similar}</h1>
          <ul style={{justifyContent:"center", display:"flex", "padding":'0'}}> {
          state.similar.map((number) => (
            <li style={{display:"inline-block"}}>
              {
                <img
                  src={
                    `http://localhost:5555/get-image/` +
                    number.replace("#", "$") +
                    `.png`
                  }
                  width={100}
                  height={100}
                  onClick={() => {
                    const queryString = new URLSearchParams(number).toString();

                    window.open(
                      `https://pubchem.ncbi.nlm.nih.gov/#query=${queryString}`
                    );
                  }}
                ></img>
              }
            </li>
          ))
            }</ul>
        )}
      </Modal>
    </div>
  );
};
