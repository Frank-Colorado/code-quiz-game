// DOM Navbar Variables
const timerDisplay = document.getElementById("timer");
const resultsDisplay = document.getElementById("results");

// DOM Main Section Variables
const mainHeaderDisplay = document.getElementById("mainHeader");

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

// helper function that changes the display of the Main Section
const changeMainDisplay = (hide, show) => {
  hide.classList.add("d-none");
  show.classList.remove("d-none");
  changeDisplay(mainHeaderDisplay, "");
  return;
};

// helper function that changes the display of the Main Header
const changeDisplay = (display, content) => (display.innerHTML = content);

// Quiz Class
class Quiz {
  constructor() {
    this.isOver = false;
    this.timer = 180;
    this.questionCounter = 0;
    this.currentQuestion;
    this.randomQuestions = [];
  }

  setQuestions() {
    quizQuestions.map((question, index) => {
      this.randomQuestions.push(quizQuestions[index]);
    });
    console.log(this.randomQuestions);
  }

  getQuestion() {
    const counter = `Question ${(this.questionCounter += 1)} of ${
      this.randomQuestions.length
    }`;
    changeDisplay(mainHeaderDisplay, counter);

    const questionIndex =
      this.randomQuestions[
        Math.floor(Math.random() * this.randomQuestions.length)
      ];
    this.currentQuestion = questionIndex;
    changeDisplay(questionDisplay, this.currentQuestion.q);
  }
}

// new quiz variable created using Quiz Class
const quiz = new Quiz();

// function that starts quiz and countdown timer
const startQuiz = () => {
  changeMainDisplay(homePageDiv, quizDiv);
  let intervalId = setInterval(function () {
    if (!quiz.isOver) {
      changeDisplay(timerDisplay, quiz.timer);
      quiz.timer--;
    } else {
      console.log("Times up!");
      clearInterval(intervalId);
      intervalId = null;
      quiz.timer = 5;
    }
  }, 1000);
  quiz.setQuestions();
  quiz.getQuestion();
};

// // End Quiz function
// const endQuiz = () => {
//   quizDiv.classList.add("d-none");
//   responseDisplay.innerText = "Quiz is over!";
//   finalScoreDiv.classList.remove("d-none");
//   userScoreDisplay.innerText = `Final Score : ${quiz.timer}`;
// };

// // Submit Score function
// const highScores = JSON.parse(localStorage.getItem("highscores")) || [];
// const submitScore = () => {
//   localStorage.setItem("userscore", `${initialsInput.value} : ${quiz.timer}`);
// };
