//////////////////////////////////////////////////////////////////////////////////////////////////
//Tambora Maps
(() => {
  const img  = document.getElementById('anomaly');
  const btnT = document.getElementById('temperature-btn');
  const btnP = document.getElementById('precipitation-btn');
  const btnR = document.getElementById('region-toggle-btn');

  if (!img || !btnT || !btnP) return;

  let currentType   = 'temperature';
  let currentRegion = btnR ? 'global' : 'europe';

  const srcMap = btnR
    ? {
        temperature: { global: 'images/temperature_anomaly_1816_global.png',
                        europe: 'images/temperature_anomaly_1816_europe.png' },
        precipitation: { global: 'images/precipitation_anomaly_1816_global.png',
                         europe: 'images/precipitation_anomaly_1816_europe.png' }
      }
    : {
        temperature: { europe: 'images/temperature_anomaly_1816_europe.png' },
        precipitation:{ europe: 'images/precipitation_anomaly_1816_europe.png' }
      };

  function updateRegionToggleLabel() {
    if (!btnR) return;
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

  btnT.addEventListener('click', () => { currentType = 'temperature'; render(); });
  btnP.addEventListener('click', () => { currentType = 'precipitation'; render(); });

  if (btnR) {
    btnR.addEventListener('click', () => {
      currentRegion = currentRegion === 'global' ? 'europe' : 'global';
      render();
    });
  }

  render();
})();




//////////////////////////////////////////////////////////////////////////////////////////////////
// Dürre Mitteleuropa Maps
(() => {
  const img  = document.getElementById('anomaly-1540');
  const btnT = document.getElementById('temperature-btn-1540');
  const btnP = document.getElementById('precipitation-btn-1540');

  if (!img || !btnT || !btnP) return;

  let currentType = 'temperature';

  const srcMap = {
    temperature: 'images/temperature_anomaly_1540_europe.png',
    precipitation: 'images/precipitation_anomaly_1540_europe.png'
  };

  function render() {
    img.src = srcMap[currentType];
    [btnT, btnP].forEach(b => b.classList.remove('active-button'));
    (currentType === 'temperature' ? btnT : btnP).classList.add('active-button');
  }

  btnT.addEventListener('click', () => { currentType = 'temperature'; render(); });
  btnP.addEventListener('click', () => { currentType = 'precipitation'; render(); });

  render();
})();




//////////////////////////////////////////////////////////////////////////////////////////////////
// Quiz

// Fragen und Antworten
var myQuestions = [
  {
    question: "Welcher Kontinent war am stärksten vom Tambora-Ausbruch betroffen?",
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
    correctAnswer: 'b'
  },
  {
    question: "Welche Folgen hatte der Ausbruch in Europa?",
    answers: {
      a: 'Missernten',
      b: 'Günstige Brotpreise',
      c: 'Wärmere Sommer'
    },
    correctAnswer: 'a'
  },
  {
    question: "In welchem Jahr stiegen in der Schweiz die Brotpreise besonders stark?",
    answers: {
      a: '1817',
      b: '1816',
      c: '1815'
    },
    correctAnswer: 'a'
  },
  {
    question: "Welche Herausforderungen bestehen bei Klimarekonstruktionen?",
    answers: {
      a: 'Ungenaue Messinstrumente',
      b: 'Mehr Daten aus der Nord- als aus der Südhemisphäre',
      c: 'Keine Daten für den Winter'
    },
    correctAnswer: 'b'
  },
  {
    question: "Wofür könnten Vulkanausbrüche hilfreich sein?",
    answers: {
      a: 'Kurzfristige Abkühlung der Atmospäre durch Schwefelaerosole',
      b: 'Bessere Weinernten durch Schwefelung der Trauben',
      c: 'Gesündere Kondition durch geschwefeltes Trinkwasser'
    },
    correctAnswer: 'a'
  },
  {
    question: "Wie lange hielt die extreme Trockenheit von 1540 ungefähr an?",
    answers: {
      a: '2 Monate',
      b: '5 Monate',
      c: '11 Monate'
    },
    correctAnswer: 'c'
  },
    {
    question: "Aus welcher Zeitspanne stammen die ModE-RA-Daten?",
    answers: {
      a: '1400 - 1800',
      b: '1540 - 2000',
      c: '1422 - 2008'
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
  const blocks = questions.map((q, i) => {
    const answers = Object.keys(q.answers).map(letter => `
      <label class="answer">
        <input type="radio" name="question${i}" value="${letter}">
        ${q.answers[letter]}
      </label>
    `).join('');

    return `
      <div class="question-block">
        <div class="question-line">
          <span class="q-number">${i + 1}.</span>
          <span class="q-text">${q.question}</span>
        </div>
        <div class="answers">
          ${answers}
        </div>
      </div>
    `;
  });

  quizContainer.innerHTML = blocks.join('');
}

  // Resultate anzeigen
function showResults(questions, quizContainer, resultsContainer){
  const answerContainers = quizContainer.querySelectorAll('.answers');
  let numCorrect = 0;

  for (let i = 0; i < questions.length; i++) {
    const container = answerContainers[i];

    container.querySelectorAll('.correct-answer').forEach(n => n.remove());
    container.querySelectorAll('label').forEach(l => {
      l.classList.remove('is-correct','is-wrong');
    });

    const userAnswer = (container.querySelector('input[name=question'+i+']:checked') || {}).value;
    const correct = questions[i].correctAnswer;

    if (userAnswer === correct) {
      numCorrect++;
      const correctLabel = container.querySelector('input[value="'+correct+'"]').parentNode;
      correctLabel.classList.add('is-correct');
    } else {
      if (userAnswer) {
        const wrongLabel = container.querySelector('input[value="'+userAnswer+'"]').parentNode;
        if (wrongLabel) wrongLabel.classList.add('is-wrong');
      }
      const correctLabel = container.querySelector('input[value="'+correct+'"]').parentNode;
      if (correctLabel) correctLabel.classList.add('is-correct');
    }
  }

  resultsContainer.innerHTML =
    'Du hast ' + numCorrect + ' von ' + questions.length + ' Fragen richtig beantwortet.';
  resultsContainer.style.display = "block";

  // 🎉 Effekt bei voller Punktzahl
if (numCorrect === questions.length) {
  launchConfetti({ duration: 3500, particleCount: 260 });

  }
}

  showQuestions(questions, quizContainer);
  
  // Submit Button
  submitButton.onclick = function(){
    showResults(questions, quizContainer, resultsContainer);
  }
  
  var restartButton = document.getElementById('restart');

function resetQuiz() {
  showQuestions(questions, quizContainer);
  resultsContainer.innerHTML = '';
}

restartButton.onclick = function() {
  resetQuiz();
};

}


function launchConfetti() {
  // Canvas erstellen (nur einmal)
  let canvas = document.getElementById("confetti-canvas");
  if (!canvas) {
    canvas = document.createElement("canvas");
    canvas.id = "confetti-canvas";
    document.body.appendChild(canvas);
  }
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Partikel erzeugen
  const colors = ["#E91E63", "#FBC02D", "#3F51B5", "#4CAF50", "#FF5722", "#9C27B0"];
  const particles = Array.from({ length: 300 }, () => ({
    x: Math.random() * canvas.width,
    y: -10,
    size: Math.random() * 6 + 4,
    color: colors[Math.floor(Math.random() * colors.length)],
    speedX: (Math.random() - 0.5) * 2,
    speedY: Math.random() * 3 + 2,
    rotation: Math.random() * Math.PI,
    rotationSpeed: (Math.random() - 0.5) * 0.2
  }));

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.x += p.speedX;
      p.y += p.speedY;
      p.rotation += p.rotationSpeed;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
      ctx.restore();
    });
  }

  function animate() {
    draw();
    requestAnimationFrame(animate);
  }
  animate();

  // nach 5 Sekunden automatisch entfernen
  setTimeout(() => {
    canvas.remove();
  }, 5000);
}


//////////////////////////////////////////////////////////////////////////////////////////////////
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
  const startCenter = [30, 0];
  const startZoom   = 1;
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
    "tree_proxy":"Baumringe",
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
  L.control.layers(baseLayers, overlays, { collapsed: true }).addTo(map);

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