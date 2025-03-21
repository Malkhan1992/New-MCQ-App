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
                question: "What is the capital of Gujarat?",
                options: ["Ahmedabad", "Surat", "Gandhinagar", "Rajkot"],
                answer: "Gandhinagar"
            },
            {
                question: "Who is the Chief Minister of Maharashtra?",
                options: ["Aaditya Thackeray", "Devendra Fadnavis", "Eknath Shinde", "Sharad Pawar"],
                answer: "Eknath Shinde"
            },
            {
                question: "Which number comes next: 2, 4, 6, 8...?",
                options: ["9", "10", "12", "11"],
                answer: "10"
            },
            {
                question: "What is the capital of Rajasthan?",
                options: ["Jaipur", "Jodhpur", "Udaipur", "Kota"],
                answer: "Jaipur"
            },
            {
                question: "Which place is known as the 'Pink City'?",
                options: ["Udaipur", "Jaipur", "Jaisalmer", "Ajmer"],
                answer: "Jaipur"
            },
            {
                question: "What is the next figure in this series: □, ○, □, ○...?",
                options: ["□", "○", "△", "◇"],
                answer: "□"
            },
            {
                question: "The capital of Bihar is?",
                options: ["Patna", "Gaya", "Muzaffarpur", "Bhagalpur"],
                answer: "Patna"
            },
            {
                question: "Which state is famous for the Taj Mahal?",
                options: ["Uttar Pradesh", "Rajasthan", "Gujarat", "Madhya Pradesh"],
                answer: "Uttar Pradesh"
            },
            {
                question: "Who is the current Chief Minister of Karnataka?",
                options: ["Siddaramaiah", "Basavaraj Bommai", "D.K. Shivakumar", "H.D. Kumaraswamy"],
                answer: "Siddaramaiah"
            },
            {
                question: "What comes next in the number series: 5, 10, 15, 20...?",
                options: ["25", "30", "35", "40"],
                answer: "25"
            }
        ],
        "Science": [
            {
                question: "What organ pumps blood throughout the body?",
                options: ["Heart", "Liver", "Brain", "Lungs"],
                answer: "Heart"
            },
            {
                question: "Which organ helps us breathe?",
                options: ["Lungs", "Stomach", "Kidneys", "Skin"],
                answer: "Lungs"
            },
            {
                question: "What is the largest organ in the human body?",
                options: ["Skin", "Liver", "Brain", "Heart"],
                answer: "Skin"
            },
            {
                question: "What connects bones in the human body?",
                options: ["Ligaments", "Arteries", "Veins", "Muscles"],
                answer: "Ligaments"
            },
            {
                question: "Which organ filters waste from the blood?",
                options: ["Kidneys", "Liver", "Stomach", "Heart"],
                answer: "Kidneys"
            },
            {
                question: "What organ controls the body and mind?",
                options: ["Brain", "Heart", "Lungs", "Eyes"],
                answer: "Brain"
            },
            {
                question: "Which part of the body helps in digestion of food?",
                options: ["Stomach", "Lungs", "Brain", "Heart"],
                answer: "Stomach"
            },
            {
                question: "What organ removes carbon dioxide from the body?",
                options: ["Lungs", "Kidneys", "Skin", "Heart"],
                answer: "Lungs"
            },
            {
                question: "What is the function of red blood cells?",
                options: ["Carry oxygen", "Fight infections", "Control temperature", "Send signals"],
                answer: "Carry oxygen"
            },
            {
                question: "Which organ helps us see?",
                options: ["Eyes", "Ears", "Skin", "Tongue"],
                answer: "Eyes"
            }
        ],
        "Math": [
            {
                question: "Add: 458 + 367",
                options: ["825", "815", "845", "835"],
                answer: "825"
            },
            {
                question: "Subtract: 890 - 345",
                options: ["545", "525", "555", "565"],
                answer: "545"
            },
            {
                question: "Multiply: 23 × 4",
                options: ["92", "102", "82", "112"],
                answer: "92"
            },
            {
                question: "Divide: 48 ÷ 6",
                options: ["7", "8", "6", "9"],
                answer: "8"
            },
            {
                question: "What is the place value of 5 in 458?",
                options: ["5", "50", "500", "8"],
                answer: "50"
            },
            {
                question: "Find the face value of 7 in 672.",
                options: ["7", "700", "70", "72"],
                answer: "7"
            },
            {
                question: "Which number is even: 23, 46, 57, 89?",
                options: ["46", "23", "57", "89"],
                answer: "46"
            },
            {
                question: "Which number is odd: 12, 24, 35, 88?",
                options: ["35", "12", "24", "88"],
                answer: "35"
            },
            {
                question: "Add: 124 + 876",
                options: ["1000", "999", "998", "1010"],
                answer: "1000"
            },
            {
                question: "Subtract: 643 - 234",
                options: ["409", "400", "405", "419"],
                answer: "409"
            }
        ],
        "English": [
            {
                question: "Identify the personal pronoun: She is reading a book.",
                options: ["She", "Book", "Reading", "Is"],
                answer: "She"
            },
            {
                question: "Choose the possessive pronoun: This book is mine.",
                options: ["Book", "Mine", "Is", "This"],
                answer: "Mine"
            },
            {
                question: "Which is a noun in this sentence: The cat is sleeping on the mat.",
                options: ["Sleeping", "On", "Mat", "Cat"],
                answer: "Cat"
            },
            {
                question: "Find the adjective: The red balloon flew away.",
                options: ["Red", "Balloon", "Flew", "Away"],
                answer: "Red"
            },
            {
                question: "Identify the personal pronoun: We are going to the park.",
                options: ["Going", "Park", "We", "To"],
                answer: "We"
            },
            {
                question: "Which is a possessive pronoun: This house is theirs.",
                options: ["House", "Is", "Theirs", "This"],
                answer: "Theirs"
            },
            {
                question: "Select the noun: The children are playing cricket.",
                options: ["Playing", "Cricket", "The", "Are"],
                answer: "Cricket"
            },
            {
                question: "Find the adjective: The delicious cake was eaten quickly.",
                options: ["Delicious", "Cake", "Was", "Quickly"],
                answer: "Delicious"
            },
            {
                question: "Identify the personal pronoun: He is my best friend.",
                options: ["He", "Friend", "Is", "My"],
                answer: "He"
            },
            {
                question: "Choose the possessive pronoun: The bicycle is hers.",
                options: ["Bicycle", "Hers", "Is", "The"],
                answer: "Hers"
            }
        ]
    },
    
    "Aditya Singh": {
        "General Awareness": [
            {
                question: "What is the capital of Madhya Pradesh?",
                options: ["Indore", "Bhopal", "Gwalior", "Jabalpur"],
                answer: "Bhopal"
            },
            {
                question: "Which place is known as the 'City of Lakes'?",
                options: ["Udaipur", "Jaipur", "Agra", "Bhopal"],
                answer: "Udaipur"
            },
            {
                question: "What comes next in this series: 3, 6, 9, 12...?",
                options: ["14", "15", "18", "20"],
                answer: "15"
            },
            {
                question: "What is the capital of Karnataka?",
                options: ["Bengaluru", "Mysuru", "Hubli", "Mangaluru"],
                answer: "Bengaluru"
            },
            {
                question: "What is the national flower of India?",
                options: ["Rose", "Lotus", "Sunflower", "Marigold"],
                answer: "Lotus"
            },
            {
                question: "What is the next shape in this pattern: ▲, ■, ○, ▲, ■...?",
                options: ["■", "○", "▲", "◇"],
                answer: "○"
            },
            {
                question: "Which state is famous for the Charminar?",
                options: ["Karnataka", "Telangana", "Andhra Pradesh", "Tamil Nadu"],
                answer: "Telangana"
            },
            {
                question: "Which Indian state is known for the Sun Temple in Konark?",
                options: ["Odisha", "West Bengal", "Assam", "Chhattisgarh"],
                answer: "Odisha"
            },
            {
                question: "Who is the current Prime Minister of India?",
                options: ["Narendra Modi", "Manmohan Singh", "Rahul Gandhi", "Amit Shah"],
                answer: "Narendra Modi"
            },
            {
                question: "What comes next in this pattern: 7, 14, 21, 28...?",
                options: ["35", "34", "36", "37"],
                answer: "35"
            }
        ],
        "Science": [
            {
                question: "Which organ is responsible for pumping oxygen-rich blood to the body?",
                options: ["Lungs", "Brain", "Heart", "Liver"],
                answer: "Heart"
            },
            {
                question: "Which organ helps in removing waste and toxins from the blood?",
                options: ["Kidneys", "Liver", "Lungs", "Stomach"],
                answer: "Kidneys"
            },
            {
                question: "What do white blood cells do in the body?",
                options: ["Carry oxygen", "Fight infections", "Provide energy", "Regulate temperature"],
                answer: "Fight infections"
            },
            {
                question: "Which part of the body is made up of bones and protects the brain?",
                options: ["Skull", "Ribs", "Spine", "Pelvis"],
                answer: "Skull"
            },
            {
                question: "What helps in digesting food in the stomach?",
                options: ["Bile", "Saliva", "Digestive juices", "Blood"],
                answer: "Digestive juices"
            },
            {
                question: "Which organ controls the rest of the body?",
                options: ["Brain", "Heart", "Lungs", "Stomach"],
                answer: "Brain"
            },
            {
                question: "Which organ removes carbon dioxide from the body?",
                options: ["Lungs", "Skin", "Kidneys", "Heart"],
                answer: "Lungs"
            },
            {
                question: "What gives our body shape and support?",
                options: ["Muscles", "Bones", "Skin", "Veins"],
                answer: "Bones"
            },
            {
                question: "Where is the smallest bone in the body located?",
                options: ["Ear", "Finger", "Toe", "Nose"],
                answer: "Ear"
            },
            {
                question: "What does the liver produce to help digest fat?",
                options: ["Bile", "Blood", "Enzymes", "Hormones"],
                answer: "Bile"
            }
        ],
        "Math": [
            {
                question: "Add: 56 + 78",
                options: ["133", "134", "135", "136"],
                answer: "134"
            },
            {
                question: "Subtract: 105 - 67",
                options: ["37", "38", "39", "40"],
                answer: "38"
            },
            {
                question: "Multiply: 12 × 4",
                options: ["46", "48", "49", "50"],
                answer: "48"
            },
            {
                question: "Divide: 64 ÷ 8",
                options: ["7", "8", "9", "10"],
                answer: "8"
            },
            {
                question: "What is the place value of 8 in 482?",
                options: ["8", "80", "800", "482"],
                answer: "80"
            },
            {
                question: "What is the face value of 6 in 762?",
                options: ["6", "60", "600", "762"],
                answer: "6"
            },
            {
                question: "Which number is even: 31, 42, 55, 67?",
                options: ["42", "31", "55", "67"],
                answer: "42"
            },
            {
                question: "Which number is odd: 24, 36, 45, 60?",
                options: ["45", "24", "36", "60"],
                answer: "45"
            },
            {
                question: "Add: 128 + 256",
                options: ["384", "382", "386", "388"],
                answer: "384"
            },
            {
                question: "Subtract: 543 - 321",
                options: ["222", "221", "223", "224"],
                answer: "222"
            }
        ],
        "English": [
            {
                question: "Which is a personal pronoun: He likes ice cream.",
                options: ["He", "Likes", "Ice", "Cream"],
                answer: "He"
            },
            {
                question: "Which is a possessive pronoun: This bag is hers.",
                options: ["Bag", "Hers", "This", "Is"],
                answer: "Hers"
            },
            {
                question: "Pick the noun: The bird is flying high.",
                options: ["Bird", "Flying", "High", "Is"],
                answer: "Bird"
            },
            {
                question: "Find the adjective: The fluffy cat is sleeping.",
                options: ["Fluffy", "Cat", "Sleeping", "Is"],
                answer: "Fluffy"
            },
            {
                question: "Which is a personal pronoun: We are going to school.",
                options: ["We", "Going", "School", "Are"],
                answer: "We"
            },
            {
                question: "Select the possessive pronoun: The house is theirs.",
                options: ["House", "Theirs", "Is", "The"],
                answer: "Theirs"
            },
            {
                question: "Choose the noun: The stars are shining brightly.",
                options: ["Stars", "Shining", "Brightly", "Are"],
                answer: "Stars"
            },
            {
                question: "Pick the adjective: The tall tree is near the gate.",
                options: ["Tall", "Tree", "Gate", "Near"],
                answer: "Tall"
            },
            {
                question: "Identify the personal pronoun: She is drawing a picture.",
                options: ["She", "Drawing", "Picture", "Is"],
                answer: "She"
            },
            {
                question: "Find the possessive pronoun: The toy is ours.",
                options: ["Toy", "Ours", "Is", "The"],
                answer: "Ours"
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