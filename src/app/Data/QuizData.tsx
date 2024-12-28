import { faCode } from "@fortawesome/free-solid-svg-icons";

export const quizzesData = [
    {
        id: 1,
        icon: faCode,
        quizTitle: 'JavaScript Quiz',
        quizQuestions:[
            {
                id: 1,
                mainQuestion: 'What is JavaScript?',
                choices:[
                    'A. programming language',
                    'B. markup language',
                    'C. stylesheet language',
                    'D. database language'
                ],
                correctAnswer: 1,
                answeredResult : -1,
                statistics: {
                    totalAttempts: 3,
                    correctAttempts: 2,
                    incorrectAttempts: 1
                }
            },
            {
                id: 2,
                mainQuestion: 'What is Python',
                choices:[
                    'A. programming language',
                    'B. markup language',
                    'C. stylesheet language',
                    'D. database language'
                ],
                correctAnswer: 1,
                answeredResult : -1,
                statistics: {
                    totalAttempts: 2,
                    correctAttempts: 1,
                    incorrectAttempts: 1
                }
            },
            {
                id: 3,
                mainQuestion: 'What is Golang',
                choices:[
                    'A. programming language',
                    'B. markup language',
                    'C. stylesheet language',
                    'D. database language'
                ],
                correctAnswer: 1,
                answeredResult : -1,
                statistics: {
                    totalAttempts: 1,
                    correctAttempts: 1,
                    incorrectAttempts: 1
                }
            },
        ]
    }
]