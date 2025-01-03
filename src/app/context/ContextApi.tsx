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
};
interface User {
    id: number;
    name: string;
    isLoggedIn: boolean;
    experience: number;
}
interface QuizContextType {
    allQuizzes: Quiz[];
    setAllQuizzes: React.Dispatch<React.SetStateAction<Quiz[]>>;
    quizToStartObj: {
        selectQuizToStart: Quiz | null;
        setSelectQuizToStart: React.Dispatch<React.SetStateAction<Quiz | null>>;
    };
    timerObj:{
        timer: number,
        setTimer: React.Dispatch<React.SetStateAction<number>>
        parentTimer: number,
        setParentTimer: React.Dispatch<React.SetStateAction<number>> 
    },
    userObj:{
        user: User
        setUser: React.Dispatch<React.SetStateAction<User>>
    }
    isQuizEnded: boolean,
    setIsQuizEnded: React.Dispatch<React.SetStateAction<boolean>>,

  }

export interface Quiz {
    id: number;
    icon: IconDefinition; // You can specify a more specific type if needed
    quizTitle: string;
    score: number;
    quizQuestions: QuizQuestion[];
}
 const GlobalContext = createContext<QuizContextType | undefined>(undefined);

export function ContextProvider({ children }: {children: React.ReactNode}) {

    const defaultUser = {
        id: 1,
        name: 'defaultUser',
        isLoggedIn: true,
        experience: 0,
    }
    const [allQuizzes, setAllQuizzes] = useState<Quiz[]>([]);
    const [selectQuizToStart, setSelectQuizToStart] = useState<Quiz | null>(null);
    const [timer, setTimer] = useState<number>(30);
    const [parentTimer, setParentTimer] = useState<number>(30);
    const [isQuizEnded, setIsQuizEnded] = useState<boolean>(false);
    const [user, setUser] = useState<User>(defaultUser);
    localStorage.setItem("user", JSON.stringify(defaultUser));


    useEffect(() => {
        const saveUserData = localStorage.getItem('user');
        if (saveUserData) {
            setUser(JSON.parse(saveUserData));
        }
    }, []);

    // useEffect(() => {
    // }, [user]);

    useEffect(() => {
        setAllQuizzes(quizzesData)
    }, []);

    return (
        <GlobalContext.Provider value={{
            allQuizzes, 
            setAllQuizzes,
            quizToStartObj:{selectQuizToStart, setSelectQuizToStart},
            timerObj:{timer, setTimer, parentTimer, setParentTimer},
            userObj:{user, setUser},
            isQuizEnded,
            setIsQuizEnded
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