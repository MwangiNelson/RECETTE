import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="w-full border-b border-gray-900 absolute top-0 left-0">
      <div className="flex justify-between items-center">
        <Link to="/">
          <div className="flex items-center bg-yellow-300 p-4 px-6">
            <h3 className="text-3xl font-bold">RECETTE</h3>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
