 import { faCode, faStopwatch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
 
 const page = () => {
   return (
     <div className='poppins flex flex-col md:px-24 mt-[34px]'>
        <QuizStartHeader/>
        <div className='mt-10 flex items-center justify-center w-full'>
            <QuizStartQuestions/>
        </div>

     </div>
   )
 }

 function QuizStartHeader(){
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
                    <h2 className='font-bold text-xl'>Algorithm Quiz</h2>
                    <span className='font-light text-sm'>20 Questions</span>

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
  
 function QuizStartQuestions(){
    return (
        <div className='poppins rounded-xl m-9 md:m-0 md:w-9/12 border border-[#5DB996] py-5 shadow-lg border-opacity-5' >
            <div className='flex ml-11 mb-5 items-center gap-2'>
                <div className='bg-green-700 flex justify-center items-center rounded-md w-11 h-11 text-[#fff] p-3'>
                    1
                </div>
                <p>
                    What is the time complexity of the following code?
                    <br/>
                    <code>
                        console.log('Hello World')
                    </code>
                </p>

            </div>
            <div className='flex flex-col gap-2'>
                <div className='p-3 ml-11 w-10/12 border-green-700 rounded-md bg-green-700 text-[#fff]'>
                    A: O(1)
                </div>
                <div className='p-3 ml-11 w-10/12 border-green-700 rounded-md'>
                    B: O(n)
                </div>
                <div className='p-3 ml-11 w-10/12 border-green-700 rounded-md'>
                    C: O(log n)
                </div>
                <div className='p-3 ml-11 w-10/12 border-green-700 rounded-md'>
                    D: O(n^2)
                </div>
                

            </div>
            <div className='flex justify-end mt-7'>
                <button className='p-2 px-5 text-[15px] text-[#fff] rounded-md bg-green-700 md:mr-[70px] mr-[20px]'>
                    Next Question
                </button>

            </div>

        </div>
    )
 }
 
 export default page