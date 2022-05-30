import { useState } from "react";
import "./App.css";
import GameOver from "./GameOver";
import QuizCard from "./QuizCard";
import "./Style.css";
import shuffle from "./utils";

function App() {
  const [quizes, setQuizes] = useState(null);
  const [startGame, setStartGame] = useState(false);
  const [selectQuestion, setSelectQuestion] = useState(null);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [endGame, setEndGame] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [correctAnswer, setCorrectAnswer] = useState(null)
  const [gameScore, setGamescore] = useState(0)

  const startQuiz = async () => {
    const res = await fetch(
      "https://opentdb.com/api.php?amount=10&category=27&difficulty=easy&type=multiple"
    );
    // const result = await res.json()
    //console.log(result)
    // destructure only result arrays
    const { results } = await res.json();
    // console.log(results)
    setQuizes(results);
    setStartGame(true);
    setSelectQuestion({
      question: results[0].question,
      answers: shuffle(results[0]),
    });

    setCorrectAnswer(results[0].correct_answer)
    setLoading(true);
  };

  const navigateNextQuiz = () => {
    const isLastQuestion = quizes.length - 1 === selectedQuestionIndex;
    if (isLastQuestion) {
      setEndGame(true)
    } else {
      const currentIndex = selectedQuestionIndex+1
      setSelectedQuestionIndex(currentIndex);
      setSelectQuestion({
        question: quizes[currentIndex].question,
        answers: shuffle(quizes[currentIndex]),
      });
      setCorrectAnswer(quizes[currentIndex].correct_answer)
      setSelectedAnswer(null)
    }
  };

  const selectAnswer = (answer) => {
    // console.log("Answer is",answer)
    setSelectedAnswer(answer)
    //check select answer and correct answer
    if(answer=== correctAnswer){
      setGamescore((prevScore)=>prevScore+1)
    }
  }

  const resetQuiz = () => {
    setQuizes(null)
    setSelectQuestion(null)
    setSelectedQuestionIndex(0)
    setEndGame(false)
    setLoading(false)
    setStartGame(false)
    setGamescore(0)
  }

  return (
    <div className="App">
      {endGame && <GameOver resetQuiz={resetQuiz} gameScore={gameScore}/>}
      {startGame && loading && !endGame && (
        <QuizCard
          selectQuestion={selectQuestion}
          selectAnswer={selectAnswer}
          navigateNextQuiz={navigateNextQuiz}
          selectedAnswer={selectedAnswer}
          correctAnswer={correctAnswer}
          quizes={quizes}
          selectedQuestionIndex={selectedQuestionIndex}

        />
      )}
      {!startGame && <button onClick={startQuiz}>Start Quiz</button>}
    </div>
  );
}

export default App;
