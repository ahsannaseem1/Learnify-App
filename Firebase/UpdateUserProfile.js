import {
    getAuth,
  } from "firebase/auth";
  import { getDatabase, ref, onValue,update } from "firebase/database";
export const UpdateUserProfile = async (updatedData) => {
    console.log(updatedData)
    try {
      const auth = getAuth();
      const user = auth.currentUser;
  
      if (user) {

        if(updatedData.role==='teacher'){
          const db = getDatabase();
          const userRef = ref(db, `Teacher/${user.uid}`);
    
    
          await update(userRef, {
            firstName: updatedData.firstName,
            lastName: updatedData.lastName,
            email: updatedData.email,
            profileImage: updatedData.profileImage || null,
          });
        }
        else{
          const db = getDatabase();
          const userRef = ref(db, `student/${user.uid}`);
    
    
          await update(userRef, {
            firstName: updatedData.firstName,
            lastName: updatedData.lastName,
            email: updatedData.email,
            profileImage: updatedData.profileImage || null,
          });
        }

  
      } else {
        console.error('User not authenticated');
      }
    } catch (error) {
      console.error('Error updating user profile:', error.message);
      throw error;
    }
  };