"use client";
import React from "react";
import Navbar from "./components/Navbar";
import QuizesArea from "./components/QuizesArea";
import useGlobalContextProvider from "./context/ContextApi";
import CustomNavbar from "./components/CustomNavbar";
// import CustomNavbar from "./components/CustomNavbar";

export default function Home() {
  const {quizToStartObj} = useGlobalContextProvider();
  const {setSelectQuizToStart} = quizToStartObj;


  // const [isClicked, setIsClicked] = useState(false);

  // function handleClick(){
  //   setIsClicked(true);

  // } 
  // function closeToast(){
  //   setIsClicked(false);
  // 

  

  React.useEffect(() => {
    setSelectQuizToStart(null);
  },[])
  return ( 

      <div className="w-full relative">
        <header>
        <Navbar/>

        </header>
      {/* <DropDown  />  */}

      <QuizesArea/>
      <CustomNavbar/>

      {/* {isClicked ?(<CustomToast open={isClicked} onClose={closeToast}  />):null} */}
      </div>

  );
}
