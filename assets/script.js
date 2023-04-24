// DOM Navbar Variables
const timerDisplay = document.getElementById("timer");
const resultsDisplay = document.getElementById("results");

// DOM Main Section Variables
const responseDisplay = document.getElementById("response");

// DOM Home Page Section Variables
const homePageDiv = document.getElementById("home");
const start = document.getElementById("startBtn");

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
const homeBtn = document.getElementById("homeBtn");
const clearBtn = document.getElementById("clearBtn");

// Quiz Object
const quiz = {
  timer: 10,
  quizOver: true,
};

//Countdown function
const countdown = () => {
  console.log(quiz.timer);
  if (quiz.timer === 0) {
    clearInterval(interval);
    quiz.quizOver = true;
    // call function that ends quiz
  } else {
    quiz.timer--;
    timerDisplay.innerText = `Time: ${quiz.timer}`;
  }
};

// Start Quiz Function
const startQuiz = () => {
  quiz.quizOver = false;
  homePageDiv.classList.add("d-none");
  responseDisplay.innerText = "";
  quizDiv.classList.remove("d-none");
  interval = setInterval(countdown, 1000);
};
