import Image from 'next/image'
import React from 'react'

const Navbar = () => {
  return (
  <nav className="bg-[#EFF3EA] mx-auto max-w-screen px-4 py-8 sm:px-6 sm:py-7 lg:px-8">
        <div className="flex flex-row items-start gap-4 md:flex-row md:items-center justify-between">
            <div className='flex gap-2'>
                <Image 
                src="book.svg" 
                width={50} 
                height={50} 
                alt='logo'
                className=''
                />
                <h1 
                    className="text-2xl font-bold text-gray-900 sm:text-3xl mt-1 poppins">
                        Quiz 
                        <span 
                        className='text-[#5DB996]'>
                            Me</span></h1>

              
            </div>

            <div className="flex items-center gap-4">
                <button
                className="poppins inline-block rounded bg-[#118B50] px-5 py-3 text-sm font-medium text-white transition focus:outline-none focus:ring"
                type="button"
                >
               Login
                </button>
            </div>
        </div>

  </nav>
  )
}

export default Navbar