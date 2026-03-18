// ===== HOST / PRESENTER ENGINE =====

let db = null;
let roomRef = null;
let roomCode = '';
let isLiveMode = false;
let firebaseReady = false;

// Game state
let config = { timerSeconds: 10, questionCount: 10, categories: ['team', 'animals', 'cities', 'celebrities', 'custom'] };
let gameQuestions = [];
let currentQIndex = 0;
let timerInterval = null;
let timeLeft = 0;
let livePlayers = {};    // { id: { name, score, correct, wrong, timeout } }
let liveAnswers = {};    // answers for current question { playerId: { answer, timestamp } }

// Offline state
let offlinePlayers = [];
let offlineCurrentPlayer = 0;

// ===== INIT =====

function initFirebase() {
    if (!FIREBASE_CONFIG || !FIREBASE_CONFIG.apiKey || FIREBASE_CONFIG.apiKey === '') {
        switchScreen('setup-screen');
        return;
    }
    try {
        firebase.initializeApp(FIREBASE_CONFIG);
        db = firebase.database();
        firebaseReady = true;
        switchScreen('start-screen');
    } catch (e) {
        console.error('Firebase init failed:', e);
        switchScreen('setup-screen');
    }
}

// ===== ROOM MANAGEMENT =====

function generateRoomCode() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
    let code = '';
    for (let i = 0; i < 4; i++) code += chars[Math.floor(Math.random() * chars.length)];
    return code;
}

function createRoom() {
    roomCode = generateRoomCode();
    roomRef = db.ref('rooms/' + roomCode);

    // Create room in Firebase
    roomRef.set({
        state: 'lobby',
        createdAt: firebase.database.ServerValue.TIMESTAMP
    });

    // Clean up on disconnect
    roomRef.onDisconnect().remove();

    // Show QR code & lobby
    showLobby();

    // Listen for players joining
    roomRef.child('players').on('child_added', (snap) => {
        const player = snap.val();
        livePlayers[snap.key] = { ...player, score: 0, correct: 0, wrong: 0, timeout: 0 };
        renderLobbyPlayers();
    });

    roomRef.child('players').on('child_removed', (snap) => {
        delete livePlayers[snap.key];
        renderLobbyPlayers();
    });
}

function showLobby() {
    switchScreen('lobby-screen');

    document.getElementById('room-code').textContent = roomCode;

    // Build join URL
    const baseUrl = window.location.href.replace(/\/[^\/]*$/, '/');
    const joinUrl = baseUrl + 'play.html?room=' + roomCode;
    document.getElementById('join-url').textContent = joinUrl;

    // Generate QR code
    const qrContainer = document.getElementById('qr-code');
    qrContainer.innerHTML = '';
    const qr = qrcode(0, 'M');
    qr.addData(joinUrl);
    qr.make();
    qrContainer.innerHTML = qr.createSvgTag({ cellSize: 5, margin: 2 });
    // Style the SVG
    const svg = qrContainer.querySelector('svg');
    if (svg) {
        svg.style.width = '200px';
        svg.style.height = '200px';
        svg.style.borderRadius = '12px';
    }
}

function renderLobbyPlayers() {
    const list = document.getElementById('lobby-player-list');
    const playerIds = Object.keys(livePlayers);
    const count = playerIds.length;
    document.getElementById('player-count').textContent = count;

    const colors = ['#f093fb', '#4facfe', '#43e97b', '#fee140', '#fa709a', '#38f9d7', '#667eea', '#f5576c'];

    if (count === 0) {
        list.innerHTML = '<p class="waiting-text">Warte auf Spieler...</p>';
    } else {
        list.innerHTML = playerIds.map((id, i) => `
            <div class="lobby-player" style="border-left: 3px solid ${colors[i % colors.length]}">
                <span class="lobby-player-dot" style="background: ${colors[i % colors.length]}"></span>
                ${livePlayers[id].name}
            </div>
        `).join('');
    }

    // Enable/disable start button
    const btn = document.getElementById('lobby-start-btn');
    btn.disabled = count === 0;
    btn.style.opacity = count === 0 ? '0.5' : '1';
}

// ===== LIVE QUIZ =====

function startLiveQuiz() {
    isLiveMode = true;
    config.timerSeconds = parseInt(document.getElementById('timer-setting').value);
    config.questionCount = parseInt(document.getElementById('question-count').value);
    config.categories = [];
    document.querySelectorAll('#lobby-screen .cat-btn.active').forEach(btn => {
        config.categories.push(btn.dataset.cat);
    });
    if (config.categories.length === 0) config.categories = ['custom'];

    // Build questions
    let pool = [];
    config.categories.forEach(cat => {
        if (QUESTIONS[cat]) {
            pool = pool.concat(QUESTIONS[cat].map(q => ({ ...q, category: cat })));
        }
    });
    gameQuestions = shuffleArray(pool).slice(0, config.questionCount);
    currentQIndex = 0;

    // Reset player scores
    Object.keys(livePlayers).forEach(id => {
        livePlayers[id].score = 0;
        livePlayers[id].correct = 0;
        livePlayers[id].wrong = 0;
        livePlayers[id].timeout = 0;
    });

    showLiveQuestion();
}

function showLiveQuestion() {
    const q = gameQuestions[currentQIndex];
    liveAnswers = {};

    switchScreen('quiz-screen');

    // Update header
    document.getElementById('question-number').textContent = `${currentQIndex + 1}/${gameQuestions.length}`;
    const catLabels = { team: 'Team', animals: 'Tiere', cities: 'Städte', celebrities: 'Promis', custom: 'Allgemein' };
    document.getElementById('category-badge').textContent = catLabels[q.category] || q.category;

    updateAnswerCount();

    // Image
    const imgContainer = document.getElementById('question-image-container');
    const img = document.getElementById('question-image');
    if (q.image) {
        img.src = q.image;
        imgContainer.style.display = 'block';
    } else {
        imgContainer.style.display = 'none';
    }

    // Question
    document.getElementById('question-text').textContent = q.question;

    // Answers (host shows them too)
    const container = document.getElementById('answers-container');
    container.innerHTML = '';
    const letters = ['A', 'B', 'C', 'D'];
    q.answers.forEach((answer, i) => {
        const btn = document.createElement('button');
        btn.className = 'answer-btn';
        btn.innerHTML = `<span class="answer-letter">${letters[i]}</span>${answer}`;
        btn.style.cursor = 'default';
        container.appendChild(btn);
    });

    // Push question to Firebase (WITHOUT correct answer!)
    const questionData = {
        question: q.question,
        answers: q.answers,
        image: q.image || null,
        category: q.category,
        index: currentQIndex,
        totalQuestions: gameQuestions.length,
        timerSeconds: config.timerSeconds
    };

    roomRef.update({
        state: 'question',
        currentQuestion: questionData,
        questionStartTime: firebase.database.ServerValue.TIMESTAMP
    });

    // Clear previous answers
    roomRef.child('currentAnswers').remove();

    // Listen for player answers
    roomRef.child('currentAnswers').on('child_added', (snap) => {
        liveAnswers[snap.key] = snap.val();
        updateAnswerCount();

        // Check if all players answered
        if (Object.keys(liveAnswers).length >= Object.keys(livePlayers).length) {
            revealAnswer();
        }
    });

    // Scoreboard
    renderScoreboard();

    // Start timer
    startTimer(() => revealAnswer());
}

function updateAnswerCount() {
    const answered = Object.keys(liveAnswers).length;
    const total = Object.keys(livePlayers).length;
    const el = document.getElementById('answer-count');
    if (el) el.textContent = `${answered}/${total} beantwortet`;
}

function revealAnswer() {
    if (timerInterval === null && Object.keys(liveAnswers).length === 0) return; // Already revealed
    stopTimer();
    roomRef.child('currentAnswers').off();

    const q = gameQuestions[currentQIndex];
    const buttons = document.querySelectorAll('.answer-btn');

    // Mark correct answer(s) on host screen
    if (q.allCorrect) {
        buttons.forEach(btn => { btn.classList.add('correct'); btn.classList.add('disabled'); });
    } else {
        buttons.forEach(btn => btn.classList.add('disabled'));
        buttons[q.correct].classList.add('correct');
    }

    // Calculate scores for each player
    // Get the question start time for time bonus calculation
    const playerIds = Object.keys(livePlayers);
    let answerResults = {};

    playerIds.forEach(pid => {
        const answer = liveAnswers[pid];
        if (!answer) {
            // Timeout
            livePlayers[pid].timeout++;
            answerResults[pid] = { correct: false, timeout: true, points: 0 };
        } else {
            const isCorrect = q.allCorrect || answer.answer === q.correct;
            if (isCorrect) {
                // Time bonus: faster = more points
                const timeTaken = Math.min(answer.timeTaken || config.timerSeconds, config.timerSeconds);
                const timeBonus = Math.ceil(((config.timerSeconds - timeTaken) / config.timerSeconds) * 100);
                const points = 100 + timeBonus;
                livePlayers[pid].score += points;
                livePlayers[pid].correct++;
                answerResults[pid] = { correct: true, timeout: false, points };
            } else {
                livePlayers[pid].wrong++;
                answerResults[pid] = { correct: false, timeout: false, points: 0 };
            }
        }
    });

    // Push reveal data + updated scores to Firebase
    const scoresObj = {};
    playerIds.forEach(pid => {
        scoresObj[pid] = {
            name: livePlayers[pid].name,
            score: livePlayers[pid].score,
            correct: livePlayers[pid].correct,
            wrong: livePlayers[pid].wrong,
            timeout: livePlayers[pid].timeout
        };
    });

    roomRef.update({
        state: 'reveal',
        correctAnswer: q.allCorrect ? -1 : q.correct,
        allCorrect: q.allCorrect || false,
        answerResults: answerResults,
        scores: scoresObj
    });

    // Update scoreboard
    renderScoreboard();

    // Confetti for each correct
    const correctCount = Object.values(answerResults).filter(r => r.correct).length;
    if (correctCount > 0) spawnConfetti(correctCount * 5);

    // Next question after delay
    setTimeout(() => {
        currentQIndex++;
        if (currentQIndex >= gameQuestions.length) {
            showLiveResults();
        } else {
            showLiveQuestion();
        }
    }, 3000);
}

function showLiveResults() {
    // Push final results to Firebase
    const scoresObj = {};
    Object.keys(livePlayers).forEach(pid => {
        scoresObj[pid] = {
            name: livePlayers[pid].name,
            score: livePlayers[pid].score,
            correct: livePlayers[pid].correct,
            wrong: livePlayers[pid].wrong,
            timeout: livePlayers[pid].timeout
        };
    });

    roomRef.update({
        state: 'results',
        scores: scoresObj
    });

    // Show results on host screen
    const sorted = Object.entries(livePlayers).sort((a, b) => b[1].score - a[1].score);
    const winner = sorted[0][1];

    document.getElementById('winner-name').textContent = winner.name;
    document.getElementById('winner-score').textContent = winner.score;

    const medals = ['🥇', '🥈', '🥉'];
    document.getElementById('ranking-list').innerHTML = sorted.map(([id, p], i) => `
        <div class="ranking-entry ${i === 0 ? 'winner' : ''}" style="animation-delay: ${i * 0.15}s">
            <span class="ranking-medal">${medals[i] || (i + 1) + '.'}</span>
            <span class="ranking-name">${p.name}</span>
            <div class="ranking-details">
                <span class="ranking-score">${p.score} Punkte</span>
                <span class="ranking-stats">✅ ${p.correct}  ❌ ${p.wrong}  ⏰ ${p.timeout}</span>
            </div>
        </div>
    `).join('');

    switchScreen('result-screen');

    for (let i = 0; i < 5; i++) {
        setTimeout(() => spawnConfetti(40), i * 400);
    }
}

// ===== SCOREBOARD =====

function renderScoreboard() {
    const container = document.getElementById('scoreboard');
    const colors = ['#f093fb', '#4facfe', '#43e97b', '#fee140', '#fa709a', '#38f9d7', '#667eea', '#f5576c'];

    if (isLiveMode) {
        const sorted = Object.entries(livePlayers).sort((a, b) => b[1].score - a[1].score);
        container.innerHTML = sorted.map(([id, p], i) => {
            const answered = liveAnswers[id] !== undefined;
            return `<div class="scoreboard-entry ${answered ? 'answered' : ''}" style="border-left: 3px solid ${colors[i % colors.length]}">
                <span class="sb-name">${p.name} ${answered ? '✓' : ''}</span>
                <span class="sb-score">${p.score}</span>
            </div>`;
        }).join('');
    } else {
        const sorted = [...offlinePlayers].sort((a, b) => b.score - a.score);
        container.innerHTML = sorted.map((p, i) => {
            const colorIndex = offlinePlayers.indexOf(p);
            const isActive = offlinePlayers.indexOf(p) === offlineCurrentPlayer;
            return `<div class="scoreboard-entry ${isActive ? 'active' : ''}" style="border-left: 3px solid ${colors[colorIndex % colors.length]}">
                <span class="sb-name">${p.name}</span>
                <span class="sb-score">${p.score}</span>
            </div>`;
        }).join('');
    }
}

// ===== TIMER =====

function startTimer(onTimeout) {
    timeLeft = config.timerSeconds;
    const timerBar = document.getElementById('timer-bar');
    const timerDisplay = document.getElementById('timer-display');

    timerBar.style.width = '100%';
    timerBar.className = 'timer-bar';
    timerDisplay.className = 'timer-display';
    timerDisplay.textContent = timeLeft;

    const startTime = Date.now();
    const totalMs = config.timerSeconds * 1000;

    timerInterval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, totalMs - elapsed);
        const fraction = remaining / totalMs;

        timeLeft = remaining / 1000;
        timerBar.style.width = (fraction * 100) + '%';
        timerDisplay.textContent = Math.ceil(timeLeft);

        if (fraction <= 0.25) {
            timerBar.className = 'timer-bar danger';
            timerDisplay.className = 'timer-display danger';
        } else if (fraction <= 0.5) {
            timerBar.className = 'timer-bar warning';
            timerDisplay.className = 'timer-display warning';
        }

        if (remaining <= 0) {
            stopTimer();
            onTimeout();
        }
    }, 50);
}

function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}

// ===== OFFLINE MODE =====

function startOfflineMode() {
    switchScreen('offline-start-screen');
}

function addOfflinePlayer() {
    const input = document.getElementById('offline-player-input');
    const name = input.value.trim();
    if (!name) return;
    if (offlinePlayers.some(p => p.name.toLowerCase() === name.toLowerCase())) { input.value = ''; return; }

    offlinePlayers.push({ name, score: 0, correct: 0, wrong: 0, timeout: 0 });
    input.value = '';
    renderOfflinePlayerList();
    updateOfflineStartBtn();
}

function removeOfflinePlayer(index) {
    offlinePlayers.splice(index, 1);
    renderOfflinePlayerList();
    updateOfflineStartBtn();
}

function renderOfflinePlayerList() {
    const list = document.getElementById('offline-player-list');
    const colors = ['#f093fb', '#4facfe', '#43e97b', '#fee140', '#fa709a', '#38f9d7', '#667eea', '#f5576c'];
    list.innerHTML = offlinePlayers.map((p, i) => `
        <div class="player-tag" style="border-color: ${colors[i % colors.length]}">
            <span class="player-tag-color" style="background: ${colors[i % colors.length]}"></span>
            <span>${p.name}</span>
            <button class="player-remove" onclick="removeOfflinePlayer(${i})">&times;</button>
        </div>
    `).join('');
}

function updateOfflineStartBtn() {
    const btn = document.getElementById('offline-start-btn');
    btn.disabled = offlinePlayers.length === 0;
    btn.style.opacity = offlinePlayers.length === 0 ? '0.5' : '1';
}

function adjustTimerOffline(delta) {
    const input = document.getElementById('offline-timer-setting');
    let val = parseInt(input.value) + delta;
    input.value = Math.max(5, Math.min(60, val));
}

function adjustCountOffline(delta) {
    const input = document.getElementById('offline-question-count');
    let val = parseInt(input.value) + delta;
    input.value = Math.max(5, Math.min(50, val));
}

function startOfflineQuiz() {
    if (offlinePlayers.length === 0) return;
    isLiveMode = false;

    config.timerSeconds = parseInt(document.getElementById('offline-timer-setting').value);
    config.questionCount = parseInt(document.getElementById('offline-question-count').value);
    config.categories = [];
    document.querySelectorAll('#offline-categories .cat-btn.active').forEach(btn => {
        config.categories.push(btn.dataset.cat);
    });
    if (config.categories.length === 0) config.categories = ['custom'];

    offlinePlayers.forEach(p => { p.score = 0; p.correct = 0; p.wrong = 0; p.timeout = 0; });
    offlineCurrentPlayer = 0;

    let pool = [];
    config.categories.forEach(cat => {
        if (QUESTIONS[cat]) pool = pool.concat(QUESTIONS[cat].map(q => ({ ...q, category: cat })));
    });
    gameQuestions = shuffleArray(pool).slice(0, config.questionCount);
    currentQIndex = 0;

    showOfflineQuestion();
}

function showOfflineQuestion() {
    const q = gameQuestions[currentQIndex];
    switchScreen('quiz-screen');

    document.getElementById('question-number').textContent = `${currentQIndex + 1}/${gameQuestions.length}`;
    const catLabels = { team: 'Team', animals: 'Tiere', cities: 'Städte', celebrities: 'Promis', custom: 'Allgemein' };
    document.getElementById('category-badge').textContent = catLabels[q.category] || q.category;

    // Show current player in answer-count area
    const cp = offlinePlayers[offlineCurrentPlayer];
    document.getElementById('answer-count').textContent = cp.name + ' ist dran!';

    const imgContainer = document.getElementById('question-image-container');
    const img = document.getElementById('question-image');
    if (q.image) { img.src = q.image; imgContainer.style.display = 'block'; }
    else { imgContainer.style.display = 'none'; }

    document.getElementById('question-text').textContent = q.question;

    const container = document.getElementById('answers-container');
    container.innerHTML = '';
    const letters = ['A', 'B', 'C', 'D'];
    let answered = false;

    q.answers.forEach((answer, i) => {
        const btn = document.createElement('button');
        btn.className = 'answer-btn';
        btn.innerHTML = `<span class="answer-letter">${letters[i]}</span>${answer}`;
        btn.addEventListener('click', () => {
            if (answered) return;
            answered = true;
            stopTimer();

            const buttons = document.querySelectorAll('.answer-btn');
            buttons.forEach(b => b.classList.add('disabled'));
            const isCorrect = q.allCorrect || i === q.correct;

            if (q.allCorrect) {
                buttons.forEach(b => b.classList.add('correct'));
            } else {
                buttons[q.correct].classList.add('correct');
            }

            if (isCorrect) {
                const timeBonus = Math.ceil((timeLeft / config.timerSeconds) * 100);
                cp.score += 100 + timeBonus;
                cp.correct++;
                showFeedback('✅');
                spawnConfetti(15);
            } else {
                buttons[i].classList.add('wrong');
                cp.wrong++;
                showFeedback('❌');
            }
            renderScoreboard();

            setTimeout(() => {
                offlineCurrentPlayer = (offlineCurrentPlayer + 1) % offlinePlayers.length;
                currentQIndex++;
                if (currentQIndex >= gameQuestions.length) showOfflineResults();
                else showOfflineQuestion();
            }, 2000);
        });
        container.appendChild(btn);
    });

    renderScoreboard();

    startTimer(() => {
        if (answered) return;
        answered = true;
        const buttons = document.querySelectorAll('.answer-btn');
        buttons.forEach(b => b.classList.add('disabled'));
        if (q.allCorrect) buttons.forEach(b => b.classList.add('correct'));
        else buttons[q.correct].classList.add('correct');
        cp.timeout++;
        showFeedback('⏰');
        setTimeout(() => {
            offlineCurrentPlayer = (offlineCurrentPlayer + 1) % offlinePlayers.length;
            currentQIndex++;
            if (currentQIndex >= gameQuestions.length) showOfflineResults();
            else showOfflineQuestion();
        }, 2000);
    });
}

function showOfflineResults() {
    const sorted = [...offlinePlayers].sort((a, b) => b.score - a.score);
    const winner = sorted[0];

    document.getElementById('winner-name').textContent = winner.name;
    document.getElementById('winner-score').textContent = winner.score;

    const medals = ['🥇', '🥈', '🥉'];
    document.getElementById('ranking-list').innerHTML = sorted.map((p, i) => `
        <div class="ranking-entry ${i === 0 ? 'winner' : ''}" style="animation-delay: ${i * 0.15}s">
            <span class="ranking-medal">${medals[i] || (i + 1) + '.'}</span>
            <span class="ranking-name">${p.name}</span>
            <div class="ranking-details">
                <span class="ranking-score">${p.score} Punkte</span>
                <span class="ranking-stats">✅ ${p.correct}  ❌ ${p.wrong}  ⏰ ${p.timeout}</span>
            </div>
        </div>
    `).join('');

    switchScreen('result-screen');
    for (let i = 0; i < 5; i++) setTimeout(() => spawnConfetti(40), i * 400);
}

// ===== SKIP & ABORT =====

function skipQuestion() {
    stopTimer();

    if (isLiveMode) {
        roomRef.child('currentAnswers').off();

        // Push skip state so players see feedback
        const playerIds = Object.keys(livePlayers);
        let answerResults = {};
        playerIds.forEach(pid => {
            answerResults[pid] = { correct: false, timeout: true, points: 0, skipped: true };
        });

        const scoresObj = {};
        playerIds.forEach(pid => {
            scoresObj[pid] = {
                name: livePlayers[pid].name,
                score: livePlayers[pid].score,
                correct: livePlayers[pid].correct,
                wrong: livePlayers[pid].wrong,
                timeout: livePlayers[pid].timeout
            };
        });

        roomRef.update({
            state: 'reveal',
            correctAnswer: gameQuestions[currentQIndex].allCorrect ? -1 : gameQuestions[currentQIndex].correct,
            allCorrect: gameQuestions[currentQIndex].allCorrect || false,
            answerResults: answerResults,
            scores: scoresObj
        });

        liveAnswers = {};

        setTimeout(() => {
            currentQIndex++;
            if (currentQIndex >= gameQuestions.length) showLiveResults();
            else showLiveQuestion();
        }, 1500);
    } else {
        // Offline skip
        offlineCurrentPlayer = (offlineCurrentPlayer + 1) % offlinePlayers.length;
        currentQIndex++;
        if (currentQIndex >= gameQuestions.length) showOfflineResults();
        else showOfflineQuestion();
    }
}

function abortQuiz() {
    stopTimer();

    if (isLiveMode) {
        roomRef.child('currentAnswers').off();
        // Show results with current scores
        if (Object.keys(livePlayers).length > 0) {
            showLiveResults();
        } else {
            backToStart();
        }
    } else {
        if (offlinePlayers.length > 0 && offlinePlayers.some(p => p.score > 0 || p.correct > 0 || p.wrong > 0)) {
            showOfflineResults();
        } else {
            backToStart();
        }
    }
}

// ===== NAVIGATION =====

function backToStart() {
    if (roomRef) {
        roomRef.remove();
        roomRef.child('players').off();
        roomRef.child('currentAnswers').off();
        roomRef = null;
    }
    livePlayers = {};
    liveAnswers = {};
    offlinePlayers = [];
    offlineCurrentPlayer = 0;

    if (firebaseReady) switchScreen('start-screen');
    else switchScreen('setup-screen');
}

function switchScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
}

function adjustTimer(delta) {
    const input = document.getElementById('timer-setting');
    let val = parseInt(input.value) + delta;
    input.value = Math.max(5, Math.min(60, val));
}

function adjustCount(delta) {
    const input = document.getElementById('question-count');
    let val = parseInt(input.value) + delta;
    input.value = Math.max(5, Math.min(50, val));
}

function toggleCategory(btn) {
    btn.classList.toggle('active');
}

// ===== UTILITIES =====

function showFeedback(emoji) {
    const overlay = document.createElement('div');
    overlay.className = 'feedback-overlay';
    overlay.innerHTML = `<div class="feedback-text">${emoji}</div>`;
    document.body.appendChild(overlay);
    setTimeout(() => overlay.remove(), 1000);
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

function shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

// ===== KEYBOARD SUPPORT (offline mode) =====

document.addEventListener('keydown', (e) => {
    if (!document.getElementById('quiz-screen').classList.contains('active')) return;
    if (isLiveMode) return;

    const keyMap = { '1': 0, '2': 1, '3': 2, '4': 3, 'a': 0, 'b': 1, 'c': 2, 'd': 3 };
    const index = keyMap[e.key.toLowerCase()];
    if (index !== undefined) {
        const btns = document.querySelectorAll('.answer-btn');
        if (btns[index]) btns[index].click();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        if (document.getElementById('offline-start-screen').classList.contains('active') &&
            document.activeElement.id === 'offline-player-input') {
            addOfflinePlayer();
        }
    }
});

// ===== START =====
initFirebase();
