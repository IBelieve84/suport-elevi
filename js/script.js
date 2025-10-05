// Funcție pentru afișarea / ascunderea indicilor
function toggleHelp(id) {
    const el = document.getElementById(id);
    el.style.display = el.style.display === 'none' ? 'block' : 'none';
  }
  
  // Generare operator aleator (+, -, *, /, %)
function getRandomOperator() {
  const ops = ['+', '-', '*', '/', '%'];
  return ops[Math.floor(Math.random() * ops.length)];
}

// Funcție care generează expresie random cu x operatori și opțional paranteze
function generateCustomExercise() {
  const numOps = Number(document.getElementById('numOperators').value);
  const useParens = document.getElementById('useParens').checked;

  let numbers = [];
  for (let i = 0; i <= numOps; i++) {
    numbers.push(Math.floor(Math.random() * 20) + 1); // valori 1-20
  }

  let operators = [];
  for (let i = 0; i < numOps; i++) {
    operators.push(getRandomOperator());
  }

  // Construim expresia ca string
  let expr = '' + numbers[0];
  for (let i = 0; i < numOps; i++) {
    expr += ' ' + operators[i] + ' ' + numbers[i + 1];
  }

  // Adăugăm paranteze aleator dacă userul vrea
  if (useParens && numOps >= 2) {
    const start = Math.floor(Math.random() * (numOps));
    const end = start + 1 + Math.floor(Math.random() * (numOps - start));
    expr = expr.split(' ').map((v, i) => {
      if (i === start * 2) return '(' + v;
      if (i === end * 2) return v + ')';
      return v;
    }).join(' ');
  }

  document.getElementById('custom-ex').innerText = 'Rezolvă: ' + expr;

  // Calculăm rezultatul corect folosind funcție specială pentru %
  try {
    window.customCorrectAnswer = eval(expr.replace(/%/g, '%')); // modulo funcționează direct în JS
  } catch(e) {
    window.customCorrectAnswer = null;
  }
}

// Verificarea răspunsului
function checkCustomAnswer() {
  const user = Number(document.getElementById('custom-answer').value);
  if (window.customCorrectAnswer === null) {
    document.getElementById('custom-feedback').innerText = 'Expresie invalidă, generează alta.';
    return;
  }
  const feedback = Math.abs(user - window.customCorrectAnswer) < 0.0001 ? 'Corect!' : 'Greșit, încearcă din nou!';
  document.getElementById('custom-feedback').innerText = feedback;
}

// Generare operator logic aleator
function getRandomLogicOperator() {
  const ops = ['&&', '||'];
  return ops[Math.floor(Math.random() * ops.length)];
}

// Generare valoare boolean aleatoare
function getRandomBoolean() {
  return Math.random() < 0.5 ? 'true' : 'false';
}

// Generare expresie logică
function generateLogicExercise() {
  const numOps = Number(document.getElementById('numLogicOps').value);
  const useParens = document.getElementById('logicParens').checked;

  let values = [];
  for (let i = 0; i <= numOps; i++) {
    let val = getRandomBoolean();
    // uneori aplicam NOT
    if (Math.random() < 0.3) val = '!' + val;
    values.push(val);
  }

  let operators = [];
  for (let i = 0; i < numOps; i++) {
    operators.push(getRandomLogicOperator());
  }

  // Construim expresia ca string
  let expr = '' + values[0];
  for (let i = 0; i < numOps; i++) {
    expr += ' ' + operators[i] + ' ' + values[i + 1];
  }

  // Adăugăm paranteze aleator
  if (useParens && numOps >= 2) {
    const start = Math.floor(Math.random() * numOps);
    const end = start + 1 + Math.floor(Math.random() * (numOps - start));
    expr = expr.split(' ').map((v, i) => {
      if (i === start * 2) return '(' + v;
      if (i === end * 2) return v + ')';
      return v;
    }).join(' ');
  }

  document.getElementById('logic-ex').innerText = 'Rezolvă: ' + expr;

  // Evaluăm expresia folosind eval
  try {
    window.logicCorrectAnswer = eval(expr);
  } catch (e) {
    window.logicCorrectAnswer = null;
  }
}

// Verificarea răspunsului
function checkLogicAnswer() {
  const user = document.getElementById('logic-answer').value;
  if (window.logicCorrectAnswer === null) {
    document.getElementById('logic-feedback').innerText = 'Expresie invalidă, generează alta.';
    return;
  }
  const feedback = (user === window.logicCorrectAnswer.toString()) ? 'Corect!' : 'Greșit, încearcă din nou!';
  document.getElementById('logic-feedback').innerText = feedback;
}

  