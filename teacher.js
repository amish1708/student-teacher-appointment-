// teacher.js
import {
  auth,
  db,
  collection,
  addDoc,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
  getDoc,
} from "./firebase.js";

// LOAD PENDING APPOINTMENTS
export async function loadAppointments() {
  try {
    const q = query(
      collection(db, "appointments"),
      where("teacherId", "==", auth.currentUser.uid)
    );
    const snap = await getDocs(q);

    const html = await Promise.all(
      snap.docs.map(async (docSnap) => {
        const a = docSnap.data();
        const studentSnap = await getDoc(doc(db, "students", a.studentId));
        const student = studentSnap.data();

        return `<li>
        ${student.name} - ${a.date} ${a.time} (${a.status})
        <button onclick="updateStatus('${docSnap.id}','Approved')">Approve</button>
        <button onclick="updateStatus('${docSnap.id}','Cancelled')">Cancel</button>
      </li>`;
      })
    );

    document.getElementById("appointmentsList").innerHTML = html.join("");
  } catch (err) {
    console.error(err);
  }
}

// UPDATE STATUS
export async function updateStatus(id, status) {
  try {
    const docRef = doc(db, "appointments", id);
    await updateDoc(docRef, { status });
    loadAppointments();
  } catch (err) {
    console.error(err);
  }
}

// LOAD MESSAGES
export async function loadMessages() {
  try {
    const q = query(
      collection(db, "messages"),
      where("receiverId", "==", auth.currentUser.uid)
    );
    const snap = await getDocs(q);

    const html = await Promise.all(
      snap.docs.map(async (docSnap) => {
        const m = docSnap.data();
        const studentSnap = await getDoc(doc(db, "students", m.senderId));
        const student = studentSnap.data();
        return `<li>${student.name}: ${m.message}</li>`;
      })
    );

    document.getElementById("messagesList").innerHTML = html.join("");
  } catch (err) {
    console.error(err);
  }
}
