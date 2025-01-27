"use client";
import React from 'react'
import QuizBuildNav from '../components/QuizBuild/QuizBuildNav'
import QuizBuildTitle from '../components/QuizBuild/QuizBuildTitle'
import QuizBuildQuestions from '../components/QuizBuild/QuizBuildQuestions'
import useGlobalContextProvider, { Quiz, QuizQuestion } from '../context/ContextApi';
import IconsComponents from '../components/QuizBuild/IconsComponents';


// export interface QuizQuestion {
//   id: number;
//   mainQuestion: string;
//   options: string[];
//   correctAnswer: string;
//   answeredResult?: number;
//   statistics?:{
//     totalAttempts: number;
//     correctAttempts: number;
//     incorrectAttempts: number;
//   }
// };



// interface QuizBuildQuestionProps {
//   focusProp: {
//     focus: boolean;
//     setFocusFirst: React.Dispatch<React.SetStateAction<boolean>>;
//   };
// }
// interface QuizBuildQuestionProps {
//   focusProp: {
//     focus: boolean;
//     setFocusFirst: React.Dispatch<React.SetStateAction<boolean>>;
//   };
// }

const Page = () => {
  const [focusfirst, setFocusFirst] = React.useState<boolean>(true);
  const quizTitleProps = { focus: focusfirst, setFocusFirst };
  const quizQuestionsProps = { focus: !focusfirst, setFocusFirst };
     const { selectedIconObj, selectedQuizObj} = useGlobalContextProvider();
     const {selectedIcon} = selectedIconObj;
      const {selectedQuiz} = selectedQuizObj;


  const prefixes = ['A', 'B', 'C', 'D'];


    const [quizQuestions, setQuizQuestions] = React.useState<QuizQuestion[]>(() => {
      if (selectedQuiz) {
        return selectedQuiz.quizQuestions;
      }else{
        return  [
          {
            id: 1, 
            mainQuestion: '', 
            options: prefixes.slice(0, 2).map((prefix) => prefix+ '. '),
            correctAnswer: -1,
            answeredResult: -1,
            statistics:{
              totalAttempts: 0,
              correctAttempts: 0,
              incorrectAttempts: 0
            }
          }];
      }
     
    });

   

    function incrementId(quizQuestions: QuizQuestion[]){
      if (quizQuestions.length > 0){
        return quizQuestions[quizQuestions.length - 1].id + 1;
      }
      return quizQuestions.length + 1;
    }
    const [newQuiz, setNewQuiz] = React.useState<Quiz>(() => {
      if (selectedQuiz){
        return selectedQuiz;

      }else{
        return {
          id: incrementId(quizQuestions),
          icon: selectedIcon.faIcon,
          quizTitle: '',
          quizQuestions: quizQuestions,
          score: 0
        }
      }
   });

    function onChangeQuizTitle(text: string){
      setNewQuiz((prevQuiz) => ({...prevQuiz, quizTitle: text}));
  }
     
    React.useEffect(() => {
      setNewQuiz((prevQuiz) => ({
        ...prevQuiz,
        icon:selectedIcon.faIcon,
        quizQuestions:quizQuestions
      }));
    }, [quizQuestions, selectedIcon.faIcon]);

    const quizNavBarProps = {
      quizQuestions,
      newQuiz,
      setNewQuiz
    }
  return (
    <div className='relative mt-16 poppins mx-12'>
      <IconsComponents/>

      <QuizBuildNav quizNavBarProps={quizNavBarProps}/>
      <QuizBuildTitle focusProp={quizTitleProps} onChangeQuizTitle={onChangeQuizTitle}/>
      <QuizBuildQuestions focusProp={quizQuestionsProps} setQuizQuestions={setQuizQuestions} quizQuestions={quizQuestions}/>
    </div>
  )
}

export default Page;