import React from 'react';
import { faEllipsis, faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useGlobalContextProvider, { Quiz } from '../context/ContextApi';
import Link from 'next/link';
 
function successRate(quiz: Quiz) {
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

const Quizcard = ({ quiz }: { quiz: Quiz }) => {
  const { quizTitle, quizQuestions, icon } = quiz;
  const totalQuestions = quizQuestions.length;
  const globalSuccessRate = successRate(quiz);
  const { 
    quizToStartObj, 
    setIsQuizEnded, 
    dropDownToggleObj, 
    ellipsisObj,
    selectedQuizObj 
  } = useGlobalContextProvider();
  const {setDropDownToggle} = dropDownToggleObj;
  const {setEllipsis} = ellipsisObj;
  const { setSelectedQuiz}  = selectedQuizObj;


  function beginQuiz() {
    setIsQuizEnded(false);
    quizToStartObj.setSelectQuizToStart(quiz);
  };
  function openDropDownMenu(e: React.MouseEvent){
    const xPos = e.clientX;
    const yPos = e.clientY
    setEllipsis({x:xPos, y:yPos}); 

    if (e) e.stopPropagation();
    setDropDownToggle(true);
    setSelectedQuiz(quiz);
  }

  return (
    <div className=' sm:flex-[1_0_30%] md::flex-[2_2_30%] flex-shrink-0 rounded-[10px] flex flex-col gap-2 border border-gray-300 bg-white p-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 h-[320px] p'>
      <div className='relative bg-green-700 w-full h-32 flex justify-center items-center rounded-md'>
        <div className='absolute cursor-pointer top-3 right-3'>
          <FontAwesomeIcon onClick={(e) => openDropDownMenu(e)} icon={faEllipsis} className='text-white' />

        </div>
        <FontAwesomeIcon 
        icon={icon}  width={50} height={50} className='md:w-16 md:h-16  w-8 h-8 text-[#fff]' />
      </div>
      <div className='flex flex-col gap-2'>
        <h3 className='text-lg font-bold text-gray-900'>{quizTitle}</h3>
        <p className='text-sm text-gray-600'>Questions: {totalQuestions}</p>
        <p className='text-sm text-gray-600'>Success Rate: {globalSuccessRate}%</p>
        <button
          onClick={beginQuiz}
          className='mt-2 bg-green-700 text-white py-2 px-4 rounded-md hover:bg-green-800 transition duration-300'
        >
            <Link href='/quiz-start'>
            <FontAwesomeIcon icon={faPlay} className='mr-2' />
            Start Quiz
            </Link>
         
        </button>
      </div>
    </div>
  );
};

export default Quizcard;