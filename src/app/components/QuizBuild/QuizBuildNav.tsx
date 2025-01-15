import useGlobalContextProvider, { Quiz, QuizQuestion } from '@/app/context/ContextApi';
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import React from 'react'
import toast from 'react-hot-toast';


const  QuizBuildNav = ({quizNavBarProps}: {quizNavBarProps : {quizQuestions: QuizQuestion[], newQuiz:Quiz}} ) => {
  const {allQuizzes, setAllQuizzes} = useGlobalContextProvider();
  const { newQuiz} = quizNavBarProps;
  const router = useRouter();

  function addNewQuiz(){
    if (newQuiz.quizTitle.trim().length === 0)
      return toast.error('Please add a title to your quiz! ');

    const isValid = validateQuizQuestions(newQuiz.quizQuestions);
    if(isValid.valid === false)
      return toast.error(isValid.message);
     
    setAllQuizzes([...allQuizzes, newQuiz]);
    router.push('/');
  };

  return (
    <div className='poppins my-12 flex justify-between items-center'>
      <div className='flex gap-2 items-center'>
        <Image src='/quiz-builder-icon.svg' height={50} width={50} alt=''/>
        <span className=' poppinstext-2xl'>
          Quiz <span className='poppins text-green-700 font-bold'>Builder</span>
        </span>
      </div>
      <button
      onClick={addNewQuiz} 
      className='poppins p-2 px-4 bg-green-700 rounded-md text-[#fff]'>
        Save
      </button>
    </div>
  )
}

export default QuizBuildNav

function validateQuizQuestions(quizQuestions: QuizQuestion[]){
    for( const question of quizQuestions){

      // Check if the man question is empty
      if (!question.mainQuestion.trim())
        return {valid: false, message: 'Please fill in the main question!'};

      // Check if any choice is empty
      if (question.options.some((option) => !option.trim().substring(2)))
        return {valid: false, message: 'Please fill in all options'};

      // Check if the correct answer is empty
      if (question.correctAnswer === -1 || '')
        return {valid: false, message: 'Please Specify the correct answer!'}
    }
    return {valid: true};
}