import React from 'react'
import QuizBuildNav from '../components/QuizBuild/QuizBuildNav'
import QuizBuildTitle from '../components/QuizBuild/QuizBuildTitle'
import QuizBuildQuestions from '../components/QuizBuild/QuizBuildQuestions'

const page = () => {
  return (
    <div className='mt-16 poppins mx-12'>
      <QuizBuildNav/>
      <QuizBuildTitle/>
      <QuizBuildQuestions/>
    </div>
  )
}

export default page