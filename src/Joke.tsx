function Joke(props) {
    console.log(props)
    return(
        <div>
            <h3 style={{display: !props.question &&  "none"}}>Question: {props.question}</h3>
            <h3 style={{color: !props.question && "slategray"}}>PunchLine: {props.punchline}</h3>
            <hr/>
            <br/>
        </div>
    )
}

export default Joke
// How to add some filters