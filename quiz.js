// Get the logged-in user and selected subject from localStorage
let loggedInUser = localStorage.getItem("loggedInUser");
let selectedSubject = localStorage.getItem("selectedSubject");

// Question version tracking
const QUESTION_VERSION = "3.0"; // Update this when questions are updated
const VERSION_KEY = `questionVersion_${loggedInUser}_${selectedSubject}`;
const ATTEMPT_KEY = `attemptCount_${loggedInUser}_${selectedSubject}`;

// Initialize or update attempt count based on question version
function initializeAttemptTracking() {
    const currentVersion = localStorage.getItem(VERSION_KEY);
    
    if (currentVersion !== QUESTION_VERSION) {
        // New version of questions, reset attempt count
        localStorage.setItem(VERSION_KEY, QUESTION_VERSION);
        localStorage.setItem(ATTEMPT_KEY, "1");
    } else {
        // Same version, increment attempt count
        const currentAttempt = parseInt(localStorage.getItem(ATTEMPT_KEY) || "0");
        localStorage.setItem(ATTEMPT_KEY, (currentAttempt + 1).toString());
    }
    // Always update currentAttempt for the certificate
    localStorage.setItem("currentAttempt", localStorage.getItem(ATTEMPT_KEY));
}

// Initialize attempt tracking when quiz starts
initializeAttemptTracking();

// Redirect to subjects page if no user or subject is selected
if (!loggedInUser || !selectedSubject) {
    window.location.href = "subjects.html";
}

// Sample questions for each subject and user
const allQuestions = {
    "Aryan Singh": {
        "General Awareness": [
    {
        "question": "Which state in India is called the 'Land of Five Rivers'?",
        "options": ["Punjab", "Kerala", "Gujarat", "Odisha"],
        "answer": "Punjab"
    },
    {
        "question": "What is the currency of India?",
        "options": ["Dollar", "Euro", "Rupee", "Yen"],
        "answer": "Rupee"
    },
    {
        "question": "Why do we wear cotton clothes in summer?",
        "options": ["They look nice", "They keep us cool", "They are heavy", "They are colorful"],
        "answer": "They keep us cool"
    },
    {
        "question": "Which planet is famous for its rings?",
        "options": ["Mars", "Jupiter", "Saturn", "Neptune"],
        "answer": "Saturn"
    },
    {
        "question": "What is the name of India's National Anthem?",
        "options": ["Vande Mataram", "Jana Gana Mana", "Sare Jahan Se Achha", "Inquilab Zindabad"],
        "answer": "Jana Gana Mana"
    },
    {
        "question": "Which natural disaster is measured on the Richter scale?",
        "options": ["Flood", "Cyclone", "Earthquake", "Tsunami"],
        "answer": "Earthquake"
    },
    {
        "question": "Who is known as the 'Missile Man of India'?",
        "options": ["APJ Abdul Kalam", "Ratan Tata", "C.V. Raman", "Narendra Modi"],
        "answer": "APJ Abdul Kalam"
    },
    {
        "question": "Which part of the computer shows pictures and videos?",
        "options": ["Keyboard", "Mouse", "Monitor", "Printer"],
        "answer": "Monitor"
    },
    {
        "question": "What do we call a group of stars that forms a pattern?",
        "options": ["Planet", "Comet", "Galaxy", "Constellation"],
        "answer": "Constellation"
    },
    {
        "question": "Which famous leader said, 'You must be the change you wish to see in the world'?",
        "options": ["Bhagat Singh", "Mahatma Gandhi", "Subhash Chandra Bose", "Jawaharlal Nehru"],
        "answer": "Mahatma Gandhi"
    }
],

        "Science": [
    {
        "question": "Why do astronauts wear special suits in space?",
        "options": ["To look cool", "To float better", "To breathe and stay safe", "To run faster"],
        "answer": "To breathe and stay safe"
    },
    {
        "question": "Which part of the plant turns sunlight into food?",
        "options": ["Roots", "Stem", "Leaves", "Flower"],
        "answer": "Leaves"
    },
    {
        "question": "Which of the following is *not* a sense organ?",
        "options": ["Skin", "Brain", "Tongue", "Ear"],
        "answer": "Brain"
    },
    {
        "question": "What causes iron to rust?",
        "options": ["Sunlight", "Wind", "Air and water", "Electricity"],
        "answer": "Air and water"
    },
    {
        "question": "Which simple machine is used in a seesaw?",
        "options": ["Wheel and axle", "Pulley", "Lever", "Screw"],
        "answer": "Lever"
    },
    {
        "question": "What do we call the gas that plants need to make food?",
        "options": ["Oxygen", "Carbon dioxide", "Nitrogen", "Hydrogen"],
        "answer": "Carbon dioxide"
    },
    {
        "question": "Which planet has a giant red spot and is made of gas?",
        "options": ["Earth", "Jupiter", "Mars", "Mercury"],
        "answer": "Jupiter"
    },
    {
        "question": "What kind of energy is stored in food?",
        "options": ["Sound energy", "Kinetic energy", "Chemical energy", "Light energy"],
        "answer": "Chemical energy"
    },
    {
        "question": "Why do your pupils get smaller in bright light?",
        "options": ["To cry", "To focus better", "To protect your eyes", "To help you see colors"],
        "answer": "To protect your eyes"
    },
    {
        "question": "What helps bats 'see' in the dark using sound?",
        "options": ["Infrared vision", "Flashlight", "Echolocation", "Night vision goggles"],
        "answer": "Echolocation"
    }
],

       "Math": [
    {
        "question": "Write the numeral for: Forty three crore twenty lakh fifty thousand one hundred eleven",
        "options": ["432050111", "4302050111", "4320050111", "430205011"],
        "answer": "432050111"
    },
    {
        "question": "Write the numeral for: Seventy two crore five lakh nine thousand twenty",
        "options": ["720509020", "7205090020", "7020509020", "7200509020"],
        "answer": "720509020"
    },
    {
        "question": "Write the numeral for: Ninety six crore eighteen lakh twenty three thousand four hundred eighty five",
        "options": ["961823485", "9061823485", "9618230485", "9618234585"],
        "answer": "961823485"
    },
    {
        "question": "Write the numeral for: Fifty five crore one lakh eighty thousand three hundred ten",
        "options": ["550180310", "5500180310", "5501800310", "5051800310"],
        "answer": "550180310"
    },
    {
        "question": "Write the numeral for: Sixty crore ten lakh ten thousand ten",
        "options": ["601010010", "6001010010", "610010010", "6010100010"],
        "answer": "601010010"
    },
    {
        "question": "Write in words: 430508921",
        "options": [
            "Four crore thirty lakh fifty eight thousand nine hundred twenty one",
            "Forty three crore five lakh eight thousand nine hundred twenty one",
            "Forty three crore five lakh eighty nine thousand twenty one",
            "Forty three crore five lakh eight thousand nine hundred twenty one"
        ],
        "answer": "Forty three crore five lakh eight thousand nine hundred twenty one"
    },
    {
        "question": "Write in words: 965004016",
        "options": [
            "Ninety six crore fifty lakh four thousand sixteen",
            "Ninety six crore five lakh four thousand sixteen",
            "Nine crore sixty five lakh four thousand sixteen",
            "Ninety six crore fifty lakh forty thousand sixteen"
        ],
        "answer": "Ninety six crore fifty lakh four thousand sixteen"
    },
    {
        "question": "Write in words: 728341001",
        "options": [
            "Seventy two crore eighty three lakh forty one thousand one",
            "Seven crore twenty eight lakh three thousand four hundred one",
            "Seventy two crore eighty four lakh thirty one thousand one",
            "Seventy two crore eighty three lakh forty one thousand one"
        ],
        "answer": "Seventy two crore eighty three lakh forty one thousand one"
    },
    {
        "question": "Write in words: 810020009",
        "options": [
            "Eighty one crore two lakh nine",
            "Eighty crore ten lakh twenty thousand nine",
            "Eighty one crore two lakh twenty thousand nine",
            "Eighty one crore twenty lakh nine"
        ],
        "answer": "Eighty one crore two lakh twenty thousand nine"
    },
    {
        "question": "Write in words: 990100101",
        "options": [
            "Ninety nine crore one lakh one hundred one",
            "Ninety nine crore ten lakh one hundred one",
            "Ninety nine crore one lakh one thousand one",
            "Ninety nine crore one lakh one thousand and one"
        ],
        "answer": "Ninety nine crore ten lakh one hundred one"
    }
],
        "English":[
    {
        "question": "In the sentence 'The teacher gave her students a difficult assignment,' identify the noun and adjective.",
        "options": ["teacher - difficult", "teacher - assignment", "students - difficult", "assignment - students"],
        "answer": "teacher - difficult"
    },
    {
        "question": "Which of the following sentences contains a collective noun?",
        "options": ["The committee met to discuss the issue.", "The sun is shining brightly.", "She reads books every evening.", "The dog ran quickly."],
        "answer": "The committee met to discuss the issue."
    },
    {
        "question": "Identify the pronoun and adjective in the sentence: 'They are excited about their new project.'",
        "options": ["They - new", "They - excited", "their - new", "They - excited - new"],
        "answer": "They - excited"
    },
    {
        "question": "Which sentence contains a possessive noun?",
        "options": ["The students completed their assignments.", "The girl's books were on the table.", "The teacher explained the lesson.", "The children played in the park."],
        "answer": "The girl's books were on the table."
    },
    {
        "question": "Which of the following words is a concrete noun?",
        "options": ["happiness", "intelligence", "apple", "courage"],
        "answer": "apple"
    },
    {
        "question": "Choose the correct pronoun to replace the noun: 'I spoke to my friend. ____ is very kind.'",
        "options": ["He", "They", "It", "She"],
        "answer": "He"
    },
    {
        "question": "Which of the following sentences uses an adjective correctly?",
        "options": ["The building was higher than the tree.", "The girls are running happily.", "The red ball bounced away.", "She laughed quickly."],
        "answer": "The red ball bounced away."
    },
    {
        "question": "In the sentence 'The hungry dog eagerly ate the food given to it by its owner,' which word is an adjective?",
        "options": ["dog", "hungry", "food", "owner"],
        "answer": "hungry"
    },
    {
        "question": "In the sentence 'Everyone admired the bold, creative ideas presented by the team,' which words are adjectives?",
        "options": ["Everyone - admired", "bold - creative", "ideas - team", "admired - ideas"],
        "answer": "bold - creative"
    },
    {
        "question": "Which sentence contains a reflexive pronoun?",
        "options": ["She made herself a cup of tea.", "The dog is barking loudly.", "I saw him at the store.", "They played basketball after school."],
        "answer": "She made herself a cup of tea."
    }
],

    },    
    
    "Aditya Singh": {
    "General Awareness": [
        {
            "question": "Which state has its capital at 'Bhopal'?",
            "options": ["Madhya Pradesh", "Uttar Pradesh", "Haryana", "Maharashtra"],
            "answer": "Madhya Pradesh"
        },
        {
            "question": "Which animal is known as the 'Ship of the Desert'?",
            "options": ["Camel", "Horse", "Elephant", "Donkey"],
            "answer": "Camel"
        },
        {
            "question": "What is the currency of India?",
            "options": ["Rupee", "Dollar", "Yen", "Euro"],
            "answer": "Rupee"
        },
        {
            "question": "What is the national flower of India?",
            "options": ["Lotus", "Rose", "Tulip", "Sunflower"],
            "answer": "Lotus"
        },
        {
            "question": "Which country is famous for the Great Wall?",
            "options": ["China", "India", "Russia", "USA"],
            "answer": "China"
        },
        {
            "question": "Which bird is known for its ability to mimic human speech?",
            "options": ["Parrot", "Crow", "Pigeon", "Sparrow"],
            "answer": "Parrot"
        },
        {
            "question": "What comes next in this sequence: 2, 4, 6, 8, ...?",
            "options": ["10", "12", "14", "16"],
            "answer": "10"
        },
        {
            "question": "Which Indian city is known as the 'Pink City'?",
            "options": ["Jaipur", "Mumbai", "Delhi", "Chennai"],
            "answer": "Jaipur"
        },
        {
            "question": "Which is the largest continent by area?",
            "options": ["Asia", "Africa", "Europe", "North America"],
            "answer": "Asia"
        },
        {
            "question": "Which animal is the largest mammal in the world?",
            "options": ["Blue Whale", "Elephant", "Shark", "Giraffe"],
            "answer": "Blue Whale"
        }
    ],
    "Science": [
        {
            "question": "Which planet is closest to the Sun?",
            "options": ["Mercury", "Venus", "Earth", "Mars"],
            "answer": "Mercury"
        },
        {
            "question": "Which of the following is a herbivore?",
            "options": ["Lion", "Elephant", "Tiger", "Wolf"],
            "answer": "Elephant"
        },
        {
            "question": "What is the solid part of the Earth called?",
            "options": ["Crust", "Core", "Mantle", "Clouds"],
            "answer": "Crust"
        },
        {
            "question": "Which organ helps us to breathe?",
            "options": ["Lungs", "Heart", "Kidney", "Brain"],
            "answer": "Lungs"
        },
        {
            "question": "What do plants need for photosynthesis?",
            "options": ["Water, Air, Sunlight", "Water, Air, Soil", "Sunlight, Air, Soil", "Water, Soil, Minerals"],
            "answer": "Water, Air, Sunlight"
        },
        {
            "question": "Which is the largest organ in the human body?",
            "options": ["Skin", "Liver", "Heart", "Lungs"],
            "answer": "Skin"
        },
        {
            "question": "Which of the following is a form of water?",
            "options": ["Vapor", "Ice", "Liquid", "All of the above"],
            "answer": "All of the above"
        },
        {
            "question": "Which organ is responsible for pumping blood throughout the body?",
            "options": ["Heart", "Liver", "Stomach", "Lungs"],
            "answer": "Heart"
        },
        {
            "question": "What is the source of energy for the Earth?",
            "options": ["Sun", "Wind", "Water", "Soil"],
            "answer": "Sun"
        },
        {
            "question": "What type of tree produces acorns?",
            "options": ["Oak", "Pine", "Maple", "Birch"],
            "answer": "Oak"
        }
    ],
    "Math": [
        {
            "question": "Add: 158 + 347",
            "options": ["505", "465", "497", "505"],
            "answer": "505"
        },
        {
            "question": "Subtract: 984 - 567",
            "options": ["417", "427", "437", "457"],
            "answer": "417"
        },
        {
            "question": "Multiply: 13 × 7",
            "options": ["91", "102", "92", "103"],
            "answer": "91"
        },
        {
            "question": "Word Problem: Sara buys 25 pencils. She gives 10 pencils to her friend. How many pencils does she have now?",
            "options": ["15", "20", "30", "18"],
            "answer": "15"
        },
        {
            "question": "Word Problem: A box contains 8 rows of books, with 12 books in each row. How many books are there in total?",
            "options": ["96", "80", "72", "108"],
            "answer": "96"
        },
        {
            "question": "What is the product of 24 × 6?",
            "options": ["144", "148", "146", "150"],
            "answer": "144"
        },
        {
            "question": "Add: 184 + 629",
            "options": ["803", "813", "823", "833"],
            "answer": "813"
        },
        {
            "question": "Subtract: 1500 - 764",
            "options": ["736", "746", "734", "724"],
            "answer": "736"
        },
        {
            "question": "Multiply: 25 × 11",
            "options": ["275", "250", "280", "300"],
            "answer": "275"
        },
        {
            "question": "Word Problem: A farmer has 56 apples. He sells 23 apples. How many apples does the farmer have left?",
            "options": ["33", "43", "53", "45"],
            "answer": "33"
        }
    ],
    "English": [
        {
            "question": "Which word is a noun? 'The dog is barking loudly.'",
            "options": ["Dog", "Barking", "Loudly", "Is"],
            "answer": "Dog"
        },
        {
            "question": "Which word is a pronoun? 'She is going to the market.'",
            "options": ["Going", "She", "Market", "To"],
            "answer": "She"
        },
        {
            "question": "Which word is an adjective? 'The tall man is running fast.'",
            "options": ["Tall", "Man", "Running", "Fast"],
            "answer": "Tall"
        },
        {
            "question": "Identify the pronoun in the sentence: 'They are playing football.'",
            "options": ["They", "Football", "Playing", "Are"],
            "answer": "They"
        },
        {
            "question": "Which of the following is a possessive pronoun? 'This book is mine.'",
            "options": ["Mine", "This", "Book", "Is"],
            "answer": "Mine"
        },
        {
            "question": "Choose the correct adjective: 'She has a ____ dress.'",
            "options": ["Beautiful", "Beautifully", "Beautify", "Beauties"],
            "answer": "Beautiful"
        },
        {
            "question": "Pick the noun in the sentence: 'The children played with their toys.'",
            "options": ["Children", "Played", "With", "Toys"],
            "answer": "Children"
        },
        {
            "question": "Which word is a reflexive pronoun? 'She looked at herself in the mirror.'",
            "options": ["She", "Looked", "At", "Herself"],
            "answer": "Herself"
        },
        {
            "question": "Choose the correct demonstrative pronoun: '____ is my favorite color.'",
            "options": ["This", "That", "These", "Those"],
            "answer": "This"
        },
        {
            "question": "Which of the following is an abstract noun? 'Kindness is important.'",
            "options": ["Kindness", "Is", "Important", "None of the above"],
            "answer": "Kindness"
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

let startTime;
let isRetry = localStorage.getItem("isRetry") === "true";
let totalQuizStartTime; // Add this for total quiz timing

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
    
    // Start total quiz timer
    totalQuizStartTime = new Date();
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
    
    const endTime = new Date();
    const timeDiff = Math.floor((endTime - totalQuizStartTime) / 1000); // in seconds
    const minutes = Math.floor(timeDiff / 60);
    const seconds = timeDiff % 60;
    const timeTaken = `${minutes} minutes and ${seconds} seconds`;
    
    // Store quiz timing
    localStorage.setItem("quizTimeTaken", timeTaken);
    // Store quiz completion timestamp dynamically
    localStorage.setItem("quizCompletionTimestamp", endTime.toISOString());
    console.log("Set quizCompletionTimestamp:", endTime.toISOString());
    
    // Calculate score and determine medal
    const score = calculateScore();
    let medalType = "Gold";
    if (score.percentage >= 96) {
        medalType = "Gold";
    } else if (score.percentage >= 89) {
        medalType = "Silver";
    } else if (score.percentage >= 80) {
        medalType = "Bronze";
    }
    
    // Store medal type
    localStorage.setItem("medalType", medalType);
    
    // Store attempt number (per user and subject)
    localStorage.setItem("currentAttempt", localStorage.getItem(ATTEMPT_KEY));
    
    // Store results in localStorage
    localStorage.setItem("quizResults", JSON.stringify(score));
    
    // Redirect to results page
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