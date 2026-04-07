// ===== HOST / PRESENTER ENGINE =====

let db = null;
let roomRef = null;
let roomCode = '';
let isLiveMode = false;
let firebaseReady = false;

// Game state
let config = { timerSeconds: 10, questionCount: 10, categories: ['team', 'animals', 'cities', 'celebrities', 'custom', 'goodnews'], teamRatio: 50 };
let gameQuestions = [];
let currentQIndex = 0;
let timerInterval = null;
let timeLeft = 0;
let questionRevealed = false;  // prevents double-reveal
let livePlayers = {};    // { id: { name, score, correct, wrong, timeout, streak } }
let liveAnswers = {};    // answers for current question { playerId: { answer, timestamp } }

// Offline state
let offlinePlayers = [];
let offlineCurrentPlayer = 0;

// Sound control
let soundEnabled = true;

// Pause state
let isPaused = false;
let timerOnTimeout = null;

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
        loadConfig();
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
        livePlayers[snap.key] = { ...player, score: 0, correct: 0, wrong: 0, timeout: 0, streak: 0 };
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
    saveConfig();
    isLiveMode = true;
    config.timerSeconds = parseInt(document.getElementById('timer-setting').value);
    config.questionCount = parseInt(document.getElementById('question-count').value);
    config.teamRatio = parseInt(document.getElementById('team-ratio')?.value || 50);
    config.categories = [];
    document.querySelectorAll('#lobby-screen .cat-btn.active').forEach(btn => {
        config.categories.push(btn.dataset.cat);
    });
    if (config.categories.length === 0) config.categories = ['custom'];

    // Build questions
    gameQuestions = buildQuestionList(config.categories, config.questionCount, config.teamRatio);
    currentQIndex = 0;

    // Reset player scores
    Object.keys(livePlayers).forEach(id => {
        livePlayers[id].score = 0;
        livePlayers[id].correct = 0;
        livePlayers[id].wrong = 0;
        livePlayers[id].timeout = 0;
        livePlayers[id].streak = 0;
    });

    showLiveQuestion();
}

function showLiveQuestion() {
    stopTimer();
    questionRevealed = false;
    const q = gameQuestions[currentQIndex];
    liveAnswers = {};

    switchScreen('quiz-screen');

    // Update header
    document.getElementById('question-number').textContent = `${currentQIndex + 1}/${gameQuestions.length}`;
    const catLabels = { team: 'Team', animals: 'Tiere', cities: 'Städte', celebrities: 'Promis', custom: 'Allgemein', goodnews: 'Good News' };
    document.getElementById('category-badge').textContent = catLabels[q.category] || q.category;

    updateAnswerCount();

    // Image — hide first, then load to prevent mismatch
    const imgContainer = document.getElementById('question-image-container');
    const img = document.getElementById('question-image');
    if (q.image) {
        imgContainer.style.display = 'flex';
        img.style.opacity = '0';
        img.onload = () => { img.style.opacity = '1'; };
        img.src = q.image;
    } else {
        imgContainer.style.display = 'none';
        img.src = '';
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

    // Build absolute image URL so phones can load it
    let imageUrl = q.image || null;
    if (imageUrl && !imageUrl.startsWith('http')) {
        const baseUrl = window.location.href.replace(/\/[^\/]*$/, '/');
        imageUrl = baseUrl + encodeURI(imageUrl);
    }

    // Push question to Firebase (WITHOUT correct answer!)
    const questionData = {
        question: q.question,
        answers: q.answers,
        image: imageUrl,
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
    if (questionRevealed) return;
    questionRevealed = true;
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
    const playerIds = Object.keys(livePlayers);
    let answerResults = {};

    playerIds.forEach(pid => {
        const answer = liveAnswers[pid];
        if (!answer) {
            // Timeout
            livePlayers[pid].timeout++;
            livePlayers[pid].streak = 0;
            answerResults[pid] = { correct: false, timeout: true, points: 0, streak: 0 };
        } else {
            const isCorrect = q.allCorrect || answer.answer === q.correct;
            if (isCorrect) {
                // Time bonus: faster = more points
                const timeTaken = Math.min(answer.timeTaken || config.timerSeconds, config.timerSeconds);
                const timeBonus = Math.ceil(((config.timerSeconds - timeTaken) / config.timerSeconds) * 100);
                let points = 100 + timeBonus;

                // Streak bonus
                livePlayers[pid].streak++;
                let streakBonus = 0;
                if (livePlayers[pid].streak >= 3) {
                    streakBonus = livePlayers[pid].streak * 25;
                    points += streakBonus;
                }

                livePlayers[pid].score += points;
                livePlayers[pid].correct++;
                answerResults[pid] = { correct: true, timeout: false, points, streak: livePlayers[pid].streak, streakBonus };
            } else {
                livePlayers[pid].wrong++;
                livePlayers[pid].streak = 0;
                answerResults[pid] = { correct: false, timeout: false, points: 0, streak: 0 };
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
            timeout: livePlayers[pid].timeout,
            streak: livePlayers[pid].streak
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
            timeout: livePlayers[pid].timeout,
            streak: livePlayers[pid].streak
        };
    });

    roomRef.update({
        state: 'results',
        scores: scoresObj
    });

    // Show results on host screen
    const sorted = Object.entries(livePlayers).sort((a, b) => b[1].score - a[1].score);
    const winner = sorted[0][1];

    // Check if all have 0 score
    if (winner.score === 0) {
        document.querySelector('.winner-title').textContent = 'Nächstes Mal wird\'s besser!';
        document.getElementById('winner-name').textContent = 'Keiner 😅';
        document.querySelector('.trophy-animation').textContent = '🤷';
    } else {
        document.querySelector('.winner-title').textContent = 'Gewinner';
        document.getElementById('winner-name').textContent = winner.name;
        document.querySelector('.trophy-animation').textContent = '🏆';
    }
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

// ===== TIMER SOUNDS =====

let audioCtx = null;
let lastTickSecond = -1;
let activeOscillators = [];

function getAudioCtx() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') audioCtx.resume();
    return audioCtx;
}

function stopAllSounds() {
    activeOscillators.forEach(osc => {
        try { osc.stop(); } catch (e) {}
    });
    activeOscillators = [];
}

function toggleSound() {
    soundEnabled = !soundEnabled;
    const btn = document.getElementById('sound-toggle');
    if (btn) btn.textContent = soundEnabled ? '🔊' : '🔇';
    const lobbyBtn = document.getElementById('sound-toggle-lobby');
    if (lobbyBtn) lobbyBtn.textContent = soundEnabled ? '🔊' : '🔇';
}

function playTick(urgent) {
    if (!soundEnabled || questionRevealed) return;
    try {
        const ctx = getAudioCtx();
        const t = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'sine';
        osc.frequency.value = urgent ? 880 : 660;
        gain.gain.value = urgent ? 0.25 : 0.12;
        const dur = urgent ? 0.08 : 0.06;
        gain.gain.exponentialRampToValueAtTime(0.001, t + dur);
        osc.start(t);
        osc.stop(t + dur);
        activeOscillators.push(osc);
        osc.onended = () => {
            activeOscillators = activeOscillators.filter(o => o !== osc);
        };
    } catch (e) {}
}

function playTimeUp() {
    if (!soundEnabled) return;
    try {
        const ctx = getAudioCtx();
        const t = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'square';
        osc.frequency.setValueAtTime(440, t);
        osc.frequency.setValueAtTime(330, t + 0.12);
        gain.gain.value = 0.2;
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
        osc.start(t);
        osc.stop(t + 0.3);
        activeOscillators.push(osc);
        osc.onended = () => {
            activeOscillators = activeOscillators.filter(o => o !== osc);
        };
    } catch (e) {}
}

// ===== TIMER =====

function togglePause() {
    if (isPaused) {
        resumeTimer();
    } else {
        pauseTimer();
    }
}

function pauseTimer() {
    if (!timerInterval || isPaused) return;
    isPaused = true;
    clearInterval(timerInterval);
    timerInterval = null;
    document.getElementById('pause-overlay').style.display = 'flex';
    document.getElementById('pause-btn').textContent = '▶️ Weiter';
}

function resumeTimer() {
    if (!isPaused) return;
    isPaused = false;
    document.getElementById('pause-overlay').style.display = 'none';
    document.getElementById('pause-btn').textContent = '⏸️ Pause';
    const remaining = timeLeft * 1000;
    const timerBar = document.getElementById('timer-bar');
    const timerDisplay = document.getElementById('timer-display');
    const totalMs = config.timerSeconds * 1000;
    const startTime = Date.now() - (totalMs - remaining);

    timerInterval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const rem = Math.max(0, totalMs - elapsed);
        const fraction = rem / totalMs;

        timeLeft = rem / 1000;
        timerBar.style.width = (fraction * 100) + '%';

        const currentSecond = Math.ceil(timeLeft);
        if (currentSecond !== lastTickSecond) {
            timerDisplay.textContent = currentSecond;
            if (currentSecond > 0 && currentSecond < lastTickSecond) {
                if (fraction <= 0.25) playTick(true);
                else if (fraction <= 0.5) playTick(false);
            }
            lastTickSecond = currentSecond;
        }

        if (fraction <= 0.25) {
            timerBar.className = 'timer-bar danger';
            timerDisplay.className = 'timer-display danger';
        } else if (fraction <= 0.5) {
            timerBar.className = 'timer-bar warning';
            timerDisplay.className = 'timer-display warning';
        }

        if (rem <= 0) {
            stopTimer();
            playTimeUp();
            if (timerOnTimeout) timerOnTimeout();
        }
    }, 100);
}

function startTimer(onTimeout) {
    timerOnTimeout = onTimeout;
    isPaused = false;
    timeLeft = config.timerSeconds;
    lastTickSecond = config.timerSeconds;
    const timerBar = document.getElementById('timer-bar');
    const timerDisplay = document.getElementById('timer-display');

    timerBar.style.width = '100%';
    timerBar.className = 'timer-bar';
    timerDisplay.className = 'timer-display';
    timerDisplay.textContent = timeLeft;
    document.getElementById('pause-overlay').style.display = 'none';
    document.getElementById('pause-btn').textContent = '⏸️ Pause';

    const startTime = Date.now();
    const totalMs = config.timerSeconds * 1000;

    timerInterval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, totalMs - elapsed);
        const fraction = remaining / totalMs;

        timeLeft = remaining / 1000;
        timerBar.style.width = (fraction * 100) + '%';

        const currentSecond = Math.ceil(timeLeft);
        if (currentSecond !== lastTickSecond) {
            timerDisplay.textContent = currentSecond;
            // Tick sound only on second change, only in last half
            if (currentSecond > 0 && currentSecond < lastTickSecond) {
                if (fraction <= 0.25) playTick(true);
                else if (fraction <= 0.5) playTick(false);
            }
            lastTickSecond = currentSecond;
        }

        if (fraction <= 0.25) {
            timerBar.className = 'timer-bar danger';
            timerDisplay.className = 'timer-display danger';
        } else if (fraction <= 0.5) {
            timerBar.className = 'timer-bar warning';
            timerDisplay.className = 'timer-display warning';
        }

        if (remaining <= 0) {
            stopTimer();
            playTimeUp();
            onTimeout();
        }
    }, 100);
}

function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    stopAllSounds();
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

    offlinePlayers.push({ name, score: 0, correct: 0, wrong: 0, timeout: 0, streak: 0 });
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
    saveConfig();
    if (offlinePlayers.length === 0) return;
    isLiveMode = false;

    config.timerSeconds = parseInt(document.getElementById('offline-timer-setting').value);
    config.questionCount = parseInt(document.getElementById('offline-question-count').value);
    config.teamRatio = parseInt(document.getElementById('offline-team-ratio')?.value || 50);
    config.categories = [];
    document.querySelectorAll('#offline-categories .cat-btn.active').forEach(btn => {
        config.categories.push(btn.dataset.cat);
    });
    if (config.categories.length === 0) config.categories = ['custom'];

    offlinePlayers.forEach(p => { p.score = 0; p.correct = 0; p.wrong = 0; p.timeout = 0; p.streak = 0; });
    offlineCurrentPlayer = 0;

    gameQuestions = buildQuestionList(config.categories, config.questionCount, config.teamRatio);
    currentQIndex = 0;

    showOfflineQuestion();
}

function showOfflineQuestion() {
    stopTimer();
    questionRevealed = false;
    const q = gameQuestions[currentQIndex];
    switchScreen('quiz-screen');

    document.getElementById('question-number').textContent = `${currentQIndex + 1}/${gameQuestions.length}`;
    const catLabels = { team: 'Team', animals: 'Tiere', cities: 'Städte', celebrities: 'Promis', custom: 'Allgemein', goodnews: 'Good News' };
    document.getElementById('category-badge').textContent = catLabels[q.category] || q.category;

    // Show current player in answer-count area
    const cp = offlinePlayers[offlineCurrentPlayer];
    document.getElementById('answer-count').textContent = cp.name + ' ist dran!';

    const imgContainer = document.getElementById('question-image-container');
    const img = document.getElementById('question-image');
    if (q.image) {
        imgContainer.style.display = 'flex';
        img.style.opacity = '0';
        img.onload = () => { img.style.opacity = '1'; };
        img.src = q.image;
    } else {
        imgContainer.style.display = 'none';
        img.src = '';
    }

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
                let points = 100 + timeBonus;

                // Streak bonus
                cp.streak++;
                if (cp.streak >= 3) {
                    points += cp.streak * 25;
                }

                cp.score += points;
                cp.correct++;
                let feedbackText = '✅';
                if (cp.streak >= 3) feedbackText = `🔥 Streak x${cp.streak}!`;
                showFeedback(feedbackText);
                spawnConfetti(15);
            } else {
                buttons[i].classList.add('wrong');
                cp.wrong++;
                cp.streak = 0;
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
        cp.streak = 0;
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

    // Check if all have 0 score
    if (winner.score === 0) {
        document.querySelector('.winner-title').textContent = 'Nächstes Mal wird\'s besser!';
        document.getElementById('winner-name').textContent = 'Keiner 😅';
        document.querySelector('.trophy-animation').textContent = '🤷';
    } else {
        document.querySelector('.winner-title').textContent = 'Gewinner';
        document.getElementById('winner-name').textContent = winner.name;
        document.querySelector('.trophy-animation').textContent = '🏆';
    }
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

function backToStartFromOffline() {
    if (firebaseReady) switchScreen('start-screen');
    else switchScreen('setup-screen');
}

function playAgain() {
    if (isLiveMode) {
        // Reset scores, keep players
        Object.keys(livePlayers).forEach(id => {
            livePlayers[id].score = 0;
            livePlayers[id].correct = 0;
            livePlayers[id].wrong = 0;
            livePlayers[id].timeout = 0;
            livePlayers[id].streak = 0;
        });
        // Go back to lobby
        roomRef.update({ state: 'lobby' });
        showLobby();
        renderLobbyPlayers();
        switchScreen('lobby-screen');
    } else {
        // Offline: keep players, go back to offline setup
        offlinePlayers.forEach(p => { p.score = 0; p.correct = 0; p.wrong = 0; p.timeout = 0; p.streak = 0; });
        offlineCurrentPlayer = 0;
        switchScreen('offline-start-screen');
        renderOfflinePlayerList();
        updateOfflineStartBtn();
    }
}

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
    updateTeamRatioVisibility(btn.closest('.category-toggles'));
}

function updateTeamRatioVisibility(categoryContainer) {
    const isTeamActive = categoryContainer.querySelector('[data-cat="team"]').classList.contains('active');
    const parentScreen = categoryContainer.closest('#lobby-screen') ? 'lobby' : 'offline';
    const ratioSetting = parentScreen === 'lobby'
        ? document.getElementById('team-ratio-setting')
        : document.getElementById('offline-team-ratio-setting');

    if (ratioSetting) {
        ratioSetting.style.display = isTeamActive ? 'block' : 'none';
    }
}

// ===== QUESTION BUILDER =====

function buildQuestionList(categories, count, teamRatio) {
    if (teamRatio === undefined) teamRatio = 50;

    // Split into team questions and other questions
    let teamPool = [];
    let otherPool = [];

    categories.forEach(cat => {
        if (!QUESTIONS[cat]) return;
        const questions = QUESTIONS[cat].map(q => ({ ...q, category: cat }));
        if (cat === 'team') {
            teamPool = teamPool.concat(questions);
        } else {
            otherPool = otherPool.concat(questions);
        }
    });

    // Deduplicate by question text
    const dedup = (arr) => {
        const seen = new Set();
        return arr.filter(q => {
            const key = q.question + '|' + (q.image || '');
            if (seen.has(key)) return false;
            seen.add(key);
            return true;
        });
    };
    teamPool = dedup(shuffleArray(teamPool));
    otherPool = dedup(shuffleArray(otherPool));

    // If no team questions selected, just shuffle everything
    if (teamPool.length === 0) {
        return shuffleArray(otherPool).slice(0, count);
    }

    // Calculate how many team questions to include based on ratio
    const teamCount = Math.round((count * teamRatio) / 100);
    const otherCount = count - teamCount;

    const result = [];
    let tIdx = 0;
    let oIdx = 0;

    // Interleave with ratio consideration
    for (let i = 0; i < count; i++) {
        const teamQuestionsNeeded = teamCount - Math.floor(result.filter(q => q.category === 'team').length);
        const otherQuestionsNeeded = otherCount - Math.floor(result.filter(q => q.category !== 'team').length);

        if (tIdx < teamPool.length && (teamQuestionsNeeded > 0) && (i % 2 === 0 || oIdx >= otherPool.length || otherQuestionsNeeded <= 0)) {
            result.push(teamPool[tIdx++]);
        } else if (oIdx < otherPool.length && otherQuestionsNeeded > 0) {
            result.push(otherPool[oIdx++]);
        } else if (tIdx < teamPool.length && teamQuestionsNeeded > 0) {
            result.push(teamPool[tIdx++]);
        } else {
            break;
        }
    }

    return result;
}

// ===== UTILITIES =====

function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {});
    } else {
        document.exitFullscreen();
    }
}

function saveConfig() {
    const cfg = {
        timerSeconds: config.timerSeconds,
        questionCount: config.questionCount,
        categories: config.categories,
        teamRatio: config.teamRatio || 50
    };
    try { localStorage.setItem('quizConfig', JSON.stringify(cfg)); } catch(e) {}
}

function loadConfig() {
    try {
        const saved = JSON.parse(localStorage.getItem('quizConfig'));
        if (saved) {
            // Apply to offline settings
            const offlineTimer = document.getElementById('offline-timer-setting');
            const offlineCount = document.getElementById('offline-question-count');
            const offlineRatio = document.getElementById('offline-team-ratio');
            if (offlineTimer) offlineTimer.value = saved.timerSeconds || 10;
            if (offlineCount) offlineCount.value = saved.questionCount || 10;
            if (offlineRatio) offlineRatio.value = saved.teamRatio || 50;

            // Apply to lobby settings
            const lobbyTimer = document.getElementById('timer-setting');
            const lobbyCount = document.getElementById('question-count');
            const lobbyRatio = document.getElementById('team-ratio');
            if (lobbyTimer) lobbyTimer.value = saved.timerSeconds || 10;
            if (lobbyCount) lobbyCount.value = saved.questionCount || 10;
            if (lobbyRatio) lobbyRatio.value = saved.teamRatio || 50;

            // Apply categories
            if (saved.categories) {
                document.querySelectorAll('.cat-btn').forEach(btn => {
                    if (saved.categories.includes(btn.dataset.cat)) {
                        btn.classList.add('active');
                    } else {
                        btn.classList.remove('active');
                    }
                });
                // Update team ratio visibility after categories loaded
                const lobbyCategories = document.querySelector('#lobby-screen .category-toggles');
                const offlineCategories = document.querySelector('#offline-categories');
                if (lobbyCategories) updateTeamRatioVisibility(lobbyCategories);
                if (offlineCategories) updateTeamRatioVisibility(offlineCategories);
            }
        }
    } catch(e) {}
}

function showFeedback(emoji) {
    const overlay = document.createElement('div');
    overlay.className = 'feedback-overlay';
    overlay.innerHTML = `<div class="feedback-text">${emoji}</div>`;
    document.body.appendChild(overlay);
    setTimeout(() => overlay.remove(), 1500);
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

// ===== STARTUP =====
document.addEventListener('DOMContentLoaded', () => {
    const lobbyCategories = document.querySelector('#lobby-screen .category-toggles');
    const offlineCategories = document.querySelector('#offline-categories');
    if (lobbyCategories) updateTeamRatioVisibility(lobbyCategories);
    if (offlineCategories) updateTeamRatioVisibility(offlineCategories);
});

initFirebase();
