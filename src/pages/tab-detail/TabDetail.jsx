import React from "react";
import { useParams } from "react-router-dom";

const TabDetail = () => {
  const params = useParams();
  return (
    <>
      <h1>Detail Page</h1>
      <h2>{params.tabName}</h2>
      <h2>tab id : {params.tabId}</h2>
    </>
  );
};

export default TabDetail;
