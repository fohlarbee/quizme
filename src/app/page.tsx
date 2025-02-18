"use client";
import React from "react";
// import Navbar from "./components/Navbar";  
// import QuizesArea from "./components/QuizesArea";
import useGlobalContextProvider from "./context/ContextApi";
// import CustomNavbar from "./components/CustomNavbar";
import Homepage from "./components/Homepage";
// import CustomNavbar from "./components/CustomNavbar";

export default function Home() {
  const {quizToStartObj} = useGlobalContextProvider();
  const {setSelectQuizToStart} = quizToStartObj;


  

  React.useEffect(() => {
    setSelectQuizToStart(null);
  },[])
  return ( 

      <div className="w-full relative">
        <header>
        {/* <Navbar/> */}

        </header>
      {/* <DropDown  />  */}

      {/* <CustomNavbar/> */}
      <Homepage/>
      {/* <QuizesArea/> */}


      </div>

  );
}
