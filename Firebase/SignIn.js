import { getDatabase, ref, onValue } from "firebase/database";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../Config.js";

export const SignIn = async (email, password) => {
  const auth = getAuth();

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log("user is ==", user.uid);

    const db = getDatabase();
    const studentDbRef = ref(db, "student/" + user.uid);
    const teacherDbRef = ref(db, "Teacher/" + user.uid);

    const studentData = await new Promise((resolve) => {
      onValue(studentDbRef, (snapshot) => {
        const userData = snapshot.val();
        console.log("student data is ==", userData);
        resolve({ data: userData, role: 'student', error: null });
      });
    });

    // If student data is not found, search in the teacher database
    if (!studentData.data) {
      const teacherData = await new Promise((resolve) => {
        onValue(teacherDbRef, (snapshot) => {
          const userData = snapshot.val();
          console.log("teacher data is ==", userData);
          resolve({ data: userData, role: 'teacher', error: null });
        });
      });

      return teacherData;
    }

    return studentData;
  } catch (error) {
    const errorCode = error.code;
    console.log("error is ==", errorCode);
    return { data: null, role: null, error: errorCode };
  }
};
