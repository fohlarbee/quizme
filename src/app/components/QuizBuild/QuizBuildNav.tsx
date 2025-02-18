import useGlobalContextProvider, { Quiz, QuizQuestion } from '@/app/context/ContextApi';
import { IconsData } from '@/app/Data/IconsData';
import mongoose from 'mongoose';
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import React from 'react'
import toast from 'react-hot-toast';


const  QuizBuildNav = ({quizNavBarProps}: {quizNavBarProps : {quizQuestions: QuizQuestion[], newQuiz:Quiz, setNewQuiz: React.Dispatch<React.SetStateAction<Quiz>>}} ) => {
  const {allQuizzes, setAllQuizzes, selectedQuizObj,} = useGlobalContextProvider();
  const { newQuiz } = quizNavBarProps;
  const {selectedQuiz} = selectedQuizObj;
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);

  async function createNewQuiz(){
    setIsLoading(true);
    const url = `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/quizzes`;
    const textIcon = IconsData.map((icon) => icon.name).find((text  ) => text === newQuiz.icon);
    if (!textIcon) {
      toast.error('Please select an icon');
      setIsLoading(false);
      return;
    }
     // Generate ObjectId for each question's id
     const quizWithObjectIds = { 
      ...newQuiz,
      quizQuestions: newQuiz.quizQuestions.map((question) => ({
        ...question,
        id: new mongoose.Types.ObjectId().toString(),
      })),
    };
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({...quizWithObjectIds, icon: textIcon, id: new mongoose.Types.ObjectId().toString(), }),
      cache: 'no-cache' as RequestCache,
    };
    
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      if (response.ok) {
        const {id} = data; //Extract the id from the response

        // Update the id property of the new Quiz
        const updatedQuiz = {...newQuiz, id: id, icon: textIcon};
        // setNewQuiz((prevQuiz: Quiz) => ({
        //   ...prevQuiz,
        //   id: id
        // }))
        setAllQuizzes([...allQuizzes, updatedQuiz]);
        toast.success(data.message);
      }
      
    } catch (error) {
      setIsLoading(false);
      return toast.error(`An error occurred while creating the quiz, ${error}`);

      
    }
    
    setIsLoading(false);

  }

  async function addNewQuiz(){
    setIsLoading(true);
    if (newQuiz.quizTitle.trim().length === 0)
      return toast.error('Please add a title to your quiz! ');

    const isValid = validateQuizQuestions(newQuiz.quizQuestions);
    if(isValid.valid === false){
      setIsLoading(false);
      return toast.error(isValid.message);
    }
     

    if (selectedQuiz){
      const updatedQuiz = [...allQuizzes]; // Assuming allQizes contains all the quizzes
      const findIndexQuiz = updatedQuiz.findIndex((quiz) => quiz.id === newQuiz.id);

      if (findIndexQuiz !== -1) updatedQuiz[findIndexQuiz] = newQuiz;

      const id = updatedQuiz[findIndexQuiz].id;

      const textIcon = IconsData.map((icon) => icon.name).find((text  ) => text === newQuiz.icon);
      if (!textIcon) {
        setIsLoading(false);
        return toast.error('Please select an icon');
      };
      updatedQuiz[findIndexQuiz].icon = textIcon;

      const url = `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/quizzes?id=${id}`;
      const options = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({updateQuiz: updatedQuiz[findIndexQuiz]}),
        cache: 'no-cache' as RequestCache,
      };
      try {
        const res = await fetch(url, options);
        if (!res.ok){
          setIsLoading(false);
          return toast.error('An error occurred while updating the quiz');
        }


        setAllQuizzes(updatedQuiz);
        setIsLoading(false);
        toast.success('Quiz has been saved');
        
      } catch (error) {
        setIsLoading(false);
        return toast.error(`An error occurred while updating the quiz, ${error}`);
        
      }


      // setAllQuizzes((prevQuizState) => {
      //   const updatedQuiz = [...prevQuizState];
      //   const findIndexQuiz = updatedQuiz.findIndex((quiz) => quiz.id === newQuiz.id);
      //   if(findIndexQuiz !== -1){
      //     updatedQuiz[findIndexQuiz] = newQuiz;
      //   }
      //   return updatedQuiz;
      // });
    } else createNewQuiz();
     
    router.push('/quiz');  // Navigate to the home page
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
        {isLoading ? 'Saving' : 'Save'}
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