'use client';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { createRef, useLayoutEffect, useRef } from 'react'
import toast from 'react-hot-toast';
import OptionComponent from './Option';
import CorrectAnswer from './CorrectAnswer';
import { QuizQuestion } from '@/app/context/ContextApi';


interface QuizBuildQuestionProps {
  focusProp: {
    focus: boolean;
    setFocusFirst: React.Dispatch<React.SetStateAction<boolean>>;
  },
  quizQuestions: QuizQuestion[];
  setQuizQuestions: React.Dispatch<React.SetStateAction<QuizQuestion[]>>;
}

const QuizBuildQuestions: React.FC<QuizBuildQuestionProps> = ({focusProp, quizQuestions, setQuizQuestions}) => {
  const prefixes = ['A', 'B', 'C', 'D'];
  const {focus, setFocusFirst} = focusProp;

 

  const endOfListRef = useRef<HTMLDivElement>(null);
  const textAreaRefs = useRef<React.RefObject<HTMLTextAreaElement | null>[]>(quizQuestions.map(() => createRef<HTMLTextAreaElement>()));

  useLayoutEffect(() => {
      if (endOfListRef.current){
        // console.log(endOfListRef); 
        setTimeout(() => {
          endOfListRef.current?.scrollIntoView({behavior:"smooth"});
        }, 100);
      }
  }, [quizQuestions.length]);
  React.useEffect(() => {
    endOfListRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [quizQuestions]);
  

  React.useEffect(() => {
    // Focus the last textArea when a new question is added or if it exists
    const lastTextAreaIndex = quizQuestions.length - 1;
    if (lastTextAreaIndex >= 0) {
      const lastTextArea = textAreaRefs.current[lastTextAreaIndex].current;
      if (lastTextArea && focus) lastTextArea.focus();
      
    }
  },[quizQuestions.length, textAreaRefs.current]);


  function addNewQuestion(){
    setFocusFirst(false);

    // Verify if the question field is empty or not

    const lastIndexQuizQuestions = quizQuestions.length - 1;
    if (quizQuestions[lastIndexQuizQuestions].mainQuestion.trim( ).length === 0) {
      toast.error(`The question ${lastIndexQuizQuestions+ 1} is still empty`); // Show error
      textAreaRefs.current[lastIndexQuizQuestions].current?.focus();// Set focus back  
      return;
    }

    // Check if all previous choices  are filled out before creating a new question
    
    for (const option of quizQuestions[lastIndexQuizQuestions].options){
      const singleOption = option.substring(2);
      if (singleOption.trim().length === 0) 
        return toast.error('Please ensure that all previous choices are filled!');
    }

    // This code validates that the correct answer input field is not empty
    if (quizQuestions[lastIndexQuizQuestions].correctAnswer === -1 || '')
      return toast.error('Please ensure that the correct answer field is filled out!');
    // This code creates a new question object and add it to the quiz questions array

    const newQuestion:QuizQuestion = 
    {
      id: quizQuestions.length + 1, 
      mainQuestion: '', 
      options: prefixes.slice(0, 2).map((prefix) => prefix+ '. '),
      correctAnswer: -1,
      answeredResult: -1,
      statistics:{
        totalAttempts: 0,
        correctAttempts: 0,
        incorrectAttempts: 0
      }
    };
    setQuizQuestions([...quizQuestions, newQuestion]);
    textAreaRefs.current = [...textAreaRefs.current, createRef<HTMLTextAreaElement>()];
  }

  function deleteQuestion(question: QuizQuestion){
    
    const filterQuestionToDelete = quizQuestions.filter((q) => q.id !== question.id);

    // Filter out the corresponding ref
    const updateRefs = textAreaRefs.current.filter((ref, index) => {
      return quizQuestions[index].id !== question.id;
    });

    textAreaRefs.current = updateRefs;    
    setQuizQuestions(filterQuestionToDelete);

  }
  function handleInputChange(index: number, value: string){
    const updatedQuestions = quizQuestions.map((q, i) => {
      if (index === i) {
        return {...q, mainQuestion: value};
      }
      return q;
    });
    setQuizQuestions(updatedQuestions); 
  }
 
  function updateTheOptionsArray(value: string, optionIndex: number, questionIndex: number){
    // console.log(value, optionIndex, questionIndex);

    const updatedQuestions = quizQuestions.map((q, i) => {
      if (questionIndex === i){
        const updatedOptions = q.options.map((o, j) => {
          if (optionIndex === j){
            // console.log('value', value);

            return prefixes[j] + '. ' + value;
          }
          else {return o}   ;
        });
      return {...q, options: updatedOptions};

      }
      return q;
    }); 

    setQuizQuestions(updatedQuestions);
  }
  React.useEffect(() => {
    console.log(quizQuestions);
  }, [quizQuestions]);

  function updateCorrectAnswer(optionIndex: number, questionIndex: number){
    const questionsCopy = [...quizQuestions];


    ///////////////Check this
    // const optionquestionIndex = quizQuestions[questionIndex].options.findIndex(option => option.startsWith(text));
    // if (optionIndex === -1) {
    //   return toast.error('Please enter a valid option as the correct answer');
    // };
    // if (text === '-1') {
    //   const correctAnswerInput = document.querySelector(`input[value="${text}"]`) as HTMLInputElement;
    //   if (correctAnswerInput) correctAnswerInput.value = '';
    //   return toast.error('Correct answer cannot be -1');
    // }
    quizQuestions[questionIndex].correctAnswer = optionIndex;
    setQuizQuestions(questionsCopy);
  }
   
  return (
    <div className='flex flex-col p-3 mt-6 justify-between border border-[#15803d] rounded-md shadow-lg border-opacity-5'>
      <div className='flex gap-2 flex-col w-full'>
        <div className='flex gap-2 items-center'>
          <div className='bg-[#15803d] px-4 py-1 rounded-md text-[#fff]'>2</div>
          <span className='font-bold'> Quiz Questions : </span>
        </div>
        {/* Question Area*/}
        {quizQuestions.map((question, index) => (
          <div
          key={index}
          className='border mt-4 border-[#15803d] rounded-md p-4
          border-opacity-50 relative justify-center flex flex-col'
          ref={quizQuestions.length - 1 === index ? endOfListRef : null}
          >
            <SingleQuestion 
            questionIndex={index}
            value={question.mainQuestion}
            onChange={(e) => {
              handleInputChange(index, e.target.value)
            }}
            ref={textAreaRefs.current[index]} 
            />
            <OptionComponent
            questionIndex={index}
            singleQuestion={question}
            quizQuestions={quizQuestions}
            setQuizQuestions={setQuizQuestions}
            onChangeOption={(value, optionIndex, questionIndex) => {
              updateTheOptionsArray(value, optionIndex, questionIndex);
            }}
            prefixes={prefixes}
            />
            {index !== 0 && (
              <FontAwesomeIcon
              icon={faXmark}
              height={10}
              width={10}
              className='text-red-600 cursor-pointer absolute top-2 right-2 font-bold'
              onClick={() => deleteQuestion(question)}
              />
            )}
           <CorrectAnswer singleQuestion={question} quizQuestions={quizQuestions} index={index} onChangeCorrectAnswer={(optionIndex) => {updateCorrectAnswer(optionIndex, index)}} />

          </div>

        ))}

      </div>
       {/* Add Question Button */}
       <div className='w-full flex justify-center mt-3 '>
          <button
          onClick={addNewQuestion}
          className='bg-[#15803d] text-[#fff] px-3 py-4 rounded-md text-[15px] w-[210px] poppins shadow-2xl border-opacity-5 '>
            Add a new Question
          </button>
        </div>

    </div>
  )
}
export default QuizBuildQuestions;


const SingleQuestion = 
  React.forwardRef<HTMLTextAreaElement,
   {questionIndex: number, value: string, onChange: 
    (e: React.ChangeEvent<HTMLTextAreaElement>) => void}>
    (({questionIndex, value, onChange}, ref) => {
  return (
    <div className='w-full'>
      <div className='flex gap-3 items-center'>
        <div className='text-[15px] flex gap-2 border-gray-200'>
          <span>Question</span>
          <span>{questionIndex + 1}</span>
        </div>
        <textarea
        ref={ref}
        className='border border-gray-200 w-full rounded-md p-3 h-[50px] resize-none
        text-[13px] outline-none ml-3 mr-4'
        placeholder='Type your question here...'
        value={value}
        onChange={onChange}
        />
      </div>  

    </div> 
  );
});
SingleQuestion.displayName = 'SingleQuestion';