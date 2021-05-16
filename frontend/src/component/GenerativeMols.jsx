import { Pagination } from "antd";
import React, { useDebugValue, useState } from "react";

export const GenerativeMols = (props) => {

    let itemPerPage = 30;
    const [page, setPage] = useState(1);
    let total = props.genChem.length;
    let totalPage = Math.ceil(total/itemPerPage)
    console.log(totalPage)

    const changePageSettings = (page, pageSize) => {
        setPage(page);
        itemPerPage = pageSize;
    }

    return (
        <div>
            { total>0 &&
                <Pagination showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`} total={total} onChange={changePageSettings} defaultPageSize={itemPerPage} defaultCurrent={1}></Pagination>
            }
            <div className={"d-flex flex-wrap bd-highlight example-parent justify-content-center " + props.className }>
                {props.genChem.slice((page-1)*itemPerPage, (page)*itemPerPage).map((item) => 
                    <figure className="m-3">
                        <img src={`http://localhost:5555/get-image/gen_`+item[0].replace("#","$")+`.png`}></img>
                        <figcaption className='my-2' style={{textAlign:"center"}}>QED: {item[1]}</figcaption>
                    </figure>
                )}
            </div>
        </div>
    )
};