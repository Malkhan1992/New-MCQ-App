// Get the logged-in user and selected subject from localStorage
let loggedInUser = localStorage.getItem("loggedInUser");
let selectedSubject = localStorage.getItem("selectedSubject");

// Redirect to subjects page if no user or subject is selected
if (!loggedInUser || !selectedSubject) {
    window.location.href = "subjects.html";
}

// Sample questions for each subject (you can add more later)
const allQuestions = {
    "General Awareness": [
        {
            question: "Who is the current Prime Minister of India?",
            options: ["Narendra Modi", "Rahul Gandhi", "Amit Shah", "Manmohan Singh"],
            answer: "Narendra Modi"
        },
        {
            question: "What is the capital of Japan?",
            options: ["Beijing", "Seoul", "Tokyo", "Bangkok"],
            answer: "Tokyo"
        }
    ],
    "Science": [
        {
            question: "What planet is known as the Red Planet?",
            options: ["Earth", "Mars", "Jupiter", "Venus"],
            answer: "Mars"
        },
        {
            question: "What is the chemical symbol for water?",
            options: ["H2O", "CO2", "O2", "N2"],
            answer: "H2O"
        },
        {
            question: "Which organ in the human body pumps blood?",
            options: ["Brain", "Heart", "Lungs", "Liver"],
            answer: "Heart"
        },
        {
            question: "What gas do plants absorb during photosynthesis?",
            options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
            answer: "Carbon Dioxide"
        },
        {
            question: "What is the main source of energy for life on Earth?",
            options: ["The Moon", "The Sun", "Wind", "Water"],
            answer: "The Sun"
        },
        {
            question: "Which part of the plant is responsible for photosynthesis?",
            options: ["Roots", "Stem", "Leaves", "Flowers"],
            answer: "Leaves"
        },
        {
            question: "What is the process of changing from a solid to a liquid called?",
            options: ["Freezing", "Evaporation", "Melting", "Condensation"],
            answer: "Melting"
        },
        {
            question: "What is the largest planet in our solar system?",
            options: ["Mars", "Earth", "Saturn", "Jupiter"],
            answer: "Jupiter"
        },
        {
            question: "What is the hardest natural substance found on Earth?",
            options: ["Gold", "Iron", "Diamond", "Silver"],
            answer: "Diamond"
        },
        {
            question: "What do we call animals that only eat plants?",
            options: ["Carnivores", "Herbivores", "Omnivores", "Insectivores"],
            answer: "Herbivores"
        }
    ],
    
    "Math": [
        {
            question: "What is the value of π (pi) to two decimal places?",
            options: ["3.14", "3.41", "3.12", "3.21"],
            answer: "3.14"
        },
        {
            question: "If x + y = 10 and x - y = 4, what is the value of x?",
            options: ["5", "6", "7", "8"],
            answer: "7"
        }
    ],
    "English": [
        {
            question: "Which of the following is a proper noun?",
            options: ["Book", "London", "Happy", "Running"],
            answer: "London"
        },
        {
            question: "What is the past tense of 'swim'?",
            options: ["Swimming", "Swam", "Swum", "Swimmed"],
            answer: "Swam"
        }
    ]
};

// DOM elements
const studentNameElement = document.getElementById("student-name");
const subjectNameElement = document.getElementById("subject-name");
const questionNumberElement = document.getElementById("question-number");
const timerElement = document.getElementById("timer");
const questionTextElement = document.getElementById("question-text");
const optionsContainerElement = document.getElementById("options-container");
const prevButton = document.getElementById("prev-button");
const nextButton = document.getElementById("next-button");
const exitButton = document.getElementById("exit-button");
const submitButton = document.getElementById("submit-button");

// Quiz variables
let currentQuestionIndex = 0;
let timerInterval;
const questions = allQuestions[selectedSubject] || [];
const totalQuestions = questions.length;

// Track user answers, time spent, and question states
let userAnswers = Array(totalQuestions).fill(null);
let questionTimers = Array(totalQuestions).fill(90); // Time left for each question
let questionTimeSpent = Array(totalQuestions).fill(0); // Time spent on each question
let questionCompleted = Array(totalQuestions).fill(false); // Track if a question's time is up

// Initialize the quiz
function initializeQuiz() {
    // Display student name and subject
    studentNameElement.textContent = loggedInUser;
    subjectNameElement.textContent = selectedSubject;
    
    // Hide previous button on first question
    updateNavigationButtons();
    
    // Load the first question
    loadQuestion(currentQuestionIndex);
    
    // Start the timer
    startTimer();
}

// Load a question by index
function loadQuestion(index) {
    // Clear previous timer
    clearInterval(timerInterval);
    
    // Get the current question
    const question = questions[index];
    
    // Update question number
    questionNumberElement.textContent = `Question ${(index + 1).toString().padStart(2, '0')}`;
    
    // Set question text
    questionTextElement.textContent = question.question;
    
    // Clear options container
    optionsContainerElement.innerHTML = '';
    
    // Check if question is completed (time up)
    const isQuestionCompleted = questionCompleted[index];
    
    // Add options
    question.options.forEach((option, optionIndex) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'option';
        optionElement.textContent = option;
        
        // Mark as selected if previously selected
        if (userAnswers[index] === optionIndex) {
            optionElement.classList.add('selected');
        }
        
        // Add click event if time is not up
        if (!isQuestionCompleted) {
            optionElement.addEventListener('click', () => {
                selectOption(optionIndex);
            });
        } else {
            optionElement.style.opacity = "0.7"; // Visual indicator that question can't be answered
        }
        
        optionsContainerElement.appendChild(optionElement);
    });
    
    // Update timer display
    updateTimerDisplay();
    
    // Start timer if not completed
    if (!isQuestionCompleted) {
        startTimer();
    } else {
        // Display time's up message
        timerElement.textContent = "Time's Up!";
        timerElement.style.color = '#ff6b6b';
    }
    
    // Update navigation buttons
    updateNavigationButtons();
}

// Select an option
function selectOption(optionIndex) {
    // Store the answer
    userAnswers[currentQuestionIndex] = optionIndex;
    
    // Update UI
    const options = optionsContainerElement.querySelectorAll('.option');
    options.forEach((option, index) => {
        if (index === optionIndex) {
            option.classList.add('selected');
        } else {
            option.classList.remove('selected');
        }
    });
}

// Start the timer for current question
function startTimer() {
    clearInterval(timerInterval);
    
    // Use the saved time for this question
    let timeLeft = questionTimers[currentQuestionIndex];
    
    // Set the initial timer display
    updateTimerDisplay();
    
    // Record the start time when this function is called
    const startTimestamp = Date.now();
    
    timerInterval = setInterval(() => {
        // Calculate exact time elapsed since timer started
        const elapsedSeconds = Math.floor((Date.now() - startTimestamp) / 1000);
        
        // Update time left based on initial time and elapsed seconds
        timeLeft = questionTimers[currentQuestionIndex] - elapsedSeconds;
        
        // Update time spent on this question
        questionTimeSpent[currentQuestionIndex] = 90 - timeLeft;
        
        // Start the timer for current question
function startTimer() {
    clearInterval(timerInterval);
    
    // Use the saved time for this question
    let timeLeft = questionTimers[currentQuestionIndex];
    
    // Update timer display immediately
    updateTimerDisplay();
    
    timerInterval = setInterval(() => {
        // Decrement by exactly 1 second
        timeLeft = timeLeft - 1;
        
        // Update the saved time for this question
        questionTimers[currentQuestionIndex] = timeLeft;
        
        // Update time spent on this question
        questionTimeSpent[currentQuestionIndex] = 90 - timeLeft;
        
        // Update the timer display
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            questionTimers[currentQuestionIndex] = 0;
            questionCompleted[currentQuestionIndex] = true;
            questionTimeSpent[currentQuestionIndex] = 90; // Full time spent
            
            timerElement.textContent = "Time's Up!";
            timerElement.style.color = '#ff6b6b';
            
            // Disable all options
            const options = optionsContainerElement.querySelectorAll('.option');
            options.forEach(option => {
                option.style.opacity = "0.7";
                option.style.pointerEvents = "none";
            });
            
            setTimeout(() => {
                autoMoveToNextQuestion();
            }, 1500);
        } else {
            // Update timer display
            timerElement.textContent = `Time Left - ${timeLeft} sec`;
            
            // Change color when time is running out
            if (timeLeft <= 10) {
                timerElement.style.color = '#ff6b6b';
            } else {
                timerElement.style.color = '#ffffff';
            }
        }
    }, 1000);
}
// Update timer display based on current question
function updateTimerDisplay() {
    const timeLeft = questionTimers[currentQuestionIndex];
    
    if (questionCompleted[currentQuestionIndex]) {
        timerElement.textContent = "Time's Up!";
        timerElement.style.color = '#ff6b6b';
    } else {
        timerElement.textContent = `Time Left - ${timeLeft} sec`;
        
        if (timeLeft <= 10) {
            timerElement.style.color = '#ff6b6b';
        } else {
            timerElement.style.color = '#ffffff';
        }
    }
}

// Automatically move to the next question when timer ends
function autoMoveToNextQuestion() {
    if (currentQuestionIndex < totalQuestions - 1) {
        currentQuestionIndex++;
        loadQuestion(currentQuestionIndex);
    } else {
        finishQuiz();
    }
}

// Update navigation buttons based on current question index
function updateNavigationButtons() {
    // Show/hide prev button
    if (currentQuestionIndex === 0) {
        prevButton.classList.add('hidden');
    } else {
        prevButton.classList.remove('hidden');
    }
    
    // Show/hide next and submit buttons
    if (currentQuestionIndex === totalQuestions - 1) {
        nextButton.classList.add('hidden');
        submitButton.classList.remove('hidden');
    } else {
        nextButton.classList.remove('hidden');
        submitButton.classList.add('hidden');
    }
}

// Navigate to previous question
function goToPreviousQuestion() {
    if (currentQuestionIndex > 0) {
        // Save current timer value before moving
        clearInterval(timerInterval);
        
        // Move to previous question
        currentQuestionIndex--;
        loadQuestion(currentQuestionIndex);
    }
}

// Navigate to next question
function goToNextQuestion() {
    if (currentQuestionIndex < totalQuestions - 1) {
        // Save current timer value before moving
        clearInterval(timerInterval);
        
        // Move to next question
        currentQuestionIndex++;
        loadQuestion(currentQuestionIndex);
    }
}

// Calculate the final score with marking scheme
function calculateScore() {
    let totalMarks = 0;
    let questionResults = [];
    
    userAnswers.forEach((selectedOptionIndex, questionIndex) => {
        const question = questions[questionIndex];
        const correctAnswer = question.answer;
        
        let result = {
            question: question.question,
            userAnswer: selectedOptionIndex !== null ? question.options[selectedOptionIndex] : "Not Answered",
            correctAnswer: correctAnswer,
            isCorrect: false,
            marks: 0,
            timeSpent: questionTimeSpent[questionIndex]
        };
        
        // If answered
        if (selectedOptionIndex !== null) {
            const selectedOption = question.options[selectedOptionIndex];
            
            if (selectedOption === correctAnswer) {
                // Correct answer: 2 marks
                result.isCorrect = true;
                result.marks = 2;
                totalMarks += 2;
            } else {
                // Wrong answer: -0.5 marks
                result.marks = -0.5;
                totalMarks -= 0.5;
            }
        }
        
        questionResults.push(result);
    });
    
    // Ensure total marks don't go below 0
    totalMarks = Math.max(0, totalMarks);
    
    // Calculate percentage
    const maxPossibleMarks = totalQuestions * 2;
    const percentage = (totalMarks / maxPossibleMarks) * 100;
    
    // Determine performance comment
    let performanceComment;
    if (percentage >= 85) {
        performanceComment = "Excellent";
    } else if (percentage >= 65) {
        performanceComment = "Good";
    } else if (percentage >= 50) {
        performanceComment = "Average";
    } else {
        performanceComment = "Fail";
    }
    
    return {
        totalMarks,
        maxPossibleMarks,
        percentage,
        performanceComment,
        questionResults
    };
}

// Finish the quiz
function finishQuiz() {
    clearInterval(timerInterval);
    
    // Calculate score and get detailed results
    const results = calculateScore();
    
    // Store results in localStorage or sessionStorage for the result page
    localStorage.setItem("quizResults", JSON.stringify(results));
    
    // Navigate to result page
    window.location.href = "result.html";
}

// Exit the quiz
function exitQuiz() {
    if (confirm("Are you sure you want to exit the quiz? Your progress will be lost.")) {
        window.location.href = "subjects.html";
    }
}

// Event listeners
prevButton.addEventListener('click', goToPreviousQuestion);
nextButton.addEventListener('click', goToNextQuestion);
exitButton.addEventListener('click', exitQuiz);
submitButton.addEventListener('click', finishQuiz);

// Initialize the quiz when the page loads
initializeQuiz();
