"use client"
import React from "react";
import { createContext, useContext, useState } from "react";
 import toast from "react-hot-toast";
import { NextResponse } from "next/server";
export interface QuizQuestion {
    id: number;
    mainQuestion: string;
    options: string[];
    correctAnswer: number;
    answeredResult: number;
    statistics: {
        totalAttempts: number;
        correctAttempts: number;
        incorrectAttempts: number;
    };
};
export  interface User {
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
    openBoxToggle: {
        openIconBox: boolean,
        setOpenIconBox: React.Dispatch<React.SetStateAction<boolean>>
    },
    selectedIconObj: {
        selectedIcon: {faIcon: string},
        setSelectedIcon: React.Dispatch<React.SetStateAction<{faIcon: string}>>
    },
    dropDownToggleObj: {
        dropDownToggle: boolean,
        setDropDownToggle: React.Dispatch<React.SetStateAction<boolean>> 
    },
    ellipsisObj:{
        ellipsis: {x: number, y: number},
        setEllipsis: React.Dispatch<React.SetStateAction<{x: number, y: number}>>
    },
    selectedQuizObj:{
        selectedQuiz:Quiz | null ,
        setSelectedQuiz:React.Dispatch<React.SetStateAction<Quiz | null>>
    },
    userXpObj:{
        userXp: number,
        setUserXp: React.Dispatch<React.SetStateAction<number>>
    }

  }

export interface Quiz { 
    id: number;
    icon: string; 
    quizTitle: string;
    score: number;
    quizQuestions: QuizQuestion[];
}
 const GlobalContext = createContext<QuizContextType | undefined>(undefined);

export function ContextProvider({ children }: {children: React.ReactNode}) {

    const defaultUser = {
        id: 1,
        name: 'defaultUser',
        isLoggedIn: false,
        experience: 0,
    }
    const [allQuizzes, setAllQuizzes] = useState<Quiz[]>([]);
    const [selectQuizToStart, setSelectQuizToStart] = useState<Quiz | null>(null);
    const [timer, setTimer] = useState<number>(30);
    const [parentTimer, setParentTimer] = useState<number>(30);
    const [isQuizEnded, setIsQuizEnded] = useState<boolean>(false);
    const [user, setUser] = useState<User>(defaultUser);
    const [openIconBox, setOpenIconBox] = useState<boolean>(false);
    const [selectedIcon, setSelectedIcon] = useState({faIcon:'faCode'});
    const [dropDownToggle, setDropDownToggle] = useState<boolean>(false);
    const [ellipsis, setEllipsis] = useState({x: 0, y:0});
    const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
    const [userXp, setUserXp] = useState<number>(0);

    // React.useEffect(() => {
    //     if (typeof window !== 'undefined'){
    //         const saveUserData = localStorage.getItem('user');
    //         const user =  saveUserData ? JSON.parse(saveUserData).experience : 0;
    //         setUser((prevUser) => ({...prevUser, experience: user.experience}));
    //     }
       
    // }, []);
     

 
    React.useEffect(() => {
        if (typeof window !== 'undefined'){
            const saveUserData = localStorage.getItem('user');
            if(saveUserData) setUser(JSON.parse(saveUserData));
        }
    },[]);

    React.useEffect(() => {
        if (typeof window !== 'undefined'){
            localStorage.setItem('user', JSON.stringify(user));
        }
      
    }, [user]);


    React.useEffect(() => {
        const fetchAllQuizzes = async () => {
            const url = `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/quizzes`;
            const options = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                cache: 'no-cache' as RequestCache,
            }
            try {
                const response = await fetch(url, options);
                if(!response.ok){
                    toast.error('Something went wrong');
                    throw new Error('Something went wrong');
                } 
                const quizzesData = await response.json();
                setAllQuizzes(quizzesData);
                
            } catch (error) {
                return NextResponse.json({
                    message: 'The Quizzes could not be fetched',
                    error: (error instanceof Error) ? error.message : 'Unknown error',
                });
            }
           

        };
        fetchAllQuizzes();
    }, []);

    React.useEffect(() => {
        if (selectedQuiz) setSelectedIcon({faIcon: selectedQuiz.icon});
        else setSelectedIcon({faIcon: 'faCode'});

        }, [selectedQuiz]);
    
    React.useEffect(() => {
        setUser((prevUser) => ({
            ...prevUser,
            experience: userXp
        }))
    }, [userXp]);


    React.useEffect(() => {
        const fetchUser = async () => {
            const url = `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/user`;
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
                cache: 'no-cache' as RequestCache,
            }
            try {
                const response = await fetch(url, options);
                if(!response.ok){
                    toast.error('Something went wrong');
                    throw new Error('Something went wrong');
                } 
                const userData = await response.json();
                

                if (userData.mssg === 'User Already Exists'){
                    setUser({...userData.user, id: userData.user._id,});
                } else    setUser({...userData.user, id: userData.user._id});

                if (typeof window !== 'undefined'){
                    localStorage.setItem('user', JSON.stringify(user))
                }
                
            } catch (error) {
                return NextResponse.json({
                    message: 'The User could not be fetched',
                    error: (error instanceof Error) ? error.message : 'Unknown error',
                });
            }
        }

        fetchUser();
    }, []);
        
    return (
        <GlobalContext.Provider value={{
            allQuizzes, 
            setAllQuizzes,
            quizToStartObj:{selectQuizToStart, setSelectQuizToStart},
            timerObj:{timer, setTimer, parentTimer, setParentTimer},
            userObj:{user, setUser},
            isQuizEnded,
            setIsQuizEnded,
            openBoxToggle: {openIconBox, setOpenIconBox},
            selectedIconObj: {selectedIcon, setSelectedIcon},
            dropDownToggleObj: {dropDownToggle, setDropDownToggle},
            ellipsisObj: {ellipsis, setEllipsis},
            selectedQuizObj: {selectedQuiz, setSelectedQuiz},
            userXpObj: {userXp, setUserXp}
            }}>  
            {children}
        </GlobalContext.Provider>
    )
}
export default function useGlobalContextProvider(){
    const allQuizzes = useContext(GlobalContext);
    if (!allQuizzes) {
        throw new Error('useGlobalContextProvider must be used a{}ithin a QuizProvider');
      }
    return allQuizzes;
} 