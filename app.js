```javascript
// ==========================================
// MOOD DATA
// ==========================================

const moods = {

    happy: {
        emoji: "😄",
        title: "You're feeling Happy!",
        quote: "Keep that beautiful smile going! ✨",
        activity: "Take a photo, listen to your favorite song or share your happiness.",
        music: "Upbeat & energetic music",
        background: "linear-gradient(135deg, #f6d365, #fda085)"
    },

    sad: {
        emoji: "😔",
        title: "It's okay to feel Sad ❤️",
        quote: "You don't have to be okay every day.",
        activity: "Listen to calming music or take a peaceful walk.",
        music: "Soft & relaxing music",
        background: "linear-gradient(135deg, #667eea, #89f7fe)"
    },

    angry: {
        emoji: "😡",
        title: "Take a Breath 😮‍💨",
        quote: "You don't have to react immediately.",
        activity: "Take 5 deep breaths and step away for a moment.",
        music: "Calm instrumental music",
        background: "linear-gradient(135deg, #ff758c, #ff7eb3)"
    },

    tired: {
        emoji: "😴",
        title: "You Need Some Rest",
        quote: "Rest is not laziness. Your mind deserves a break. 🌙",
        activity: "Drink some water and take a 15-minute break.",
        music: "Lo-fi & ambient music",
        background: "linear-gradient(135deg, #4facfe, #00f2fe)"
    },

    excited: {
        emoji: "🤩",
        title: "You're Excited! 🚀",
        quote: "Use that energy to create something amazing!",
        activity: "Start something you've been wanting to build.",
        music: "High-energy music",
        background: "linear-gradient(135deg, #f093fb, #f5576c)"
    },

    stressed: {
        emoji: "😰",
        title: "Slow Down 🧘",
        quote: "One thing at a time.",
        activity: "Close your eyes and focus on your breathing.",
        music: "Meditation & nature sounds",
        background: "linear-gradient(135deg, #a18cd1, #fbc2eb)"
    }

};


// ==========================================
// ELEMENTS
// ==========================================

const moodButtons = document.querySelectorAll(".mood");

const result = document.getElementById("result");

const bigEmoji = document.getElementById("bigEmoji");

const moodTitle = document.getElementById("moodTitle");

const quote = document.getElementById("quote");

const activity = document.getElementById("activity");

const music = document.getElementById("music");

const historyContainer = document.getElementById("history");

const streakElement = document.getElementById("streak");

let selectedMood = null;


// ==========================================
// DATE
// ==========================================

function showDate() {

    const dateElement = document.getElementById("date");

    const today = new Date();

    dateElement.textContent =
        today.toLocaleDateString("en-IN", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric"
        });
}

showDate();


// ==========================================
// SELECT MOOD
// ==========================================

moodButtons.forEach(button => {

    button.addEventListener("click", () => {

        selectedMood = button.dataset.mood;

        const mood = moods[selectedMood];


        bigEmoji.textContent = mood.emoji;

        moodTitle.textContent = mood.title;

        quote.textContent = mood.quote;

        activity.textContent = mood.activity;

        music.textContent = mood.music;


        document.body.style.background = mood.background;


        result.classList.remove("hidden");


        saveMood(selectedMood);

        updateHistory();

        updateStreak();

        createGame();

    });

});


// ==========================================
// SAVE MOOD
// ==========================================

function saveMood(mood) {

    let history =
        JSON.parse(localStorage.getItem("moodHistory")) || [];


    const today = new Date().toLocaleDateString("en-IN");


    history.unshift({
        mood: mood,
        date: today
    });


    // Keep only latest 7 entries

    history = history.slice(0, 7);


    localStorage.setItem(
        "moodHistory",
        JSON.stringify(history)
    );

}


// ==========================================
// DISPLAY HISTORY
// ==========================================

function updateHistory() {

    const history =
        JSON.parse(localStorage.getItem("moodHistory")) || [];


    if (history.length === 0) {

        historyContainer.innerHTML =
            `<p class="empty">No mood history yet.</p>`;

        return;
    }


    historyContainer.innerHTML = "";


    history.forEach(item => {

        const mood = moods[item.mood];


        const div = document.createElement("div");

        div.className = "history-item";


        div.innerHTML = `

            <div>

                <span class="history-mood">
                    ${mood.emoji}
                </span>

                <strong>
                    ${mood.title}
                </strong>

            </div>

            <small>
                ${item.date}
            </small>

        `;


        historyContainer.appendChild(div);

    });

}


updateHistory();


// ==========================================
// STREAK
// ==========================================

function updateStreak() {

    const history =
        JSON.parse(localStorage.getItem("moodHistory")) || [];


    const uniqueDates =
        [...new Set(history.map(item => item.date))];


    streakElement.textContent =
        `${uniqueDates.length} Day${uniqueDates.length !== 1 ? "s" : ""}`;

}


updateStreak();


// ==========================================
// CLEAR HISTORY
// ==========================================

document
    .getElementById("clearHistory")
    .addEventListener("click", () => {

        localStorage.removeItem("moodHistory");

        updateHistory();

        updateStreak();

    });


// ==========================================
// JOURNAL
// ==========================================

const journal = document.getElementById("journal");


// Load saved journal

journal.value =
    localStorage.getItem("dailyJournal") || "";


document
    .getElementById("saveJournal")
    .addEventListener("click", () => {

        localStorage.setItem(
            "dailyJournal",
            journal.value
        );


        document.getElementById("journalMessage")
            .textContent =
            "✓ Journal saved successfully!";

    });


// ==========================================
// DARK MODE
// ==========================================

const themeBtn =
    document.getElementById("themeBtn");


themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");


    if (document.body.classList.contains("dark")) {

        themeBtn.textContent = "☀️";

        localStorage.setItem("theme", "dark");

    } else {

        themeBtn.textContent = "🌙";

        localStorage.setItem("theme", "light");

    }

});


// Load theme

if (localStorage.getItem("theme") === "dark") {

    document.body.classList.add("dark");

    themeBtn.textContent = "☀️";

}


// ==========================================
// BREATHING EXERCISE
// ==========================================

const breathingCircle =
    document.getElementById("breathingCircle");

const breathingText =
    document.getElementById("breathingText");

const breathingBtn =
    document.getElementById("breathingBtn");


let breathingRunning = false;


breathingBtn.addEventListener("click", () => {

    if (breathingRunning) return;

    breathingRunning = true;

    breathingBtn.textContent = "Breathing...";


    let count = 0;


    const cycle = setInterval(() => {

        if (count >= 6) {

            clearInterval(cycle);

            breathingRunning = false;

            breathingBtn.textContent =
                "Start Breathing";

            breathingText.textContent =
                "Done ✨";

            return;
        }


        breathingCircle.classList.toggle("breathe");


        if (breathingCircle.classList.contains("breathe")) {

            breathingText.textContent =
                "Breathe In";

        } else {

            breathingText.textContent =
                "Breathe Out";

        }


        count++;

    }, 4000);

});


// ==========================================
// MINI GAME
// ==========================================

const gameOptions =
    document.querySelectorAll(".game-options button");

const gameMessage =
    document.getElementById("gameMessage");

const newGame =
    document.getElementById("newGame");


let correctEmoji = "😄";


function createGame() {

    if (!selectedMood) return;


    correctEmoji =
        moods[selectedMood].emoji;


    gameMessage.textContent =
        `Find ${correctEmoji}!`;

}


gameOptions.forEach(button => {

    button.addEventListener("click", () => {

        if (!selectedMood) {

            gameMessage.textContent =
                "First select your mood above.";

            return;
        }


        if (button.textContent === correctEmoji) {

            gameMessage.textContent =
                "🎉 Correct! Great job!";

        } else {

            gameMessage.textContent =
                "❌ Not this one. Try again!";

        }

    });

});


newGame.addEventListener("click", createGame);


// Start default game

createGame();
```
