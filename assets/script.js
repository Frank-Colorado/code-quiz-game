// DOM Navbar Variables
const timerDisplay = document.getElementById("timer");
const resultsDisplay = document.getElementById("results");

// DOM Main Section Variables
const responseDisplay = document.getElementById("response");

// DOM Home Page Section Variables
const homePageDiv = document.getElementById("home");
const startBtn = document.getElementById("startBtn");

// DOM Quiz Section Variables
const quizDiv = document.getElementById("quiz");
const questionDisplay = document.getElementById("question");
const allanswers = document.querySelectorAll(".answerBtn");
const answer1 = document.getElementById("answerBtn1");
const answer2 = document.getElementById("answerBtn2");
const answer3 = document.getElementById("answerBtn3");
const answer4 = document.getElementById("answerBtn4");

// DOM Final Score Section Variables
const finalScoreDiv = document.getElementById("finalScore");
const userScoreDisplay = document.getElementById("userScore");
const initialsInput = document.getElementById("initials");
const initialsBtn = document.getElementById("initialBtn");

// DOM High Scores Section Variables
const highScoresDiv = document.getElementById("highScores");
const scoreListDisplay = document.getElementById("scoreList");
const homeBtn = document.getElementById("homeBtn");
const clearBtn = document.getElementById("clearBtn");

const changeDisplay = (hide, show) => {
  hide.classList.add("d-none");
  show.classList.remove("d-none");
  return;
};

// Quiz Class
class Quiz {
  constructor() {
    this.isOver = false;
    this.timer = 5;
  }
}

// new quiz variable created using Quiz Class
const quiz = new Quiz();

// function that starts quiz and countdown timer
const startQuiz = () => {
  changeDisplay(homePageDiv, quizDiv);
  let intervalId = setInterval(function () {
    if (!quiz.isOver) {
      quiz.timer--;
      console.log(quiz.timer);
    } else {
      clearInterval(intervalId);
      intervalId = null;
      quiz.timer = 5;
    }
  }, 1000);
};

// // End Quiz function
// const endQuiz = () => {
//   quizDiv.classList.add("d-none");
//   responseDisplay.innerText = "Quiz is over!";
//   finalScoreDiv.classList.remove("d-none");
//   userScoreDisplay.innerText = `Final Score : ${quiz.timer}`;
// };

// //Countdown function
// const countdown = () => {
//   console.log(quiz.timer);
//   if (quiz.timer === 0) {
//     clearInterval(interval);
//     endQuiz();
//     // call function that ends quiz
//   } else {
//     quiz.timer--;
//     timerDisplay.innerText = `Time: ${quiz.timer}`;
//   }
// };

// // Start Quiz Function
// const startQuiz = () => {
//   quiz.quizOver = false;
//   homePageDiv.classList.add("d-none");
//   responseDisplay.innerText = "";
//   quizDiv.classList.remove("d-none");
//   interval = setInterval(countdown, 1000);
// };

// // Submit Score function
// const highScores = JSON.parse(localStorage.getItem("highscores")) || [];
// const submitScore = () => {
//   localStorage.setItem("userscore", `${initialsInput.value} : ${quiz.timer}`);
// };
