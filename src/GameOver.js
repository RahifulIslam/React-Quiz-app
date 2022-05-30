const GameOver = ({resetQuiz, gameScore}) => {
    
  return (
    <div>
        Total score is {gameScore}
        <button onClick={resetQuiz}>Reset Quiz</button>
    </div>
  )
}

export default GameOver