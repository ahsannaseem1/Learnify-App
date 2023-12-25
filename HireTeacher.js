import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
} from 'react-native';
import { getAuth } from 'firebase/auth';
import { getStudentWithUid } from './Firebase/GetStudent';
import { addHireRequestInTeacher,addHireRequestInStudent } from './Firebase/HireRequestToTeacher';

export default function HireTeacher({ route, navigation }) {
    const auth=getAuth();
    const studentUid=auth.currentUser.uid;
  const { teacherDetail } = route.params;
  // console.log("teacherDeail in hire",teacherDetail.profileImage)
  const [selectedDate, setSelectedDate] = useState("16-12-2023");
  const [selectedTime, setSelectedTime] = useState("2:00am to 3:00am");
  const[duration,setDuration]=useState("1 month");
  const [student,setStudent]=useState('');

  useEffect(()=>{
    const getStudent=async()=>{
        const studentData=await getStudentWithUid(studentUid);
        setStudent(studentData)
    }
    getStudent();
  },[])
  const confirmHire = () => {
    Alert.alert(
      'Confirm Hire',
      'Are you sure you want to hire this teacher?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            const data={
                studentUid:studentUid,
                teacherUid:teacherDetail.uid,
                teacherName:teacherDetail.firstName + " " + teacherDetail.lastName,
                teacherProfileImage:teacherDetail.profileImage,
                date:selectedDate,
                time:selectedTime,
                request:"pending",
                duration:duration,
                name:student.firstName + " " + student.lastName,
                studentImage:student.profileImage
            }
            console.log("data in ",data);
            addHireRequestInTeacher(data);
            addHireRequestInStudent(data);
            // Implement logic to confirm the hire, e.g., send data to the server
            Alert.alert('Hire Confirmed', 'Teacher hired successfully!');
            // You can navigate to any other screen or go back to the previous screen
            navigation.goBack();
          },
        },
      ],
      { cancelable: false }
    );
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Time and date</Text>
      <TextInput
        style={styles.input}
        placeholder="Select date"
        value={selectedDate}
        onChangeText={(text) => setSelectedDate(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Select Time"
        value={selectedTime}
        onChangeText={(text) => setSelectedTime(text)}
      />
       <TextInput
        style={styles.input}
        placeholder="Select Duration"
        value={duration}
        onChangeText={(text) => setDuration(text)}
      />
      <TouchableOpacity
        style={styles.confirmButton}
        onPress={confirmHire}
      >
        <Text style={styles.confirmButtonText}>Confirm Hire</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    borderRadius: 5,
  },
  confirmButton: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 25,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
