# Teacher-Student Appointment Booking System

## Project Overview

This project is a **Teacher-Student Appointment Booking System** built using **HTML, CSS, JavaScript and Firebase**.

It allows students to book appointments with teachers and provides admins and teachers with dashboards to manage schedules and view appointments.

Key functionalities:

- **Admin Dashboard**: Add teachers, view pending student registrations, and manage all appointments.
- **Teacher Dashboard**: Schedule slots, view pending appointments, and read messages from students.
- **Student Dashboard**: Register/login, browse teachers, and book appointments.
- **Firebase Integration**: Handles authentication and database storage for real-time updates.

---

## Features

### Admin

- Add new teachers (name, department, subject)
- View all teachers in a list
- Monitor pending student registrations
- View all appointments (student → teacher, date, time, status)

### Teacher

- Schedule new slots for students
- View pending appointments
- View messages from students

### Student

- Sign up and login
- View available teachers
- Book appointments
- View their own bookings

---

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js / Express
- **Database**: Firebase Firestore
- **Authentication**: Firebase Auth
- **Hosting**: Firebase Hosting
- **Fonts/Icons**: Google Fonts, FontAwesome

---

## Firebase Configuration (`firebase.js`)

```javascript
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDj2jzoyee9rYBMEQXE_UPL7eshRZ9a3gU",
  authDomain: "student-teacher-appointm-2af32.firebaseapp.com",
  projectId: "student-teacher-appointm-2af32",
  storageBucket: "student-teacher-appointm-2af32.firebasestorage.app",
  messagingSenderId: "558624743527",
  appId: "1:558624743527:web:3f0798a2354f47c148f4c2",
  measurementId: "G-7VPQHR4QWJ",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
```
