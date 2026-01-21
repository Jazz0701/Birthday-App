document.addEventListener("DOMContentLoaded", () => {

  // Show user name
  const userName = localStorage.getItem("userName") || "Friend";
  document.getElementById("userName").innerText = userName;

  // Get quote only from API
  fetch("https://corsproxy.io/?https://type.fit/api/quotes")
    .then(res => res.json())
    .then(data => {
      const randomIndex = Math.floor(Math.random() * data.length);
      const quote = data[randomIndex];
      document.getElementById("quoteText").innerText = `"${quote.text}"`;
      document.getElementById("quoteAuthor").innerText =
        quote.author ? `— ${quote.author}` : "— Unknown";
    })
    .catch(() => {
      document.getElementById("quoteText").innerText =
        "Happy Birthday! Wishing you a wonderful day!";
      document.getElementById("quoteAuthor").innerText = "";
    });

  // Home button
  const homeBtn = document.getElementById("homeBtn");
  homeBtn.addEventListener("click", () => {
    window.location.href = "signup.html";
  });

  // Logout button (Firebase + local)
  const logoutBtn = document.getElementById("logoutBtn");
  logoutBtn.addEventListener("click", () => {

    firebase.auth().signOut()
      .then(() => {
        localStorage.clear();
        alert("You are logged out");
        window.location.href = "signup.html";
      })
      .catch(() => {
        localStorage.clear();
        window.location.href = "signup.html";
      });

  });

  // Start confetti
  createConfetti();
});

// Simple confetti
function createConfetti() {
  const container = document.getElementById("confetti-container");
  const colors = ["red", "yellow", "blue", "green", "pink", "orange"];

  for (let i = 0; i < 40; i++) {
    const confetti = document.createElement("div");
    confetti.className = "confetti";
    confetti.style.left = Math.random() * 100 + "vw";
    confetti.style.backgroundColor =
      colors[Math.floor(Math.random() * colors.length)];
    confetti.style.animationDuration = 2 + Math.random() * 3 + "s";

    container.appendChild(confetti);
    setTimeout(() => confetti.remove(), 5000);
  }
}
