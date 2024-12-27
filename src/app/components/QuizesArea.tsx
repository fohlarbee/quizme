import React from 'react'
import Quizcard from './Quizcard'
import Placeholder from './Placeholder';

const QuizesArea = () => {
  const allQuizzes = [];

  return (
    <div className='poppins mx-12 mt-10'>
      {allQuizzes.length === 0 ? (
        <Placeholder/>
      ) : (
        <div>
          <h2 className='text-xl font-bold'>My Quizzes</h2>
          <div className='mt-6 flex gap-2 flex-wrap'>
            <Quizcard/>
            <Quizcard/>
            <Quizcard/>

        </div>

        </div>
      )
    }
        
    </div>
  )
}

export default QuizesArea