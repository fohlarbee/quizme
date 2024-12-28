"use client"
import { useEffect, useState } from "react";
import useGlobalContextProvider from "../context/ContextApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
export const QuizStartQuestions = () => {
    const { allQuizzes, quizToStartObj } = useGlobalContextProvider();
    const { selectQuizToStart } = quizToStartObj;
    const quizQuestions = selectQuizToStart?.quizQuestions;
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [indexOfSelectedQuiz, setIndexOfSelectedQuiz] = useState<number | null>(null);
    const [isQuizEnded,  setIsQuizEnded] = useState<boolean>(false);


    useEffect(() => {
        const quizIndexFound = allQuizzes.findIndex(
            (quiz) => quiz.id === selectQuizToStart?.id
        );

        setIndexOfSelectedQuiz(quizIndexFound);

    },[]);
    console.log(allQuizzes);

    useEffect(() => {
        if (isQuizEnded){
            quizQuestions?.forEach((question) => {
                question.answeredResult = - 1;
            });
            console.log("Quiz has ended");
        }
    }, [quizQuestions, isQuizEnded])
    function handleNextQuestion(){
        if (!quizQuestions || currentQuestionIndex === quizQuestions.length - 1) return;

    
        setCurrentQuestionIndex((current) => current + 1);
    }
    function handlePreviousQuestion(){
        if (!quizQuestions || currentQuestionIndex === 0) return;

        setCurrentQuestionIndex((current) => current - 1);
    }
    function selectOptionFunction(index:number){
        setSelectedOption(index);

        if (indexOfSelectedQuiz !== null) {
            const currentAllQuizes = { ...allQuizzes };

            currentAllQuizes[indexOfSelectedQuiz].quizQuestions[
                currentQuestionIndex
            ].answeredResult = index;
        }
        
    }
    return (
        <div className='poppins rounded-xl m-9 md:m-0 md:w-9/12 border border-[#5DB996] py-5 shadow-lg border-opacity-5' >
            <div className='flex ml-11 mb-5 items-center gap-2'>
                <div className='bg-green-700 flex justify-center items-center rounded-md w-11 h-11 text-[#fff] p-3'>
                    {currentQuestionIndex + 1}
                </div>
                <p className="mr-3">
                    {quizQuestions && quizQuestions[currentQuestionIndex].mainQuestion}
                    <br/>
                </p>

            </div>
            <div 
            className='flex flex-col gap-2 group'>
                {quizQuestions && quizQuestions[currentQuestionIndex].choices.map((option, index) => (
                     <div
                     onClick={() => selectOptionFunction(index)}

                      key={index} 
                      className={`
                      p-3 ml-11 w-10/12 border 
                      border-green-200 border-opacity-100 
                      rounded-md  hover:bg-green-700 
                      hover:text-[#fff] transition-all 
                      duration-300 ease-in-out select-none
                      ${selectedOption === index ? 'bg-green-700 text-[#fff]' : 'bg-[#fff] text-green-700'}
                      `}>
                     {option}
                 </div>
                ))}

            </div>
            <div className='flex mt-7 justify-between'>
                <button
                onClick={handlePreviousQuestion}
                 className="p-2 px-5 text-[15px] rounded-md">
                    <FontAwesomeIcon
                    icon={faChevronLeft}
                    width={25}
                    height={25}
                    className='text-green-700 text-[20px]'
                    />
                </button>
                <button onClick={handleNextQuestion} className='p-2 px-5 text-[15px] text-[#fff] rounded-md bg-green-700 md:mr-[30px] mr-[20px]'>
                    {quizQuestions && currentQuestionIndex === quizQuestions?.length - 1 ? 'Submit' : 'Next Question'}
                </button>

            </div>

        </div>
    )
 }