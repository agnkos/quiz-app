import React from 'react'
import Start from './components/Start'
import Quiz from './components/Quiz'

export default function App() {
    const [start, setStart] = React.useState(false)

    function startGame() {
        setStart(true)
    }
    function restartGame() {
        setStart(false)
    }
    return (
        <div className='main-container'>
            {!start && <Start handleClick={startGame} />}
            {start && <Quiz restart={restartGame} />}
        </div>
    )
}