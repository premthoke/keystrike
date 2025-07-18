const easyTexts = [
  "The sun rises in the east.",
  "Typing is a useful skill.",
  "Practice makes perfect.",
  "Dogs are loyal animals.",
  "Books are great friends.",
  "Apples are red and sweet.",
  "Coding can be fun.",
  "Rainy days feel cozy.",
  "Music makes life better.",
  "Learning never ends."
];

const mediumTexts = [
  "Typing speed is measured in words per minute, also known as WPM.",
  "The quick brown fox jumps over the lazy dog to test your typing speed accurately.",
  "Keyboarding can improve productivity and help in various digital tasks you encounter daily.",
  "A proper posture helps you type faster and prevents hand fatigue.",
  "Consistent typing practice will boost your speed and accuracy over time.",
  "Typing games are a fun way to develop your keyboarding skills.",
  "Most employers expect good typing skills for computer-based roles.",
  "Backspace helps you correct typing mistakes quickly and efficiently.",
  "Accuracy is more important than speed when you're starting to learn.",
  "Focus on rhythm and flow rather than rushing through the text."
];

const hardTexts = [
  "Typing efficiently is not just about speed, but also accuracy and consistency over long periods of time.",
  "In today’s fast-paced digital age, typing has become an essential skill for communication, coding, writing, and even learning.",
  "Mastering the art of typing can drastically reduce time spent on tasks and increase your overall effectiveness and professional appeal.",
  "Touch typing enables users to keep their eyes on the screen and hands on the keyboard, which improves speed and reduces errors.",
  "The difference between an average typist and an expert lies in their muscle memory and consistency of finger placement.",
  "While typing, maintaining a steady rhythm helps improve both your speed and your focus on the content.",
  "Ergonomic keyboards and wrist support pads are often recommended for people who type for long hours daily.",
  "Typing with proper technique helps prevent repetitive strain injuries and carpal tunnel syndrome in the long run.",
  "Experts recommend using all ten fingers while typing and keeping your wrists elevated for the best performance.",
  "Whether you're writing code, composing an email, or preparing a document, efficient typing makes everything faster and smoother."
];

const quoteDisplay = document.getElementById("quoteDisplay");
const quoteInput = document.getElementById("quoteInput");
const timer = document.getElementById("timer");
const mistakes = document.getElementById("mistakes");
const wpm = document.getElementById("wpm");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const difficultySelect = document.getElementById("difficulty");
const customTextCheck = document.getElementById("customTextCheck");
const quoteMessage = document.getElementById("quoteMessage");

let startTime, interval, totalMistakes = 0, currentText = "";

function getRandomText() {
  const level = difficultySelect.value;
  if (level === "easy") return easyTexts[Math.floor(Math.random() * easyTexts.length)];
  if (level === "medium") return mediumTexts[Math.floor(Math.random() * mediumTexts.length)];
  if (level === "hard") return hardTexts[Math.floor(Math.random() * hardTexts.length)];
}

function startGame() {
  quoteInput.value = "";
  totalMistakes = 0;
  mistakes.textContent = 0;
  wpm.textContent = 0;
  quoteMessage.textContent = "";
  timer.textContent = "0s";

  currentText = customTextCheck.checked && quoteDisplay.textContent.trim()
    ? quoteDisplay.textContent.trim()
    : getRandomText();

  quoteDisplay.textContent = currentText;
  quoteInput.disabled = false;
  quoteInput.focus();
  startTime = new Date();

  clearInterval(interval);
  interval = setInterval(updateTimer, 1000);
}

function updateTimer() {
  const elapsed = Math.floor((new Date() - startTime) / 1000);
  timer.textContent = `${elapsed}s`;

  const wordsTyped = quoteInput.value.trim().split(/\s+/).length;
  const wpmCalc = Math.round((wordsTyped / elapsed) * 60);
  wpm.textContent = isNaN(wpmCalc) ? 0 : wpmCalc;
}

quoteInput.addEventListener("input", () => {
  const typed = quoteInput.value;
  let errors = 0;

  for (let i = 0; i < typed.length; i++) {
    if (typed[i] !== currentText[i]) errors++;
  }

  totalMistakes = errors;
  mistakes.textContent = totalMistakes;

  if (typed === currentText) endGame();
});

function endGame() {
  clearInterval(interval);
  quoteInput.disabled = true;

  const timeTaken = (new Date() - startTime) / 1000;
  const words = currentText.trim().split(/\s+/).length;
  const finalWPM = Math.round((words / timeTaken) * 60);
  wpm.textContent = finalWPM;

  renderChart(finalWPM, totalMistakes);
  quoteMessage.textContent = finalWPM > 40
    ? "🔥 You're lightning fast!"
    : finalWPM > 20
    ? "⚡ Great job! Keep practicing."
    : "💡 Practice daily and you'll get faster!";
}

function renderChart(wpm, errors) {
  const ctx = document.getElementById("resultChart").getContext("2d");
  new Chart(ctx, {
    type: "pie",
    data: {
      labels: ["Speed (WPM)", "Mistakes"],
      datasets: [{
        data: [wpm, errors],
        backgroundColor: ["cyan", "red"],
      }],
    },
  });
}

startBtn.addEventListener("click", startGame);
stopBtn.addEventListener("click", endGame);
