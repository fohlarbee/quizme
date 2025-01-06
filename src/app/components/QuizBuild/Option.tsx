"use client"
import React from 'react';
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import toast from 'react-hot-toast';
// import toast from 'react-hot-toast'; 


interface QuizQuestion {
    id: number;
    mainQuestion: string;
    options: string[];
    correctAnswer: string;
  }
const OptionComponent = ({
    singleQuestion, 
    questionIndex, 
    quizQuestions, 
    setQuizQuestions,
    onChangeOption, // Callback function
    prefixes
  }: {
    singleQuestion: QuizQuestion, 
    questionIndex: number, 
    quizQuestions: QuizQuestion[], 
    setQuizQuestions: React.Dispatch<React.SetStateAction<QuizQuestion[]>>
    onChangeOption: (value: string, optionIndex: number, questionIndex: number) => void
    prefixes: string[]
  }) =>{
    
    const {options} = singleQuestion;
    const alphas = ['A', 'B', 'C', 'D'];
    const positions = ['First', 'Second', 'Third', 'Forth'];
  
  
    function addNewOption(){
        const quizQuestionsCopy = [...quizQuestions];

        // Check if all previous choices are not empty
        const lastOptionPosition = quizQuestionsCopy[questionIndex].options.length;

        for (let i = lastOptionPosition - 1; i >= 0; i--){
            const eachInput =
                quizQuestionsCopy[questionIndex].options[i].substring(2);
            if (eachInput.trim().length === 0 ){
                return toast.error('Please ensure that all previous Options are filled!')
            }
        }
        // Add new option 
        if (lastOptionPosition < 4){
          const newOption = `${alphas[lastOptionPosition]}.`;
          quizQuestionsCopy[questionIndex].options.push(newOption);
          setQuizQuestions(quizQuestionsCopy);
        }
    }
    ////////////////////////////////////////
  
    function deleteOption(optionIndex: number){
      const quizQuestionCopy = [...quizQuestions]
      quizQuestionCopy[questionIndex].options.splice(optionIndex, 1);
      setQuizQuestions(quizQuestionCopy);
    }
    function handleOptionChangeInput(
       e: React.ChangeEvent<HTMLInputElement>,
       optionIndex: number
      ){
      onChangeOption(
        e.target.value , 
        optionIndex, 
        questionIndex
      );
  }
  
    return (
      <div className=' border border-gray-300 flex gap-[39px] items-center mt-3 mr-4 rounded-md'>
        <div className='text-[15px] text-center items-center justify-center p-2'>
            <h3 className='text-center'>Options</h3>
        </div>
        <div className='border border-gray-200 rounded-md p-3 w-full'>
          {/* Choices Area */}
          {options.map((o, i) => (
             <div key={i} className='flex gap-2 items-center mt-3 relative'>
                <span>{alphas[i]}:</span>
                <input 
                  type="text" 
                  placeholder={`Add Your ${positions[i]} Option`}
  
                  className='border text-[13px] border-gray-200 p-2 w-full rounded-md outline-none pr-10'
                  onChange={(e) => handleOptionChangeInput(e, i)}
                  value={o.substring(prefixes[i].length + 2)} 
                  />
                  {i >= 2 && (
                    <FontAwesomeIcon
                    icon={faXmark}
                    width={10}
                    height={10}
                    className='text-red-600 absolute top-2 right-3 cursor-pointer'
                    onClick={() => deleteOption(i)}
                    />
                  )}
     
              </div>
           ))}
  
          {/* Button Area */}
          <div className='w-full flex justify-center mt-3'>
              <button 
              onClick={addNewOption}
              className='p-3 bg-green-700 rounded-md text-[#fff] w-[210px] text-[13px]'>
                  Add A new Choice
              </button>
          </div>
        </div>
  
      </div>
    )
}

export default OptionComponent;