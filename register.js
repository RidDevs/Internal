import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";

// Your Firebase configuration (replace with your values)
const firebaseConfig = {
    apiKey: "AIzaSyBtRpcHlXxixH52I0BCKOsgtKu34Uefadc", // Replace with your API key
    authDomain: "hirewise-d9b7d.firebaseapp.com",
    projectId: "hirewise-d9b7d",
    storageBucket: "hirewise-d9b7d.firebasestorage.app",
    messagingSenderId: "993492358089",
    appId: "1:993492358089:web:f7e66365c427fa7c864e18",
    measurementId: "G-G4W1YG528M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.addEventListener("DOMContentLoaded", () => {
    const registrationForm = document.querySelector("form"); //select the form, assuming only one form.

    registrationForm.addEventListener("submit", async (event) => {
        event.preventDefault(); // Prevent default form submission

        const username = document.getElementById("username").value;
        const email = document.getElementById("email").value; // Get the email value
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirm_password").value;

        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password); // Use the email value
            const user = userCredential.user;
            console.log("User registered:", user);
            alert("Registration successful!");
            // Redirect to login or another page after successful registration
            window.location.href = "login.html";
        } catch (error) {
            console.error("Registration failed:", error);
            alert("Registration failed: " + error.message);
        }
    });
});