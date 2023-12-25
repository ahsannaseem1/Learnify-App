import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image
} from 'react-native';
import { getTeacherWithUid } from './Firebase/GetTeachers';
import { getAuth } from 'firebase/auth';
import { UpdateHireRequest } from './Firebase/HireRequestToTeacher';
import { getStudentWithUid } from './Firebase/GetStudent';
import { GetCurrentUser } from './Firebase/GetCurrentUser';
import { BottomNav } from './BottomNav';

export default function TeacherHired({ route }) {

  const [image,setImage]=useState('');
  const [name,setName]=useState('');
  useEffect(()=>{
      const getUser=async()=>{
          const user=await GetCurrentUser(role='student');
          if(user){
            setImage(user.profileImage);
            setName(user.firstName);
        }
       
      }
      getUser();
  },[])

  const auth = getAuth();
  const [hireRequests, setHireRequests] = useState([]);
  const [teacher, setTeacher] = useState('');

  useEffect(() => {
    const getStudentRequest = async () => {
      const hireRequest = await getStudentWithUid(auth.currentUser.uid);

      // Convert the hireRequests object to an array
      const hireRequestsArray = Object.values(hireRequest.hireRequests || []);

      console.log("hire", hireRequestsArray);
      setHireRequests(hireRequestsArray);
    };

    getStudentRequest();
  }, []);

  useEffect(() => {

  }, [hireRequests])

  const getStatusTextColor = (status) => {
    return status === 'pending' ? 'red' : status === 'Rejected' ? 'red' : 'green';
  };

  const renderRequestItem = ({ item }) => (
    <View style={styles.requestItem}>
      <View style={styles.profileContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.profileName}>
            Name: {item.teacherName}
          </Text>
          <Text>Date: {item.date}</Text>
          <Text>Time: {item.time}</Text>
          <Text style={{ color: getStatusTextColor(item.request) }}>Status: {item.request}</Text>
        </View>
        <Image source={{ uri: item.teacherProfileImage }} style={styles.profileImage} />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hire Requests</Text>
      {hireRequests.length === 0 ? (
        <Text>No hire requests available.</Text>
      ) : (
        <FlatList
          data={hireRequests}
          renderItem={renderRequestItem}
        />
      )}
      <BottomNav image={image} name={name}></BottomNav>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  requestItem: {
    marginBottom: 20,
    borderColor: '#ddd',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  profileContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  textContainer: {
    flex: 1,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 60,
  },
  profileName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
