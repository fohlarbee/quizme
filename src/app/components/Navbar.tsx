import Image from 'next/image'
import React from 'react'
import useGlobalContextProvider, { User } from '../context/ContextApi'
import toast from 'react-hot-toast';

const Navbar = () => {
    const {userObj} = useGlobalContextProvider();
    const {user, setUser}: {user: User, setUser: React.Dispatch<React.SetStateAction<User>>} = userObj;
    const {name, isLoggedIn} = user;


    async function changeTheLoggedInState(){
        const userCopy = user;
        userCopy.isLoggedIn = !userCopy.isLoggedIn;

        const url = `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/user?id=${userCopy.id}`;
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({updateUser: userCopy}),
        }

        try {
            const response = await fetch(url, options);
            if (!response.ok){
                toast.error('Something went wrong');
                throw new Error('');
            }
            setUser(userCopy);
        } catch (error) {
            throw new Error(`Something went wrong, ${error}`);
    }}
  return (
  <nav className="bg-[#EFF3EA] mx-auto max-w-screen px-4 py-8 sm:px-6 sm:py-7 lg:px-8">
        <div className="flex flex-row items-start gap-12 md:flex-row md:items-center justify-between">
            <div className='flex gap-2'>
                <Image 
                src="book.svg" 
                width={50} 
                height={50} 
                alt='logo'
                className='md:w-16 w-9'
                />
                <h1 
                    className="sm:text-2xl text-md font-bold text-gray-900 md:mt-3  mt-1 poppins sm:mt-1">
                        Quiz 
                        <span 
                        className='text-[#5DB996]'>
                            Me</span></h1>

              
            </div>

            <div className="flex items-center gap-4">
                <div className="flex flex-row items-start gap-1 justify-between">
                    <h2 className=" text-gray-700 poppins lg:text-md">Welcome: 
                        {''}
                        <span className=' text-gray-900 font-medium poppins'> {name}</span></h2>
                    <h3 className='text-green-700 font-semibold poppins'>{user.experience} XP</h3>
                </div>
                <button
                className="poppins inline-block rounded bg-[#118B50] px-2 py-3 text-sm font-medium text-white transition focus:outline-none focus:ring"
                type="button"
                onClick={changeTheLoggedInState}  
                >
               {isLoggedIn ? 'Logout' : 'Login'}
                </button>
            </div>
        </div>

  </nav>
  )
}

export default Navbar;