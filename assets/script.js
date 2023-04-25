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
const optionContainer = document.getElementById("answersContainer");
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
    this.currentOption;
    this.randomOptions = [];
  }

  endQuiz(score) {
    this.isOver = true;
    changeDisplay(mainHeaderDisplay, "Quiz is finished!");
    changeDisplay(userScoreDisplay, score);
    changeMainDisplay(quizDiv, finalScoreDiv);
  }

  countdown() {
    let intervalId = setInterval(function () {
      if (quiz.timer >= 0 && !quiz.isOver) {
        changeDisplay(timerDisplay, quiz.timer);
        quiz.timer--;
      } else {
        clearInterval(intervalId);
        intervalId = null;
        quiz.endQuiz(quiz.timer + 1);
      }
    }, 1000);
  }

  clearOptionDisplay() {
    optionContainer.innerHTML = "";
  }

  createOptionDisplay(i) {
    const optionBtn = document.createElement("button");
    optionBtn.innerHTML = this.currentQuestion.answers[i];
    optionBtn.id = [i];
    optionBtn.className = "answerBtn";
    optionContainer.appendChild(optionBtn);
  }

  getOptions(array) {
    this.clearOptionDisplay();
    console.log(array);
    array.map((option, index) => {
      this.currentOption =
        this.randomOptions[
          Math.floor(Math.random() * this.randomOptions.length)
        ];

      console.log(this.currentOption);
      const index2 = this.randomOptions.indexOf(this.currentOption);
      console.log(index2);

      this.randomOptions.splice(index2, 1);

      this.createOptionDisplay(this.currentOption);
    });
  }

  setOptions(array) {
    array.map((option, index) => {
      this.randomOptions.push(index);
    });
    console.log(this.randomOptions);
    this.getOptions(array);
  }

  questionCountDisplay() {
    const counter = `Question ${(this.questionCounter += 1)} of ${
      quizQuestions.length
    }`;
    changeDisplay(mainHeaderDisplay, counter);
  }

  getQuestion() {
    this.questionCountDisplay();
    //
    this.currentQuestion =
      this.randomQuestions[
        Math.floor(Math.random() * this.randomQuestions.length)
      ];
    //
    changeDisplay(questionDisplay, this.currentQuestion.q);
    //
    const index1 = this.randomQuestions.indexOf(this.currentQuestion);
    //
    this.randomQuestions.splice(index1, 1);

    console.log(this.currentQuestion.answers);
    this.setOptions(this.currentQuestion.answers);
  }

  setQuestions() {
    quizQuestions.map((question) => {
      this.randomQuestions.push(question);
    });
    console.log(this.randomQuestions);
    this.getQuestion();
  }

  nextQuestion() {
    this.questionCounter === quizQuestions.length
      ? this.endQuiz(this.timer + 1)
      : this.getQuestion();
  }
}

// new quiz variable created using Quiz Class
const quiz = new Quiz();

// function that starts quiz and countdown timer
const startQuiz = () => {
  changeMainDisplay(homePageDiv, quizDiv);
  changeDisplay(mainHeaderDisplay, "");
  quiz.countdown();
  quiz.setQuestions();
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
