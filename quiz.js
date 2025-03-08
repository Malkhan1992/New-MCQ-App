// Get the logged-in user and selected subject from localStorage
let loggedInUser = localStorage.getItem("loggedInUser");
let selectedSubject = localStorage.getItem("selectedSubject");

// Redirect to subjects page if no user or subject is selected
if (!loggedInUser || !selectedSubject) {
    window.location.href = "subjects.html";
}

// Sample questions for each subject (kept the same as your original)
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

// DOM elements - Make sure all these elements exist in your HTML
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

// Debug helper function to check if DOM elements exist
function checkElements() {
    console.log("Student name element:", studentNameElement);
    console.log("Subject name element:", subjectNameElement);
    console.log("Question number element:", questionNumberElement);
    console.log("Timer element:", timerElement);
    console.log("Question text element:", questionTextElement);
    console.log("Options container element:", optionsContainerElement);
    console.log("Previous button:", prevButton);
    console.log("Next button:", nextButton);
    console.log("Exit button:", exitButton);
    console.log("Submit button:", submitButton);
    
    // Check if any element is null
    if (!studentNameElement || !subjectNameElement || !questionNumberElement || 
        !timerElement || !questionTextElement || !optionsContainerElement || 
        !prevButton || !nextButton || !exitButton || !submitButton) {
        console.error("One or more DOM elements are missing!");
        return false;
    }
    return true;
}

// Initialize the quiz
function initializeQuiz() {
    // Check if all elements exist
    if (!checkElements()) {
        alert("Error initializing quiz. Some elements are missing.");
        return;
    }
    
    // Display student name and subject
    studentNameElement.textContent = loggedInUser || "Student";
    subjectNameElement.textContent = selectedSubject || "Subject";
    
    // Hide previous button on first question
    updateNavigationButtons();
    
    // Load the first question
    loadQuestion(currentQuestionIndex);
    
    // Log the currently loaded question for debugging
    console.log("Loaded question:", questions[currentQuestionIndex]);
    
    // Start the timer
    startTimer();
}

// Load a question by index
function loadQuestion(index) {
    // Check if questions exist
    if (!questions || questions.length === 0) {
        questionTextElement.textContent = "No questions available for this subject.";
        return;
    }
    
    // Check if index is valid
    if (index < 0 || index >= questions.length) {
        console.error("Invalid question index:", index);
        return;
    }
    
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

// Start the timer for current question - FIXED TIME CALCULATION
function startTimer() {
    clearInterval(timerInterval);
    
    // Use the saved time for this question
    let timeLeft = questionTimers[currentQuestionIndex];
    
    updateTimerDisplay();
    
    // Store exact start time to calculate elapsed time correctly
    const startTime = Date.now();
    
    timerInterval = setInterval(() => {
        // Calculate elapsed time in seconds since this timer started
        const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
        
        // Calculate remaining time by subtracting elapsed time from previous timeLeft
        timeLeft = questionTimers[currentQuestionIndex] - elapsedSeconds;
        
        // Update time spent on this question
        questionTimeSpent[currentQuestionIndex] = 90 - timeLeft;
        
        // Save current time for this question
        questionTimers[currentQuestionIndex] = timeLeft;
        
        // Handle timer completion
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
            // Update timer display - fix to show whole numbers
            timerElement.textContent = `Time Left - ${Math.floor(timeLeft)} sec`;
            
            // Change color when time is running out
            if (timeLeft <= 10) {
                timerElement.style.color = '#ff6b6b';
            } else {
                timerElement.style.color = '#ffffff';
            }
        }
    }, 1000); // Update exactly every 1 second
}

// Update timer display based on current question
function updateTimerDisplay() {
    const timeLeft = questionTimers[currentQuestionIndex];
    
    if (questionCompleted[currentQuestionIndex]) {
        timerElement.textContent = "Time's Up!";
        timerElement.style.color = '#ff6b6b';
    } else {
        timerElement.textContent = `Time Left - ${Math.floor(timeLeft)} sec`;
        
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

// Event listeners - Make sure these are working
function setupEventListeners() {
    if (prevButton) prevButton.addEventListener('click', goToPreviousQuestion);
    if (nextButton) nextButton.addEventListener('click', goToNextQuestion);
    if (exitButton) exitButton.addEventListener('click', exitQuiz);
    if (submitButton) submitButton.addEventListener('click', finishQuiz);
    
    // Log to console when buttons are clicked (for debugging)
    if (prevButton) prevButton.addEventListener('click', () => console.log("Previous button clicked"));
    if (nextButton) nextButton.addEventListener('click', () => console.log("Next button clicked"));
    if (exitButton) exitButton.addEventListener('click', () => console.log("Exit button clicked"));
    if (submitButton) submitButton.addEventListener('click', () => console.log("Submit button clicked"));
}

// Call to set up event listeners
setupEventListeners();

// Initialize the quiz when the page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM fully loaded");
    initializeQuiz();
});

// Also try to initialize immediately in case the script runs after DOM is already loaded
initializeQuiz();
