import Image from 'next/image'
import React from 'react'

const  QuizBuildNav = () => {
  return (
    <div className='poppins my-12 flex justify-between items-center'>
      <div className='flex gap-2 items-center'>
        <Image src='/quiz-builder-icon.svg' height={50} width={50} alt=''/>
        <span className=' poppinstext-2xl'>
          Quiz <span className='poppins text-green-700 font-bold'>Builder</span>
        </span>
      </div>
      <button className='poppins p-2 px-4 bg-green-700 rounded-md text-[#fff]'>
        Save
      </button>
    </div>
  )
}

export default QuizBuildNav