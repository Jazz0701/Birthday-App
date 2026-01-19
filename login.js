document.addEventListener("DOMContentLoaded", () => {
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const loginBtn = document.getElementById("loginSubmit");
  const goToSignup = document.getElementById("goToSignup");

  // Go to signup page
  goToSignup.addEventListener("click", () => {
    window.location.href = "signup.html";
  });

  // Handle login
  loginBtn.addEventListener("click", () => {
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    firebase.database().ref("birthdayUsers").once("value", (snapshot) => {
      if (!snapshot.exists()) {
        alert("No users found");
        return;
      }

      let found = false;

      snapshot.forEach((child) => {
        const user = child.val();

        if (user.email === email && user.password === password) {
          found = true;

          localStorage.setItem("userName", user.name);
          localStorage.setItem("userDOB", user.dob);
          localStorage.setItem("userEmail", user.email);

          // Redirect immediately
          if (isBirthdayToday(user.dob)) {
            window.location.href = "birthday.html";
          } else {
            window.location.href = "countdownBday.html";
          }
        }
      });

      if (!found) {
        alert("Wrong Email or Password");
      }
    });
  });
});

function isBirthdayToday(dob) {
  if (!dob) return false;
  const [year, month, day] = dob.split("-").map(Number);
  const today = new Date();
  return month === today.getMonth() + 1 && day === today.getDate();
}