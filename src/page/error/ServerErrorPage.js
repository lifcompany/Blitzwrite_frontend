import React from "react";
import Header from "../../component/common/header";
import ServerError from "../../component/error/ServerError";

const ServerErrorPage = () => {
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <ServerError />
    </div>
  );
};

export default ServerErrorPage;
