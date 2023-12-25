import { getStorage,ref, uploadBytes ,getDownloadURL } from "firebase/storage";

export async function StoreProfileImage(selectedImageName){
    const storage = getStorage();
    const filename = selectedImageName.substring(selectedImageName.lastIndexOf('/') + 1);
    const storageRef = ref(storage, `images/${filename}`);
    
    const response = await fetch(selectedImageName);
    const blob = await response.blob();
    
    return uploadBytes(storageRef, blob).then((snapshot) => {
      console.log('Uploaded a image!');
    
      return getDownloadURL(storageRef).then((downloadURL) => {
        console.log('Download URL image:', downloadURL);
        return {downloadURL:downloadURL,data:snapshot};
      }).catch((error) => {
        console.error('Error getting download URL:', error);
      });
    }).catch((error) => {
      console.error('Error uploading image:', error);
    });
}

export async function StoreTeacherProfile(profileImage){
  const storage = getStorage();
  const filename = profileImage.substring(profileImage.lastIndexOf('/') + 1);
  const storageRef = ref(storage, `images/${filename}`);
  
  const response = await fetch(profileImage);
  const blob = await response.blob();
  
  return uploadBytes(storageRef, blob).then((snapshot) => {
    console.log('Uploaded a image!');
  
    return getDownloadURL(storageRef).then((downloadURL) => {
      console.log('Download URL image:', downloadURL);
      return {downloadURL:downloadURL,data:snapshot};
    }).catch((error) => {
      console.error('Error getting download URL:', error);
    });
  }).catch((error) => {
    console.error('Error uploading image:', error);
  });
}


export async function storeCV(cv){
  const storage = getStorage();
    const filename = cv.substring(cv.lastIndexOf('/') + 1);
    const storageRef = ref(storage, `CV/${filename}`);
    
    const response = await fetch(cv);
    const blob = await response.blob();
    
    return uploadBytes(storageRef, blob).then((snapshot) => {
      console.log('Uploaded a CV!');
    
      return getDownloadURL(storageRef).then((downloadURL) => {
        console.log('Download URL cv:', downloadURL);
        return {downloadURL:downloadURL,data:snapshot};
      }).catch((error) => {
        console.error('Error getting download URL:', error);
      });
    }).catch((error) => {
      console.error('Error uploading CV:', error);
    });
}
// export async function GetProfileImage(selectedImageName){

// }