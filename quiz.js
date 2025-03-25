// Get the logged-in user and selected subject from localStorage
let loggedInUser = localStorage.getItem("loggedInUser");
let selectedSubject = localStorage.getItem("selectedSubject");

// Redirect to subjects page if no user or subject is selected
if (!loggedInUser || !selectedSubject) {
    window.location.href = "subjects.html";
}

// Sample questions for each subject and user
const allQuestions = {
    "Aryan Singh": {
        "General Awareness": [
            {
                "question": "Which Indian state has its capital in 'Dispur'?",
                "options": ["Assam", "Arunachal Pradesh", "Meghalaya", "Nagaland"],
                "answer": "Assam"
            },
            {
                "question": "Who was the first Prime Minister of India?",
                "options": ["Sardar Patel", "Mahatma Gandhi", "Jawaharlal Nehru", "Dr. Rajendra Prasad"],
                "answer": "Jawaharlal Nehru"
            },
            {
                "question": "Which is the oldest mountain range in India?",
                "options": ["Himalayas", "Aravalli Range", "Vindhyas", "Satpura Range"],
                "answer": "Aravalli Range"
            },
            {
                "question": "Where is the Gateway of India located?",
                "options": ["Delhi", "Mumbai", "Chennai", "Kolkata"],
                "answer": "Mumbai"
            },
            {
                "question": "Which Indian state is the largest producer of tea?",
                "options": ["West Bengal", "Assam", "Kerala", "Tamil Nadu"],
                "answer": "Assam"
            },
            {
                "question": "What comes next in this pattern: ▲, ◼, ▲, ◼, ...?",
                "options": ["▲", "◼", "○", "◇"],
                "answer": "▲"
            },
            {
                "question": "What is the main festival of Kerala?",
                "options": ["Onam", "Diwali", "Pongal", "Holi"],
                "answer": "Onam"
            },
            {
                "question": "Which state is famous for the Charminar?",
                "options": ["Karnataka", "Telangana", "Andhra Pradesh", "Tamil Nadu"],
                "answer": "Telangana"
            },
            {
                "question": "Name the current President of India.",
                "options": ["Droupadi Murmu", "Ramnath Kovind", "Pranab Mukherjee", "Manmohan Singh"],
                "answer": "Droupadi Murmu"
            },
            {
                "question": "Which monument in Delhi is also called the 'Symbol of Love'?",
                "options": ["India Gate", "Qutub Minar", "Lotus Temple", "None of the above"],
                "answer": "None of the above"
            }
        ],
        "Science": [
            {
                "question": "What is the smallest bone in the human body?",
                "options": ["Femur", "Stapes", "Tibia", "Ulna"],
                "answer": "Stapes"
            },
            {
                "question": "Which organ produces insulin?",
                "options": ["Liver", "Pancreas", "Kidneys", "Heart"],
                "answer": "Pancreas"
            },
            {
                "question": "What part of the brain controls memory?",
                "options": ["Cerebrum", "Cerebellum", "Medulla", "Hippocampus"],
                "answer": "Hippocampus"
            },
            {
                "question": "What is the main function of white blood cells?",
                "options": ["Carrying oxygen", "Fighting infections", "Producing energy", "Clotting blood"],
                "answer": "Fighting infections"
            },
            {
                "question": "Which element is essential for the formation of bones and teeth?",
                "options": ["Calcium", "Iron", "Magnesium", "Potassium"],
                "answer": "Calcium"
            },
            {
                "question": "What organ is protected by the ribcage?",
                "options": ["Lungs", "Brain", "Liver", "Eyes"],
                "answer": "Lungs"
            },
            {
                "question": "Which system in the body controls all other systems?",
                "options": ["Circulatory system", "Nervous system", "Digestive system", "Respiratory system"],
                "answer": "Nervous system"
            },
            {
                "question": "Which gas do humans exhale during respiration?",
                "options": ["Oxygen", "Nitrogen", "Carbon dioxide", "Helium"],
                "answer": "Carbon dioxide"
            },
            {
                "question": "What part of the eye is responsible for vision?",
                "options": ["Lens", "Pupil", "Retina", "Cornea"],
                "answer": "Retina"
            },
            {
                "question": "What causes the common cold?",
                "options": ["Bacteria", "Virus", "Fungus", "Protozoa"],
                "answer": "Virus"
            }
        ],
        "Math": [
            {
                "question": "What is the sum of the first 5 odd numbers?",
                "options": ["25", "15", "30", "35"],
                "answer": "25"
            },
            {
                "question": "Simplify: 15 × (3 + 2) ÷ 5.",
                "options": ["12", "15", "9", "10"],
                "answer": "15"
            },
            {
                "question": "What is the square of 12?",
                "options": ["144", "121", "169", "132"],
                "answer": "144"
            },
            {
                "question": "What is 64 ÷ 8?",
                "options": ["7", "8", "9", "6"],
                "answer": "8"
            },
            {
                "question": "What is the place value of 2 in 7,421?",
                "options": ["20", "200", "2", "2000"],
                "answer": "200"
            },
            {
                "question": "What is the product of 14 and 6?",
                "options": ["60", "82", "84", "96"],
                "answer": "84"
            },
            {
                "question": "What is the cube of 3?",
                "options": ["27", "9", "18", "36"],
                "answer": "27"
            },
            {
                "question": "What is the remainder when 50 is divided by 7?",
                "options": ["5", "6", "3", "1"],
                "answer": "1"
            },
            {
                "question": "If 25 × 4 = 100, then what is 100 ÷ 4?",
                "options": ["25", "20", "30", "15"],
                "answer": "25"
            },
            {
                "question": "What is the smallest prime number?",
                "options": ["0", "1", "2", "3"],
                "answer": "2"
            }
        ]
    },    
    
    "Aditya Singh": {
        "General Awareness": [
            {
                "question": "Which state has its capital at 'Itanagar'?",
                "options": ["Arunachal Pradesh", "Assam", "Meghalaya", "Nagaland"],
                "answer": "Arunachal Pradesh"
            },
            {
                "question": "Which city is known as the 'Silicon Valley of India'?",
                "options": ["Hyderabad", "Bengaluru", "Pune", "Chennai"],
                "answer": "Bengaluru"
            },
            {
                "question": "What comes next in this series: 5, 10, 15, 20...?",
                "options": ["22", "25", "30", "35"],
                "answer": "25"
            },
            {
                "question": "Which is the largest state in India by area?",
                "options": ["Rajasthan", "Madhya Pradesh", "Maharashtra", "Uttar Pradesh"],
                "answer": "Rajasthan"
            },
            {
                "question": "What is the national fruit of India?",
                "options": ["Mango", "Apple", "Banana", "Guava"],
                "answer": "Mango"
            },
            {
                "question": "What comes next in this pattern: ▲, ○, ■, ▲, ○...?",
                "options": ["○", "■", "▲", "◇"],
                "answer": "■"
            },
            {
                "question": "Which state is famous for the Charminar?",
                "options": ["Karnataka", "Telangana", "Andhra Pradesh", "Tamil Nadu"],
                "answer": "Telangana"
            },
            {
                "question": "Which Indian city is called the 'City of Joy'?",
                "options": ["Kolkata", "Mumbai", "Delhi", "Chennai"],
                "answer": "Kolkata"
            },
            {
                "question": "Who was the first female Prime Minister of India?",
                "options": ["Indira Gandhi", "Pratibha Patil", "Sarojini Naidu", "Sushma Swaraj"],
                "answer": "Indira Gandhi"
            },
            {
                "question": "Which place is famous as the 'Land of Five Rivers'?",
                "options": ["Punjab", "Haryana", "Rajasthan", "Uttar Pradesh"],
                "answer": "Punjab"
            }
        ],
        "Science": [
            {
                "question": "What is the main gas in the Earth's atmosphere?",
                "options": ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
                "answer": "Nitrogen"
            },
            {
                "question": "Which organ produces bile to aid digestion?",
                "options": ["Liver", "Pancreas", "Stomach", "Gallbladder"],
                "answer": "Liver"
            },
            {
                "question": "Which vitamin is produced in the skin when exposed to sunlight?",
                "options": ["Vitamin A", "Vitamin B", "Vitamin C", "Vitamin D"],
                "answer": "Vitamin D"
            },
            {
                "question": "What is the chemical symbol for water?",
                "options": ["H2O", "O2", "CO2", "HO"],
                "answer": "H2O"
            },
            {
                "question": "What is the hardest substance in the human body?",
                "options": ["Bone", "Enamel", "Keratin", "Cartilage"],
                "answer": "Enamel"
            },
            {
                "question": "Which gas is necessary for photosynthesis?",
                "options": ["Carbon Dioxide", "Oxygen", "Nitrogen", "Methane"],
                "answer": "Carbon Dioxide"
            },
            {
                "question": "What is the approximate temperature of the human body?",
                "options": ["36°C", "37°C", "38°C", "35°C"],
                "answer": "37°C"
            },
            {
                "question": "Which layer of the Earth lies between the crust and the core?",
                "options": ["Mantle", "Outer Core", "Inner Core", "Lithosphere"],
                "answer": "Mantle"
            },
            {
                "question": "What type of joint is present in the human elbow?",
                "options": ["Hinge Joint", "Ball and Socket Joint", "Pivot Joint", "Gliding Joint"],
                "answer": "Hinge Joint"
            },
            {
                "question": "Which organ is responsible for pumping blood throughout the body?",
                "options": ["Heart", "Lungs", "Brain", "Liver"],
                "answer": "Heart"
            }
        ],
        "Math": [
        {
            "question": "Add: 245 + 378",
            "options": ["613", "623", "633", "643"],
            "answer": "623"
        },
        {
            "question": "Subtract: 975 - 438",
            "options": ["537", "547", "537", "545"],
            "answer": "537"
        },
        {
            "question": "Multiply: 23 × 6",
            "options": ["128", "138", "148", "138"],
            "answer": "138"
        },
        {
            "question": "Word Problem: Ravi has 45 apples, and his friend gives him 30 more apples. How many apples does Ravi have now?",
            "options": ["75", "85", "65", "80"],
            "answer": "75"
        },
        {
            "question": "Word Problem: A train has 350 passengers. At the next station, 125 passengers get off, and 90 new passengers board the train. How many passengers are on the train now?",
            "options": ["315", "325", "340", "365"],
            "answer": "315"
        },
        {
            "question": "Word Problem: A baker bakes 12 cakes each hour. How many cakes does the baker bake in 8 hours?",
            "options": ["92", "96", "108", "112"],
            "answer": "96"
        },
        {
            "question": "Add: 1234 + 4321",
            "options": ["5555", "5545", "5565", "5550"],
            "answer": "5555"
        },
        {
            "question": "Subtract: 2048 - 1537",
            "options": ["511", "519", "521", "511"],
            "answer": "511"
        },
        {
            "question": "Multiply: 16 × 25",
            "options": ["400", "425", "375", "450"],
            "answer": "400"
        },
        {
            "question": "Word Problem: Priya buys 3 packets of candies, each containing 15 candies. How many candies does Priya have in total?",
            "options": ["30", "45", "60", "50"],
            "answer": "45"
        }
    ],
        "English": [
            {
                "question": "Which is a personal pronoun: She is reading a book.",
                "options": ["She", "Book", "Reading", "Is"],
                "answer": "She"
            },
            {
                "question": "Which is a possessive pronoun: The pen is mine.",
                "options": ["Mine", "Pen", "The", "Is"],
                "answer": "Mine"
            },
            {
                "question": "Pick the noun: The dog is barking.",
                "options": ["Dog", "Is", "Barking", "The"],
                "answer": "Dog"
            },
            {
                "question": "Find the adjective: The bright star is visible.",
                "options": ["Bright", "Star", "Visible", "Is"],
                "answer": "Bright"
            },
            {
                "question": "Which is a reflexive pronoun: He blamed himself for the mistake.",
                "options": ["Himself", "Blamed", "He", "Mistake"],
                "answer": "Himself"
            },
            {
                "question": "Select the possessive pronoun: The bicycle is theirs.",
                "options": ["Theirs", "Bicycle", "Is", "The"],
                "answer": "Theirs"
            },
            {
                "question": "Choose the noun: The birds are flying high.",
                "options": ["Birds", "Flying", "High", "Are"],
                "answer": "Birds"
            },
            {
                "question": "Pick the adjective: The blue car is parked outside.",
                "options": ["Blue", "Car", "Outside", "Parked"],
                "answer": "Blue"
            },
            {
                "question": "Identify the demonstrative pronoun: This is my bag.",
                "options": ["This", "My", "Bag", "Is"],
                "answer": "This"
            },
            {
                "question": "Which is an abstract noun: Honesty is the best policy.",
                "options": ["Honesty", "Policy", "Best", "Is"],
                "answer": "Honesty"
            }
        ]
    }
};    

// Use the questions assigned to the student
const questions = allQuestions[loggedInUser][selectedSubject];

// DOM elements and other variables remain the same
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
const totalQuestions = questions.length;

// Track user answers, time spent, and question states
let userAnswers = Array(totalQuestions).fill(null);
let questionTimers = Array(totalQuestions).fill(90); // Time left for each question
let questionTimeSpent = Array(totalQuestions).fill(0); // Time spent on each question
let questionCompleted = Array(totalQuestions).fill(false); // Track if a question's time is up

// The rest of the code remains the same...

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