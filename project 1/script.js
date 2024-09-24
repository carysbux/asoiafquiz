// Questions array (can be loaded from a server or written directly)
const questions = [
  {
    question: "What was Sansa's direwolf's name?",
    options: ["Lady", "Nymeria", "Bran"],
    answer: 0
  },
  {
    question: "Which religion do most people from Westeros follow?",
    options: [" Old Gods ", "Drowned God", "Faith of the Seven"],
    answer: 2
  },
  {
    question: "Where was Daenerys Targaryen born?",
    options: [" King's Landing ", "Dragonstone", "Pentos"],
    answer: 1
  },
  {
    question: "The dragon Silverwing belonged to whom?",
    options: ["Alysanne", "Aegon the Uncrowned", "Rhaena"],
    answer: 0
  },
  {
    question: "What is the name Ned short for?",
    options: ["Neddard", "Eddard", "Edric"],
    answer: 1
  },
  {
    question: "Brienne was betrothed to which lordling?",
    options: ["Renly ", "Loras", "Ronnet"],
    answer: 2
  },
  {
    question: "Where is Tumbleton?",
    options: ["The Crownlands ", "The Reach", "The Riverlands"],
    answer: 1
  },
  {
    question: "Where is the Starry Sept located?",
    options: [" Oldtown ", "Lannisport", "King's Landing"],
    answer: 0
  },
  {
    question: "What illness did Shireen Baratheon suffer from as a babe?",
    options: [" The Pale Mare ", "Winter Fever", "Greyscale"],
    answer: 2
  },
  {
    question: "Which dragons survived the Dance?",
    options: [" Silverwing, Nettles, and Morning ", "Stormcloud and Morghul", "Greyghost, Vhagar, and Morning"],
    answer: 0
  },
  {
    question: "What is the name of Arya Stark's sword?",
    options: [" Pointy ", "Needle", "Longclaw"],
    answer: 1
  }


  
];

let currentQuestionIndex = 0;
let score = 0;  // Initialize score

// Display the first question when the page loads
document.addEventListener('DOMContentLoaded', () => {
  showQuestion();
});

// Function to display the question
function showQuestion() {
  const questionElement = document.getElementById('question');
  const optionsElement = document.getElementById('options');
  const nextButton = document.getElementById('next-btn');
  const tryAgainButton = document.getElementById('try-again-btn');

  // Hide the "Try Again" button
  tryAgainButton.style.display = 'none';

  // Get the current question
  const currentQuestion = questions[currentQuestionIndex];

  // Set the question text
  questionElement.textContent = currentQuestion.question;

  // Clear any previous options and disable the Next button
  optionsElement.innerHTML = '';
  nextButton.disabled = true;

  // Loop through the options and create buttons for each one
  currentQuestion.options.forEach((option, index) => {
    const button = document.createElement('button');
    button.textContent = option;
    button.addEventListener('click', () => selectAnswer(index, button));
    optionsElement.appendChild(button);
  });
}

// Handle answer selection
function selectAnswer(selectedIndex, button) {
  const currentQuestion = questions[currentQuestionIndex];
  const buttons = document.querySelectorAll('#options button');
  
  // Disable all buttons after selecting an answer
  buttons.forEach(btn => btn.disabled = true);

  // Check if the answer is correct
  if (selectedIndex === currentQuestion.answer) {
    button.classList.add('correct');
    score++;  // Increment score for correct answer
    updateScore();  // Update score display
  } else {
    button.classList.add('incorrect');
    // Highlight the correct answer
    buttons[currentQuestion.answer].classList.add('correct');
  }

  // Enable the "Next" button
  document.getElementById('next-btn').disabled = false;
}

// Update the score display
function updateScore() {
  document.getElementById('score').textContent = score;
}

// Handle the "Next" button click
document.getElementById('next-btn').addEventListener('click', () => {
  currentQuestionIndex++;

  // Check if there are more questions
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showFinalScore();
  }
});

// Show the final score and the "Try Again" button
function showFinalScore() {
  const quizContainer = document.getElementById('quiz-container');
  const tryAgainButton = document.getElementById('try-again-btn');
  
  quizContainer.innerHTML = `<h2>Quiz Complete!</h2><p>Your final score is ${score} out of ${questions.length}</p>`;
  
  // Show the "Try Again" button
  tryAgainButton.style.display = 'block';

  // Reset the quiz when "Try Again" is clicked
  tryAgainButton.addEventListener('click', resetQuiz);
}

function resetQuiz() {
  // Reset variables
  currentQuestionIndex = 0;
  score = 0;
  updateScore();  // Reset the score display

  // Redirect to the welcome page
  window.location.href = 'welcome.html';
}
