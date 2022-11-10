export default function Answer(props) {

    let styles = {}
    function setAnswerStyle() {
        if (props.checking) {
            if (props.isCorrect) {
                styles = {
                    backgroundColor: '#94D7A2',
                    borderColor: '#94D7A2'
                }
            } else if (props.isSelected && !props.isCorrect) {
                styles = {
                    backgroundColor: '#F8BCBC',
                    borderColor: '#F8BCBC',
                    opacity: 0.5
                }
            } else {
                styles = {
                    opacity: 0.5
                }
            }
        } else {
            styles = {
                backgroundColor: props.isSelected ? '#D6DBF5' : 'transparent',
                borderColor: props.isSelected ? '#D6DBF5' : '#4D5B9E'
            }
        }
        return styles
    }

    setAnswerStyle()

    return (
        <div className="answer" style={styles} onClick={!props.checking && props.handleClick}>
            {props.answer}
        </div>
    )
}
