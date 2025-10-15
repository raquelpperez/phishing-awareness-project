// Show/hide quiz when button is clicked
document.getElementById("quiz-btn").addEventListener("click", () => {
  const quiz = document.getElementById("quiz-container");
  quiz.classList.toggle("hidden");
});

// Handle quiz answers
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
