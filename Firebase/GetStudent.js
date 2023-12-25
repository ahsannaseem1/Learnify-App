import { getDatabase, ref, onValue } from "firebase/database";

export const getStudentList = () => {
    return new Promise((resolve, reject) => {
      const db = getDatabase();
      const dbRef = ref(db, "student");
  
      onValue(dbRef, (snapshot) => {
        const userData = snapshot.val();
        // console.log("Students are ", userData);
        resolve(userData);
      }, (error) => {
        reject(error);
      });
    });
  }

  export const getStudentWithUid = (uid) => {
    return new Promise((resolve, reject) => {
      const db = getDatabase();
      const dbRef = ref(db, "student/"+uid);
  
      onValue(dbRef, (snapshot) => {
        const userData = snapshot.val();
        // console.log("student are ", userData);
        resolve(userData);
      }, (error) => {
        reject(error);
      });
    });
  }
  export const getStudent = () => {
    return new Promise((resolve, reject) => {
      const db = getDatabase();
      const dbRef = ref(db, "student");
  
      onValue(dbRef, (snapshot) => {
        const allStudents = snapshot.val();
  
        // Filter students based on chat conditions
        const filteredStudents = Object.values(allStudents).filter((student) => {
          if (student.chat && Array.isArray(student.chat)) {
            // Iterate through each chat in the student's chat array
            for (const chat of student.chat) {
              if (
                chat.senderUid === auth.currentUser.uid ||
                chat.receiverUid === auth.currentUser.uid
              ) {
                // If the condition is met for any chat, include the student in the filtered list
                return true;
              }
            }
          }
          // If there is no chat array or none of the chats match, exclude the student from the filtered list
          return false;
        });
  
        
        // Resolve with the filtered list of students
        resolve(filteredStudents);
      }, (error) => {
        reject(error);
      });
    });
  };
  