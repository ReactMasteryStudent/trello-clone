import React from "react";
import { ColumnList } from "../../components/Column/ColumnList";
//import { useParams } from "react-router-dom";
import { HeaderBoard } from "../../components/header-board/HeaderBoard";

const TabDetail = () => {
  //const params = useParams();
  return (
    <>
      <HeaderBoard />
      <div className="wrapper">
        <ColumnList />
      </div>
    </>  
  );
};

export default TabDetail;
