"use client";
import { faCode, faStopwatch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useGlobalContextProvider from "../context/ContextApi";

export const QuizStartHeader = () => {
    const { quizToStartObj } = useGlobalContextProvider();
    const { selectQuizToStart } = quizToStartObj;
    const quizTitle = selectQuizToStart?.quizTitle;
    const quizQuestions = selectQuizToStart?.quizQuestions;
    return (
        <div className='md:flex md:justify-between'>
            <div className='flex gap-2 justify-center'>
                <div className='bg-green-700 w-12 h-12 flex items-center justify-center p-2 rounded-md'>
                    <FontAwesomeIcon
                    className='text-white'
                    width={25}
                    height={25}
                    icon={faCode}
                    />
                </div>
                <div className=' flex flex-col gap-2'>
                    <h2 className='font-bold text-xl'>{quizTitle}</h2>
                    <span className='font-light text-sm'>{quizQuestions?.length} Question(s)</span>

                </div>  
            </div>
            <div className='flex gap-2 items-center justify-center mt-5 md:mt-0'>
                <FontAwesomeIcon
                className='text-green-500'
                width={20}
                height={20}
                icon={faStopwatch}
                />
                <span>00:00:30</span>
            </div>

        </div>
    )
 }