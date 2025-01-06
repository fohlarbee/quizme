"use client";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import QuizesArea from "./components/QuizesArea";
import useGlobalContextProvider from "./context/ContextApi";
// import CustomButton from "./components/CustomButton";

export default function Home() {
  const {quizToStartObj} = useGlobalContextProvider();
  const {setSelectQuizToStart} = quizToStartObj;

  useEffect(() => {
    setSelectQuizToStart(null);
  },[])
  return (
    <div className="">
      <header>
      <Navbar/>

      </header>
     <QuizesArea/>
     {/* <CustomButton name="Submit "/> */}
    </div>
  );
}
