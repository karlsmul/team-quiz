// ===== PLAYER / SMARTPHONE ENGINE =====

let db = null;
let roomRef = null;
let playerId = null;
let playerName = '';
let myScore = 0;
let questionStartTime = 0;
let hasAnswered = false;
let phoneTimerInterval = null;

// ===== INIT =====

function initPlayer() {
    if (!FIREBASE_CONFIG || !FIREBASE_CONFIG.apiKey || FIREBASE_CONFIG.apiKey === '') {
        document.getElementById('join-error').textContent = 'Firebase nicht konfiguriert.';
        return;
    }
    try {
        firebase.initializeApp(FIREBASE_CONFIG);
        db = firebase.database();
    } catch (e) {
        // Already initialized
        db = firebase.database();
    }

    // Check for room code in URL
    const params = new URLSearchParams(window.location.search);
    const roomParam = params.get('room');
    if (roomParam) {
        document.getElementById('room-code-input').value = roomParam.toUpperCase();
    }
}

// ===== JOIN ROOM =====

function joinRoom() {
    const code = document.getElementById('room-code-input').value.trim().toUpperCase();
    const name = document.getElementById('player-name-input').value.trim();
    const errorEl = document.getElementById('join-error');

    if (!code || code.length !== 4) {
        errorEl.textContent = 'Bitte gültigen Raum-Code eingeben (4 Buchstaben).';
        return;
    }
    if (!name) {
        errorEl.textContent = 'Bitte deinen Namen eingeben.';
        return;
    }

    errorEl.textContent = 'Verbinde...';
    document.getElementById('join-btn').disabled = true;

    roomRef = db.ref('rooms/' + code);

    // Check if room exists
    roomRef.child('state').once('value', (snap) => {
        if (!snap.exists()) {
            errorEl.textContent = 'Raum nicht gefunden. Prüfe den Code.';
            document.getElementById('join-btn').disabled = false;
            return;
        }

        const state = snap.val();
        if (state !== 'lobby') {
            errorEl.textContent = 'Das Quiz läuft bereits.';
            document.getElementById('join-btn').disabled = false;
            return;
        }

        // Join the room
        playerName = name;
        const playerRef = roomRef.child('players').push();
        playerId = playerRef.key;
        playerRef.set({ name: playerName });

        // Remove player on disconnect
        playerRef.onDisconnect().remove();

        document.getElementById('player-name-display').textContent = playerName;
        switchScreen('waiting-screen');

        // Listen for game state changes
        listenForGameState();
    });
}

// ===== GAME STATE LISTENER =====

function listenForGameState() {
    roomRef.on('value', (snap) => {
        const data = snap.val();
        if (!data) {
            // Room was deleted
            switchScreen('join-screen');
            document.getElementById('join-error').textContent = 'Der Raum wurde geschlossen.';
            document.getElementById('join-btn').disabled = false;
            return;
        }

        const state = data.state;

        if (state === 'question') {
            showPhoneQuestion(data);
        } else if (state === 'reveal') {
            showPhoneFeedback(data);
        } else if (state === 'results') {
            showPhoneResults(data);
        }
    });
}

// ===== QUESTION DISPLAY =====

function showPhoneQuestion(data) {
    // Prevent re-rendering if already showing this question
    const q = data.currentQuestion;
    if (!q) return;

    const currentScreen = document.querySelector('.screen.active');
    if (currentScreen && currentScreen.id === 'answer-screen') {
        // Check if it's the same question
        const currentNum = document.getElementById('phone-question-num').textContent;
        if (currentNum === `${q.index + 1}/${q.totalQuestions}` && !hasAnswered) return;
    }

    hasAnswered = false;
    questionStartTime = Date.now();

    switchScreen('answer-screen');

    // Update my score from Firebase data
    if (data.scores && data.scores[playerId]) {
        myScore = data.scores[playerId].score;
    }

    document.getElementById('phone-question-num').textContent = `${q.index + 1}/${q.totalQuestions}`;
    document.getElementById('phone-score').textContent = myScore + ' Punkte';
    document.getElementById('phone-question').textContent = q.question;

    // Answers
    const container = document.getElementById('phone-answers');
    container.innerHTML = '';
    const letters = ['A', 'B', 'C', 'D'];
    const btnColors = ['#f5576c', '#4facfe', '#fee140', '#667eea'];

    q.answers.forEach((answer, i) => {
        const btn = document.createElement('button');
        btn.className = 'phone-answer-btn';
        btn.style.background = `linear-gradient(135deg, ${btnColors[i]}33, ${btnColors[i]}22)`;
        btn.style.borderColor = btnColors[i];
        btn.innerHTML = `<span class="phone-letter" style="background:${btnColors[i]}">${letters[i]}</span>${answer}`;
        btn.addEventListener('click', () => submitAnswer(i, q));
        container.appendChild(btn);
    });

    // Phone timer
    startPhoneTimer(q.timerSeconds);
}

function submitAnswer(index, question) {
    if (hasAnswered) return;
    hasAnswered = true;

    const timeTaken = (Date.now() - questionStartTime) / 1000;

    // Send answer to Firebase
    roomRef.child('currentAnswers').child(playerId).set({
        answer: index,
        timeTaken: Math.round(timeTaken * 100) / 100,
        timestamp: firebase.database.ServerValue.TIMESTAMP
    });

    // Disable all buttons, highlight selected
    const buttons = document.querySelectorAll('.phone-answer-btn');
    buttons.forEach((btn, i) => {
        btn.classList.add('phone-disabled');
        if (i === index) btn.classList.add('phone-selected');
    });

    stopPhoneTimer();
}

// ===== PHONE TIMER =====

function startPhoneTimer(seconds) {
    stopPhoneTimer();
    const bar = document.getElementById('phone-timer-bar-fill');
    bar.style.width = '100%';
    bar.className = 'phone-timer-bar-fill';

    const startTime = Date.now();
    const totalMs = seconds * 1000;

    phoneTimerInterval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, totalMs - elapsed);
        const fraction = remaining / totalMs;

        bar.style.width = (fraction * 100) + '%';

        if (fraction <= 0.25) bar.className = 'phone-timer-bar-fill danger';
        else if (fraction <= 0.5) bar.className = 'phone-timer-bar-fill warning';

        if (remaining <= 0) {
            stopPhoneTimer();
            if (!hasAnswered) {
                hasAnswered = true;
                const buttons = document.querySelectorAll('.phone-answer-btn');
                buttons.forEach(btn => btn.classList.add('phone-disabled'));
            }
        }
    }, 50);
}

function stopPhoneTimer() {
    if (phoneTimerInterval) {
        clearInterval(phoneTimerInterval);
        phoneTimerInterval = null;
    }
}

// ===== FEEDBACK =====

function showPhoneFeedback(data) {
    stopPhoneTimer();

    if (!data.answerResults || !data.answerResults[playerId]) return;
    const result = data.answerResults[playerId];

    // Update score
    if (data.scores && data.scores[playerId]) {
        myScore = data.scores[playerId].score;
    }

    const emojiEl = document.getElementById('feedback-emoji');
    const titleEl = document.getElementById('feedback-title');
    const pointsEl = document.getElementById('feedback-points');
    const correctEl = document.getElementById('feedback-correct-answer');

    if (result.timeout) {
        emojiEl.textContent = '⏰';
        titleEl.textContent = 'Zeit abgelaufen!';
        pointsEl.textContent = '0 Punkte';
    } else if (result.correct) {
        emojiEl.textContent = '✅';
        titleEl.textContent = 'Richtig!';
        pointsEl.textContent = '+' + result.points + ' Punkte';
        spawnConfetti(15);
    } else {
        emojiEl.textContent = '❌';
        titleEl.textContent = 'Leider falsch';
        pointsEl.textContent = '0 Punkte';
    }

    // Show correct answer
    if (data.currentQuestion) {
        const q = data.currentQuestion;
        if (data.allCorrect) {
            correctEl.textContent = 'Alle Antworten waren richtig!';
        } else if (data.correctAnswer !== undefined && data.correctAnswer >= 0) {
            correctEl.textContent = 'Richtig: ' + q.answers[data.correctAnswer];
        } else {
            correctEl.textContent = '';
        }
    }

    switchScreen('feedback-screen');
}

// ===== RESULTS =====

function showPhoneResults(data) {
    stopPhoneTimer();
    if (!data.scores) return;

    // Prevent re-rendering
    const currentScreen = document.querySelector('.screen.active');
    if (currentScreen && currentScreen.id === 'player-result-screen') return;

    const scores = data.scores;
    const sorted = Object.entries(scores).sort((a, b) => b[1].score - a[1].score);

    // Find my position
    const myPos = sorted.findIndex(([id]) => id === playerId);
    const medals = ['🥇', '🥈', '🥉'];
    const placeTexts = ['1. Platz!', '2. Platz!', '3. Platz!'];

    document.getElementById('player-result-place').textContent =
        myPos < 3 ? placeTexts[myPos] : (myPos + 1) + '. Platz';

    if (scores[playerId]) {
        document.getElementById('player-result-name').textContent = playerName;
        document.getElementById('player-result-score').textContent = scores[playerId].score;
    }

    document.getElementById('player-ranking-list').innerHTML = sorted.map(([id, p], i) => {
        const isMe = id === playerId;
        return `
            <div class="ranking-entry ${i === 0 ? 'winner' : ''} ${isMe ? 'is-me' : ''}" style="animation-delay: ${i * 0.15}s">
                <span class="ranking-medal">${medals[i] || (i + 1) + '.'}</span>
                <span class="ranking-name">${p.name} ${isMe ? '(Du)' : ''}</span>
                <div class="ranking-details">
                    <span class="ranking-score">${p.score} Punkte</span>
                    <span class="ranking-stats">✅ ${p.correct}  ❌ ${p.wrong}  ⏰ ${p.timeout}</span>
                </div>
            </div>
        `;
    }).join('');

    switchScreen('player-result-screen');

    if (myPos === 0) {
        for (let i = 0; i < 5; i++) setTimeout(() => spawnConfetti(40), i * 400);
    } else {
        spawnConfetti(15);
    }
}

// ===== UTILITIES =====

function switchScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
}

function spawnConfetti(count) {
    const container = document.getElementById('confetti-container');
    const colors = ['#f093fb', '#f5576c', '#fee140', '#43e97b', '#4facfe', '#fa709a', '#38f9d7', '#667eea'];
    for (let i = 0; i < count; i++) {
        const c = document.createElement('div');
        c.className = 'confetti';
        c.style.left = Math.random() * 100 + '%';
        c.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        c.style.width = (Math.random() * 10 + 5) + 'px';
        c.style.height = (Math.random() * 10 + 5) + 'px';
        c.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
        c.style.animationDuration = (Math.random() * 2 + 1.5) + 's';
        c.style.animationDelay = (Math.random() * 0.5) + 's';
        container.appendChild(c);
        setTimeout(() => c.remove(), 4000);
    }
}

// ===== KEYBOARD SUPPORT =====

document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        if (document.getElementById('join-screen').classList.contains('active')) {
            joinRoom();
        }
    }
});

// ===== START =====
initPlayer();
