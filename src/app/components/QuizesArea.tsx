"use client";
import React from 'react'
import Quizcard from './Quizcard'
import Placeholder from './Placeholder';
import useGlobalContextProvider, { Quiz } from '../context/ContextApi';

const QuizesArea = () => {
  const {allQuizzes}: { allQuizzes: Quiz[] } = useGlobalContextProvider()

  return (
    <div className='poppins mx-12 mt-10'>
      {allQuizzes.length === 0 ? (
        <Placeholder/>
      ) : (
        <div>
          <h2 className='text-xl font-bold'>My Quizzes</h2>
          <div className='mt-6 flex gap-2 flex-wrap'>
            {allQuizzes.map((quiz, index) => (
              <Quizcard key={index} quiz={quiz}/>
            ))}
            
        </div>

        </div>
      )
    }
        
    </div>
  )
}

export default QuizesArea