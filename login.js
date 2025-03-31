import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";

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
    const loginForm = document.getElementById("loginForm");

    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault(); // Prevent default form submission

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log("User logged in:", user);
            
            window.location.href = "homenew.html"; // Redirect to dashboard
        } catch (error) {
            console.error("Login failed:", error);
            alert("Login failed: " + error.message);
        }
    });
});