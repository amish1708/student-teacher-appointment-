const API_BASE = "http://localhost:5000/api";
const token = localStorage.getItem("token");

// Elements
const addTeacherBtn = document.getElementById("addTeacherBtn");
const teacherNameInput = document.getElementById("teacherName");
const teacherDeptInput = document.getElementById("teacherDept");
const teacherSubjectInput = document.getElementById("teacherSubject");
const teacherList = document.getElementById("teacherList");
const pendingStudentsList = document.getElementById("pendingStudents");
const allAppointmentsList = document.getElementById("allAppointments");

// Add teacher
addTeacherBtn.addEventListener("click", async () => {
  const name = teacherNameInput.value;
  const subject = teacherSubjectInput.value;
  const dept = teacherDeptInput.value;

  if (!name || !subject || !dept) return alert("Fill all fields!");

  try {
    const res = await fetch(`${API_BASE}/teachers/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        subject,
        email: `${name}@school.com`,
        password: "12345",
      }),
    });

    const data = await res.json();
    alert(data.message || "Teacher added!");
    teacherNameInput.value = "";
    teacherDeptInput.value = "";
    teacherSubjectInput.value = "";
    loadTeachers();
  } catch (err) {
    console.error(err);
    alert("Failed to add teacher");
  }
});

// Load teachers
async function loadTeachers() {
  try {
    const res = await fetch(`${API_BASE}/teachers`);
    const teachers = await res.json();
    teacherList.innerHTML = teachers
      .map((t) => `<li>${t.name} - ${t.subject}</li>`)
      .join("");
  } catch (err) {
    console.error(err);
    teacherList.innerHTML = "<li>Failed to load teachers</li>";
  }
}

// Load pending students
async function loadPendingStudents() {
  try {
    const res = await fetch(`${API_BASE}/students/pending`);
    const students = await res.json();
    pendingStudentsList.innerHTML = students
      .map((s) => `<li>${s.name} - ${s.email}</li>`)
      .join("");
  } catch (err) {
    console.error(err);
    pendingStudentsList.innerHTML = "<li>Failed to load pending students</li>";
  }
}

// Load all appointments
async function loadAppointments() {
  try {
    const res = await fetch(`${API_BASE}/appointments`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();

    allAppointmentsList.innerHTML = data
      .map(
        (a) =>
          `<li>${a.studentId.name} → ${a.teacherId.name} on ${a.date} ${a.time} (${a.status})</li>`
      )
      .join("");
  } catch (err) {
    console.error(err);
    allAppointmentsList.innerHTML = "<li>Failed to load appointments</li>";
  }
}

// Initialize
loadTeachers();
loadPendingStudents();
loadAppointments();
