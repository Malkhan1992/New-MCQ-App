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
        question: "Who is the current President of India?",
        options: ["Droupadi Murmu", "Narendra Modi", "Pratibha Patil", "Ram Nath Kovind"],
        answer: "Droupadi Murmu"
    },
    {
        question: "What is the national animal of India?",
        options: ["Lion", "Tiger", "Elephant", "Leopard"],
        answer: "Tiger"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Venus", "Mars", "Jupiter"],
        answer: "Mars"
    },
    {
        question: "What is the tallest mountain in the world?",
        options: ["K2", "Kangchenjunga", "Mount Everest", "Lhotse"],
        answer: "Mount Everest"
    },
    {
        question: "Who invented the telephone?",
        options: ["Alexander Graham Bell", "Thomas Edison", "Nikola Tesla", "Albert Einstein"],
        answer: "Alexander Graham Bell"
    },
    {
        question: "What is the largest ocean on Earth?",
        options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        answer: "Pacific Ocean"
    },
    {
        question: "Who wrote the national anthem of India?",
        options: ["Rabindranath Tagore", "Bankim Chandra Chatterjee", "Sarojini Naidu", "Subhas Chandra Bose"],
        answer: "Rabindranath Tagore"
    },
    {
        question: "What is the capital city of Maharashtra?",
        options: ["Mumbai", "Pune", "Nagpur", "Nashik"],
        answer: "Mumbai"
    },
    {
        question: "What is the boiling point of water at sea level?",
        options: ["0°C", "50°C", "100°C", "200°C"],
        answer: "100°C"
    },
    {
        question: "Who was the first person to step on the moon?",
        options: ["Buzz Aldrin", "Yuri Gagarin", "Neil Armstrong", "Michael Collins"],
        answer: "Neil Armstrong"
    }
],
    "Science": [
    {
        question: "What is the smallest unit of life?",
        options: ["Atom", "Cell", "Tissue", "Molecule"],
        answer: "Cell"
    },
    {
        question: "What is the main gas found in the air we breathe?",
        options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
        answer: "Nitrogen"
    },
    {
        question: "Which force keeps us on the ground?",
        options: ["Magnetism", "Gravity", "Friction", "Electric Force"],
        answer: "Gravity"
    },
    {
        question: "What do we call water when it is in its gas form?",
        options: ["Ice", "Steam", "Rain", "Cloud"],
        answer: "Steam"
    },
    {
        question: "What is the main organ of the nervous system?",
        options: ["Heart", "Brain", "Lungs", "Liver"],
        answer: "Brain"
    },
    {
        question: "Which energy resource is non-renewable?",
        options: ["Solar Energy", "Wind Energy", "Coal", "Hydropower"],
        answer: "Coal"
    },
    {
        question: "What type of energy does a moving object have?",
        options: ["Kinetic Energy", "Potential Energy", "Thermal Energy", "Electric Energy"],
        answer: "Kinetic Energy"
    },
    {
        question: "What is the outer layer of the Earth called?",
        options: ["Core", "Mantle", "Crust", "Lithosphere"],
        answer: "Crust"
    },
    {
        question: "Which part of the eye controls the amount of light entering it?",
        options: ["Pupil", "Retina", "Cornea", "Lens"],
        answer: "Pupil"
    },
    {
        question: "What do plants release into the air during photosynthesis?",
        options: ["Carbon Dioxide", "Oxygen", "Nitrogen", "Hydrogen"],
        answer: "Oxygen"
    }
],
    
    "Math": [
    {
        question: "What is 345 + 678?",
        options: ["1023", "1003", "1022", "1005"],
        answer: "1023"
    },
    {
        question: "What is 957 - 432?",
        options: ["535", "525", "515", "545"],
        answer: "525"
    },
    {
        question: "What is 45 × 6?",
        options: ["250", "270", "280", "260"],
        answer: "270"
    },
    {
        question: "What is 144 ÷ 12?",
        options: ["10", "11", "12", "14"],
        answer: "12"
    },
    {
        question: "Which number is even?",
        options: ["37", "42", "59", "73"],
        answer: "42"
    },
    {
        question: "Which number is odd?",
        options: ["62", "80", "49", "28"],
        answer: "49"
    },
    {
        question: "What is the place value of 5 in 4521?",
        options: ["5", "50", "500", "5000"],
        answer: "500"
    },
    {
        question: "What is the face value of 6 in 7634?",
        options: ["6", "60", "600", "6000"],
        answer: "6"
    },
    {
        question: "If a basket contains 24 apples and 36 oranges, how many fruits are there in total?",
        options: ["50", "60", "70", "80"],
        answer: "60"
    },
    {
        question: "If a jar has 100 candies and you eat 25, how many candies are left?",
        options: ["65", "75", "85", "95"],
        answer: "75"
    }
],
    "English": [
    {
        question: "Which of the following is a common noun?",
        options: ["London", "Book", "Eiffel Tower", "Mount Everest"],
        answer: "Book"
    },
    {
        question: "What type of noun is 'happiness'?",
        options: ["Proper Noun", "Common Noun", "Abstract Noun", "Collective Noun"],
        answer: "Abstract Noun"
    },
    {
        question: "Which of these is a collective noun?",
        options: ["Chair", "Team", "India", "Kindness"],
        answer: "Team"
    },
    {
        question: "What is the gender of the noun 'actor'?",
        options: ["Masculine", "Feminine", "Neuter", "Common"],
        answer: "Masculine"
    },
    {
        question: "Which is the feminine form of 'lion'?",
        options: ["Tiger", "Lioness", "Cheetah", "Tigress"],
        answer: "Lioness"
    },
    {
        question: "What is the singular form of 'children'?",
        options: ["Child", "Childs", "Childes", "Childies"],
        answer: "Child"
    },
    {
        question: "What is the plural form of 'knife'?",
        options: ["Knives", "Knifes", "Knifs", "Knive"],
        answer: "Knives"
    },
    {
        question: "Which of the following is a proper noun?",
        options: ["River", "Ganga", "Book", "Bird"],
        answer: "Ganga"
    },
    {
        question: "What type of noun is 'India'?",
        options: ["Abstract Noun", "Proper Noun", "Collective Noun", "Common Noun"],
        answer: "Proper Noun"
    },
    {
        question: "What is the plural form of 'person'?",
        options: ["Persons", "People", "Persones", "Peoples"],
        answer: "People"
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