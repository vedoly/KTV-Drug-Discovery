import { Pagination, Modal } from "antd";
import React, { useDebugValue, useState } from "react";

export const GenerativeMols = (props) => {
  let itemPerPage = 30;
  const [page, setPage] = useState(1);
  let total = props.genChem.length;
  let totalPage = Math.ceil(total / itemPerPage);
  console.log(totalPage);
  const [chem, setChem] = useState("");

  const changePageSettings = (page, pageSize) => {
    setPage(page);
    itemPerPage = pageSize;
  };

  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <div>
      {total > 0 && (
        <Pagination
          showTotal={(total, range) =>
            `${range[0]}-${range[1]} of ${total} items`
          }
          total={total}
          onChange={changePageSettings}
          defaultPageSize={itemPerPage}
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
          .slice((page - 1) * itemPerPage, page * itemPerPage)
          .map((item) => (
            <figure className="m-3">
              <img
                src={
                  `http://localhost:5555/get-image/gen_` +
                  item[0].replace("#", "$") +
                  `.png`
                }
                onClick={() => {
                  setIsModalVisible(true);
                  setChem(item[0]);
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
        }}
        okText="Predict"
        cancelText="Cancel"
      >
        <img
          src={
            `http://localhost:5555/get-image/gen_` +
            chem.replace("#", "$") +
            `.png`
          }
        ></img>
      </Modal>
    </div>
  );
};
