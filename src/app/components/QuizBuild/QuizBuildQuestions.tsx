'use client';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { createRef, useRef } from 'react'


const QuizBuildQuestions = () => {
  const [quizQuestions, setQuizQuestions] = React.useState(
    [{id: 1, mainQuestion: '', options: [{id: 1, option: ''}]}]
  );

  const endOfListRef = useRef<HTMLDivElement>(null);
  const textAreaRefs = useRef<React.RefObject<HTMLTextAreaElement | null>[]>(quizQuestions.map(() => createRef<HTMLTextAreaElement>()));

  React.useEffect(() => {
    endOfListRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [quizQuestions]);
  

  React.useEffect(() => {
    // Focus the last textArea when a new question is added or if it exists
    const lastTextAreaIndex = quizQuestions.length - 1;
    if (lastTextAreaIndex >= 0) {
      const lastTextArea = textAreaRefs.current[lastTextAreaIndex].current;
      if (lastTextArea) lastTextArea.focus();
      
    }
  },[quizQuestions.length, textAreaRefs.current]);

  function addNewQuestion(){
    const lastIndexQuizQuestions = quizQuestions.length - 1;
    if (quizQuestions[lastIndexQuizQuestions].mainQuestion.trim().length === 0) {
      console.log('Please fill the question before adding a new one');
      return;
    }
    const newQuestion = {id: quizQuestions.length + 1, mainQuestion: '', options: [{id: 1, option: ''}]};
    setQuizQuestions([...quizQuestions, newQuestion]);
    textAreaRefs.current = [...textAreaRefs.current, createRef<HTMLTextAreaElement>()];
  }

  function deleteQuestion(question: { id: number; mainQuestion: string; options: { id: number; option: string; }[] }){
    
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
   
  return (
    <div className='p-3 mt-6 justify-between border border-[#15803d] rounded-md shadow-lg border-opacity-5'>
      <div className='flex gap-2 flex-col w-full'>
        <div className='flex gap-2 items-center'>
          <div className='bg-[#15803d] px-4 py-1 rounded-md text-[#fff]'>2</div>
          <span className='font-bold'> Quiz Questions : </span>
        </div>
        {/* Question Area*/}
        {quizQuestions.map((question, index) => (
          <div
          key={index}
          className='border mt-4 border-[#15803d] rounded-md p-4 w-full
          border-opacity-50 relative justify-center flex'
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
            {index !== 0 && (
              <FontAwesomeIcon
              icon={faXmark}
              height={10}
              width={10}
              className='text-red-600 cursor-pointer absolute top-2 right-2 font-bold'
              onClick={() => deleteQuestion(question)}
              />
            )}
          </div>
        ))}
      </div>
       {/* Add Question Button */}
       <div className='w-full flex justify-center mt-3 '>
          <button
          onClick={addNewQuestion}
          className='bg-[#15803d] text-[#fff] px-3 py-4 rounded-md text-[15px] w-[210px] poppins '>
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