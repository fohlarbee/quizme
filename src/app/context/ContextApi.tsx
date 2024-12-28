"use client"
import { createContext, useContext, useEffect, useState } from "react";
import { quizzesData } from "../Data/QuizData";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
interface QuizQuestion {
    id: number;
    mainQuestion: string;
    choices: string[];
    correctAnswer: number;
    answeredResult: number;
    statistics: {
        totalAttempts: number;
        correctAttempts: number;
        incorrectAttempts: number;
    };
}
interface QuizContextType {
    allQuizzes: Quiz[];
    setAllQuizzes: React.Dispatch<React.SetStateAction<Quiz[]>>;
    quizToStartObj: {
        selectQuizToStart: Quiz | null;
        setSelectQuizToStart: React.Dispatch<React.SetStateAction<Quiz | null>>;
    };
  }

export interface Quiz {
    id: number;
    icon: IconDefinition; // You can specify a more specific type if needed
    quizTitle: string;
    quizQuestions: QuizQuestion[];
}
 const GlobalContext = createContext<QuizContextType | undefined>(undefined);

export function ContextProvider({ children }: {children: React.ReactNode}) {
    const [allQuizzes, setAllQuizzes] = useState<Quiz[]>([]);
    const [selectQuizToStart, setSelectQuizToStart] = useState<Quiz | null>(null);

    useEffect(() => {
        setAllQuizzes(quizzesData)
    }, [])
    return (
        <GlobalContext.Provider value={{
            allQuizzes, 
            setAllQuizzes,
            quizToStartObj:{selectQuizToStart, setSelectQuizToStart}
            }}>
            {children}
        </GlobalContext.Provider>
    )
}
export default function useGlobalContextProvider(){
    const allQuizzes = useContext(GlobalContext);
    if (!allQuizzes) {
        throw new Error('useGlobalContextProvider must be used within a QuizProvider');
      }
    return allQuizzes;
}