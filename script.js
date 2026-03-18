// ===== QUIZ ENGINE =====

let config = {
    timerSeconds: 10,
    questionCount: 10,
    categories: ['team', 'animals', 'cities', 'celebrities', 'custom']
};

let players = []; // { name, score, correct, wrong, timeout }
let currentPlayerIndex = 0;

let state = {
    questions: [],
    currentIndex: 0,
    timer: null,
    timerInterval: null,
    timeLeft: 0,
    answered: false
};

// ===== SETTINGS =====

function adjustTimer(delta) {
    const input = document.getElementById('timer-setting');
    let val = parseInt(input.value) + delta;
    val = Math.max(5, Math.min(60, val));
    input.value = val;
}

function adjustCount(delta) {
    const input = document.getElementById('question-count');
    let val = parseInt(input.value) + delta;
    val = Math.max(5, Math.min(50, val));
    input.value = val;
}

function toggleCategory(btn) {
    btn.classList.toggle('active');
}

// ===== PLAYER MANAGEMENT =====

function addPlayer() {
    const input = document.getElementById('player-name-input');
    const name = input.value.trim();
    if (!name) return;

    // Prevent duplicates
    if (players.some(p => p.name.toLowerCase() === name.toLowerCase())) {
        input.value = '';
        return;
    }

    players.push({ name, score: 0, correct: 0, wrong: 0, timeout: 0 });
    input.value = '';
    renderPlayerList();
    updateStartButton();
}

function removePlayer(index) {
    players.splice(index, 1);
    renderPlayerList();
    updateStartButton();
}

function renderPlayerList() {
    const list = document.getElementById('player-list');
    const playerColors = ['#f093fb', '#4facfe', '#43e97b', '#fee140', '#fa709a', '#38f9d7', '#667eea', '#f5576c'];

    list.innerHTML = players.map((p, i) => `
        <div class="player-tag" style="border-color: ${playerColors[i % playerColors.length]}">
            <span class="player-tag-color" style="background: ${playerColors[i % playerColors.length]}"></span>
            <span>${p.name}</span>
            <button class="player-remove" onclick="removePlayer(${i})">&times;</button>
        </div>
    `).join('');
}

function updateStartButton() {
    const btn = document.querySelector('.btn-start');
    btn.disabled = players.length === 0;
    btn.style.opacity = players.length === 0 ? '0.5' : '1';
}

// ===== QUIZ START =====

function startQuiz() {
    if (players.length === 0) return;

    // Read settings
    config.timerSeconds = parseInt(document.getElementById('timer-setting').value);
    config.questionCount = parseInt(document.getElementById('question-count').value);
    config.categories = [];
    document.querySelectorAll('.cat-btn.active').forEach(btn => {
        config.categories.push(btn.dataset.cat);
    });

    if (config.categories.length === 0) {
        config.categories = ['custom'];
        document.querySelector('[data-cat="custom"]').classList.add('active');
    }

    // Reset player scores
    players.forEach(p => {
        p.score = 0;
        p.correct = 0;
        p.wrong = 0;
        p.timeout = 0;
    });

    // Build question pool
    let pool = [];
    config.categories.forEach(cat => {
        if (QUESTIONS[cat]) {
            pool = pool.concat(QUESTIONS[cat].map(q => ({ ...q, category: cat })));
        }
    });

    // Shuffle and pick
    state.questions = shuffleArray(pool).slice(0, config.questionCount);
    state.currentIndex = 0;
    currentPlayerIndex = 0;

    switchScreen('quiz-screen');
    showQuestion();
}

// ===== QUESTION DISPLAY =====

function showQuestion() {
    const q = state.questions[state.currentIndex];
    state.answered = false;

    // Update header
    document.getElementById('question-number').textContent =
        `${state.currentIndex + 1}/${state.questions.length}`;

    const categoryLabels = {
        team: '💼 Team',
        animals: '🐾 Tiere',
        cities: '🏙️ Städte',
        celebrities: '⭐ Promis',
        custom: '🎲 Allgemein'
    };
    document.getElementById('category-badge').textContent = categoryLabels[q.category] || q.category;

    // Current player indicator
    const currentPlayer = players[currentPlayerIndex];
    document.getElementById('current-player').textContent = currentPlayer.name;
    document.getElementById('current-player-score').textContent = currentPlayer.score;

    // Image
    const imgContainer = document.getElementById('question-image-container');
    const img = document.getElementById('question-image');
    if (q.image) {
        img.src = q.image;
        imgContainer.style.display = 'block';
    } else {
        imgContainer.style.display = 'none';
    }

    // Question text
    document.getElementById('question-text').textContent = q.question;

    // Answers
    const container = document.getElementById('answers-container');
    container.innerHTML = '';
    const letters = ['A', 'B', 'C', 'D'];

    q.answers.forEach((answer, index) => {
        const btn = document.createElement('button');
        btn.className = 'answer-btn';
        btn.innerHTML = `<span class="answer-letter">${letters[index]}</span>${answer}`;
        btn.addEventListener('click', () => selectAnswer(index));
        container.appendChild(btn);
    });

    // Animate question card
    const card = document.getElementById('question-card');
    card.style.animation = 'none';
    card.offsetHeight; // Trigger reflow
    card.style.animation = 'fadeIn 0.4s ease-out';

    // Update scoreboard
    renderScoreboard();

    // Start timer
    startTimer();
}

// ===== SCOREBOARD =====

function renderScoreboard() {
    const container = document.getElementById('scoreboard');
    const playerColors = ['#f093fb', '#4facfe', '#43e97b', '#fee140', '#fa709a', '#38f9d7', '#667eea', '#f5576c'];
    const sorted = [...players].sort((a, b) => b.score - a.score);

    container.innerHTML = sorted.map((p, i) => {
        const colorIndex = players.indexOf(p);
        const isActive = players.indexOf(p) === currentPlayerIndex;
        return `<div class="scoreboard-entry ${isActive ? 'active' : ''}" style="border-left: 3px solid ${playerColors[colorIndex % playerColors.length]}">
            <span class="sb-name">${p.name}</span>
            <span class="sb-score">${p.score}</span>
        </div>`;
    }).join('');
}

// ===== ANSWER HANDLING =====

function selectAnswer(index) {
    if (state.answered) return;
    state.answered = true;
    stopTimer();

    const q = state.questions[state.currentIndex];
    const buttons = document.querySelectorAll('.answer-btn');
    const currentPlayer = players[currentPlayerIndex];

    // Check if all answers are correct (special question type)
    const isCorrect = q.allCorrect || index === q.correct;

    // Disable all buttons
    buttons.forEach(btn => btn.classList.add('disabled'));

    if (q.allCorrect) {
        // All answers are correct — mark them all green
        buttons.forEach(btn => btn.classList.add('correct'));
    } else {
        // Mark the correct answer
        buttons[q.correct].classList.add('correct');
    }

    if (isCorrect) {
        const points = calculatePoints();
        currentPlayer.score += points;
        currentPlayer.correct++;
        showFeedback('✅');
        spawnConfetti(15);
    } else {
        buttons[index].classList.add('wrong');
        currentPlayer.wrong++;
        showFeedback('❌');
    }

    // Update scoreboard immediately
    renderScoreboard();
    document.getElementById('current-player-score').textContent = currentPlayer.score;

    // Next question after delay
    setTimeout(() => nextQuestion(), 2000);
}

function timeoutAnswer() {
    if (state.answered) return;
    state.answered = true;

    const q = state.questions[state.currentIndex];
    const buttons = document.querySelectorAll('.answer-btn');
    const currentPlayer = players[currentPlayerIndex];

    buttons.forEach(btn => btn.classList.add('disabled'));

    if (q.allCorrect) {
        buttons.forEach(btn => btn.classList.add('correct'));
    } else {
        buttons[q.correct].classList.add('correct');
    }

    currentPlayer.timeout++;
    showFeedback('⏰');

    setTimeout(() => nextQuestion(), 2000);
}

function calculatePoints() {
    const timeBonus = Math.ceil((state.timeLeft / config.timerSeconds) * 100);
    return 100 + timeBonus;
}

// ===== TIMER =====

function startTimer() {
    state.timeLeft = config.timerSeconds;
    const timerBar = document.getElementById('timer-bar');
    const timerDisplay = document.getElementById('timer-display');

    timerBar.style.width = '100%';
    timerBar.className = 'timer-bar';
    timerDisplay.className = 'timer-display';
    timerDisplay.textContent = state.timeLeft;

    const startTime = Date.now();
    const totalMs = config.timerSeconds * 1000;

    state.timerInterval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, totalMs - elapsed);
        const fraction = remaining / totalMs;

        state.timeLeft = remaining / 1000;
        timerBar.style.width = (fraction * 100) + '%';
        timerDisplay.textContent = Math.ceil(state.timeLeft);

        if (fraction <= 0.25) {
            timerBar.className = 'timer-bar danger';
            timerDisplay.className = 'timer-display danger';
        } else if (fraction <= 0.5) {
            timerBar.className = 'timer-bar warning';
            timerDisplay.className = 'timer-display warning';
        }

        if (remaining <= 0) {
            stopTimer();
            timeoutAnswer();
        }
    }, 50);
}

function stopTimer() {
    if (state.timerInterval) {
        clearInterval(state.timerInterval);
        state.timerInterval = null;
    }
}

// ===== NAVIGATION =====

function nextQuestion() {
    // Rotate to next player
    currentPlayerIndex = (currentPlayerIndex + 1) % players.length;

    state.currentIndex++;
    if (state.currentIndex >= state.questions.length) {
        showResults();
    } else {
        showQuestion();
    }
}

// ===== RESULTS =====

function showResults() {
    switchScreen('result-screen');

    // Sort players by score (descending)
    const sorted = [...players].sort((a, b) => b.score - a.score);
    const winner = sorted[0];

    // Winner display
    document.getElementById('winner-name').textContent = winner.name;
    document.getElementById('winner-score').textContent = winner.score;

    // Podium / Ranking
    const rankingContainer = document.getElementById('ranking-list');
    const medals = ['🥇', '🥈', '🥉'];
    const playerColors = ['#f093fb', '#4facfe', '#43e97b', '#fee140', '#fa709a', '#38f9d7', '#667eea', '#f5576c'];

    rankingContainer.innerHTML = sorted.map((p, i) => {
        const colorIndex = players.indexOf(p);
        const medal = medals[i] || `${i + 1}.`;
        return `
            <div class="ranking-entry ${i === 0 ? 'winner' : ''}" style="animation-delay: ${i * 0.15}s">
                <span class="ranking-medal">${medal}</span>
                <span class="ranking-name">${p.name}</span>
                <div class="ranking-details">
                    <span class="ranking-score">${p.score} Punkte</span>
                    <span class="ranking-stats">✅ ${p.correct} &nbsp; ❌ ${p.wrong} &nbsp; ⏰ ${p.timeout}</span>
                </div>
            </div>
        `;
    }).join('');

    // Big confetti for the winner
    for (let i = 0; i < 5; i++) {
        setTimeout(() => spawnConfetti(40), i * 400);
    }
}

function restartQuiz() {
    switchScreen('start-screen');
}

// ===== SCREEN SWITCHING =====

function switchScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
}

// ===== FEEDBACK OVERLAY =====

function showFeedback(emoji) {
    const overlay = document.createElement('div');
    overlay.className = 'feedback-overlay';
    overlay.innerHTML = `<div class="feedback-text">${emoji}</div>`;
    document.body.appendChild(overlay);
    setTimeout(() => overlay.remove(), 1000);
}

// ===== CONFETTI =====

function spawnConfetti(count) {
    const container = document.getElementById('confetti-container');
    const colors = ['#f093fb', '#f5576c', '#fee140', '#43e97b', '#4facfe', '#fa709a', '#38f9d7', '#667eea'];

    for (let i = 0; i < count; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.width = (Math.random() * 10 + 5) + 'px';
        confetti.style.height = (Math.random() * 10 + 5) + 'px';
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
        confetti.style.animationDuration = (Math.random() * 2 + 1.5) + 's';
        confetti.style.animationDelay = (Math.random() * 0.5) + 's';
        container.appendChild(confetti);

        setTimeout(() => confetti.remove(), 4000);
    }
}

// ===== UTILITIES =====

function shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

// ===== KEYBOARD SUPPORT =====

document.addEventListener('keydown', (e) => {
    if (document.getElementById('quiz-screen').classList.contains('active')) {
        if (state.answered) return;
        const keyMap = { '1': 0, '2': 1, '3': 2, '4': 3, 'a': 0, 'b': 1, 'c': 2, 'd': 3 };
        const index = keyMap[e.key.toLowerCase()];
        if (index !== undefined) {
            selectAnswer(index);
        }
    }

    // Enter to add player on start screen
    if (document.getElementById('start-screen').classList.contains('active')) {
        if (e.key === 'Enter' && document.activeElement.id === 'player-name-input') {
            addPlayer();
        }
    }
});

// ===== INIT =====
updateStartButton();
