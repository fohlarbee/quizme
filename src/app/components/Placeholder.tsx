import Image from 'next/image'
import React from 'react'

const Placeholder = () => {
  return (
    <div className='poppins flex-col gap-3 p-4 flex justify-center items-center'>
        <Image src="/empty-folder.png" width={150} height={150} alt='' />
        <h2 className='poppins text-2xl font-bold'>Create and Customize a Quiz</h2>
        <span className='poppins text-[13px] font-light'>
            Click below to create a quiz and customize it to your taste
        </span>
        <button className='poppins p-3 px-4 text-[#fff] text-[12px] bg-green-700 rounded-md'>
            Create Quiz

        </button>
    </div>
  )
}

export default Placeholder