import React from 'react'

const CorrectAnswer = ({onChangeCorrectAnswer} : {onChangeCorrectAnswer : (upperText: string) => void}) => {

    const [correctAnswerInput, setCorrectAnswerInput] = React.useState<string>('');
    function handleOnChangeInput(e: React.ChangeEvent<HTMLInputElement>){
        const upperText = e.target.value.toUpperCase();
        if (upperText === '' || ['A', 'B', 'C', 'D'].includes(upperText)){
            setCorrectAnswerInput(upperText);
            onChangeCorrectAnswer(upperText);
        }
    }
  return (
    <div className='flex gap-1 items-center mt-3 mr-4'>
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