import React from "react";
import { Link } from "react-router-dom";
import { Home, Sparkles, Settings, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Dock from "../ui/Dock";

const Navbar = () => {
  const navigate = useNavigate();
  const items = [
    {
      label: "Home",
      icon: <Home />,
      path: "/",
    },
    {
      label: "Generate",
      icon: <Sparkles />,
      path: "/generate",
    },
    {
      label: "Settings",
      icon: <Settings />,
      path: "/settings",
    },
  ];
  return (
    <div className="w-full flex flex-row justify-between items-center border-b border-gray-900">
      <div className="flex justify-between items-center bg-yellow-300">
        <Link to="/">
          <div className="flex items-center  p-4 px-6">
            <h3 className="text-3xl font-bold">RECETTE</h3>
          </div>
        </Link>
      </div>
      <div className="hidden md:flex flex-row items-center">
        {items.map((item) => (
          <div key={item.label} className="flex items-center  px-6">
            <Link to={item.path}>
              <div className="flex items-center gap-2 text-white">
                {item.icon} {item.label}
              </div>
            </Link>
          </div>
        ))}
      </div>
      <div className="flex md:hidden">
        <Menu size={24} />
      </div>

      <div className="flex"></div>
    </div>
  );
};

export default Navbar;
