import {
    getAuth,
    reauthenticateWithCredential,
    EmailAuthProvider,
    updatePassword,
  } from "firebase/auth";
  
  export const ResetPassword = (currentPassword, password) => {
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
        return updatePassword(user, password);
      })
      .then(() => {
        console.log('User updated successfully');
        return { message: true, error: null };
      })
      .catch((error) => {
        // console.error('Error re-authenticating or updating password:', error.code, error.message);
        return { message: false, error: error.code };
      });
  };
  