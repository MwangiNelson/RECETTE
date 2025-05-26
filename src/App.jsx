import { useState } from "react";
import { ModelProvider } from "./modules/contexts/ModelContext";

import Footer from "./components/layouts/footer";
import NavigationRoutes from "./routes/navigation";
import { useLocation, useNavigate } from "react-router-dom";
import Dock from "./components/ui/Dock";
import { Home, Settings, Sparkles } from "lucide-react";
import Navbar from "./components/layouts/navbar";

function App() {
  const location = useLocation();
  console.log(location.pathname);
  const navigate = useNavigate();

  const items = [
    {
      label: "Home",
      icon: <Home />,
      onClick: () => navigate("/"),
    },
    {
      label: "Generate",
      icon: <Sparkles />,
      onClick: () => navigate("/generate"),
    },
    {
      label: "Settings",
      icon: <Settings />,
      onClick: () => navigate("/settings"),
    },
  ];

  return (
    <ModelProvider>
      <div className="h-fit min-h-screen h-full relative w-screen overflow-hidden bg-[#ff5400] p-3 md:p-0 flex flex-col items-center justify-between">
        <Navbar />
        <NavigationRoutes />
        <Footer />
      </div>
    </ModelProvider>
  );
}

export default App;
