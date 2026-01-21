// Run when the page finishes loading
document.addEventListener("DOMContentLoaded", () => {

  // Get all input fields and buttons
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const loginBtn = document.getElementById("loginSubmit");
  const goToSignup = document.getElementById("goToSignup");

  // When user clicks "Not registered? Sign Up"
  goToSignup.addEventListener("click", () => {
    window.location.href = "signup.html";
  });

  // When login button is clicked
  loginBtn.addEventListener("click", () => {

    // Read values from inputs
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    // Make sure both fields are filled
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    // Log in using Firebase Authentication
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {

        // Get the logged-in user's UID
        const uid = userCredential.user.uid;
        console.log(uid)

        // const db = firebase.database().ref("birthdayUsers/" + uid).once("value");
        // console.log(db)

        // Fetch the user's profile from Realtime Database
        return firebase.database().ref("birthdayUsers/" + uid).once("value");
         
      })
      .then((snapshot) => {


        // Extract user data
        const user = snapshot.val();
        console.log(user)

        if (!user){
          alert("User profile not found in database");
          return;
        }

        // Save user info in localStorage for other pages
        localStorage.setItem("userName", user.name);
        localStorage.setItem("userDOB", user.dob);
        localStorage.setItem("userEmail", user.email);

        alert("Login Successful");

        // Redirect based on birthday check
        if (isBirthdayToday(user.dob)) {
          window.location.href = "birthday.html";
        } else {
          window.location.href = "countdownBday.html";
        }
      })
      .catch((error) => {
        // Show Firebase Auth errors (wrong password, no user, etc.)
        alert(error.message);
      });
  });
});

// Function to check if today matches the user's birthday
function isBirthdayToday(dob) {
  const parts = dob.split("-");
  const month = Number(parts[1]);
  const day = Number(parts[2]);
  const today = new Date();

  return month === today.getMonth() + 1 && day === today.getDate();
}