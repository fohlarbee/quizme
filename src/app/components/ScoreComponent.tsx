import React from 'react'
import useGlobalContextProvider from '../context/ContextApi';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faXmarkCircle } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

type ScoreComponentProps = {
    setIndexOfQuizSelected: React.Dispatch<React.SetStateAction<number |null>>;
    setCurrentQuestionIndex: React.Dispatch<React.SetStateAction<number>>;
    setSelectedOption: React.Dispatch<React.SetStateAction<number | null>>;
    setScore: React.Dispatch<React.SetStateAction<number>>;
    score: number

}
const ScoreComponent: React.FC<ScoreComponentProps> = ({
    setIndexOfQuizSelected,
    setCurrentQuestionIndex,
    setSelectedOption,
    setScore,
    score
}) => {
    const {quizToStartObj, allQuizzes, setIsQuizEnded } = useGlobalContextProvider();
    const {selectQuizToStart} = quizToStartObj;
    const numOfQuestions = selectQuizToStart?.quizQuestions.length;

    function emojiIconScore(){
        const emojiFaces = [
            "confused-emoji.svg",
            "happy-emoji.svg",
            "very-happy-emoji.svg"
        ];
        const result = (score / selectQuizToStart!.quizQuestions.length) * 100;
        if (result < 25) return emojiFaces[0];
        if (result <= 50) return emojiFaces[1];
        return emojiFaces[2];
    }


    function tryAgain(){
        const newQuizIndex = allQuizzes.findIndex(
            (quiz) => quiz.id === selectQuizToStart!.id);
        
            setIndexOfQuizSelected(newQuizIndex);
            setCurrentQuestionIndex(0);  
            setSelectedOption(null);
            setScore(0);
            setIsQuizEnded(false);
    }

  return (
    <div 
    className='flex items-center rounded-md w-9/12 md:w-[450px] md:h-[450px] justify-center
     border-sm py-5 px-4 shadow-lg border-opacity-5'>
        <div className='flex gap-4 items-center justify-center flex-col'>
            <Image src={`/${emojiIconScore()}`} width={100} height={100} alt=''/>
            <div className='flex gap-1 flex-col'>
                <span className='font-bold text-2xl'>
                    Your Score:
                </span>
                <h3 className='text-[22px] text-center'>
                    {score}/{numOfQuestions}
                </h3>

            </div>
            <button
            onClick={tryAgain}
            className='p-2 bg-green-700 hover:bg-green-900 rounded-md text-[#fff] px-6'
            >
                Try Again
            </button>
            {/* statistics */}
            <div className='w-full flex gap-2 flex-col mt-3'>
                <div className='flex gap-1 items-center justify-center flex-row'>
                    <FontAwesomeIcon icon={faXmarkCircle} className='text-red-400' width={20} height={20}/>
                    <span className='text-[14px]'>
                        Correct Answers: {score}
                    </span>

                </div> 
                <div className='flex gap-1 items-center justify-center'>
                    <FontAwesomeIcon icon={faCheckCircle} width={20} height={20} className='text-green-500'/>
                    <span className='text-[14px]'>
                        Inorrect Answers: {selectQuizToStart!.quizQuestions.length - score}
                    </span> 

                </div>
            </div>

            <Link 
              className='text-[12px] text-green-700 hover:text-green-400 underline mb-5'
              href='/'> Select another quiz

            </Link>

        </div>

    </div>
  )
}

export default ScoreComponent