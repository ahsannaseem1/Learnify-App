import { getDatabase, ref, onValue, set, update, get } from "firebase/database";
import {
  getAuth,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { app } from "../Config.js";
import { StoreProfileImage } from "./ProfileImage.js";
import { StoreTeacherProfile } from "./ProfileImage.js";
import { storeCV } from "./ProfileImage.js";

const setStudentData = async (data) => {
  console.log(data);
  const db = getDatabase(app);
  const dbRef = ref(db, "student");
  const snapshot = await get(dbRef);

  if (snapshot.exists()) {
    update(dbRef, {
      [data.uid]: {
        uid:data.uid,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        profileImage: data.profileImage, // Add this line to include profileImage
      },
    })
      .then(() => {
        console.log("Data updated successfully");
      })
      .catch((error) => {
        console.error("Error updating data:", error);
      });
  } else {
    set(dbRef, {
      [data.uid]: {
        uid:data.uid,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        profileImage: data.profileImage, // Add this line to include profileImage
      },
    });
  }
};


export const AddUser =async (firstName, lastName, email, password,selectedImageName) => {
  const auth = getAuth();
  let Image='';

const response=await StoreProfileImage(selectedImageName)
  // console.log("its response in the add user",response);
  Image=response.downloadURL;
  // console.log("download URL is ",response.downloadURL)
  // setProfileImage(response.downloadURL);

// console.log("inside add user function")
  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // console.log('inside .then')
      const user = userCredential.user;
      const data = {
        uid: user.uid,
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        profileImage: Image, 
      };
      // console.log('data',data)
      setStudentData(data);
      // checkUserState();
      return { user, errorCode: null };
    })
    .catch((error) => {
      console.error("Error creating user:", error.message);
      return { user: null, errorCode: error.code };
    });
};

const setTeacherData = async (data) => {
  console.log(data);
  const db = getDatabase(app);
  const dbRef = ref(db, "Teacher");
  const snapshot = await get(dbRef);

  if (snapshot.exists()) {
    update(dbRef, {
      [data.uid]: {
        uid:data.uid,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        category: data.category,
        password: data.password,
        city: data.city,
        education: data.education,
        CV: data.CV,
        profileImage: data.profileImage, // Add this line to include profileImage
      },
    })
      .then(() => {
        console.log("Data updated successfully");
      })
      .catch((error) => {
        console.error("Error updating data:", error);
      });
  } else {
    set(dbRef, {
      [data.uid]: {
        uid:data.uid,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        city: data.city,
        education: data.education,
        CV: data.CV,
        profileImage: data.profileImage, // Add this line to include profileImage
      },
    });
  }
};

export const AddTeacher =async (data) => {
  const auth = getAuth();
  let Image='';
  let teacherCV='';
  console.log("data is ",data);

const response=await StoreTeacherProfile(data.profileImage);
  Image=response.downloadURL;
  console.log('image is ',Image);
const responseCV=await storeCV(data.CV)
  teacherCV=responseCV.downloadURL;
  console.log("download URL is ",response.downloadURL)
  // setProfileImage(response.downloadURL);

console.log("inside add user function")
  return createUserWithEmailAndPassword(auth, data.email, data.password)
    .then((userCredential) => {
      // console.log('inside .then')
      const user = userCredential.user;
      const data1 = {
        uid: user.uid,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        category: data.category,
        city:data.city,
        education:data.education,
        profileImage: Image, 
        CV:teacherCV,
  
      };
      console.log(data1);
      // console.log('data',data)
      setTeacherData(data1);
      // checkUserState();
      return { user, errorCode: null };
    })
    .catch((error) => {
      console.log("Error creating teacher:", error.message);
      return { user: null, errorCode: error.code };
    });
};
