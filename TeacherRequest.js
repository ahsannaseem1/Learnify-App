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
import { TeacherBottomNav } from './BottomNav';

export default function TeacherRequest({ route }) {
  
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

  useEffect(() => {
    const getStudentRequest = async () => {
      const hireRequest = await getTeacherWithUid(auth.currentUser.uid);
      const hireRequestsArray = Object.values(hireRequest.hireRequests || []);
      setHireRequests(hireRequestsArray);
    };

    getStudentRequest();
  }, []);

  const handleApproveRequest = async (student) => {
    const data = {
      status: 'Approved',
      uid: auth.currentUser.uid,
      database: 'Teacher',
      databaseUid: student.studentUid
    };
    const data1 = {
      status: 'Approved',
      uid: student.studentUid,
      database: 'student',
      databaseUid: auth.currentUser.uid
    };

    await UpdateHireRequest(data);
    await UpdateHireRequest(data1);

    Alert.alert('Request Approved', 'Hire request has been approved successfully!');
  };

  const handleRejectRequest = async (student) => {
    const data = {
      status: 'Rejected',
      uid: auth.currentUser.uid,
      database: 'Teacher',
      databaseUid: student.studentUid
    };
    const data1 = {
      status: 'Rejected',
      uid: student.studentUid,
      database: 'student',
      databaseUid: auth.currentUser.uid
    };

    await UpdateHireRequest(data);
    await UpdateHireRequest(data1);

    getStudentRequest();

    Alert.alert('Request Rejected', 'Hire request has been rejected.');
  };

  const renderRequestItem = ({ item }) => (
    <View style={styles.requestItem}>
      <View style={styles.profileContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.profileName}>Name: {item.name}</Text>
          <Text>Date: {item.date}</Text>
          <Text>Time: {item.time}</Text>
          <Text>Status: {item.request}</Text>
        </View>
        <Image source={{ uri: item.profileImage }} style={styles.profileImage} />
      </View>
      {item.request === 'pending' && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.actionButton, styles.approveButton]}
            onPress={() => handleApproveRequest(item)}
          >
            <Text style={styles.approveButtonText}>Approve Request</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, styles.rejectButton]}
            onPress={() => handleRejectRequest(item)}
          >
            <Text style={styles.rejectButtonText}>Reject Request</Text>
          </TouchableOpacity>
        </View>
      )}
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
      <TeacherBottomNav image={image} name={name}></TeacherBottomNav>
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  actionButton: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    flex: 1,
  },
  approveButton: {
    backgroundColor: 'green',
  },
  approveButtonText: {
    color: 'white',
  },
  rejectButton: {
    backgroundColor: 'red',
    marginLeft: 10,
  },
  rejectButtonText: {
    color: 'white',
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
