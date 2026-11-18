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

/* Pink Confetti Celebration */

const checklist = document.querySelector(".password-checklist");

if (checklist) {
  const checkboxes = checklist.querySelectorAll('input[type="checkbox"]');

  const message = document.createElement("p");
  message.textContent = "✨ Great job! You're building safer online habits!";
  message.style.color = "#AD456F";
  message.style.fontWeight = "bold";
  message.style.marginTop = "15px";
  message.hidden = true;

  checklist.after(message);

  const canvas = document.createElement("canvas");
  canvas.style.position = "fixed";
  canvas.style.inset = "0";
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  canvas.style.pointerEvents = "none";
  canvas.style.zIndex = "9999";
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  const colors = [
    "#AD456F",
    "#922F58",
    "#D78CAC",
    "#F7B2D0",
    "#FCE7F3",
    "#FFFFFF"
  ];

  let particles = [];
  let animationId = null;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  function launchConfetti() {
    const rect = checklist.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    for (let i = 0; i < 120; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 3 + Math.random() * 5;

      particles.push({
        x: centerX,
        y: centerY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 3,
        gravity: 0.12 + Math.random() * 0.08,
        rotation: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 0.2,
        size: 3 + Math.random() * 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        sparkle: Math.random() < 0.18,
        opacity: 1,
        life: 0
      });
    }

    if (animationId === null) {
      animateConfetti();
    }
  }

  function animateConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles = particles.filter(p => p.life < 150);

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.vx *= 0.99;
      p.rotation += p.spin;
      p.life++;

      p.opacity = Math.min(1, (150 - p.life) / 35);

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = p.color;

      if (p.sparkle) {
        ctx.beginPath();

        for (let i = 0; i < 8; i++) {
          const angle = i * Math.PI / 4;
          const radius = i % 2 === 0 ? p.size * 1.5 : p.size * 0.35;

          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;

          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        ctx.closePath();
        ctx.fill();
      } else {
        ctx.fillRect(
          -p.size / 2,
          -p.size / 2,
          p.size,
          p.size * 1.5
        );
      }

      ctx.restore();
    });

    if (particles.length > 0) {
      animationId = requestAnimationFrame(animateConfetti);
    } else {
      animationId = null;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  checkboxes.forEach(box => {
    box.addEventListener("change", () => {
      const allChecked = [...checkboxes].every(item => item.checked);

      const wasHidden = message.hidden;
      message.hidden = !allChecked;

      if (allChecked && wasHidden) {
        launchConfetti();
      }
    });
  });
}
