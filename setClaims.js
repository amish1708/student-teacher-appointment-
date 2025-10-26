const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const auth = admin.auth();

async function assignRoles() {
  const listUsers = await auth.listUsers();
  for (const user of listUsers.users) {
    let role = "student"; // default
    const teacherDoc = await db.collection("teachers").doc(user.uid).get();
    if (teacherDoc.exists) role = "teacher";

    await auth.setCustomUserClaims(user.uid, { role });
    console.log(`User ${user.email} → role set to ${role}`);
  }
  console.log("✅ All roles assigned!");
}

assignRoles().catch(console.error);
