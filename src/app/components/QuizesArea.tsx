"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import useGlobalContextProvider from '../context/ContextApi';
import Quizcard from './Quizcard';
import Placeholder from './Placeholder';
import Image from 'next/image';
import DropDown from './DropDown';

const QuizesArea: React.FC = () => {
  const { userObj, allQuizzes } = useGlobalContextProvider();
  const { user, setUser } = userObj;
  const router = useRouter();

  return (
    <div className='poppins mx-12 mt-8 flex-wrap items-center justify-center flex-1'>
      <div>
        {user.isLoggedIn ? (
          <>
            {allQuizzes.length === 0 ? (
              <Placeholder />
            ) : (
              <div className=''>
                <DropDown />
                <h2 className='text-xl font-bold'>My Quizzes</h2>
                <div className='mt-6 flex gap-2 flex-wrap w-full flex-row items-center justify-center'>
                  <div className='flex flex-wrap gap-2 flex-row w-full'>
                    {allQuizzes.map((quiz, index) => (
                      <Quizcard key={index} quiz={quiz} />
                    ))}
                    <div
                      onClick={() => router.push('/quiz-build')}
                      className='flex-[1_1_30%] cursor-pointer justify-center items-center rounded-[10px] w-full h-[320px] sm:w-1/2 md:w-1/3 lg:w-1/4 flex flex-col gap-2 border border-gray-100 bg-[#fff] p-4 shadow-lg hover:shadow-2xl transition duration-300 ease-in-out'
                    >
                      <Image src='/plus.svg' width={130} height={130} alt='plus icon' />
                      <span className='select-none opacity-40'>Add a new Quiz</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        ): (
          <div className='h-[80vh] flex flex-col items-center justify-center gap-4'>
            <h2 className='font-bold text-5xl text-center'>
              Build up your learning 10x
              <span className='text-[#15803d]'> Faster!</span>
            </h2>
            <span className='text-center'>Unlock your potentials with personalized Quizes</span>
            <button
              onClick={() => setUser((prevUser) => ({...prevUser, isLoggedIn: true}))}
              className='p-4 bg-[#15803d] text-[#fff] rounded-md'
              >
              Get Started Now!
            </button>

          </div>
        )
      }
      </div>
    </div>
  );
};

export default QuizesArea;


// flex flex-row gap-4 flex-wrap bg-red-200 items-center justify-center