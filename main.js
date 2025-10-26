// main.js
import {
  auth,
  db,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  doc,
  setDoc,
  getDoc,
} from "./firebase.js";

// Elements
const showRegisterBtn = document.getElementById("showRegisterBtn");
const backToLoginBtn = document.getElementById("backToLoginBtn");
const loginBtn = document.querySelector("#loginCard button");
const registerBtn = document.querySelector("#registerCard button");

// Toggle forms
showRegisterBtn.addEventListener("click", () => {
  document.getElementById("loginCard").classList.add("hidden");
  document.getElementById("registerCard").classList.remove("hidden");
});

backToLoginBtn.addEventListener("click", () => {
  document.getElementById("registerCard").classList.add("hidden");
  document.getElementById("loginCard").classList.remove("hidden");
});

// REGISTER USER
async function registerUser() {
  const name = document.getElementById("registerName").value.trim();
  const email = document.getElementById("registerEmail").value.trim();
  const password = document.getElementById("registerPassword").value;
  const role = document.getElementById("registerRole").value;

  if (!name || !email || !password) return alert("Please fill all fields");

  try {
    // Create user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Save user info in Firestore
    await setDoc(doc(db, role, user.uid), {
      name,
      email,
      role,
      createdAt: new Date(),
    });

    alert(`Registered successfully as ${role}!`);
    // Switch to login form
    document.getElementById("registerCard").classList.add("hidden");
    document.getElementById("loginCard").classList.remove("hidden");
  } catch (err) {
    console.error("Registration error:", err);
    alert(err.message);
  }
}

// LOGIN USER
async function loginUser() {
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value;

  if (!email || !password) return alert("Please enter email and password");

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Detect role from Firestore
    let role = "";
    let docSnap = await getDoc(doc(db, "students", user.uid));
    if (docSnap.exists()) role = "student";
    else {
      docSnap = await getDoc(doc(db, "teachers", user.uid));
      if (docSnap.exists()) role = "teacher";
    }

    if (!role) return alert("User role not found. Contact admin.");

    localStorage.setItem("role", role);

    // Redirect based on role
    if (role === "student") window.location.href = "student.html";
    else if (role === "teacher") window.location.href = "teacher.html";
  } catch (err) {
    console.error("Login error:", err);
    alert(err.message);
  }
}

// Attach click events
registerBtn.addEventListener("click", registerUser);
loginBtn.addEventListener("click", loginUser);
