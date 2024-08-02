import React from "react";
import ClientError from "../../component/error/ClientError";

const ClientErrorPage = () => {
  return (
    <div className="min-h-[calc(100vh-9rem)] flex flex-col">
      <ClientError />
    </div>
  );
};

export default ClientErrorPage;
