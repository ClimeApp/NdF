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


document.addEventListener('DOMContentLoaded', () => {
  let currentType = 'temperature'; // 'temperature' | 'precipitation'

  const srcMap = {
    temperature: 'images/temperature_anomaly_1816_europe.png',
    precipitation: 'images/precipitation_anomaly_1816_europe.png'
  };

  const img  = document.getElementById('anomaly');
  const btnT = document.getElementById('temperature-btn');
  const btnP = document.getElementById('precipitation-btn');

  function render() {
    img.src = srcMap[currentType];

    [btnT, btnP].forEach(b => b.classList.remove('active-button'));
    (currentType === 'temperature' ? btnT : btnP).classList.add('active-button');
  }

  // Events
  btnT.addEventListener('click', () => { currentType = 'temperature'; render(); });
  btnP.addEventListener('click', () => { currentType = 'precipitation'; render(); });

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



// Interactive Map
(function () {
  
  // --- Basemaps ---
  var esriGray = L.tileLayer(
    'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}',
    { maxZoom: 16, attribution: 'Tiles © Esri — Esri, DeLorme, NAVTEQ' }
  );
  var imagery = L.tileLayer(
    'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    { maxZoom: 19, attribution: 'Tiles © Powered by Esri' }
  );
  var osm = L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    { maxZoom: 19, attribution: '© OpenStreetMap' }
  );

  // --- Karte ---
  const startCenter = [55.3, 8.2];
  const startZoom   = 3;
  var map = L.map('drought-map', {
    scrollWheelZoom: true,
    layers: [esriGray]
  }).setView(startCenter, startZoom);

  // --- TYPE Farben und Labels ---
  const typeColors = {
    "ice_proxy":           "#5dbae8",
    "lake_sediment_proxy": "#d0b943",
    "tree_proxy":          "#117733",
    "documentary_proxy":   "#44AA99",
    "speleothem_proxy":    "#717126"
  };
  const typeLabels = {
    "ice_proxy":"Gletschereis",
    "lake_sediment_proxy":"Seesedimente",
    "tree_proxy":"Bäume",
    "documentary_proxy":"Dokumente",
    "speleothem_proxy":"Speläotheme"
  };
  const colorForType = t => typeColors[(t||"").trim()] || "#555555";

  // --- Overlays je TYPE ---
  const layersByType = {};
  Object.keys(typeColors).forEach(t => { layersByType[t] = L.layerGroup(); });

  // Basemap und Overlays Control
  const baseLayers = {
    "Esri Gray": esriGray,
    "Satellit": imagery,
    "OpenStreetMap": osm
  };
  const overlays = {};
  Object.keys(layersByType).forEach(t => { overlays[typeLabels[t] || t] = layersByType[t]; });
  L.control.layers(baseLayers, overlays, { collapsed: false }).addTo(map);

  // --- CSV laden und Marker verteilen ---
  const csvPath = 'data/Observations_OctobertoMarch_1541_data.csv';
  let dataBounds = null;

  fetch(csvPath)
    .then(r => r.text())
    .then(text => {
      const headerLine = text.split(/\r?\n/).find(l => l.trim().length > 0) || '';
      const delim = (headerLine.match(/;/g)||[]).length ? ';'
                 : (headerLine.match(/\t/g)||[]).length ? '\t' : ',';
      const rows = parseDSV(text, delim);

      rows.forEach(row => {
        const lat = parseFloat(row.LAT), lon = parseFloat(row.LON);
        if (!Number.isFinite(lat) || !Number.isFinite(lon)) return;

        const t = (row.TYPE || '').trim();
        const color = colorForType(t);
        const popup = `
          <div style="min-width:240px">
            <strong>${row.NAME ?? 'Eintrag'}</strong><br/>
            <em>${row.TYPE ?? ''}${row.VARIABLE ? ' · ' + row.VARIABLE : ''}</em><br/>
            ${row.Reference_Proxy ? `<div style="margin-top:0.25rem">${row.Reference_Proxy}</div>` : ''}
            ${row.Paper_Database ? `<div style="margin-top:0.25rem"><a href="${row.Paper_Database}" target="_blank" rel="noopener">Publikation</a></div>` : ''}
            <div style="margin-top:0.25rem"><small>Lon/Lat: ${lon.toFixed(4)}, ${lat.toFixed(4)}</small></div>
          </div>
        `;

        const m = L.circleMarker([lat, lon], {
          radius: 5.5,
          weight: 1,
          opacity: 1,
          color: 'black',
          fillColor: color,
          fillOpacity: 1
        }).bindPopup(popup);

        (layersByType[t] || layersByType["other_proxy"]).addLayer(m);
      });

      // Layer mit Inhalt anzeigen
      Object.values(layersByType).forEach(lg => { if (lg.getLayers().length) lg.addTo(map); });

      // Auf alle Daten zoomen
      const all = L.featureGroup(Object.values(layersByType).filter(lg => lg.getLayers().length));
      if (all.getLayers().length) {
        dataBounds = all.getBounds();
        map.fitBounds(dataBounds.pad(0.1));
      }
    });

  // --- Home-Button ---
  const homeControl = L.control({ position: 'topleft' });
  homeControl.onAdd = function () {
    const btn = L.DomUtil.create('button', 'leaflet-bar leaflet-control home-btn');
    btn.innerHTML = '<i class="fa-solid fa-house"></i>';
    btn.title = 'Zurück zur Startansicht';
    L.DomEvent.on(btn, 'click', function (e) {
      L.DomEvent.stopPropagation(e);
      if (dataBounds && dataBounds.isValid()) map.fitBounds(dataBounds.pad(0.1));
      else map.setView(startCenter, startZoom);
    });
    return btn;
  };
  homeControl.addTo(map);

  // --- DSV-Parser ---
  function parseDSV(text, delim) {
    const lines = text.split(/\r?\n/).filter(l => l.trim().length);
    if (!lines.length) return [];
    const headers = splitDSVLine(lines[0], delim);
    return lines.slice(1).map(line => {
      const cells = splitDSVLine(line, delim), obj = {};
      headers.forEach((h, i) => obj[h] = (cells[i] ?? '').trim());
      return obj;
    });
  }
  function splitDSVLine(line, delim) {
    if (delim === '\t') return line.split('\t');
    const out = []; let cur = '', q = false;
    for (let i = 0; i < line.length; i++) {
      const c = line[i];
      if (c === '"') { if (q && line[i+1] === '"') { cur += '"'; i++; } else { q = !q; } }
      else if (c === delim && !q) { out.push(cur); cur = ''; }
      else { cur += c; }
    }
    out.push(cur);
    return out;
  }

})();
