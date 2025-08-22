import { useState } from "react";
import { ModelProvider } from "./modules/contexts/ModelContext";

import Footer from "./components/layouts/footer";
import NavigationRoutes from "./routes/navigation";
import { useLocation, useNavigate } from "react-router-dom";
import Dock from "./components/ui/Dock";
import { Settings, Sparkles } from "lucide-react";
import Home from "./pages/home/home";
import Navbar from "./components/layouts/navbar";
import {
  ClerkProvider,
  SignIn,
  SignInButton,
  SignedIn,
  SignedOut,
} from "@clerk/clerk-react";

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

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
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <SignedOut>
        <div className="flex flex-col justify-center w-screen h-screen items-center bg-[#ff5400]">
          <Navbar />
          <Home />
          <Footer />
        </div>
      </SignedOut>

      <SignedIn>
        <ModelProvider>
          <div className="h-fit min-h-screen h-full relative w-screen overflow-hidden bg-[#ff5400] md:p-0 flex flex-col items-center justify-between">
            <Navbar />
            <NavigationRoutes />
            <Footer />
          </div>
        </ModelProvider>
      </SignedIn>
    </ClerkProvider>
  );
}

export default App;
