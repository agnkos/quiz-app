
export default function Start(props) {
    return (
        <div className='start-container'>
            <h1>Quizzical</h1>
            <p>Some description if needed</p>
            <button className='start-btn btn' onClick={props.handleClick} >Start quiz</button>
        </div>
    )
}