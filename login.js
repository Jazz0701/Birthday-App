document.addEventListener("DOMContentLoaded", () => {

  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const loginBtn = document.getElementById("loginSubmit");
  const goToSignup = document.getElementById("goToSignup");

  goToSignup.addEventListener("click", () => {
    window.location.href = "signup.html";
  });

  loginBtn.addEventListener("click", () => {

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    firebase.database().ref("birthdayUsers").once("value")
      .then((snapshot) => {

        let found = false;

        snapshot.forEach((child) => {
          const data = child.val();

          if (data.email === email && data.password === password) {
            found = true;

            localStorage.setItem("userName", data.name);
            localStorage.setItem("userDOB", data.dob);
            localStorage.setItem("userEmail", data.email);

            if (isBirthdayToday(data.dob)) {
              window.location.href = "birthday.html";
            } else {
              window.location.href = "countdownBday.html";
            }
          }
        });

        if (!found) {
          alert("Wrong email or password");
        }
      })
      .catch(() => {
        alert("Error checking login");
      });
  });
});

function isBirthdayToday(dob) {
  const [y, m, d] = dob.split("-").map(Number);
  const today = new Date();
  return m === today.getMonth() + 1 && d === today.getDate();
}
