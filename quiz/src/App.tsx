import './App.css';
import QuestionCard from './components/questionCard';
import { Difficulty, QuestionState } from './API';
import { QuizStyle, Wrapper } from './components/app.styles';
import { fetchQuestions } from './API';
import { useState } from 'react';

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correct_answer: string; 
};


const App = () => {
  const TOTAL_QUESTIONS = 20;

  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);

    try {
      const newQuestions = await fetchQuestions(TOTAL_QUESTIONS, Difficulty.MEDIUM);
      setQuestions(newQuestions);
      setScore(0);
      setUserAnswers([]);
      setNumber(0);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching questions:', error);
      setLoading(false);
    }
  };

  const nextQuestion = () => {
    const nextQuestion = number + 1;
    if (nextQuestion < TOTAL_QUESTIONS) {
      setNumber(nextQuestion);
    }
  };

  const prevQuestion = () => {
    const prevQuestion = number - 1;
    if (prevQuestion >= 0) {
      setNumber(prevQuestion);
    }
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const answer = e.currentTarget.value;
      const correct = questions[number].correct_answer === answer;

      if (correct) setScore((prev) => prev + 1);

      const answerObject: AnswerObject = {
        question: questions[number].question,
        answer,
        correct,
        correct_answer: questions[number].correct_answer,
      };

      setUserAnswers((prev) => [...prev, answerObject]);
    }
  };

  return (
    <>
      <QuizStyle />
      <Wrapper>
        <h1>QUIZ</h1>

        {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
          <button className="startTrivia" onClick={startTrivia}>
            Start Trivia
          </button>
        ) : null}

        {!gameOver ? <p className="score">Score: {score}</p> : null}

        {loading && <p className="load">Loading questions...</p>}

        {!loading && !gameOver && (
          <QuestionCard
            questionNumber={number + 1}
            totalNumber={TOTAL_QUESTIONS}
            question={questions[number].question}
            answers={questions[number].answers}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
            callback={checkAnswer}
          />
        )}

        {!loading && !gameOver && number < TOTAL_QUESTIONS - 1 && (
          <button className="next" onClick={nextQuestion}>
            Next Question
          </button>
        )}

        {!loading && !gameOver && number > 0 && (
          <button className="prev" onClick={prevQuestion}>
            Previous Question
          </button>
        )}

      </Wrapper>
    </>
  );
};

export default App;
