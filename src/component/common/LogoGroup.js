import React from "react";
import { Link } from "react-router-dom";

const LogoGroup = () => {
  return (
    <h1 className="text-2xl font-bold  flex-1">
    <Link to="/home" className="text-2xl mb-5 font-bold">
      <img src={`${process.env.PUBLIC_URL}/images/logo.svg`} className="h-12 m-auto" alt="Logo" />
    </Link>
  </h1>
  );
};

export default LogoGroup;
