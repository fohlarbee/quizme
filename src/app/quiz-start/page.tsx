 "use client"
import React, { useEffect } from 'react';
import  useGlobalContextProvider  from '@/app/context/ContextApi';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { QuizStartHeader } from '../components/QuizStartHeader';
import { QuizStartQuestions } from '../components/QuizStartQuestions';

 
 function Page(){
    const { quizToStartObj} = useGlobalContextProvider(); 
    const {selectQuizToStart} = quizToStartObj   
    const router = useRouter();

    useEffect(() => {
        if (selectQuizToStart === null){
            router.push('/quiz');
        }
    }, []);


    return (
        <div className='poppins flex flex-col md:px-24 mt-[34px]'>
            {selectQuizToStart === null ? (
                <div className=' w-full h-full flex flex-col gap-2 text-center'>
                    <div className='flex text-center justify-center items-center py-5 mt-12'>
                        <div className='md:w-[140px] md:h-[140px] w-[100px] h-[100px] shadow-lg border-opacity-5 rounded-xl text-center items-center justify-center'>
                          <Image src="/warning.png" width={110} height={110} alt='' className='text-center mx-auto md:w-[120px] w-[80px]' />
                        </div>
                    </div>
                    <h2 className='md:text-xl font-bold'>
                        Please select a quiz to start...
                    </h2>
                    <span className='font-light md:font-lg text-sm'>
                        You will be redirected to the home page in 5 seconds
                    </span>
                </div>
            ): (
                <>
                    <QuizStartHeader/>
                    <div className='mt-10 flex items-center justify-center w-full'>
                        <QuizStartQuestions />
                    </div>
                </>
            )}
        </div>
    )
} 
export default Page;