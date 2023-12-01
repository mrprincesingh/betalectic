
import React from "react";
import { Link } from "react-router-dom";

interface WelcomeProps {
  onClickAdd: () => void;
}

const Welcome: React.FC<WelcomeProps> = ({ onClickAdd }) => {
  return (
    <div className="text-center mt-8">
    <h1 className="text-4xl font-bold mb-4 text-blue-700">
 NPM Packages
</h1>
<div
  className="flex flex-col items-center justify-center border-dotted border border-gray-500 p-4"
  style={{
    height: "400px",
    margin: "70px auto",
    borderWidth: "2px",
    width: "80%", 
    maxWidth: "600px",
  }}
>
  <span className="mb-4 mt-4 text-center">
    You don't have any favorites yet.
  </span>
  <Link to="/add">
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
      onClick={onClickAdd}
    >
      Add Favorite
    </button>
  </Link>
</div>

    </div>
  );
};

export default Welcome;
