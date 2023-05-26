
const quizQuestions = [
    {
      question: "What does HTML stand for?",
      options: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language", "Hyper Tool Multi Language"],
      answer: "Hyper Text Markup Language"
    },
    {
      question: "What does CSS stand for?",
      options: ["Cascading Style Sheet", "Colorful Style Sheet", "Computer Style Sheet", "Creative Style Sheet"],
      answer: "Cascading Style Sheet"
    },
  
  ];
  

  let currentQuestionIndex = 0;
  let score = 0;
  let time = 60;
  let timerInterval;
  let savedGame;
  

  const startButton = document.getElementById("start-button");
  const questionElement = document.getElementById("question");
  const optionsElement = document.getElementById("options");
  const feedbackElement = document.getElementById("feedback");
  const scoreElement = document.getElementById("score");
  const highscoreForm = document.getElementById("highscore-form");
  const initialsInput = document.getElementById("initials");
  const timerElement = document.getElementById("time");
  

  function startQuiz() {
  
    document.getElementById("start-container").style.display = "none";
    document.getElementById("quiz-container").style.display = "block";
  
  

    savedGame = null;
    score = 0;
    time = 60;
    startTimer();
    showQuestion();
  }
  

  function showQuestion() {
    const currentQuestion = quizQuestions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    optionsElement.innerHTML = "";
  

    for (let i = 0; i < currentQuestion.options.length; i++) {
      const option = currentQuestion.options[i];
      const button = document.createElement("button");
      button.textContent = option;
      button.addEventListener("click", function() {
        checkAnswer(option);
      });
      optionsElement.appendChild(button);
    }
  }
  
  // Check the selected answer
  function checkAnswer(selectedOption) {
    const currentQuestion = quizQuestions[currentQuestionIndex];
    
    if (selectedOption === currentQuestion.answer) {

      feedbackElement.textContent = "Correct!";
      score++;
    } else {

      feedbackElement.textContent = "Wrong!";
      time -= 10; // Subtract 10 seconds for incorrect answer
      if (time < 0) {
        time = 0;
      }
      timerElement.textContent = time;
    }
  
    currentQuestionIndex++;
    

    if (currentQuestionIndex === quizQuestions.length || time === 0) {
      endQuiz();
    } else {
      showQuestion();
    }
  }
  

  function startTimer() {
    timerInterval = setInterval(function() {
      time--;
      timerElement.textContent = time;
  
      if (time <= 0) {
        clearInterval(timerInterval);
        endQuiz();
      }
    }, 1000);
  }
  

  function endQuiz() {
    clearInterval(timerInterval);
  }
  
  
    document.getElementById("quiz-container").style.display = "none";
    document.getElementById("result-container").style.display = "block";
  
    scoreElement.textContent = score;
  
  
  // Save high score
  function saveHighScore(event) {
    event.preventDefault();
  
    const initials = initialsInput.value.trim();
    
    if (initials !== "") {
   
      const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
  

      const newScore = {
        initials: initials,
        score: score
      };
      highScores.push(newScore);
  

      highScores.sort((a, b) => b.score - a.score);
  

      localStorage.setItem("highScores", JSON.stringify(highScores));
  

      console.log("High score saved!");
  

      initialsInput.value = "";
    }
  }
  

  startButton.addEventListener("click", startQuiz);
  highscoreForm.addEventListener("submit", saveHighScore);