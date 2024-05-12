import React from "react";
import { useNavigate, Link } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate(); // Hook to get the navigate function

  return (
    <header className="pt-12">
      <nav className="flex justify-between items-center border-b-2 border-gray-200 pb-2 px-20">
        <h1 className="text-2xl mb-5 font-bold">
          <Link to="/" className="text-2xl mb-5 font-bold">
            <img alt="Logo" src="images/logo.svg" className="h-10" />
          </Link>
        </h1>
        <div className="navbar">
          <button
            onClick={() => navigate("/output")}
            className="mr-4 text-blue-500 hover:text-blue-700 hover:underline decoration-blue-700"
          >
            出力した記事
          </button>
          <button
            onClick={() => navigate("/setting")}
            className="mr-4 text-blue-500 hover:text-blue-700 hover:underline decoration-blue-700"
          >
            設定
          </button>
          <a
            href="https://docs.google.com/spreadsheets/d/1KBuz0tSocys6kA0en05gIjLO9U_ZUMWhVIK8ySZ8nXU/edit#gid=1894772142"
            target="_blank"
            className="text-blue-500 hover:text-blue-700 hover:underline decoration-blue-700"
            rel="noopener noreferrer"
          >
            スプレッドシート
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Header;
