// Run when page loads
document.addEventListener("DOMContentLoaded", () => {

  const dob = localStorage.getItem("userDOB");

  // Home button
  const homeBtn = document.getElementById("homeBtn");
  if (homeBtn) {
    homeBtn.addEventListener("click", () => {
      window.location.href = "signup.html";
    });
  }

  // Logout button
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.clear();
      alert("You are logged out");
      window.location.href = "signup.html";
    });
  }
  

  if (!dob) {
    document.getElementById("countdownMessage").innerText =
      "Date of Birth not found";
    return;
  }

  const [by, bm, bd] = dob.split("-").map(Number);

  function updateCountdown() {
    const now = new Date();

    // Today without time
    const today = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );

    // Birthday this year
    let nextBirthday = new Date(today.getFullYear(), bm - 1, bd);

    // If birthday already passed, move to next year
    if (nextBirthday < today) {
      nextBirthday = new Date(today.getFullYear() + 1, bm - 1, bd);
    }

    const diff = nextBirthday - today;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    document.getElementById("days").innerText = days;
    document.getElementById("months").innerText = 0;

    if (days === 0) {
      window.location.href = "birthday.html";
      return;
    }

    document.getElementById("countdownMessage").innerText =
      "⏳ UNTIL YOUR BIRTHDAY!";
  }
  
  updateCountdown();
  setInterval(updateCountdown, 1000);
});
