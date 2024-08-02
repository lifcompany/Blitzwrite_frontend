import React from "react";
import Header from "../../component/common/header";
import ClientError from "../../component/error/ClientError";

const ClientErrorPage = () => {
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <ClientError />
    </div>
  );
};

export default ClientErrorPage;
