const admin = require("firebase-admin");

// Path to your service account key JSON
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const auth = admin.auth();

async function fixRoles() {
  try {
    const listUsersResult = await auth.listUsers();
    console.log(`Total users: ${listUsersResult.users.length}`);

    for (const user of listUsersResult.users) {
      const uid = user.uid;
      const email = user.email;
      let role = "";

      // Check Firestore collections
      const studentDoc = await db.collection("students").doc(uid).get();
      const teacherDoc = await db.collection("teachers").doc(uid).get();

      if (studentDoc.exists) role = "student";
      else if (teacherDoc.exists) role = "teacher";
      else {
        // Assign role based on email pattern or manual rule
        // Example: if email contains 'teacher', set as teacher; else student
        role = email.includes("teacher") ? "teacher" : "student";
        console.log(`Creating missing Firestore doc for ${email} as ${role}`);

        await db
          .collection(role)
          .doc(uid)
          .set({
            name: user.displayName || "Unknown",
            email,
            role,
            createdAt: new Date(),
          });
      }

      console.log(`User ${email} → ${role}`);
    }

    console.log("✅ All roles fixed successfully!");
  } catch (err) {
    console.error("Error fixing roles:", err);
  }
}

fixRoles();
