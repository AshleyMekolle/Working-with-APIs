import { createGlobalStyle } from "styled-components";
import styled from "styled-components";
import quiz from "../assets/Quiz.png"

export const QuizStyle = createGlobalStyle `

html {
  height: 100%;
}

body{
  background-image: url(${quiz});
  background-size: 50%;
  background-repeat: no-repeat;
  background-position: center;
  margin: 0 ;
  padding: 0 20px;
  display: flex;
  justify-content: center;
}

*{
  box-sizing: border-box;
}
`

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  > p {
  color: black;

  }

  .score{
  font-size: 2rem;
  margin: 0;
  color: #213547;
  }

  h1{
  background-image: linear-gradient(180deg, #fff, #343131);
  background-size: 100%;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  --moz-background-clip: text;
  --moz-text-fill-line:transparent ;
  filter: drop-shadow(2px 2px #fff);
  font-size: 70px;
  text-align: center;
  margin: 20px;
}

.startTrivia, .next, .prev{
  cursor: pointer;
  border: 2px solid #f4f4f9;
  border-radius: 10px;
  height: 40px;
  margin: 20px 0;
  padding: 0 40px;
  background-image: linear-gradient(180deg, #fff, #3498db);
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.25);
}

.startTrivia{
  max-width: 200px;
}
`