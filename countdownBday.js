// Run when page loads
document.addEventListener("DOMContentLoaded", () => {

  // Get DOB from localStorage
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
      firebase.auth().signOut()
        .then(() => {
          localStorage.clear();
          alert("You are logged out");
          window.location.href = "signup.html";
        })
        .catch(() => {
          alert("Logout failed");
        });
    });
  }

  // If DOB not found
  if (!dob) {
    document.getElementById("countdownMessage").innerText =
      "Date of Birth not found";
    return;
  }

  // Read DOB as local date
  const parts = dob.split("-");
  const birthMonth = Number(parts[1]) - 1;
  const birthDay = Number(parts[2]);

  function updateCountdown() {
    const now = new Date();

    // Create next birthday
    let nextBirthday = new Date(now.getFullYear(), birthMonth, birthDay);

    if (nextBirthday <= now) {
      nextBirthday = new Date(now.getFullYear() + 1, birthMonth, birthDay);
    }

    const diff = nextBirthday - now;

    if (diff <= 0) {
      window.location.href = "birthday.html";
      return;
    }

    // Time calculations
   
    const totalDays = Math.floor(totalHours / 24);
    const months = Math.floor(totalDays / 30);
    const days = totalDays % 30;

    // Show on page
    document.getElementById("months").innerText = months;
    document.getElementById("days").innerText = days;
  

    document.getElementById("countdownMessage").innerText =
      "⏳ Counting down to your special day!";
  }

  // Start countdown
  updateCountdown();
  setInterval(updateCountdown, 1000);

});
