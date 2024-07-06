// scripts.js
document.addEventListener('DOMContentLoaded', function() {
    const quizForm = document.getElementById('quiz-form');
    const questionsContainer = document.getElementById('questions-container');
    const addQuestionButton = document.getElementById('add-question');
    const takeQuizSection = document.getElementById('take-quiz');
    
    let questionCount = 1;

    addQuestionButton.addEventListener('click', function() {
        questionCount++;
        
        const questionItem = document.createElement('div');
        questionItem.classList.add('question-item');
        
        questionItem.innerHTML = `
            <label for="question-${questionCount}">Question ${questionCount}:</label>
            <input type="text" id="question-${questionCount}" name="questions[]" required>
            
            <label for="choice-${questionCount}-1">Choice 1:</label>
            <input type="text" id="choice-${questionCount}-1" name="choices[${questionCount}][]" required>
            
            <label for="choice-${questionCount}-2">Choice 2:</label>
            <input type="text" id="choice-${questionCount}-2" name="choices[${questionCount}][]" required>
            
            <label for="choice-${questionCount}-3">Choice 3:</label>
            <input type="text" id="choice-${questionCount}-3" name="choices[${questionCount}][]" required>
            
            <label for="choice-${questionCount}-4">Choice 4:</label>
            <input type="text" id="choice-${questionCount}-4" name="choices[${questionCount}][]" required>
            
            <label for="correct-${questionCount}">Correct Answer:</label>
            <select id="correct-${questionCount}" name="correct[]">
                <option value="1">Choice 1</option>
                <option value="2">Choice 2</option>
                <option value="3">Choice 3</option>
                <option value="4">Choice 4</option>
            </select>
        `;
        
        questionsContainer.appendChild(questionItem);
    });
    
    quizForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const formData = new FormData(quizForm);
        const questions = formData.getAll('questions[]');
        const choices = formData.getAll('choices[]');
        const correctAnswers = formData.getAll('correct[]');
        
        const quizData = {
            questions: [],
            choices: [],
            correctAnswers: []
        };
        
        questions.forEach((question, index) => {
            quizData.questions.push(question);
            quizData.choices.push(formData.getAll(`choices[${index + 1}][]`));
            quizData.correctAnswers.push(correctAnswers[index]);
        });
        
        displayQuiz(quizData);
    });
    
    function displayQuiz(quizData) {
        takeQuizSection.innerHTML = '<h2>Take a Quiz</h2>';
        
        quizData.questions.forEach((question, index) => {
            const questionContainer = document.createElement('div');
            questionContainer.classList.add('question-item');
            
            questionContainer.innerHTML = `
                <p>${question}</p>
                <label>
                    <input type="radio" name="question-${index}" value="1">
                    ${quizData.choices[index][0]}
                </label>
                <label>
                    <input type="radio" name="question-${index}" value="2">
                    ${quizData.choices[index][1]}
                </label>
                <label>
                    <input type="radio" name="question-${index}" value="3">
                    ${quizData.choices[index][2]}
                </label>
                <label>
                    <input type="radio" name="question-${index}" value="4">
                    ${quizData.choices[index][3]}
                </label>
            `;
            
            takeQuizSection.appendChild(questionContainer);
        });
        
        const submitButton = document.createElement('button');
        submitButton.textContent = 'Submit Quiz';
        submitButton.addEventListener('click', function() {
            const answers = [];
            
            quizData.questions.forEach((question, index) => {
                const selected = document.querySelector(`input[name="question-${index}"]:checked`);
                answers.push(selected ? selected.value : null);
            });
            
            gradeQuiz(quizData, answers);
            
        });
        
        takeQuizSection.appendChild(submitButton);
    }
    
    function gradeQuiz(quizData, answers) {
        let score = 0;
        
        answers.forEach((answer, index) => {
            if (answer === quizData.correctAnswers[index]) {
                score++;
            }
        });
        
        alert(`You scored ${score} out of ${quizData.questions.length}`);
    }
    
});
