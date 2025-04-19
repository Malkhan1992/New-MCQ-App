// Initialize global variables to store JSON data with hardcoded values
let availableFileData = {
    'Aditya_Singh': {
        'English': {
            "questions": [
                {
                    "question": "Which word is a noun?",
                    "options": ["Run", "Apple", "Quickly", "Blue"],
                    "answer": "Apple",
                    "explanation": "A noun is a person, place, or thing. 'Apple' is a thing."
                },
                {
                    "question": "What is the opposite of 'big'?",
                    "options": ["Small", "Tall", "Wide", "Round"],
                    "answer": "Small",
                    "explanation": "The opposite of 'big' is 'small'."
                },
                {
                    "question": "Which word is a verb?",
                    "options": ["Jump", "Happy", "Soft", "Tree"],
                    "answer": "Jump",
                    "explanation": "A verb is an action word. 'Jump' shows an action."
                },
                // Add more questions as needed
                {
                    "question": "What is the plural of 'child'?",
                    "options": ["Childs", "Children", "Childen", "Child"],
                    "answer": "Children",
                    "explanation": "The plural of 'child' is 'children'."
                },
                {
                    "question": "Which sentence is correct?",
                    "options": [
                        "He are running.",
                        "She is running.",
                        "They is running.",
                        "You am running."
                    ],
                    "answer": "She is running.",
                    "explanation": "The verb 'is' is correctly matched with 'she'."
                },
                // Add more questions here
            ]
        },
        'Math': {
            "questions": [
                {
                    "question": "What is 7 + 5?",
                    "options": ["10", "11", "12", "13"],
                    "answer": "12",
                    "explanation": "Adding 7 and 5 gives 12."
                },
                {
                    "question": "How many sides does a triangle have?",
                    "options": ["2", "3", "4", "5"],
                    "answer": "3",
                    "explanation": "A triangle has 3 sides."
                },
                {
                    "question": "What is 15 × 15?",
                    "options": ["200", "220", "225", "250"],
                    "answer": "225",
                    "explanation": "Multiplying 15 by 15 gives 225."
                },
                // Add more questions
                {
                    "question": "What is 3/4 of 20?",
                    "options": ["10", "15", "18", "20"],
                    "answer": "15",
                    "explanation": "3/4 of 20 is (3 × 20) ÷ 4 = 15."
                },
                {
                    "question": "What is 625 ÷ 25?",
                    "options": ["15", "20", "25", "30"],
                    "answer": "25",
                    "explanation": "Dividing 625 by 25 gives 25."
                },
                // Add more questions
            ]
        },
        'Science': {
            "questions": [
                {
                    "question": "What is the chemical formula for water?",
                    "options": ["H2O", "CO2", "O2", "H2SO4"],
                    "answer": "H2O",
                    "explanation": "Water is composed of two hydrogen atoms and one oxygen atom, hence H2O."
                },
                {
                    "question": "Which planet is known as the Red Planet?",
                    "options": ["Mars", "Venus", "Jupiter", "Mercury"],
                    "answer": "Mars",
                    "explanation": "Mars appears reddish due to iron oxide (rust) on its surface."
                },
                {
                    "question": "What is the largest organ in the human body?",
                    "options": ["Heart", "Liver", "Brain", "Skin"],
                    "answer": "Skin",
                    "explanation": "The skin is the largest organ in the human body by surface area."
                },
                // Add more questions
                {
                    "question": "Which gas do plants absorb during photosynthesis?",
                    "options": ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
                    "answer": "Carbon Dioxide",
                    "explanation": "Plants absorb CO2 during photosynthesis and release oxygen."
                },
                {
                    "question": "What is the basic unit of life?",
                    "options": ["Atom", "Cell", "Tissue", "Organ"],
                    "answer": "Cell",
                    "explanation": "The cell is considered the basic unit of life."
                },
                // Add more questions
            ]
        },
        'General_Awareness': {
            "questions": [
                {
                    "question": "Which is the largest desert in the world?",
                    "options": ["Sahara Desert", "Gobi Desert", "Thar Desert", "Kalahari Desert"],
                    "answer": "Sahara Desert",
                    "explanation": "The Sahara Desert in Africa is the largest desert in the world."
                },
                {
                    "question": "What is the national currency of India?",
                    "options": ["Dollar", "Euro", "Rupee", "Pound"],
                    "answer": "Rupee",
                    "explanation": "The Indian Rupee is the official currency of India."
                },
                {
                    "question": "What is the capital of India?",
                    "options": ["Mumbai", "Delhi", "Kolkata", "Chennai"],
                    "answer": "Delhi",
                    "explanation": "Delhi is the capital city of India."
                },
                // Add more questions
                {
                    "question": "What is the national bird of India?",
                    "options": ["Peacock", "Parrot", "Sparrow", "Eagle"],
                    "answer": "Peacock",
                    "explanation": "The Indian Peacock is the national bird of India."
                },
                {
                    "question": "Which country is known as the Land of the Rising Sun?",
                    "options": ["India", "China", "Japan", "South Korea"],
                    "answer": "Japan",
                    "explanation": "Japan is called the Land of the Rising Sun because it is located in the easternmost part of Asia."
                },
                // Add more questions
            ]
        }
    },
    'Aryan_Singh': {
        'English': {
            "questions": [
                {
                    "question": "What is the past tense of 'eat'?",
                    "options": ["Eats", "Eaten", "Ate", "Eating"],
                    "answer": "Ate",
                    "explanation": "The past tense of 'eat' is 'ate'."
                },
                {
                    "question": "Which word is a pronoun?",
                    "options": ["He", "Table", "Bright", "Jump"],
                    "answer": "He",
                    "explanation": "'He' is a pronoun used in place of a noun."
                },
                {
                    "question": "What is a sentence?",
                    "options": [
                        "A group of words that makes sense.",
                        "A group of random words.",
                        "A question mark.",
                        "A single word."
                    ],
                    "answer": "A group of words that makes sense.",
                    "explanation": "A sentence is a group of words that conveys a complete idea."
                },
                // Add more questions
                {
                    "question": "Which of these words is an adjective?",
                    "options": ["Red", "Sing", "Book", "Bird"],
                    "answer": "Red",
                    "explanation": "An adjective describes a noun. 'Red' describes color."
                },
                {
                    "question": "Choose the correct spelling:",
                    "options": ["Freind", "Friend", "Frend", "Freiend"],
                    "answer": "Friend",
                    "explanation": "The correct spelling is 'friend'."
                },
                // Add more questions
            ]
        },
        'Math': {
            "questions": [
                {
                    "question": "What is the product of 13 × 4?",
                    "options": ["50", "52", "54", "56"],
                    "answer": "52",
                    "explanation": "Multiplying 13 and 4 gives 52."
                },
                {
                    "question": "A train is 450 meters long. If it travels 300 meters, how much is left to cover?",
                    "options": ["150 m", "200 m", "100 m", "250 m"],
                    "answer": "150 m",
                    "explanation": "450 - 300 = 150 meters left to cover."
                },
                {
                    "question": "What is 25 × 8?",
                    "options": ["180", "190", "200", "210"],
                    "answer": "200",
                    "explanation": "Multiplying 25 and 8 gives 200."
                },
                // Add more questions
                {
                    "question": "What is 672 - 345?",
                    "options": ["327", "337", "347", "357"],
                    "answer": "327",
                    "explanation": "Subtracting 345 from 672 results in 327."
                },
                {
                    "question": "What is 15 × 15?",
                    "options": ["200", "220", "225", "250"],
                    "answer": "225",
                    "explanation": "Multiplying 15 by 15 gives 225."
                },
                // Add more questions
            ]
        },
        'Science': {
            "questions": [
                {
                    "question": "What is the chemical formula for water?",
                    "options": ["H2O", "CO2", "O2", "H2SO4"],
                    "answer": "H2O",
                    "explanation": "Water is composed of two hydrogen atoms and one oxygen atom, hence H2O."
                },
                {
                    "question": "Which planet is known as the Red Planet?",
                    "options": ["Mars", "Venus", "Jupiter", "Mercury"],
                    "answer": "Mars",
                    "explanation": "Mars appears reddish due to iron oxide (rust) on its surface."
                },
                {
                    "question": "What is the largest organ in the human body?",
                    "options": ["Heart", "Liver", "Brain", "Skin"],
                    "answer": "Skin",
                    "explanation": "The skin is the largest organ in the human body by surface area."
                },
                // Add more questions
                {
                    "question": "Which gas do plants absorb during photosynthesis?",
                    "options": ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
                    "answer": "Carbon Dioxide",
                    "explanation": "Plants absorb CO2 during photosynthesis and release oxygen."
                },
                {
                    "question": "What is the basic unit of life?",
                    "options": ["Atom", "Cell", "Tissue", "Organ"],
                    "answer": "Cell",
                    "explanation": "The cell is considered the basic unit of life."
                },
                // Add more questions
            ]
        },
        'General_Awareness': {
            "questions": [
                {
                    "id": 1,
                    "question": "Which is the largest desert in the world?",
                    "options": [
                      "Sahara Desert",
                      "Gobi Desert",
                      "Thar Desert",
                      "Kalahari Desert"
                    ],
                    "answer": "Sahara Desert",
                    "explanation": "The Sahara Desert in Africa is the largest desert in the world.",
                    "selected": false,
                    "timeSpent": 0
                },
                {
                    "id": 2,
                    "question": "What is the national currency of India?",
                    "options": [
                      "Dollar",
                      "Euro",
                      "Rupee",
                      "Pound"
                    ],
                    "answer": "Rupee",
                    "explanation": "The Indian Rupee is the official currency of India.",
                    "selected": false,
                    "timeSpent": 0
                },
                {
                    "id": 3,
                    "question": "What is the capital of India?",
                    "options": [
                      "Mumbai",
                      "Delhi",
                      "Kolkata",
                      "Chennai"
                    ],
                    "answer": "Delhi",
                    "explanation": "Delhi is the capital city of India.",
                    "selected": false,
                    "timeSpent": 0
                },
                {
                    "id": 4,
                    "question": "What is the national bird of India?",
                    "options": [
                      "Peacock",
                      "Parrot",
                      "Sparrow",
                      "Eagle"
                    ],
                    "answer": "Peacock",
                    "explanation": "The Indian Peacock is the national bird of India.",
                    "selected": false,
                    "timeSpent": 0
                },
                {
                    "id": 5,
                    "question": "Which country is known as the Land of the Rising Sun?",
                    "options": [
                      "India",
                      "China",
                      "Japan",
                      "South Korea"
                    ],
                    "answer": "Japan",
                    "explanation": "Japan is called the Land of the Rising Sun because it is located in the easternmost part of Asia.",
                    "selected": false,
                    "timeSpent": 0
                },
                {
                    "id": 6,
                    "question": "What is the main source of energy for life on Earth?",
                    "options": [
                      "Moon",
                      "Sun",
                      "Stars",
                      "Wind"
                    ],
                    "answer": "Sun",
                    "explanation": "The Sun is the primary source of energy for life on Earth.",
                    "selected": false,
                    "timeSpent": 0
                },
                {
                    "id": 7,
                    "question": "Which is the tallest mountain in the world?",
                    "options": [
                      "Mount Everest",
                      "K2",
                      "Kangchenjunga",
                      "Makalu"
                    ],
                    "answer": "Mount Everest",
                    "explanation": "Mount Everest is the tallest mountain in the world.",
                    "selected": false,
                    "timeSpent": 0
                },
                {
                    "id": 8,
                    "question": "Which is the largest country in the world by area?",
                    "options": [
                      "China",
                      "Russia",
                      "India",
                      "United States"
                    ],
                    "answer": "Russia",
                    "explanation": "Russia is the largest country by area.",
                    "selected": false,
                    "timeSpent": 0
                },
                {
                    "id": 9,
                    "question": "Which is the smallest continent by area?",
                    "options": [
                      "Australia",
                      "Europe",
                      "Antarctica",
                      "South America"
                    ],
                    "answer": "Australia",
                    "explanation": "Australia is the smallest continent in terms of area.",
                    "selected": false,
                    "timeSpent": 0
                },
                {
                    "id": 10,
                    "question": "Which country is famous for the Eiffel Tower?",
                    "options": [
                      "Italy",
                      "France",
                      "Germany",
                      "Spain"
                    ],
                    "answer": "France",
                    "explanation": "The Eiffel Tower is a famous landmark located in Paris, France.",
                    "selected": false,
                    "timeSpent": 0
                }
            ]
        }
    }
};

// Initialize data on page load
document.addEventListener('DOMContentLoaded', async () => {
    // Clear localStorage to force fresh data on page load
    localStorage.clear();
    console.log('Cleared localStorage to ensure fresh data load');
    
    const userSelect = document.getElementById('userSelect');
    const subjectSelect = document.getElementById('subjectSelect');
    const viewBtn = document.getElementById('viewQuestions');
    const refreshBtn = document.getElementById('refreshQuestions');
    const addBtn = document.getElementById('addQuestion');
    const questionDisplay = document.getElementById('questionDisplay');
    const addQuestionForm = document.getElementById('addQuestionForm');

    // Track questions and selections
    let allAvailableQuestions = [];
    let selectedQuestions = [];
    let questionPool = {};
    
    // Log available data
    console.log('Using hardcoded JSON data instead of trying to fetch from files');
    
    // Log data for each user/subject
    for (const user in availableFileData) {
        for (const subject in availableFileData[user]) {
            const questionCount = availableFileData[user][subject].questions.length;
            console.log(`Loaded ${user} ${subject} data: ${questionCount} questions`);
        }
    }

    // Function to format subject name for storage
    function formatSubjectName(subject) {
        // First replace spaces with underscores
        let formatted = subject.replace(/\s+/g, '_');
        // Ensure first letter of each word is capitalized
        formatted = formatted.split('_')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join('_');
        return formatted;
    }

    // Function to format user name for storage
    function formatUserName(user) {
        // Split on space and capitalize each part
        return user.split(' ')
            .map(part => part.charAt(0).toUpperCase() + part.slice(1))
            .join('_');
    }

    // Function to show loading state
    function showLoading() {
        questionDisplay.innerHTML = '<div class="loading">Loading questions...</div>';
    }

    // Function to show error message
    function showError(message) {
        console.error(message);
        questionDisplay.innerHTML = `<div class="error">${message}</div>`;
    }

    // Function to show success message
    function showSuccess(message) {
        questionDisplay.innerHTML = `<div class="success">${message}</div>`;
    }

    // Function to load questions
    async function loadQuestions() {
        const user = userSelect.value;
        const subject = subjectSelect.value;
        
        if (!user || !subject) {
            showError('Please select both user and subject');
            return;
        }

        showLoading();
        
        try {
            const formattedUser = formatUserName(user);
            const formattedSubject = formatSubjectName(subject);
            
            console.log('Loading questions for:', {
                user, 
                subject,
                formattedUser,
                formattedSubject
            });
            
            // Load questions from user's JSON file
            const response = await fetch(`database/${formattedUser}/${formattedSubject}.json`);
            if (!response.ok) {
                throw new Error(`Failed to load questions: ${response.statusText}`);
            }
            
            const data = await response.json();
            
            if (data && data.questions && data.questions.length > 0) {
                console.log(`Loaded ${data.questions.length} questions from JSON file`);
                displayQuestions(data.questions, `${formattedUser}/${formattedSubject}.json`);
            } else {
                showError(`No questions found for ${user} / ${subject}. Please contact the administrator.`);
            }
        } catch (error) {
            console.error('Error in loadQuestions:', error);
            showError(`Error loading questions: ${error.message}`);
        }
    }

    // Helper function to display questions
    function displayQuestions(questions, source = 'unknown') {
        if (!questions || questions.length === 0) {
            showError('No questions available for this subject. Please contact the administrator.');
            return;
        }

        console.log(`Displaying ${questions.length} questions from source: ${source}`);

        // Store all questions globally
        allAvailableQuestions = [...questions]; // Create a copy to avoid reference issues
        
        // Display all questions
        let html = `
            <div class="questions-header">
                <h2>All Available Questions</h2>
                <p>Showing all ${questions.length} questions</p>
                <p class="data-source">Data source: ${source}</p>
            </div>
            <div class="question-list">
        `;
        
        questions.forEach((q, index) => {
            if (!q.question || !q.options || !q.answer) {
                console.warn(`Invalid question format at index ${index}`, q);
                return;
            }
            
            html += `
                <div class="question-item">
                    <h3>Question ${index + 1}</h3>
                    <p class="question-text"><strong>Q: </strong>${q.question}</p>
                    <p class="options-label"><strong>Options:</strong></p>
                    <ul class="options-list">
                        ${q.options.map((opt, i) => `<li>${String.fromCharCode(65 + i)}. ${opt}</li>`).join('')}
                    </ul>
                    <p class="answer"><strong>Correct Answer: </strong>${q.answer}</p>
                    <p class="explanation"><strong>Explanation: </strong>${q.explanation || 'No explanation provided.'}</p>
                </div>
            `;
        });
        html += '</div>';

        // Add buttons for viewing all questions and getting a random set
        const buttonDiv = document.createElement('div');
        buttonDiv.className = 'button-group';
        buttonDiv.innerHTML = `
            <button id="viewAllQuestions" class="primary-button">
                View All Questions (${questions.length})
            </button>
            <button id="getRandomSet" class="refresh-button">
                Get Random 10 Questions
            </button>
        `;
        questionDisplay.innerHTML = html;
        questionDisplay.appendChild(buttonDiv);
        
        // Add event listeners for the buttons
        document.getElementById('viewAllQuestions').addEventListener('click', () => {
            displayQuestions(allAvailableQuestions, source);
        });
        document.getElementById('getRandomSet').addEventListener('click', refreshQuestions);
    }

    // Function to refresh and get 10 questions
    function refreshQuestions() {
        console.log("refreshQuestions called", allAvailableQuestions.length);
        
        if (!allAvailableQuestions || allAvailableQuestions.length < 10) {
            showError('Not enough questions in the database. Need at least 10 questions.');
            return;
        }

        try {
            // Get random questions
            selectedQuestions = [...allAvailableQuestions]
                .sort(() => 0.5 - Math.random())
                .slice(0, 10);

            // Display selected questions
            let html = `
                <div class="questions-header">
                    <h2>Selected Quiz Questions</h2>
                    <p>These 10 questions have been randomly selected from the available ${allAvailableQuestions.length} questions</p>
                </div>
                <div class="question-list">
            `;
            
            selectedQuestions.forEach((q, index) => {
                html += `
                    <div class="question-item">
                        <h3>Question ${index + 1}</h3>
                        <p class="question-text"><strong>Q: </strong>${q.question}</p>
                        <p class="options-label"><strong>Options:</strong></p>
                        <ul class="options-list">
                            ${q.options.map((opt, i) => `<li>${String.fromCharCode(65 + i)}. ${opt}</li>`).join('')}
                        </ul>
                        <p class="answer"><strong>Correct Answer: </strong>${q.answer}</p>
                        <p class="explanation"><strong>Explanation: </strong>${q.explanation || 'No explanation provided.'}</p>
                    </div>
                `;
            });

            html += `
                <div class="button-group">
                    <button id="viewAllQuestions" class="primary-button">
                        View All Questions
                    </button>
                    <button id="getNewSet" class="refresh-button">
                        Get New Random Set
                    </button>
                    <button id="confirmQuestions" class="confirm-button">
                        Save These Questions to Quiz Pool
                    </button>
                </div>
            `;
            
            questionDisplay.innerHTML = html;
            
            // Add event listeners for the new buttons
            document.getElementById('viewAllQuestions').addEventListener('click', () => {
                displayQuestions(allAvailableQuestions, 'all_questions');
            });
            document.getElementById('getNewSet').addEventListener('click', refreshQuestions);
            document.getElementById('confirmQuestions').addEventListener('click', confirmQuestions);
        } catch (error) {
            console.error('Error refreshing questions:', error);
            showError(`Error refreshing questions: ${error.message}`);
        }
    }

    // Function to confirm and save selected questions
    function confirmQuestions() {
        const user = userSelect.value;
        const subject = subjectSelect.value;
        
        if (!user || !subject || !selectedQuestions.length) {
            showError('No questions selected to save or user/subject not selected');
            return;
        }

        try {
            const formattedUser = formatUserName(user);
            const formattedSubject = formatSubjectName(subject);
            
            // Prepare question data with metadata
            const questionData = {
                questions: selectedQuestions,
                totalQuestions: selectedQuestions.length,
                subject: formattedSubject,
                user: formattedUser,
                lastUpdated: new Date().toISOString()
            };
            
            // Get existing question pool from localStorage
            let questionPool = {};
            const savedPool = localStorage.getItem('questionPool');
            if (savedPool) {
                try {
                    questionPool = JSON.parse(savedPool);
                } catch (e) {
                    console.warn('Failed to parse saved question pool:', e);
                }
            }
            
            // Update the questions for this subject
            if (!questionPool[formattedUser]) {
                questionPool[formattedUser] = {};
            }
            questionPool[formattedUser][formattedSubject] = questionData;
            
            // Save back to localStorage
            localStorage.setItem('questionPool', JSON.stringify(questionPool));
            
            // Log the update (this could be replaced with a server-side save in the future)
            console.log('Selected questions saved to question pool:', {
                user: formattedUser,
                subject: formattedSubject,
                questionCount: selectedQuestions.length,
                timestamp: new Date().toISOString()
            });
            
            // Show a more detailed success message
            showSuccess(`
                <h3>Questions Saved Successfully!</h3>
                <div class="details">
                    <p><strong>User:</strong> ${user}</p>
                    <p><strong>Subject:</strong> ${subject}</p>
                    <p><strong>Questions:</strong> ${selectedQuestions.length}</p>
                    <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
                </div>
                <p class="note">These questions are now in the question pool and will be used for this subject's quizzes.</p>
            `);
            
            // Add buttons to view all questions or get new set
            const buttonDiv = document.createElement('div');
            buttonDiv.className = 'button-group';
            buttonDiv.innerHTML = `
                <button id="viewAllQuestions" class="primary-button">
                    View All Questions
                </button>
                <button id="refreshAgain" class="refresh-button">
                    Get New Set
                </button>
            `;
            questionDisplay.appendChild(buttonDiv);
            
            // Add event listeners
            document.getElementById('viewAllQuestions').addEventListener('click', loadQuestions);
            document.getElementById('refreshAgain').addEventListener('click', refreshQuestions);
        } catch (error) {
            console.error('Error saving questions:', error);
            showError(`Error saving questions: ${error.message}`);
        }
    }

    // Add event listeners for main buttons
    console.log("Setting up event listeners for main buttons");
    if (viewBtn) {
        viewBtn.addEventListener('click', function() {
            console.log("View Questions button clicked");
            loadQuestions();
        });
    } else {
        console.error("View Questions button not found in the DOM");
    }
    
    if (refreshBtn) {
        refreshBtn.addEventListener('click', function() {
            console.log("Refresh Questions button clicked");
            refreshQuestions();
        });
    } else {
        console.error("Refresh Questions button not found in the DOM");
    }
    
    if (addBtn) {
    addBtn.addEventListener('click', () => {
            console.log("Add Question button clicked");
        addQuestionForm.style.display = addQuestionForm.style.display === 'none' ? 'block' : 'none';
    });
    } else {
        console.error("Add Question button not found in the DOM");
    }

    // Handle form submission for adding new questions
    if (addQuestionForm) {
        addQuestionForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
            const answer = formData.get('answer');
            const options = [
                formData.get('option1'),
                formData.get('option2'),
                formData.get('option3'),
                formData.get('option4')
            ];
            
            // Validate that the answer matches one of the options
            if (!options.includes(answer)) {
                showError('The correct answer must match one of the options exactly');
                return;
            }

            const newQuestion = {
                question: formData.get('question'),
                options: options,
                answer: answer,
            explanation: formData.get('explanation')
        };

        try {
            const user = userSelect.value;
            const subject = subjectSelect.value;
            
            if (!user || !subject) {
                throw new Error('Please select both user and subject');
            }
            
                // Format names for storage
            const formattedUser = formatUserName(user);
            const formattedSubject = formatSubjectName(subject);

                // Get existing questions from localStorage
                const storageKey = `${formattedUser}_${formattedSubject}`;
                let existingData = localStorage.getItem(storageKey);
                let existingQuestions = [];
                
                if (existingData) {
                    try {
                        const data = JSON.parse(existingData);
                    existingQuestions = data.questions || [];
                    } catch (e) {
                        console.error('Error parsing existing questions:', e);
                    }
            }
            
            // Add new question
            existingQuestions.push(newQuestion);
            
                // Save to localStorage
                localStorage.setItem(storageKey, JSON.stringify({
                    questions: existingQuestions,
                    totalQuestions: existingQuestions.length,
                    subject: subject,
                    user: user,
                    lastUpdated: new Date().toISOString()
                }));
                
                showSuccess(`Question added successfully! Total questions: ${existingQuestions.length}`);
                addQuestionForm.reset();
                
                // Refresh the question display if questions are being shown
                if (allAvailableQuestions.length > 0) {
                    loadQuestions();
                }
        } catch (error) {
            console.error('Error adding question:', error);
            showError(`Error adding question: ${error.message}`);
        }
    });
    } else {
        console.error("Add Question form not found in the DOM");
    }
}); 