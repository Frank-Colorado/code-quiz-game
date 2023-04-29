// DOM Navbar Variables
const timerDisplay = document.getElementById("timer");

// DOM Main Section Variables
const mainHeaderDisplay = document.getElementById("mainHeader");

// DOM Home Page Section Variables
const homePageDiv = document.getElementById("home");

// DOM Quiz Section Variables
const quizDiv = document.getElementById("quiz");
const questionDisplay = document.getElementById("question");
const answerContainer = document.getElementById("answersContainer");
const nextBtn = document.getElementById("nextBtn");

// DOM Final Score Section Variables
const finalScoreDiv = document.getElementById("finalScore");
const userScoreDisplay = document.getElementById("userScore");
const userNameInput = document.getElementById("userName");

// DOM High Scores Section Variables
const highScoresDiv = document.getElementById("highScores");
const scoreListDisplay = document.getElementById("scoreList");

// REGEX variable
// This video was used as reference for creating a new RegExp : https://www.youtube.com/watch?v=sXQxhojSdZM
const re = new RegExp(/\w/);

// This is a helper function called 'changeMainDisplay'
// It has 2 parameters called 'hide' and 'show'
// It will change what section is visible to the user on the DOM
const changeMainDisplay = (hide, show) => {
  // The 'd-none' class is added to 'hide'
  hide.classList.add("d-none");
  // the 'd-none' class is removed from 'show'
  show.classList.remove("d-none");
};

// This is a helper function called 'changeDisplay'
// It has 2 parameters called 'display' and 'content'
// It will change the inner HTML of the given display to the given content
const changeDisplay = (display, content) => (display.innerHTML = content);

// Quiz Class
class Quiz {
  // The Constructor method is used to create and object with keys and values for any variable created using the Quiz Class
  constructor() {
    this.isOver = false;
    this.timer = 300;
    this.questionCounter = 0;
    this.questionsArray;
    this.randomQuestion;
    this.answersArray;
    this.randomAnswer;
  }
  // This is a method called 'reset'
  // It has 0 parameters
  // This method will be called when the 'homeBtn' is clicked
  reset() {
    // Helper function changes header
    changeDisplay(mainHeaderDisplay, "Instructions");
    // Helper function changes the display
    changeMainDisplay(highScoresDiv, homePageDiv);
    // All of the 'this' quiz values are set to the values of the 'saveQuiz' values
    // This is so that then next quiz the user takes is still completely random
    this.isOver = savedQuiz.isOver;
    this.timer = savedQuiz.timer;
    this.questionCounter = savedQuiz.questionCounter;
    this.questionsArray = savedQuiz.questionsArray;
    this.randomQuestion = savedQuiz.randomQuestion;
    this.answersArray = savedQuiz.answersArray;
    this.randomAnswer = savedQuiz.randomAnswer;
  }

  // This is a method called 'endQuiz'
  // It has 1 parameter called 'score'
  // This method will be called when there is no more time left in the quiz or there are no more questions in the quiz
  endQuiz(score) {
    // The state of the quiz is set to over
    this.isOver = true;
    // Any value inside the 'userNameInput' is cleared
    userNameInput.value = "";
    // The helper functions that change DOM displays are then called and passed which DOM elements with what content each should be changed to
    changeDisplay(timerDisplay, "");
    changeDisplay(mainHeaderDisplay, "Quiz is finished!");
    changeDisplay(userScoreDisplay, score);
    changeMainDisplay(quizDiv, finalScoreDiv);
  }

  // This is a method called 'countdown'
  // It has 0 parameters
  // This method will be called by the 'startQuiz' function
  countdown() {
    // This article was referenced to use the 'setInterval' method : https://www.w3schools.com/jsref/met_win_setinterval.asp
    // The Asynchronous method setInterval is called and stored inside a variable called 'intervalId'
    // setInterval will run on its own during the quiz and will run the created function every 1 second
    let intervalId = setInterval(function () {
      // An if/else conditional statement
      // If the current time left in the quiz is greater than 0 AND the quiz isn't over / Both must be Truthy
      if (quiz.timer >= 0 && !quiz.isOver) {
        // Then helper function is called to update the timer display with the current time left
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
        // A Ternary Operator is used to create a conditional statement
        // If the current time left is less than 0 / Truthy
        // then the 'endQuiz' method is called and passed the value 0
        // Otherwise, the 'endQuiz' method is called and passed the value of 'quiz.timer'
        quiz.timer < 0 ? quiz.endQuiz(0) : quiz.endQuiz(quiz.timer);
        // If the user selected a wrong answer and 10 was decremented from the timer when the time left was <10
        // A negtive value and score would be displayed so this conditional was created to fix this 'bug'
      }
    }, 1000);
  }

  // This is a method called 'unclickable'
  // It has 0 parameters
  // This method will be called by the 'checkAnswer' method
  unclickable() {
    // The 'Array.from' method is used to convert the array-like 'answerContainer.children' object to an array
    // This article was used as reference for the Array.from method : https://stackdiary.com/guides/typeerror-foreach-is-not-a-function/
    // This array is stored in the variable 'answers'
    const answers = Array.from(answerContainer.children);
    // answers is now an array so the '.forEach' method can be called on it
    answers.forEach((answer) => {
      // for every answer, the class 'no-click' is added which makes the user unable to choose other options after already choosing an answer
      answer.classList.add("no-click");
    });
    // the 'nextBtn' is then revealed to the user
    nextBtn.classList.remove("d-none");
  }

  // This is a method called 'checkAnswer'
  // It has 2 parameters called 'button' and 'answerId'
  // This method will be called by the 'getAnswerId' method
  checkAnswer(button, answerId) {
    // An if/else is used to create a conditional statement
    // If the Id of the button clicked is the same as the value of 'randomQuestion.rightAnswer' / Truthy
    if (this.randomQuestion.rightAnswer == answerId) {
      // Then the class 'correct' will be added to the button
      button.classList.add("correct");
    } else {
      // Otherwise, the class 'wrong' will be added to the button / Falsy
      button.classList.add("wrong");
      // 10 seconds are decremented from the timer
      this.timer -= 10;
    }
    // Unclickable method is called
    this.unclickable();
  }

  // This is a method called 'getAnswerId'
  // It has 0 parameters
  // This method will be called by the 'getAnswers' method
  getAnswerId() {
    // The variable answerBtns is created
    // Its value will be all html elements with the class 'answerBtn'
    const answerBtns = document.querySelectorAll(".answerBtn");
    // The 'forEach' method will then be used on all the buttons in 'answerBtns'
    // Each button will have the 'click' event listener added to it
    // On click, the button element and its id value will be passed to the 'checkAnswer' method
    answerBtns.forEach((btn) => {
      btn.onclick = () => this.checkAnswer(btn, btn.id);
    });
  }

  // This is a method called 'createAnswerDisplay'
  // It has 1 parameter called 'index'
  // This method will be called by the 'getAnswers' method
  createAnswerDisplay(index) {
    // The variable 'answerBtn' is created
    // Its value is a newly created <button> element
    const answerBtn = document.createElement("button");
    // The inner HTML of the button is set to a random answer for the current question
    answerBtn.innerHTML = this.randomQuestion.answers[index];
    // The id of the button is then set to the index given.
    // This id will be how we correctly identify the correct answer
    // The value for the key 'rightAnswer' will match this ID if it is the correct answer
    answerBtn.id = [index];
    // The class of the button is then set to 'answerBtn' for styling
    answerBtn.className = "answerBtn";
    // The class is then added to the 'answerContainer'
    answerContainer.appendChild(answerBtn);
  }

  // This is a method called 'getAnswers'
  // It has 1 parameter called 'array'
  // This method will be called by the 'setAnswers' method
  getAnswers(array) {
    // Helper function is used to clear any previous questions
    changeDisplay(answerContainer, "");
    // The 'nextBtn' is hidden
    nextBtn.classList.add("d-none");
    // This article was referenced to use the 'forEach' method : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
    // The 'forEach' method will then be used on the array passed
    // For every item in the array it was given this method will -
    array.forEach((item) => {
      // Choose a random answer from the 'answersArray' and store it in 'randomAnswer'
      this.randomAnswer =
        this.answersArray[Math.floor(Math.random() * this.answersArray.length)];

      // Create the variable 'answerIndex'
      // Its value is the current index of 'randomAnswer' in the 'answersArray'
      const answerIndex = this.answersArray.indexOf(this.randomAnswer);

      // That answer is then removed from the 'answersArray' so that it can't be repeated
      this.answersArray.splice(answerIndex, 1);

      // The 'createAnswerDisplay' method is called and passes the 'randomAnswer' that was created
      this.createAnswerDisplay(this.randomAnswer);
    });
    // After all the items have been looped through, the 'getAnswerId' method will then be called
    this.getAnswerId();
  }

  // This is a method called 'setAnswers'
  // It has 1 parameter called 'array'
  // This method will be called by the 'getQuestion' method
  setAnswers(array) {
    // The map method will be used on the array its given
    // The index of every item in the array will be added to the 'answersArray' array
    // This array of index's is created so that the right answer will be able to be identified after the array is 'randomized'/changed for each new question without changing the original array
    this.answersArray = array.map((answer, index) => index);
    // The 'getAnswers' method is called and is passed the array that was just mapped through
    this.getAnswers(array);
  }

  // This is a method called 'getQuestion'
  // It has 0 parameters
  // This method will be called by the 'setQuestions' method or the 'nextQuestion' method
  getQuestion() {
    // The variable 'counter' is created
    // Its value is a dynamic string which will change depending on which question the user is on
    const counter = `Question ${(this.questionCounter += 1)} of ${
      quizQuestions.length
    }`;
    // 'counter' is passed to helper function to change display
    changeDisplay(mainHeaderDisplay, counter);

    // A random question is chosen from the 'questionsArray' and stored within 'randomQuestion'
    this.randomQuestion =
      this.questionsArray[
        Math.floor(Math.random() * this.questionsArray.length)
      ];
    // The 'q' key from 'randomQuestion' which holds the current question's text is passed to helper function to change display
    changeDisplay(questionDisplay, this.randomQuestion.q);
    // The variable 'questionIndex' is created
    // Its value is the index of 'randomQuestion' in the 'questionsArray'
    // This article was referenced to use the 'indexOf' method : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf
    const questionIndex = this.questionsArray.indexOf(this.randomQuestion);
    // That question is then removed from the 'questionsArray' so that it can't be repeated during the quiz
    this.questionsArray.splice(questionIndex, 1);

    // The 'answers' key from 'randomQuestion' which holds all the answer choices for the current question is passed to the 'setAnswers' method
    this.setAnswers(this.randomQuestion.answers);
  }

  // This is a method called 'setQuestions'
  // It has 0 parameters
  // This method will be called by the 'startQuiz' function
  setQuestions() {
    // The map method will be used on the array 'quizQuestions'
    // Every item in the array will be added to the 'questionsArray' array
    // This identical array is created so that the contents can be 'randomized' and changed for each new quiz without changing the original array
    // This article was referenced to use the 'map' method : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
    this.questionsArray = quizQuestions.map((question) => question);
    // The 'getQuestion' method is called
    this.getQuestion();
  }

  // This is a method called 'nextQuestion'
  // It has 0 parameters
  // This method will be called when the 'nextBtn' is clicked
  nextQuestion() {
    // A Ternary Operator is used to create a conditional statement
    // This article was used as reference for ternary operators : https://www.w3schools.com/react/react_es6_ternary.asp
    // If the user has gone through all the questions in the quiz / Truthy
    this.questionCounter === quizQuestions.length
      ? // Then the state of 'isOver' is set to true
        (this.isOver = true)
      : // Otherwise / Falsy
        // The 'getQuestion' method is called which will display the next question/answer to the DOM
        this.getQuestion();
  }
}

// This is a function called 'startQuiz'
// It has 0 parameters
// It is called when the 'startBtn' is clicked
const startQuiz = () => {
  // Helper function is called to change the DOMfrom the Home Page section to the Quiz section
  changeMainDisplay(homePageDiv, quizDiv);
  // Helper function called to clear the text of the Main Header
  changeDisplay(mainHeaderDisplay, "");
  // The 'countdown' method is called to begin the countdown timer for the quiz
  quiz.countdown();
  // The 'setQuestions' method is called to create/display a new random set of questions/answers for the quiz
  quiz.setQuestions();
};

// new 'quiz' variable created using Quiz Class
// This variable is created so that the methods of the Quiz Class can be called and Properties for the Quiz Class can be accessed
const quiz = new Quiz();
// 'saveQuiz' variable which will hold the default values of the quiz
// This will be used to reset the quiz
const savedQuiz = new Quiz();

// User Class
class User {
  constructor(name, score) {
    this.name = name;
    this.score = score;
  }
}

// This is a function called 'displayScoreBoard'
// It has 0 parameters
// This function will be called by the 'checkScores' function
const displayScoreBoard = (hideDiv) => {
  // The highscores are cleared before the new ones are loaded
  scoreListDisplay.innerHTML = "";
  // change displays
  changeMainDisplay(hideDiv, highScoresDiv);
  changeDisplay(mainHeaderDisplay, "High Scores");
  // The 'highScores' item is grabbed from local storage and its value is set in 'scoreListItems'
  const scoreListItems = JSON.parse(localStorage.getItem("highScores"));
  // For each item in 'scoreListItems'
  scoreListItems.forEach((item) => {
    // A new html list element is created
    const newItem = document.createElement("li");
    // Its innner html is set to:
    newItem.innerHTML = `${item.name}: ${item.score}`;
    // After the list item is created, it is appended to the Score List
    scoreListDisplay.appendChild(newItem);
  });
};

// This is a function called 'checkScores'
// It has 2 parameters: 'newScore' and 'highScores'
// This function will be called by the 'saveScores' function
const checkScores = (newScore, highScores) => {
  // A new variable called 'worstScore' is set to a value of 0
  let worstScore = 0;
  // If there are more than 4 scores in 'highScores'
  if (highScores.length > 4) {
    // Then 'worstScore's value will become the lowest score's value in 'highScores'
    worstScore = highScores[highScores.length - 1].score;
  }
  // If the new score is greater than the value of 'worstScore'
  if (newScore.score > worstScore) {
    // Then the new score is added to the 'highScores' array
    highScores.push(newScore);
  }
  // The array 'highScores' is then sorted from highest to lowest
  // This article was referenced to use the 'sort' method : https://www.w3schools.com/js/js_array_sort.asp
  highScores.sort(function (a, b) {
    return b.score - a.score;
  });
  // If there are more than 5 scores in the array then the lowest score is removed
  if (highScores.length > 5) {
    highScores.pop();
  }

  // This newly updated array is then sent to local storage and set as the item 'highScores'
  localStorage.setItem("highScores", JSON.stringify(highScores));
  displayScoreBoard(finalScoreDiv);
};

// This is a function called 'saveData'
// It has 1 parameter called 'newScore'
// This function will be called by the 'submitScore' function
const saveScores = (newScore) => {
  // The variable 'highScores' is created
  // The OR || operator is used to set the value of this variable
  // The 'getItem' method is used on local storage to get the item 'highScores' but if this item can't be retrieved
  // then the value of 'highScores' is an empty array
  const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
  // The function 'checkScores' is called and passed the new user score and the highscores array
  checkScores(newScore, highScores);
};

// This is a function called 'SubmitScore'
// It has 0 parameters
// It is called when the 'submitBtn' is clicked
const submitScore = () => {
  // A new user obj is created using the Class constructor 'User'
  // The constructor is given the value of the input field which will be set as the user's name
  // The remaining time left will be set as the user's score
  // The variable 'user' is created and holds the value of this new 'User'
  const user = new User(userNameInput.value, quiz.timer);
  // The saveScores function is called and passed 'user'
  saveScores(user);
};

// This is a function called 'clearScores'
// It has 0 parameters
// It is called when the 'clearBtn' is clicked
const clearScores = () => {
  // The scoreboard display is cleared
  scoreListDisplay.innerHTML = "";
  // The user's local storage is cleared
  localStorage.clear();
};

// This function listens for any 'keydown' event on the 'userNameInput' field
userNameInput.addEventListener("keydown", function (e) {
  if (
    // If the key pressed is the ctrl/alt key then nothing happens
    e.ctrlKey ||
    e.altKey ||
    // Only 'string' values are excepted, otherwise nothing happens
    typeof e.key !== "string" ||
    // If the key is longer than one character then nothing happens. This is for keys such as Enter
    e.key.length !== 1
  ) {
    return;
  }
  // Our key is then checked using the '.test' method for RegExp
  // Our variable 're' will only match with single word characters - alphanumerics
  if (!re.test(e.key)) {
    // If the key pressed does not match
    // Then Default function of the input field will not be allowed.
    // This means special characters and white space won't be accepted
    e.preventDefault();
  }
});
