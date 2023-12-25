import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { getTeacher } from './Firebase/GetTeachers';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function TeacherDetail({ route }) {
  const [teacherDetail, setTeacherDetail] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const getTeacherDetails = async () => {
      try {
        const teacherData = await getTeacher(route.params?.teacherUid);
        console.log(teacherData);
        setTeacherDetail(teacherData);
      } catch (error) {
        console.error('Error fetching teacher details:', error);
      }
    };
    getTeacherDetails();
  }, [route.params?.teacherUid]); // Fix: Include route.params?.teacherUid in the dependency array

  if (!teacherDetail) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#000" />
      </SafeAreaView>
    );
  }

  const goToChatScreen = () => {
    navigation.navigate('ChatScreen', { teacherUid: teacherDetail.uid });
  };

  const hireTeacher = () => {
    navigation.navigate('HireTeacher',{teacherDetail});
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: teacherDetail.profileImage }}
          style={styles.profileImage}
        />
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{`${teacherDetail.firstName} ${teacherDetail.lastName}`}</Text>
          <Text style={styles.category}>{teacherDetail.category}</Text>
        </View>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <MaterialIcons name="email" size={20} color="#555" />
          <Text style={styles.infoText}>{teacherDetail.email}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoText}>{teacherDetail.city}</Text>
        </View>
        <View style={styles.infoRow}>
          <MaterialIcons name="school" size={20} color="#555" />
          <Text style={styles.infoText}>{teacherDetail.education}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.cvButton}
        onPress={() => Linking.openURL(teacherDetail.CV)}
      >
        <Text style={styles.cvButtonText}>View CV</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.cvButton} onPress={goToChatScreen}>
        <Text style={styles.cvButtonText}>Chat</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.hireButton} onPress={hireTeacher}>
        <Text style={styles.hireButtonText}>Hire Me</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  nameContainer: {
    flex: 1,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  category: {
    fontSize: 18,
    color: '#777',
  },
  infoContainer: {
    padding: 16,
    borderRadius: 10,
    backgroundColor: '#fff',
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 16,
    color: '#555',
    marginLeft: 8,
  },
  cvButton: {
    backgroundColor: 'black',
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    marginTop: 16,
    marginLeft:20,
    marginRight:20
  },
  cvButtonText: {
    fontSize: 18,
    color: '#fff',
    marginRight: 8,
  },
  hireButton: {
    backgroundColor: 'black',
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    marginTop: 16,
    marginLeft: 20,
    marginRight: 20,
  },
  hireButtonText: {
    fontSize: 18,
    color: '#fff',
    marginRight: 8,
  },
});
