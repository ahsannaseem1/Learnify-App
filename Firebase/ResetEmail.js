import {
    getAuth,
    reauthenticateWithCredential,
    EmailAuthProvider,
    updateEmail, // Changed from updatePassword to updateEmail
  } from "firebase/auth";
  
  export const ResetEmail = (currentPassword, newEmail) => {
    const auth = getAuth();
    const user = auth.currentUser;
  
    if (!user) {
      console.error('User not authenticated');
      return Promise.reject({ message: false, error: 'User not authenticated' });
    }
  
    const credential = EmailAuthProvider.credential(user.email, currentPassword);
  
    return reauthenticateWithCredential(user, credential)
      .then(() => {
        console.log("User re-authenticated successfully");
        return updateEmail(user, newEmail); // Changed from updatePassword to updateEmail
      })
      .then(() => {
        console.log('User email updated successfully');
        return { message: true, error: null };
      })
      .catch((error) => {
        console.error('Error re-authenticating or updating email:', error.code, error.message);
        return { message: false, error: error.code };
      });
  };
  