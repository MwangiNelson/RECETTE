import React, { useState, useEffect, useContext } from "react";
import "react-toastify/dist/ReactToastify.css";
import Eggs from "../../assets/EGGS.png";
import "./home.css";
import { Link } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import { useBreakpoint } from "@ant-design/pro-components";

function Home() {
  const yellowControls = useAnimation();
  const textControls = useAnimation();
  const gridControls = useAnimation();
  const imgControls = useAnimation();
  const screens = useBreakpoint();

  useEffect(() => {
    async function sequence() {
      await yellowControls.start("visible");
      await textControls.start("visible");
      await gridControls.start("visible");
      await imgControls.start("visible");
    }
    sequence();
  }, [yellowControls, textControls, gridControls, imgControls]);

  const yellowVariants = {
    hidden: { width: "10vw", opacity: 0 },
    visible: {
      width: screens.xs || screens.sm ? "90vw" : "75vw", // on small screen width should be 90vw else 75vw
      opacity: 1,
      transition: { duration: 0.8, ease: "easeInOut" },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const gridVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const imgVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  return (
    <div className="h-full relative w-full flex flex-col items-center justify-center rounded-lg min-h-[calc(100vh-100px)] p-3 md:p-0">
      <motion.div
        className="w-11/12 md:w-3/4 bg-yellow-300 relative border items-center justify-center flex flex-col border-black h-fit min-h-[20vh] md:min-h-[40vh]"
        variants={yellowVariants}
        initial="hidden"
        animate={yellowControls}
        style={{ overflow: "hidden" }}
      >
        <motion.div
          className="flex flex-row w-3/4 items-center justify-center gap-2"
          variants={textVariants}
          initial="hidden"
          animate={textControls}
        >
          <div className="w-full border-black border-[1px] h-[1px] animate-grow-on-load" />
          <h1 className="text-3xl md:text-5xl font-bold ">RECETTE</h1>
          <div className="w-full border-black border-[1px] h-[1px] animate-grow-on-load" />
        </motion.div>
      </motion.div>
      <motion.img
        src={Eggs}
        alt="Eggs"
        className="w-[35vw] md:w-[10vw] absolute animate-animateCook object-contain left-10 md:left-40 top-25 md:top-40 z-[99]"
        variants={imgVariants}
        initial="hidden"
        animate={imgControls}
      />
      <motion.div
        className="hero-grid !w-3/4"
        variants={gridVariants}
        initial="hidden"
        animate={gridControls}
      >
        <div className="grid-text browse cursor-pointer hover:text-gray-400">
          <h3>BROWSE</h3>
        </div>
        <div className="grid-text generate cursor-pointer hover:text-gray-400">
          <h3>GENERATE</h3>
        </div>
        <div className="grid-btn">
          <Link to="/generate" style={{ width: "75%" }}>
            <button className="btn-hero">
              GET STARTED <i className="fa-solid fa-angles-right blue"></i>
            </button>
          </Link>
        </div>
        <div className="grid-summary">
          <h2>250+</h2>
          <p>Recipes</p>
        </div>
      </motion.div>
    </div>
  );
}

export default Home;
