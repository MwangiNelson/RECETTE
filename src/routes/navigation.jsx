import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/home/home";
import GenRecipePage from "../pages/generate/RecipeGenerator";
import LoadingScreen from "../components/layouts/LoadingScreen";

const NavigationRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/loading-screen" element={<LoadingScreen />} />
      <Route path="/generate" element={<GenRecipePage />} />
    </Routes>
  );
};

export default NavigationRoutes;
