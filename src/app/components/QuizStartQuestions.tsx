"use client"
import { useEffect, useState } from "react";
import useGlobalContextProvider from "../context/ContextApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import ScoreComponent from "./ScoreComponent";
import toast from 'react-hot-toast'



export const QuizStartQuestions = () => {
    const { 
        allQuizzes, 
        quizToStartObj, 
        setAllQuizzes,
        timerObj, 
        isQuizEnded, 
        setIsQuizEnded,
        userObj
     } = useGlobalContextProvider();
    const {timer, setTimer, setParentTimer}  = timerObj
    const { selectQuizToStart } = quizToStartObj;
    const quizQuestions = selectQuizToStart?.quizQuestions;
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [indexOfSelectedQuiz, setIndexOfSelectedQuiz] = useState<number | null>(null);
    const  [score, setScore] = useState<number>(0);
    const {user,  setUser} = userObj; 
    let interval: NodeJS.Timeout;


    async function saveDataIntoDb(){

        // Get the current quiz id
        const id = selectQuizToStart?.id;
        const url = `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/quizzes?id=${id}`;
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({updateQuizQuestions: allQuizzes[indexOfSelectedQuiz!].quizQuestions}),
            cache: 'no-cache' as RequestCache,
        };
        try {
            const req = await fetch(url, options);
            if (!req.ok) return toast.error('An error occurred while saving the quiz data');
        } catch (error) {
            console.log(error );
            return toast.error('An error occurred while saving the quiz data');

        }
       

    }

    function startTimer(){
        clearInterval(interval);
        setTimer(30);

        interval = setInterval(() => {
            setTimer((currentTime) => {
                setParentTimer(currentTime);
                if(currentTime === 0){
                    clearInterval(interval);
                    return 0;
                }
                return currentTime - 1;
            });
        }, 1000)
    }

    useEffect(() => {
      startTimer();
    
      return () => {
        clearInterval(interval);
      }
    }, [currentQuestionIndex]);

    useEffect(() => {
        if (timer === 0 && !isQuizEnded){
            
            // update allquizes
            
            const currentQuizzes = [...allQuizzes];
            if (indexOfSelectedQuiz === null){
                return;
                // const newQuizIndex = currentQuizzes.findIndex(
                //     (quiz) => quiz.id === selectQuizToStart!.id);
                // setIndexOfSelectedQuiz(newQuizIndex);
            }
            currentQuizzes[indexOfSelectedQuiz!].quizQuestions[currentQuestionIndex]
            .statistics.totalAttempts += 1;

            currentQuizzes[indexOfSelectedQuiz!].quizQuestions[currentQuestionIndex]
            .statistics.incorrectAttempts += 1;

            setAllQuizzes(currentQuizzes);
            if (currentQuestionIndex !== quizQuestions!.length - 1){
                setTimeout(() => {
                    setCurrentQuestionIndex((current) => {
                        return current + 1;
                    })
                }, 1000);
            }else {
                setIsQuizEnded(true);
                clearInterval(interval);
            }
        }
    },[timer] )

    useEffect(() => {
      if (timer === 0){
        if (currentQuestionIndex !== quizQuestions!.length - 1){
            setTimeout(() => {
                setCurrentQuestionIndex((current) => {
                    return current + 1;
                })
            }, 1000);
        }
      }
    
      
    }, [timer])
    
    useEffect(() => {
        const quizIndexFound = allQuizzes.findIndex(
            (quiz) => quiz.id === selectQuizToStart?.id
        );

        setIndexOfSelectedQuiz(quizIndexFound);

    },[]);

    useEffect(() => {
        if (isQuizEnded){
            //reinitialize all answers to -1
            quizQuestions?.forEach((question) => {
                question.answeredResult = -1;
            });
            toast.custom('Quiz Ended');
            saveDataIntoDb();
            return;

        }
    }, [quizQuestions, isQuizEnded]);


    async function handleNextQuestion(){
        if(allQuizzes[indexOfSelectedQuiz!].quizQuestions[currentQuestionIndex]
            .answeredResult === -1){
                toast.custom('Please select an answer');
                return;
        }

        // update the statistics of the question
        // *************************************
        // update the total attempts
        allQuizzes[indexOfSelectedQuiz!].quizQuestions[currentQuestionIndex]
        .statistics.totalAttempts += 1;

        //****************************************************************  */

        // check if the selected answer is correct
        if(allQuizzes[indexOfSelectedQuiz!].quizQuestions[currentQuestionIndex]
            .answeredResult !==
            allQuizzes[indexOfSelectedQuiz!].quizQuestions[currentQuestionIndex]
            .correctAnswer
        ){
            // update the incorrect attempts
            allQuizzes[indexOfSelectedQuiz!].quizQuestions[currentQuestionIndex]
            .statistics.incorrectAttempts += 1;
            toast.error('Incorrect Answer!');

            // if the answer is incorrect, go to the next question only
            // if we are not at the last question
            if (currentQuestionIndex !== quizQuestions!.length - 1){
                setTimeout(() => {
                    setCurrentQuestionIndex((current) => current + 1);
                    // initialize the choice after going to the next question
                    setSelectedOption(null);
                }, 1200);
            }else{
                // if we select the wrong choice and we are at the end of the quiz
                setTimer(0);
                clearInterval(interval);
                setIsQuizEnded(true);
            }
            return;
        }
        
        // update the correct attempts
        allQuizzes[indexOfSelectedQuiz!].quizQuestions[currentQuestionIndex]
        .statistics.correctAttempts += 1;

        //incement the score by 1
        // const value = allQuizzes[indexOfSelectedQuiz!].score += 1;
        setScore((prevState) => prevState + 1);


          
        
        //is quiz ended 
        if ((!quizQuestions || currentQuestionIndex === quizQuestions.length - 1) &&
        allQuizzes[indexOfSelectedQuiz!].quizQuestions[currentQuestionIndex]
        .answeredResult === allQuizzes[indexOfSelectedQuiz!].quizQuestions[currentQuestionIndex]
        .correctAnswer){
            toast.success('Correct Answer!');
            await addExperience()
            setTimer(0);
            clearInterval(interval);
            setIsQuizEnded(true);
            return;
        } 

        // Print a correct answer, increment the currentIndex and move to the next question
        toast.success('Correct Answer!');
        await addExperience();
        setSelectedOption(null);
        setCurrentQuestionIndex((current) => current + 1);
      

    }

    function handlePreviousQuestion(){
        setSelectedOption(null);
  
        if (!quizQuestions || currentQuestionIndex === 0) return;

        setCurrentQuestionIndex((current) => current - 1);
    }

    function selectOptionFunction(indexClicked:number){
        setSelectedOption(indexClicked);
        const currentAllQuizes = [ ...allQuizzes ];

            currentAllQuizes[indexOfSelectedQuiz!].quizQuestions[
                currentQuestionIndex
            ].answeredResult = indexClicked;

        setAllQuizzes(currentAllQuizes);
        
    }

    async function addExperience  (){
        const userCopy = user;
        userCopy.experience = userCopy.experience + 1;

        const url = `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/user?id=${userCopy.id}`;
        const options = {
            method: 'PUT',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({updateUser: userCopy})
        }

        try {
            const response = await fetch(url, options);
            if (!response.ok) return toast.error('An error occurred while updating the user experience');
            setUser(userCopy); 
        } catch (error) {
            console.log(error);
            return toast.error('An error occurred while updating the user experience');
            
        }
    }
    return (
        <>
        {isQuizEnded ? (
            <ScoreComponent
            score={score}
            setScore={setScore}
            setCurrentQuestionIndex={setCurrentQuestionIndex}
            setIndexOfQuizSelected={setIndexOfSelectedQuiz}
            setSelectedOption={setSelectedOption}



            />
        )
        :
        (
            <>
            <div className='poppins rounded-xl m-9 w-full md:m-0 lg:w-9/12 border border-[#5DB996] py-5 shadow-lg border-opacity-5' >
            
            {quizQuestions && quizQuestions[currentQuestionIndex] && (
                <div className='flex ml-11 mb-5 items-center gap-2'>
                    <div className='bg-green-700 flex justify-center items-center rounded-md w-11 h-11 text-[#fff] p-3'>
                        {currentQuestionIndex + 1}
                    </div>
                    <p className="mr-3">
                        {quizQuestions[currentQuestionIndex].mainQuestion}
                        <br/>
                    </p>
                </div>
            )}
            <div 
            className='flex flex-col gap-2 group'>
                {quizQuestions && quizQuestions[currentQuestionIndex].options.map((option, index) => (
                     <div
                     onClick={() => selectOptionFunction(index)}

                      key={index} 
                      className={`
                      p-3 ml-11 w-10/12 border 
                      border-green-200 border-opacity-100 
                      rounded-md  hover:bg-green-700 
                      hover:text-[#fff] transition-all 
                      duration-300 ease-in-out select-none
                      ${selectedOption === index ? 'bg-green-700 text-[#fff]' : 'bg-[#fff]'}
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
                <button 
                disabled={isQuizEnded ? true : false}
                onClick={handleNextQuestion} 
                className={`p-2 px-5 text-[15px] text-[#fff] 
                rounded-md bg-green-700 md:mr-[30px] mr-[20px]
                 ${isQuizEnded ? 'opacity-60' : 'opacity-100'}`}>
                    {quizQuestions && currentQuestionIndex === quizQuestions?.length - 1 ? 'Submit' : 'Next Question'}
                </button>

            </div>

        </div>

            </>
        )}
        
        </>
    )
 }

 