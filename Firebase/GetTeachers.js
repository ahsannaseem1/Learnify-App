import { getDatabase, ref, onValue } from "firebase/database";

export const getTeachersList = () => {
    return new Promise((resolve, reject) => {
      const db = getDatabase();
      const dbRef = ref(db, "Teacher");
  
      onValue(dbRef, (snapshot) => {
        const userData = snapshot.val();
        // console.log("Teachers are ", userData);
        resolve(userData);
      }, (error) => {
        reject(error);
      });
    });
  }

  export const getTeacherWithUid = (uid) => {
    return new Promise((resolve, reject) => {
      const db = getDatabase();
      const dbRef = ref(db, "Teacher/"+uid);
  
      onValue(dbRef, (snapshot) => {
        const userData = snapshot.val();
        // console.log("Teachers are ", userData);
        resolve(userData);
      }, (error) => {
        reject(error);
      });
    });
  }

  export const getTeacher = (uid) => {
    return new Promise((resolve, reject) => {
      const db = getDatabase();
      const dbRef = ref(db, "Teacher");
  
      onValue(dbRef, (snapshot) => {
        const allTeachers = snapshot.val();
        
        // Find the teacher with the specific email
        const teacherWithEmail = Object.values(allTeachers).find(teacher => teacher.uid === uid);
  
        if (teacherWithEmail) {
          // console.log("Teacher found:", teacherWithEmail);
          resolve(teacherWithEmail);
        } else {
          // console.log("Teacher not found with email:", email);
          resolve(null); // or you can reject with an error message
        }
      }, (error) => {
        reject(error);
      });
    });
  };