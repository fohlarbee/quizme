import React from 'react';
import {faCode, faEllipsis, faPlay} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';


const Quizcard = () => {
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
            icon={faCode}
            width={80}
            height={80}
            className='text-[#fff]'
            />
        </div>
        <h3 className='font-bold'>Algorithm Quiz</h3>
        <p className='text-sm font-light'>30 Questions</p>
        <div className='flex gap-3'>
            <div className='flex gap-1 items-center'>
                <Image src="success.svg" width={20} height={20} alt='' />
                <span className='text-[12px]'>Success rate: 100%</span>

            </div>
            <div className='rounded-full w-7 h-7 bg-green-700 flex items-center justify-center cursor-pointer'>
                <FontAwesomeIcon 
                icon={faPlay} 
                className='text-[#fff] text-2xl'
                height={16}
                width={16}
                />
            </div>
        </div>

    </div>
  )
}

export default Quizcard