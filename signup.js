document.addEventListener("DOMContentLoaded", () => {

  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const dobInput = document.getElementById("dob");
  const signupBtn = document.getElementById("signupSubmit");
  const goToLogin = document.getElementById("goToLogin");

  goToLogin.addEventListener("click", () => {
    window.location.href = "login.html";
  });

  signupBtn.addEventListener("click", () => {

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    const dob = dobInput.value.trim();

    if (!name || !email || !password || !dob) {
      alert("Fill all fields");
      return;
    }

    firebase.database().ref("birthdayUsers").push().set({
      name: name,
      email: email,
      password: password,
      dob: dob
    })
    .then(() => {
      

      localStorage.setItem("userName", name);
      localStorage.setItem("userDOB", dob);
      localStorage.setItem("userEmail", email);
      
      alert("Sign up successful")

      if (isBirthdayToday(dob)) {
        window.location.href = "birthday.html";
      } else {
        window.location.href = "countdownBday.html";
      }

    })
    .catch(() => {
      alert("Error saving data");
    });

  });
});

function isBirthdayToday(dob) {
  const [y, m, d] = dob.split("-").map(Number);
  const today = new Date();
  return m === today.getMonth() + 1 && d === today.getDate();
}
