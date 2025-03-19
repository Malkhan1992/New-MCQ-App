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
            question: "What comes next in the series: 2, 4, 8, 16, __?",
            options: ["20", "24", "32", "40"],
            answer: "32"
        },
        {
            question: "What is the capital of West Bengal?",
            options: ["Kolkata", "Darjeeling", "Siliguri", "Howrah"],
            answer: "Kolkata"
        },
        {
            question: "What is the currency of China?",
            options: ["Yuan", "Yen", "Rupee", "Won"],
            answer: "Yuan"
        },
        {
            question: "What is the capital city of Italy?",
            options: ["Paris", "Rome", "Madrid", "Berlin"],
            answer: "Rome"
        },
        {
            question: "Which Indian state has Lucknow as its capital?",
            options: ["Bihar", "Uttar Pradesh", "Punjab", "Madhya Pradesh"],
            answer: "Uttar Pradesh"
        },
        {
            question: "What comes next in the series: 1, 3, 6, 10, 15, __?",
            options: ["18", "21", "24", "20"],
            answer: "21"
        },
        {
            question: "Which country has Tokyo as its capital?",
            options: ["China", "Japan", "South Korea", "Vietnam"],
            answer: "Japan"
        },
        {
            question: "What is the capital of New Zealand?",
            options: ["Wellington", "Auckland", "Christchurch", "Hamilton"],
            answer: "Wellington"
        },
        {
            question: "What comes next in the series: 5, 10, 20, 40, __?",
            options: ["50", "60", "80", "100"],
            answer: "80"
        },
        {
            question: "What is the capital of Haryana?",
            options: ["Panchkula", "Chandigarh", "Ambala", "Faridabad"],
            answer: "Chandigarh"
        }
    ],
   "Science": [
    {
        question: "What does a resistor do in an electrical circuit?",
        options: ["Stores electricity", "Controls the flow of current", "Generates light", "Produces sound"],
        answer: "Controls the flow of current"
    },
    {
        question: "Which device converts electrical energy into mechanical energy?",
        options: ["Motor", "Resistor", "Switch", "Solar Cell"],
        answer: "Motor"
    },
    {
        question: "What is the function of an LED in a circuit?",
        options: ["To control voltage", "To emit light", "To store energy", "To measure current"],
        answer: "To emit light"
    },
    {
        question: "What is a switch used for in an electrical circuit?",
        options: ["To store energy", "To connect or disconnect the circuit", "To reduce current flow", "To convert energy"],
        answer: "To connect or disconnect the circuit"
    },
    {
        question: "What energy does a solar cell convert into electrical energy?",
        options: ["Wind energy", "Chemical energy", "Light energy", "Heat energy"],
        answer: "Light energy"
    },
    {
        question: "What happens to the brightness of an LED if more current flows through it?",
        options: ["It dims", "It gets brighter", "It stops working", "It becomes cooler"],
        answer: "It gets brighter"
    },
    {
        question: "What type of energy does a motor produce?",
        options: ["Mechanical energy", "Thermal energy", "Light energy", "Electrical energy"],
        answer: "Mechanical energy"
    },
    {
        question: "Which device can turn a circuit on or off?",
        options: ["Resistor", "Solar Cell", "Switch", "LED"],
        answer: "Switch"
    },
    {
        question: "Where are solar cells commonly used?",
        options: ["In refrigerators", "In solar panels", "In electric motors", "In resistors"],
        answer: "In solar panels"
    },
    {
        question: "What is the unit of resistance measured by a resistor?",
        options: ["Ampere", "Ohm", "Volt", "Watt"],
        answer: "Ohm"
    }
],
    "Math": [
        {
            question: "What is 567 + 432?",
            options: ["999", "1000", "998", "997"],
            answer: "999"
        },
        {
            question: "What is 834 - 567?",
            options: ["267", "277", "287", "297"],
            answer: "267"
        },
        {
            question: "What is 12 × 8?",
            options: ["92", "96", "94", "98"],
            answer: "96"
        },
        {
            question: "What is 144 ÷ 12?",
            options: ["12", "11", "10", "14"],
            answer: "12"
        },
        {
            question: "Which number is even?",
            options: ["53", "29", "44", "57"],
            answer: "44"
        },
        {
            question: "Which number is odd?",
            options: ["22", "40", "35", "68"],
            answer: "35"
        },
        {
            question: "What is the place value of 6 in 4623?",
            options: ["60", "6", "600", "6000"],
            answer: "600"
        },
        {
            question: "What is the face value of 9 in 3917?",
            options: ["900", "90", "9", "9000"],
            answer: "9"
        },
        {
            question: "What is 238 × 3?",
            options: ["704", "712", "714", "718"],
            answer: "714"
        },
        {
            question: "If you have 12 candies and divide them among 4 friends, how many candies does each friend get?",
            options: ["3", "4", "6", "8"],
            answer: "3"
        }
    ],
    "English": [
    {
        question: "Which word is a synonym for 'happy'?",
        options: ["Sad", "Excited", "Cheerful", "Angry"],
        answer: "Cheerful"
    },
    {
        question: "Which of the following is an interjection?",
        options: ["Wow!", "Run", "Beautiful", "Table"],
        answer: "Wow!"
    },
    {
        question: "Which of these sentences uses the correct punctuation?",
        options: [
            "where is your bag.",
            "Where is your bag?",
            "Where is your bag!",
            "where is your bag!"
        ],
        answer: "Where is your bag?"
    },
    {
        question: "What is the past tense of 'eat'?",
        options: ["Eating", "Ate", "Eaten", "Eats"],
        answer: "Ate"
    },
    {
        question: "Which part of speech is the word 'quickly'?",
        options: ["Adjective", "Adverb", "Noun", "Pronoun"],
        answer: "Adverb"
    },
    {
        question: "What is the opposite of 'strong'?",
        options: ["Weak", "Happy", "Powerful", "Healthy"],
        answer: "Weak"
    },
    {
        question: "Which of these is a compound word?",
        options: ["Sunlight", "Bright", "Quick", "Run"],
        answer: "Sunlight"
    },
    {
        question: "Which word in this sentence is a noun: 'The dog is barking loudly.'?",
        options: ["Dog", "Barking", "Loudly", "Is"],
        answer: "Dog"
    },
    {
        question: "What is the plural form of 'sheep'?",
        options: ["Sheeps", "Sheep", "Sheepen", "Sheepes"],
        answer: "Sheep"
    },
    {
        question: "Which of the following is an example of a proper noun?",
        options: ["City", "River", "New York", "Mountain"],
        answer: "New York"
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