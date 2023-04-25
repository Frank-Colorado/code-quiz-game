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

// This is a helper function called 'changeMainDisplay'
// It has 2 parameters called 'hide' and 'show'
// It will change what section is visible to the user on the DOM
const changeMainDisplay = (hide, show) => {
  // The 'd-none' class is added to 'hide'
  hide.classList.add("d-none");
  // the 'd-none' class is removed from 'show'
  show.classList.remove("d-none");
  return;
};

// This is a helper function called 'changeDisplay'
// It has 2 parameters called 'display' and 'content'
// It will change the inner HTML of the given display to the given content
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

  // This is a method called 'endQuiz'
  // It has 1 parameter called 'score'
  // This method will be called when there is no more time left in the quiz or there are no more questions in the quiz
  endQuiz(score) {
    // The state of the quiz is changed to finished by setting the key 'isOver' to a value of true
    this.isOver = true;
    // The helper functions that change DOM displays are then called and passed which DOM elements with what content each should be changed to
    changeDisplay(mainHeaderDisplay, "Quiz is finished!");
    changeDisplay(userScoreDisplay, score);
    changeMainDisplay(quizDiv, finalScoreDiv);
  }

  // This is a method called 'countdown'
  // It has 0 parameters
  // This method will be called by the 'startQuiz' function
  countdown() {
    // The Asynchronous method setInterval is called and stored inside a variable called 'intervalId'
    // setInterval will run on its own during the quiz and will run the created function every 1 second
    let intervalId = setInterval(function () {
      // An if/else is used to create a conditional statement
      // If the current time left in the quiz is greater than 0 AND the quiz isn't over / Both must be Truthy
      if (quiz.timer >= 0 && !quiz.isOver) {
        // Then the 'changeDisplay' method is called which updates the timer display with the current time left
        changeDisplay(timerDisplay, quiz.timer);
        // Then the amount of time left is decremented by 1
        quiz.timer--;
        // Otherwise / If either are Falsy
      } else {
        // Then the method 'clearInterval' is called and passed the intervalId variable
        // This stops the 'setInterval' function from running
        clearInterval(intervalId);
        // The value of the 'intervalId' is reset to null
        intervalId = null;
        // Then the method 'endQuiz' is called and is passed the current value of the 'timer' + 1
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

  // This is a method called 'setQuestions'
  // It has 0 parameters
  // This method will be called by the 'startQuiz' function
  setQuestions() {
    // The map method will be used on the array 'quizQuestions'
    // Every item in the 'quizQuestions' array will be added to the 'randomQuestions' array
    // This is identical array is created so that the contents can be 'randomized' and changed for each new quiz without changing the original array
    this.randomQuestions = quizQuestions.map((question) => question);
    //this.getQuestion();
  }

  // This is a method called 'nextQuestion'
  // It has 0 parameters
  // This method will be called when the 'nextBtn' is clicked
  nextQuestion() {
    // A Ternary Operator is used to create a conditional statement
    // If the user has gone through all the questions in the quiz / Truthy
    this.questionCounter === quizQuestions.length
      ? // Then the method 'endQuiz' is called and is passed the current value of the 'timer' + 1
        this.endQuiz(this.timer + 1)
      : // Otherwise / Falsy
        // The 'getQuestion' method is called which will display the next question/answer to the DOM
        this.getQuestion();
  }
}

// new 'quiz' variable created using Quiz Class
// This variable is created so that the methods of the Quiz Class can be called and Properties for the Quiz Class can be accessed
const quiz = new Quiz();

// This is a function called 'startQuiz'
// It has 0 parameters
// It is called when the 'startBtn' is clicked
const startQuiz = () => {
  // 'changeMainDisplay' function is called which changes the Main DOM Display from the Home Page section to the Quiz section
  changeMainDisplay(homePageDiv, quizDiv);
  // 'changeDisplay' function is called so the Main Header text content is cleared
  changeDisplay(mainHeaderDisplay, "");
  // The 'countdown' method is called on the 'quiz' variable which begins starts the timer for the quiz
  quiz.countdown();
  // The 'setQuestions' method is called on the 'quiz' variable which creates/displays a new random set of questions/answers for the quiz
  quiz.setQuestions();
};

// // Submit Score function
// const highScores = JSON.parse(localStorage.getItem("highscores")) || [];
// const submitScore = () => {
//   localStorage.setItem("userscore", `${initialsInput.value} : ${quiz.timer}`);
// };
