// ===== QUIZ ENGINE =====

let config = {
    timerSeconds: 10,
    questionCount: 10,
    categories: ['animals', 'cities', 'celebrities', 'custom']
};

let state = {
    questions: [],
    currentIndex: 0,
    score: 0,
    correct: 0,
    wrong: 0,
    timeout: 0,
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

// ===== QUIZ START =====

function startQuiz() {
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
    state.score = 0;
    state.correct = 0;
    state.wrong = 0;
    state.timeout = 0;

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
    document.getElementById('score').textContent = state.score;

    const categoryLabels = {
        animals: '🐾 Tiere',
        cities: '🏙️ Städte',
        celebrities: '⭐ Promis',
        custom: '🎲 Allgemein'
    };
    document.getElementById('category-badge').textContent = categoryLabels[q.category] || q.category;

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

    // Start timer
    startTimer();
}

// ===== ANSWER HANDLING =====

function selectAnswer(index) {
    if (state.answered) return;
    state.answered = true;
    stopTimer();

    const q = state.questions[state.currentIndex];
    const buttons = document.querySelectorAll('.answer-btn');
    const isCorrect = index === q.correct;

    // Disable all buttons
    buttons.forEach(btn => btn.classList.add('disabled'));

    // Mark correct answer
    buttons[q.correct].classList.add('correct');

    if (isCorrect) {
        state.score += calculatePoints();
        state.correct++;
        showFeedback('✅');
        spawnConfetti(15);
    } else {
        buttons[index].classList.add('wrong');
        state.wrong++;
        showFeedback('❌');
    }

    // Next question after delay
    setTimeout(() => nextQuestion(), 1800);
}

function timeoutAnswer() {
    if (state.answered) return;
    state.answered = true;

    const q = state.questions[state.currentIndex];
    const buttons = document.querySelectorAll('.answer-btn');

    buttons.forEach(btn => btn.classList.add('disabled'));
    buttons[q.correct].classList.add('correct');

    state.timeout++;
    showFeedback('⏰');

    setTimeout(() => nextQuestion(), 1800);
}

function calculatePoints() {
    // More points for faster answers
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

        // Color changes
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

    const total = state.questions.length;
    const percent = Math.round((state.correct / total) * 100);

    document.getElementById('final-score').textContent = state.score;
    document.getElementById('total-questions').textContent = total;
    document.getElementById('stat-correct').textContent = state.correct;
    document.getElementById('stat-wrong').textContent = state.wrong;
    document.getElementById('stat-timeout').textContent = state.timeout;

    // Result message & emoji
    let emoji, title, message;
    if (percent >= 90) {
        emoji = '🏆'; title = 'Unglaublich!'; message = 'Du bist ein Quiz-Champion!';
    } else if (percent >= 70) {
        emoji = '🎉'; title = 'Super gemacht!'; message = 'Sehr beeindruckend!';
    } else if (percent >= 50) {
        emoji = '😊'; title = 'Gut gemacht!'; message = 'Da geht noch mehr!';
    } else if (percent >= 30) {
        emoji = '💪'; title = 'Nicht schlecht!'; message = 'Übung macht den Meister!';
    } else {
        emoji = '🤔'; title = 'Nächstes Mal!'; message = 'Beim nächsten Mal wird\'s besser!';
    }

    document.getElementById('result-emoji').textContent = emoji;
    document.getElementById('result-title').textContent = title;
    document.getElementById('result-message').textContent = message;

    // Animate result bar
    setTimeout(() => {
        document.getElementById('result-bar').style.width = percent + '%';
    }, 300);

    // Confetti for good results
    if (percent >= 50) {
        for (let i = 0; i < 3; i++) {
            setTimeout(() => spawnConfetti(30), i * 500);
        }
    }
}

function restartQuiz() {
    document.getElementById('result-bar').style.width = '0%';
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
    if (!document.getElementById('quiz-screen').classList.contains('active')) return;
    if (state.answered) return;

    const keyMap = { '1': 0, '2': 1, '3': 2, '4': 3, 'a': 0, 'b': 1, 'c': 2, 'd': 3 };
    const index = keyMap[e.key.toLowerCase()];
    if (index !== undefined) {
        selectAnswer(index);
    }
});
