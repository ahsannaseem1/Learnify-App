import {
  getAuth,
} from "firebase/auth";
import { getDatabase, ref, onValue,update } from "firebase/database";


export const GetCurrentUser=async(role)=>{
  console.log("role is ",role)
  const auth = getAuth();
  const user = auth.currentUser;
  // console.log("current User",user.email);
  return new Promise((resolve, reject) => {
    const db = getDatabase();

    if(role==='teacher'){
      console.log('in teacher role')
      const dbRef = ref(db, "Teacher/" + user.uid);
      onValue(dbRef, (snapshot) => {
        const userData = snapshot.val();
        console.log("teacher", userData);
        resolve(userData);
      }, (error) => {
        reject(error);
      });
    }
    else{
      const dbRef = ref(db, "student/" + user.uid);
      onValue(dbRef, (snapshot) => {
        const userData = snapshot.val();
        console.log("student ", userData);
        resolve(userData);
      }, (error) => {
        reject(error);
      });
    }

   
  });
}
export const GetCurrentTeacher=async()=>{
  const auth = getAuth();
  const user = auth.currentUser;
  // console.log("current User",user.email);
  return new Promise((resolve, reject) => {
    const db = getDatabase();
    const dbRef = ref(db, "Teacher/" + user.uid);

    onValue(dbRef, (snapshot) => {
      const userData = snapshot.val();
      // console.log("student ", userData);
      resolve(userData);
    }, (error) => {
      reject(error);
    });
  });
}
export const GetCurrentUserData=async(uid)=>{
const db=getDatabase();
const dbRef = ref(db, "student/" + uid);

const data = await new Promise((resolve) => {
  onValue(dbRef, (snapshot) => {
    const userData = snapshot.val();
    console.log("data is ==", userData);
    resolve({ data: userData, error: null });
  });
});

// Returning the resolved data outside the promise
return data;
};

