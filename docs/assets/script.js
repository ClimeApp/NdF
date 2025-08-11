document.addEventListener('DOMContentLoaded', () => {
  let currentType   = 'temperature'; // 'temperature' | 'precipitation'
  let currentRegion = 'global'; // 'global' | 'europe'

  const srcMap = {
    temperature: {
      global: 'images/temperature_anomaly_1816_global.png',
      europe: 'images/temperature_anomaly_1816_europe.png'
    },
    precipitation: {
      global: 'images/precipitation_anomaly_1816_global.png',
      europe: 'images/precipitation_anomaly_1816_europe.png'
    }
  };

  const img   = document.getElementById('anomaly');
  const btnT  = document.getElementById('temperature-btn');
  const btnP  = document.getElementById('precipitation-btn');
  const btnR  = document.getElementById('region-toggle-btn');

  function updateRegionToggleLabel() {
    if (currentRegion === 'global') {
      btnR.textContent = '🔍 Europa';
      btnR.setAttribute('aria-label', 'Zu Europa zoomen');
    } else {
      btnR.textContent = '🌍 Global';
      btnR.setAttribute('aria-label', 'Zur Weltansicht wechseln');
    }
  }

  function render() {
    img.src = srcMap[currentType][currentRegion];

    [btnT, btnP].forEach(b => b.classList.remove('active-button'));
    (currentType === 'temperature' ? btnT : btnP).classList.add('active-button');

    updateRegionToggleLabel();
  }

  // Events
  btnT.addEventListener('click', () => { currentType = 'temperature'; render(); });
  btnP.addEventListener('click', () => { currentType = 'precipitation'; render(); });
  btnR.addEventListener('click', () => {
    currentRegion = (currentRegion === 'global') ? 'europe' : 'global';
    render();
  });

  // initial
  render();
});


var myQuestions = [
  {
    question: "Welcher Kontinent war am stärksten vom Tabora-Ausbruch betroffen?",
    answers: {
      a: 'Afrika',
      b: 'Südamerika',
      c: 'Europa'
    },
    correctAnswer: 'c'
  },
  {
    question: "Das Jahr 1816 wird auch genannt …",
    answers: {
      a: 'Das Jahr des Vulkans',
      b: 'Das Jahr ohne Sommer',
      c: 'Das Jahr der Kälte'
    },
    correctAnswer: 'c'
  },
  {
    question: "Was verursachte die Abkühlung nach dem Ausbruch?",
    answers: {
      a: 'Antwort 1',
      b: 'Antwort 2',
      c: 'Antwort 3'
    },
    correctAnswer: 'c'
  },
  {
    question: "In welchem Jahr stiegen in der Schweiz die Brotpreise besonders stark?",
    answers: {
      a: 'Antwort 1',
      b: 'Antwort 2',
      c: 'Antwort 3'
    },
    correctAnswer: 'c'
  },
    {
    question: "Aus welcher Zeitspanne stammen die ModE-RA-Daten?",
    answers: {
      a: 'Antwort 1',
      b: 'Antwort 2',
      c: 'Antwort 3'
    },
    correctAnswer: 'c'
  }
];

var quizContainer = document.getElementById('quiz');
var resultsContainer = document.getElementById('results');
var submitButton = document.getElementById('submit');

generateQuiz(myQuestions, quizContainer, resultsContainer, submitButton);

function generateQuiz(questions, quizContainer, resultsContainer, submitButton){

  function showQuestions(questions, quizContainer){
    // we'll need a place to store the output and the answer choices
    var output = [];
    var answers;

    // for each question...
    for(var i=0; i<questions.length; i++){
      
      // first reset the list of answers
      answers = [];

      // for each available answer...
      for(letter in questions[i].answers){

        // ...add an html radio button
        answers.push(
          '<label>'
            + '<input type="radio" name="question'+i+'" value="'+letter+'">'
            + questions[i].answers[letter]
          + '</label>'
        );
      }

      // add this question and its answers to the output
      output.push(
        '<div class="question">' + questions[i].question + '</div>'
        + '<div class="answers">' + answers.join('') + '</div>'
      );
    }

    // finally combine our output list into one string of html and put it on the page
    quizContainer.innerHTML = output.join('');
  }


  function showResults(questions, quizContainer, resultsContainer){
    
    // gather answer containers from our quiz
    var answerContainers = quizContainer.querySelectorAll('.answers');
    
    // keep track of user's answers
    var userAnswer = '';
    var numCorrect = 0;
    
    // for each question...
    for(var i=0; i<questions.length; i++){

      // find selected answer
      userAnswer = (answerContainers[i].querySelector('input[name=question'+i+']:checked')||{}).value;
      
      // if answer is correct
      if(userAnswer===questions[i].correctAnswer){
        // add to the number of correct answers
        numCorrect++;
        
        // color the answers green
        answerContainers[i].style.color = '#094030';
      }
      // if answer is wrong or blank
      else{
        // color the answers red
        answerContainers[i].style.color = 'red';
      }
    }

    // show number of correct answers out of total
    resultsContainer.innerHTML = numCorrect + ' out of ' + questions.length;
  }

  // show questions right away
  showQuestions(questions, quizContainer);
  
  // on submit, show results
  submitButton.onclick = function(){
    showResults(questions, quizContainer, resultsContainer);
  }

}