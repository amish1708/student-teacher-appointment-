// student.js
import {
  auth,
  db,
  collection,
  addDoc,
  getDocs,
  query,
  where,
  doc,
  getDoc,
} from "./firebase.js";

const user = auth.currentUser;

// BOOK APPOINTMENT
export async function bookAppointment() {
  const teacherName = document.getElementById("teacherName").value.trim();
  const date = document.getElementById("appointmentDate").value;
  const time = document.getElementById("appointmentTime").value;

  if (!teacherName || !date || !time) return alert("Fill all fields");

  try {
    // Find teacher by name
    const teachersSnap = await getDocs(collection(db, "teachers"));
    const teacher = teachersSnap.docs.find(
      (t) => t.data().name.toLowerCase() === teacherName.toLowerCase()
    );

    if (!teacher) return alert("Teacher not found!");

    // Add appointment
    await addDoc(collection(db, "appointments"), {
      studentId: auth.currentUser.uid,
      teacherId: teacher.id,
      date,
      time,
      status: "Pending",
      createdAt: new Date(),
    });

    alert("Appointment booked!");
    loadAppointments();
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
}

// LOAD STUDENT APPOINTMENTS
export async function loadAppointments() {
  try {
    const q = query(
      collection(db, "appointments"),
      where("studentId", "==", auth.currentUser.uid)
    );
    const snap = await getDocs(q);

    const html = await Promise.all(
      snap.docs.map(async (docSnap) => {
        const a = docSnap.data();
        const teacherSnap = await getDoc(doc(db, "teachers", a.teacherId));
        const teacher = teacherSnap.data();
        return `<p>${teacher.name} - ${a.date} ${a.time} (${a.status})</p>`;
      })
    );

    document.getElementById("myAppointments").innerHTML = html.join("");
  } catch (err) {
    console.error(err);
  }
}

// SEARCH TEACHERS
export async function searchTeacher() {
  const queryText = document
    .getElementById("searchTeacher")
    .value.toLowerCase();
  const snap = await getDocs(collection(db, "teachers"));
  const results = snap.docs.filter(
    (t) =>
      t.data().name.toLowerCase().includes(queryText) ||
      (t.data().subject && t.data().subject.toLowerCase().includes(queryText))
  );

  document.getElementById("searchResults").innerHTML = results
    .map((t) => `<p>${t.data().name} - ${t.data().subject || ""}</p>`)
    .join("");
}

// SEND MESSAGE
export async function sendMessage() {
  const msg = document.getElementById("studentMessage").value.trim();
  if (!msg) return alert("Enter a message");

  // You can implement a dropdown/select to choose teacher
  const teacherId = prompt("Enter Teacher UID to send message:");

  await addDoc(collection(db, "messages"), {
    senderId: auth.currentUser.uid,
    receiverId: teacherId,
    message: msg,
    createdAt: new Date(),
  });

  alert("Message sent!");
}
