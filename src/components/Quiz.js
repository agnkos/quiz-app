import React from 'react'
import Question from './Question'
import { nanoid } from 'nanoid'
import he from 'he'
import FadeLoader from "react-spinners/FadeLoader";

const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
    color: '#94D7A2'
};

export default function Quiz(props) {

    const [quizData, setQuizData] = React.useState([])
    const [score, setScore] = React.useState(0)
    const [checking, setChecking] = React.useState(false)
    const [loading, setLoading] = React.useState(false)

    React.useEffect(() => {
        setLoading(true)
        fetch('https://opentdb.com/api.php?amount=5')
            .then(res => res.json())
            .then(data => {
                setLoading(false)
                const refactoredData = data.results.map(questionData => ({
                    id: nanoid(),
                    question: he.decode(questionData.question),
                    answers: sortAnswers(questionData),
                }))
                setQuizData(refactoredData)
            })
    }, [])

    function sortAnswers(questionData) {
        let answersArray = questionData.incorrect_answers.map(answer => ({
            id: nanoid(),
            isCorrect: false,
            answer: he.decode(answer),
            isSelected: false
        }))
        answersArray.push({
            id: nanoid(),
            isCorrect: true,
            answer: he.decode(questionData.correct_answer),
            isSelected: false
        })
        const shuffledAnswersArray = answersArray.sort((a, b) => 0.5 - Math.random())
        return shuffledAnswersArray
    }

    const questionsElements = quizData.map(question => (
        <Question
            key={question.id}
            id={question.id}
            question={question.question}
            answers={question.answers}
            handleClick={selectAnswer}
            checking={checking}
        />
    ))

    function selectAnswer(answerId, questionId) {
        setQuizData((prevData) => {
            const newData = prevData.map((question) => {
                const { answers } = question
                const selected = answers.map((answer) => {
                    if (question.id === questionId) {
                        if (answer.id === answerId) {
                            return { ...answer, isSelected: true }
                        } else {
                            return { ...answer, isSelected: false }
                        }
                    } else {
                        return { ...answer }
                    }
                })
                return { ...question, answers: selected }
            })
            return newData
        })
    }

    function checkAnswers() {
        setChecking(true)
        quizData.forEach(question => {
            question.answers.forEach(answer => {
                if (answer.isSelected && answer.isCorrect) {
                    setScore(prevScore => prevScore + 1)
                }
            })
        })
    }

    function playAgain() {
        setScore(0)
        props.restart()
    }

    return (
        <div className='quiz-container'>
            {loading ? <FadeLoader
                color='#4D5B9E'
                cssOverride={override}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
                :
                <div>
                    {questionsElements}
                    {!checking && <button className='check-btn btn' onClick={checkAnswers}>Check answers</button>}
                </div>
            }

            {checking &&
                <div className='score-div'>
                    <p>You scored {score}/5 correct answers</p>
                    <button className='restar-btn btn' onClick={playAgain}>Play again</button>
                </div>}
        </div>
    )
}

