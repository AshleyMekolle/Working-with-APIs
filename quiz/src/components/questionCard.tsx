import React from "react"
import { AnswerObject } from "../App"
import { Wrapper, ButtonWrapper } from "./questioncard.styles"

type Quiz = {
   question: string;
   answers: string[];
   userAnswer: AnswerObject | undefined;
   questionNumber: number;
   callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
   totalNumber: number;
}

const QuestionCard: React.FC<Quiz> = ({
    question,
    answers, 
    userAnswer, 
    questionNumber, 
    callback, 
    totalNumber,
}) =>
     (<Wrapper>
     <p className="number">
        Question: {questionNumber}/{totalNumber}
     </p>
     <p dangerouslySetInnerHTML={{__html: question}} />
     <div>
        {answers.map (answer => (
            <ButtonWrapper
             key={answer}
             correct = {userAnswer?.correct_answer === answer}
             userClicked = {userAnswer?.answer === answer}>
                <button disabled={userAnswer ? true : false} value= {answer} onClick={callback}>
                <span dangerouslySetInnerHTML={{__html: answer}} />
                </button>
            </ButtonWrapper>
        ))}
     </div>
     </Wrapper>
)

export default QuestionCard