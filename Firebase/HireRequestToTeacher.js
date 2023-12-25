import { getDatabase, ref, get, update } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { app } from "../Config.js";

export const addHireRequestInTeacher = async (data) => {
    try {
        const { teacherUid,teacherName,teacherProfileImage, studentUid, date, time, request,  name, studentImage } = data;

        const db = getDatabase(app);
        const dbRef = ref(db, "Teacher/" + teacherUid);

        const snapshot = await get(dbRef);

        if (snapshot.exists()) {
            const teacherData = snapshot.val();
            let hireRequests = teacherData.hireRequests || {}; // Assuming it's initially an object

            // Create a unique key for the new hire request
            const uniqueKey = `${teacherUid}_${date}_${time}`;

            // Add the new hire request to the object using the unique key
            hireRequests[studentUid] = {
                studentUid,
                teacherName:teacherName,
                teacherProfileImage:teacherProfileImage,
                date,
                time,
                request,
                // duration: duration,
                name: name,
                profileImage: studentImage,
                timestamp: new Date().getTime(),
            };

            // Update the database with the new hire requests object
            update(dbRef, { hireRequests });

            console.log("Hire request added successfully");
        } else {
            console.error("Teacher data not found for UID:", teacherUid);
        }
    } catch (error) {
        console.error("Error adding hire request:", error);
    }

};

export const addHireRequestInStudent = async (data) => {
    try {
        const { teacherUid,teacherName,teacherProfileImage, studentUid, date, time, request, name, studentImage } = data;

        const db = getDatabase(app);
        const dbRef = ref(db, "student/" + studentUid);

        const snapshot = await get(dbRef);

        if (snapshot.exists()) {
            const studentData = snapshot.val();
            let hireRequests = studentData.hireRequests || {}; // Assuming it's initially an object

            // Create a unique key for the new hire request
            const uniqueKey = `${teacherUid}_${date}_${time}`;

            // Add the new hire request to the object using the unique key
            hireRequests[teacherUid] = {
                teacherUid,
                teacherName,
                teacherProfileImage,
                date,
                time,
                request,
                // duration: duration,
                name: name,
                profileImage: studentImage,
                timestamp: new Date().getTime(),
            };

            // Update the database with the new hire requests object
            update(dbRef, { hireRequests });

            console.log("Hire request added successfully");
        } else {
            console.error("Student data not found for UID:", studentUid);
        }
    } catch (error) {
        console.error("Error adding hire request:", error);
    }
};

  
  export const UpdateHireRequest = async (data) => {
    console.log(data);
    try {
      const auth = getAuth();
      const db = getDatabase();
      const userRef = ref(db, `${data.database}/${data.uid}/hireRequests/${data.databaseUid}`);

      await update(userRef, {
       request:data.status
      });
      
    } catch (error) {
      console.log("Error updating request status:", error.message);
      throw error;
    }
  };
  