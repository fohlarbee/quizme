import { QuizQuestion } from '@/app/context/ContextApi';
import React from 'react'

const CorrectAnswer = ({
    quizQuestions,
    index, 
    singleQuestion,
    onChangeCorrectAnswer,
} : {
    quizQuestions: QuizQuestion[], 
    index: number, 
    singleQuestion: QuizQuestion,
    onChangeCorrectAnswer : (upperIndex: number) => void}) => {

    const [correctAnswerInput, setCorrectAnswerInput] = React.useState<string>(
        singleQuestion.correctAnswer === -1 ? '' : quizQuestions[index].options[singleQuestion.correctAnswer].split(' ')[0]
    );
    function handleOnChangeInput(e: React.ChangeEvent<HTMLInputElement>){
        const upperText = e.target.value.toUpperCase();

        if (upperText === '' || ['A', 'B', 'C', 'D'].includes(upperText)){
            const optionIndex = quizQuestions[index].options.findIndex(option => option.startsWith(upperText));
            if (optionIndex === -1) {
                setCorrectAnswerInput('');
                //  toast.error('Please enter a valid option as the correct answer');
                 return;
            };
            setCorrectAnswerInput(upperText);
            onChangeCorrectAnswer(optionIndex);
        }
    }
  return (
    <div className='flex gap-1 items-center mt-3 mr-4 overflow-x-auto'>
        <span className='text-[15px] '>
            Correct Answer
        </span>
        <div  className='border-gray-200 border rounded-md p-1 w-full'>
            <input
            value={correctAnswerInput}
            maxLength={1}
            onChange={((e) => handleOnChangeInput(e))}
            className='p-3 outline-none w-full text-[13px]'
            placeholder='Add the correct answer...'
            />

        </div>

    </div>
  )
}

export default CorrectAnswer