import React from "react";
//import { useParams } from "react-router-dom";
import { Column } from "../../components/Column/ColumnBoard";
import { HeaderBoard } from "../../components/header-board/HeaderBoard";

const TabDetail = () => {
  //const params = useParams();
  return (
    <>
      <HeaderBoard />
      <Column />
    </>
      
  );
};

export default TabDetail;
