import React from 'react';
import { faEllipsis, faPlay} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import useGlobalContextProvider, { Quiz } from '../context/ContextApi';
import Link from 'next/link';

function successRate(quiz:Quiz){
    let correctQuestions = 0;
    let totalAttempts = 0;
    let successRate = 0;

    quiz.quizQuestions.forEach((question) => {
        totalAttempts += question.statistics.totalAttempts;
        correctQuestions += question.statistics.correctAttempts;
    });

    successRate = Math.ceil((correctQuestions / totalAttempts) * 100);
    return successRate;
}

const Quizcard = ({quiz}: {quiz:Quiz}) => {
    const {quizTitle, quizQuestions, icon} = quiz;
    const totalQuestions = quizQuestions.length;
    const globalSuccessRate = successRate(quiz);
    const {quizToStartObj} : {quizToStartObj:
        {
            selectQuizToStart: Quiz | null,
            setSelectQuizToStart: React.Dispatch<React.SetStateAction<Quiz | null>>

            
    }} = useGlobalContextProvider();
  return (
    <div className='rounded-[10px] flex flex-col gap-2 border border-gray-300 bg-[#fff] p-4 '>
        <div className='relative bg-green-700 w-full h-32 flex justify-center items-center rounded-md'>
            <div className='absolute cursor-pointer top-3 right-3'>
                <FontAwesomeIcon 
                icon={faEllipsis} 
                className='text-[#fff] text-2xl'
                height={13}
                width={13}
                />

            </div>
            <FontAwesomeIcon
            icon={icon}
            width={80}
            height={80}
            className='text-[#fff] text-3xl'
            />
        </div>
        <h3 className='poppins font-bold'>{quizTitle}</h3>
        <p className='text-sm font-light'>{totalQuestions} Question(s)</p>
        <div className='flex gap-3'>
            <div className='flex gap-1 items-center'>
                <Image src="success.svg" width={20} height={20} alt='' />
                <span className='poppins text-[12px]'>Success rate: {globalSuccessRate}%</span>

            </div>
            <div onClick={() => quizToStartObj.setSelectQuizToStart(quiz) }
            className='rounded-full w-7 h-7 bg-green-700 flex items-center justify-center cursor-pointer'>
                <Link href="/quiz-start">
                    <FontAwesomeIcon 
                    icon={faPlay} 
                    className='text-[#fff] text-1xl'
                    height={16}
                    width={16}
                    />
                </Link>

            </div>
        </div>

    </div>
  )
}

export default Quizcard