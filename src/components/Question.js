import Answer from './Answer'

export default function Question(props) {

    const answersHtml = props.answers.map(item => {
        return <Answer
            key={item.id}
            answer={item.answer}
            id={item.id}
            isSelected={item.isSelected}
            isCorrect={item.isCorrect}
            checking={props.checking}
            handleClick={() => props.handleClick(item.id, props.id)} />
    })


    return (
        <div className="question-container">
            <p className="question">{props.question}</p>
            <div className="answers-container">{answersHtml}</div>
        </div>
    )
}