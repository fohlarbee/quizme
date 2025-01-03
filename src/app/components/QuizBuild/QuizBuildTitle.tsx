import { faCode } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const QuizBuildTitle = () => {
  return (
    <div className='p-3 flex justify-between border border-[#15803d] rounded-md shadow-md border-opacity-5'>
      <div className='flex gap-2'>
        <div className='flex gap-2 items-center'>
          <div className='bg-[#15803d] px-4 py-1 rounded-md text-[#fff]'>
            1
          </div>
          <span className='font-bold'>Quiz Name : </span>          
        </div>
        <input 
        type="text"
        className='outline-none border-b-2 pt-1 w-[300px] text-[13px]'
        placeholder='Enter Quiz Name' 
        />

      </div>
      <FontAwesomeIcon
      icon={faCode}
      height={40}
      width={40}
      className='text-[#fff] p-2 rounded-md bg-[#15803d] cursor-pointer'
      />

    </div>
  )
}

export default QuizBuildTitle;