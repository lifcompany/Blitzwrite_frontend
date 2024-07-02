import React from "react";
import Header from "../../component/common/header";
import ClientError from "../../component/error/ClientError";

const ClientErrorPage = () => {
  return (
    <>
      <Header />
      <ClientError />
    </>
  );
};

export default ClientErrorPage;
