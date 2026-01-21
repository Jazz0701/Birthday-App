// Run this code only after the page has fully loaded
document.addEventListener("DOMContentLoaded", () => {

  // Get all input fields and buttons from the signup page
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const dobInput = document.getElementById("dob");
  const signupBtn = document.getElementById("signupSubmit");
  const goToLogin = document.getElementById("goToLogin");

  // When user clicks "Already have an account? Login"
  goToLogin.addEventListener("click", () => {
    window.location.href = "login.html";   // Redirect to login page
  });

  // When the Sign Up button is clicked
  signupBtn.addEventListener("click", () => {
       
    // Read values from the input fields
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    const dob = dobInput.value.trim();

    // Make sure all fields are filled
    if (!name || !email || !password || !dob) {
      alert("Please fill all fields");
      return;
    }

    // Create a new user in Firebase Authentication
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {

        // Firebase gives each user a unique ID (UID)
        const uid = userCredential.user.uid;
        
          // Redirect user to login page
        window.location.href = "login.html"

      })
      .catch((error) => {
        // Show any Firebase errors (email already used, weak password, etc.)
        alert(error.message);
      });

       // Save extra user details in Realtime Database
        firebase.database().ref("birthdayUsers/").push().set({
         name: name,
          email: email,
          dob: dob
        });
  });
});