"use client";
import React from 'react'
import QuizBuildNav from '../components/QuizBuild/QuizBuildNav'
import QuizBuildTitle from '../components/QuizBuild/QuizBuildTitle'
import QuizBuildQuestions from '../components/QuizBuild/QuizBuildQuestions'

const Page = () => {
  const [focusfirst, setFocusFirst] = React.useState<boolean>(true);
  const quizTitleProps = { focus: focusfirst, setFocusFirst };
  const quizQuestionsProps = { focus: !focusfirst, setFocusFirst };
  return (
    <div className='mt-16 poppins mx-12'>
      <QuizBuildNav/>
      <QuizBuildTitle focusProp={quizTitleProps}/>
      <QuizBuildQuestions focusProp={quizQuestionsProps}/>
    </div>
  )
}

export default Page;