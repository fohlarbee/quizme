"use client";
import React from 'react'
import Quizcard from './Quizcard'
import Placeholder from './Placeholder';
import useGlobalContextProvider from '../context/ContextApi';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const QuizesArea = () => {
  const {allQuizzes, userObj}  = useGlobalContextProvider();
  const {user} = userObj;
  const router = useRouter();

  return (
    <div className='poppins mx-12 mt-10'>
      <div>
        {user.isLoggedIn && (
          <>
          {
          allQuizzes.length === 0 ? (
            <Placeholder/>
          ):
          (
            <div>
              <h2 className='text-xl font-bold'>My Quizzes</h2>
              <div className='mt-6 flex gap-2 flex-wrap'>
                <div className='flex flex-wrap gap-2'>
                 
                  {allQuizzes.map((quiz, index) => (
                  <Quizcard key={index} quiz={quiz}/>
                    ))}
                </div>
                <div onClick={() => router.push('/quiz-build')}
                  className='cursor-pointer justify-center items-center rounded-[10px]
                  w-[230px] flex flex-col gap-2 border border-gray-100 bg-[#fff] p-4
                  shadow-lg hover:shadow-2xl transition duration-300 ease-in-out'
                    >
                      <Image src='/plus.svg' width={130} height={130} alt='plus icon'/>
                      <span className='select-none opacity-40'>
                        Add a new Quiz
                      </span> 
                </div> 
                

                </div>

              </div> 
           
          
          )}
          </>
        )} 
        
    </div>
    </div>
  )
}

export default QuizesArea

