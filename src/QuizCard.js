import React from 'react'
import AnswerCard from './AnswerCard'

const QuizCard = ({selectQuestion, navigateNextQuiz, 
  selectAnswer, selectedAnswer, correctAnswer, 
  selectedQuestionIndex, quizes
}) => {
    // console.log("Question is:",selectQuestion)
    const {question,answers} = selectQuestion
    // console.log("Answers are: ",answers)

    const navigateNext = () => {
      navigateNextQuiz()
    }

  return (
    <div>
      <p>
        Question:{selectedQuestionIndex + 1} / {quizes.length}
      </p>
        <h2>{question}</h2>
        {answers.map((answer, i) => (
          <AnswerCard key={i} 
          answer={answer} 
          selectAnswer={selectAnswer}
          selectedAnswer={selectedAnswer}
          correctAnswer={correctAnswer}
          />
        ))}

        <button onClick={navigateNext}>Next Question</button>
    </div>
  )
}

export default QuizCard