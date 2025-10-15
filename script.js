document.getElementById("quiz-btn").addEventListener("click", () => {
  document.getElementById("quiz").classList.toggle("hidden");
});

const answers = document.querySelectorAll(".answer");
const feedback = document.getElementById("feedback");

answers.forEach(button => {
  button.addEventListener("click", () => {
    if (button.dataset.correct === "true") {
      feedback.textContent = "✅ Correct! Always visit the official site directly.";
      feedback.style.color = "green";
    } else {
      feedback.textContent = "❌ Not quite. Phishing links can be dangerous!";
      feedback.style.color = "red";
    }
  });
});
