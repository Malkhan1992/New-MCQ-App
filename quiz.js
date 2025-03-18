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
            question: "What comes next in the series: 3, 6, 9, 12, __?",
            options: ["15", "13", "18", "14"],
            answer: "15"
        },
        {
            question: "What is the capital of Kerala?",
            options: ["Kochi", "Thiruvananthapuram", "Kozhikode", "Thrissur"],
            answer: "Thiruvananthapuram"
        },
        {
            question: "What is the currency of the USA?",
            options: ["Euro", "Yen", "Pound", "Dollar"],
            answer: "Dollar"
        },
        {
            question: "What is the capital of Canada?",
            options: ["Toronto", "Vancouver", "Ottawa", "Montreal"],
            answer: "Ottawa"
        },
        {
            question: "Which Indian state has Bengaluru as its capital?",
            options: ["Tamil Nadu", "Karnataka", "Kerala", "Andhra Pradesh"],
            answer: "Karnataka"
        },
        {
            question: "What comes next in the series: 2, 5, 10, 17, __?",
            options: ["26", "25", "28", "29"],
            answer: "26"
        },
        {
            question: "Which country has the capital city of Berlin?",
            options: ["France", "Germany", "Italy", "Spain"],
            answer: "Germany"
        },
        {
            question: "What is the currency of Australia?",
            options: ["Dollar", "Euro", "Pound", "Rupee"],
            answer: "Dollar"
        },
        {
            question: "What comes next in the series: 1, 4, 9, 16, __?",
            options: ["20", "24", "25", "30"],
            answer: "25"
        },
        {
            question: "What is the capital of Madhya Pradesh?",
            options: ["Bhopal", "Indore", "Jabalpur", "Gwalior"],
            answer: "Bhopal"
        }
    ],
    "Science": [
        {
            question: "Which planet is known as the Morning Star?",
            options: ["Mercury", "Venus", "Mars", "Jupiter"],
            answer: "Venus"
        },
        {
            question: "Which part of a plant conducts photosynthesis?",
            options: ["Roots", "Stem", "Leaves", "Flowers"],
            answer: "Leaves"
        },
        {
            question: "What is the hottest planet in the solar system?",
            options: ["Mercury", "Venus", "Mars", "Earth"],
            answer: "Venus"
        },
        {
            question: "What do plants absorb from the soil?",
            options: ["Light", "Water", "Carbon dioxide", "Oxygen"],
            answer: "Water"
        },
        {
            question: "Which planet is also called the Earth's twin?",
            options: ["Mars", "Venus", "Jupiter", "Saturn"],
            answer: "Venus"
        },
        {
            question: "What is the process by which plants make their food?",
            options: ["Respiration", "Digestion", "Photosynthesis", "Absorption"],
            answer: "Photosynthesis"
        },
        {
            question: "Which planet has the Great Red Spot?",
            options: ["Mars", "Saturn", "Jupiter", "Neptune"],
            answer: "Jupiter"
        },
        {
            question: "What is the primary source of energy for plants?",
            options: ["Soil", "Water", "Sunlight", "Air"],
            answer: "Sunlight"
        },
        {
            question: "Which planet is farthest from the Sun?",
            options: ["Uranus", "Neptune", "Pluto", "Saturn"],
            answer: "Neptune"
        },
        {
            question: "What is the function of stems in plants?",
            options: ["Absorbing water", "Transporting nutrients", "Releasing oxygen", "Producing flowers"],
            answer: "Transporting nutrients"
        }
    ],
    "Math": [
        {
            question: "What is 128 + 256?",
            options: ["372", "384", "368", "382"],
            answer: "384"
        },
        {
            question: "What is 765 - 432?",
            options: ["323", "333", "335", "343"],
            answer: "333"
        },
        {
            question: "What is 7 × 9?",
            options: ["63", "72", "54", "49"],
            answer: "63"
        },
        {
            question: "What is 144 ÷ 12?",
            options: ["12", "10", "14", "16"],
            answer: "12"
        },
        {
            question: "Which number is even?",
            options: ["73", "58", "71", "53"],
            answer: "58"
        },
        {
            question: "Which number is odd?",
            options: ["64", "32", "19", "84"],
            answer: "19"
        },
        {
            question: "What is the place value of 8 in 3842?",
            options: ["8", "80", "800", "8000"],
            answer: "800"
        },
        {
            question: "What is the face value of 7 in 5724?",
            options: ["700", "70", "7", "7000"],
            answer: "7"
        },
        {
            question: "What is 456 × 2?",
            options: ["900", "912", "922", "932"],
            answer: "912"
        },
        {
            question: "If a box contains 18 chocolates and you eat 6, how many are left?",
            options: ["10", "12", "14", "15"],
            answer: "12"
        }
    ],
    "English": [
        {
            question: "What is the plural form of 'goose'?",
            options: ["Geese", "Gooses", "Goosies", "Goosen"],
            answer: "Geese"
        },
        {
            question: "Which of the following is a pronoun?",
            options: ["He", "John", "Run", "Blue"],
            answer: "He"
        },
        {
            question: "Which of the following is a verb?",
            options: ["Eat", "Delicious", "Apple", "Quick"],
            answer: "Eat"
        },
        {
            question: "What is the singular form of 'teeth'?",
            options: ["Tooth", "Teeth", "Tooths", "Toothies"],
            answer: "Tooth"
        },
        {
            question: "Which of the following is an adverb?",
            options: ["Brightly", "Bright", "Brightness", "Brighter"],
            answer: "Brightly"
        },
        {
            question: "What is the plural form of 'leaf'?",
            options: ["Leafs", "Leaves", "Leafes", "Leafies"],
            answer: "Leaves"
        },
        {
            question: "Which of the following is a common noun?",
            options: ["City", "Delhi", "Asia", "Taj Mahal"],
            answer: "City"
        },
        {
            question: "Which of these is a proper noun?",
            options: ["Car", "London", "River", "Tree"],
            answer: "London"
        },
        {
            question: "What is the gender of the noun 'princess'?",
            options: ["Masculine", "Feminine", "Neuter", "Common"],
            answer: "Feminine"
        },
        {
            question: "Which of these is an abstract noun?",
            options: ["Happiness", "Mountain", "Chair", "Apple"],
            answer: "Happiness"
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
    
    updateTimerDisplay();
    
    timerInterval = setInterval(() => {
        // Directly decrement by 1 second each time
        timeLeft--;
        
        // Update time spent on this question
        questionTimeSpent[currentQuestionIndex] = 90 - timeLeft;
        
        // Save current time for this question
        questionTimers[currentQuestionIndex] = timeLeft;
        
        // Update the timer display
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
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
            // Change color when time is running out
            if (timeLeft <= 10) {
                timerElement.style.color = '#ff6b6b';
            } else {
                timerElement.style.color = '#ffffff';
            }
            
            // Update timer display
            timerElement.textContent = `Time Left - ${timeLeft} sec`;
        }
    }, 1000); // Exactly 1 second interval
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