const quizSection = document.getElementById('quiz');
const resultSection = document.getElementById('result');
const scoreEl = document.getElementById('score');
const totalEl = document.getElementById('total');
const retryBtn = document.getElementById('retry');

let score = 0;
let currentQuestion = 0;

const questions = [
{
    question: 'Question 1: Which is the largest animal in the world?',
    answers: [
    { option: 'A: Shark', correct: false },
    { option: 'B: Blue Whale', correct: true },
    { option: 'C Elephant', correct: false },
    ],
},
{
    question: 'Question 2: Which is the hottest planet in the solar system?',
    answers: [
    { option: 'A: Mercury', correct: true },
    { option: 'B: Venus', correct: false },
    { option: 'C: Jupiter', correct: false },
    ],
},
{
    question: 'Question 3: The United Nations Organisation has its headquarters at?',
    answers: [
    { option: 'A: Bali', correct: false },
    { option: 'B: Hague', correct: false },
    { option: 'C: New York, USA', correct: true },
    ],
},
{
    question: 'Question 4: The biggest part of the human brain is?',
    answers: [
    { option: 'A: Spinal Chord', correct: false },
    { option: 'B: Cerebellum', correct: false },
    { option: 'C: Cerebrum', correct: true },
    ],
},
{
    question: 'Question 5: The largest continent is?',
    answers: [
    { option: 'A: Asia', correct: true },
    { option: 'B: Africa', correct: false },
    { option: 'C: Europe', correct: false },
    ],
},
];

function showQuestion() {
const questionData = questions[currentQuestion];
const questionEl = quizSection.querySelector('h2');
const answersEl = quizSection.querySelector('ul');
const submitBtn = quizSection.querySelector('#submit');

questionEl.textContent = questionData.question;
answersEl.innerHTML = '';

questionData.answers.forEach(answer => {
    const li = document.createElement('li');
    const label = document.createElement('label');
    const input = document.createElement('input');
    
    input.type = 'radio';
    input.name = 'answer';
    input.value = answer.option;
    
    label.appendChild(input);
    label.appendChild(document.createTextNode(answer.option));
    li.appendChild(label);
    answersEl.appendChild(li);
});
submitBtn.addEventListener('click', checkAnswer);
}

function checkAnswer() {
  const answerEls = quizSection.querySelectorAll('input[name="answer"]');
  let selectedAnswer;
  
  answerEls.forEach(answerEl => {
    if (answerEl.checked) {
      selectedAnswer = answerEl.value;
    }
  });
  
  if (selectedAnswer === undefined) {
    return;
  }
  
  const questionData = questions[currentQuestion];
  
  if (questionData.answers.find(answer => answer.option === selectedAnswer && answer.correct)) {
    score++;
  }
  
  currentQuestion++;
  
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    scoreEl.textContent = score;
    totalEl.textContent = questions.length;
    quizSection.style.display = 'none';
    resultSection.style.display = 'block';
    retryBtn.addEventListener('click', retryQuiz);
  }
}

function retryQuiz() {
  quizSection.style.display = 'block';
  resultSection.style.display = 'none';
  score = 0;
  currentQuestion = 0;
  showQuestion();
}

showQuestion();