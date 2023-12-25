import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet,Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { GetCurrentUser } from './Firebase/GetCurrentUser';
import { UpdateUserProfile } from './Firebase/UpdateUserProfile';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

const AccountInformation = () => {
  const navigation=useNavigation();

  const route=useRoute();
  const role=route.params.role
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [studentData, setStudentData] = useState(null);

  const handleSave = async () => {
    const updatedData = {
      firstName,
      lastName,
      email,
      profileImage,
      role:role
    };

    try {
      await UpdateUserProfile(updatedData);
      Alert.alert('Success', 'User information saved!', [
        {
          text: 'OK',
          onPress: () => {
            // Navigate to the login screen after the user clicks OK
            navigation.navigate('Login');
          },
        },
      ]);
    } catch (error) {
      // Handle error if updating user profile fails
      Alert.alert('Error', 'Failed to save user information. Please try again.');
    }
  

    console.log('User information saved:', updatedData);
  };

  const handlePickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setProfileImage(result.uri);
    }
  };

  useEffect(() => {
    const getData = async () => {
      const studentData = await GetCurrentUser(role);
      setStudentData(studentData);
      setFirstName(studentData?.firstName || '');
      setLastName(studentData?.lastName || '');
      setEmail(studentData?.email || '');
      setProfileImage(studentData?.profileImage || null);
    };

    getData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {profileImage ? (
          <Image style={styles.profileImage} source={{ uri: profileImage }} />
        ) : (
          <Text>No Image Selected</Text>
        )}
        <TouchableOpacity style={styles.pickImageButton} onPress={handlePickImage}>
          <Text style={styles.pickImageButtonText}>Pick Image</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.body}>
        {studentData ? (
          <View style={styles.userInfo}>
            <TextInput
              style={styles.input}
              value={firstName}
              placeholder="First Name"
              onChangeText={(text) => setFirstName(text)}
            />
            <TextInput
              style={styles.input}
              value={lastName}
              placeholder="Last Name"
              onChangeText={(text) => setLastName(text)}
            />
            {/* <TextInput
              style={styles.input}
              value={email}
              placeholder="Email"
              onChangeText={(text) => setEmail(text)}
            /> */}
          </View>
        ) : (
          <Text style={styles.loadingText}>Loading...</Text>
        )}
        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSave}
          disabled={!studentData}
        >
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
  },
  pickImageButton: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 10,
  },
  pickImageButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  body: {
    flex: 1,
    marginTop: 20,
  },
  userInfo: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 15,
    borderRadius: 30,
    color: 'black',
  },
  saveButton: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
    opacity: 0.9,
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  loadingText: {
    textAlign: 'center',
    color: 'black',
    fontSize: 16,
  },
});

export default AccountInformation;
