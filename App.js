import Intro from './Intro'
import Login from './Login';
import Home from './Home';
import RegisterStudent from './RegisterStudent';
import Profile from './Profile';
import UserProfile from './UserProfile';
import NewPassword from './NewPassword';
import Messages from './Messages';
import SignUpOption from './SignUpOption';
import TeacherDetail from './TeacherDetail';
import TeacherHome from './TeacherHome';
import TeacherChatScreen from './TeacherChatScreen';
import Teacher from './Teacher';
import AccountInformation from './AccountInformation';
import HireTeacher from './HireTeacher';
import TeacherRequest from './TeacherRequest';
import TeacherHired from './TeacherHired';
import TeacherMessages from './TeacherMessages';
import BookNow from './BookNow';
import TeacherProfile from './TeacherProfile'

import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChatScreen from './ChatScreen';

export default function App() {

  const Stack = createNativeStackNavigator();

 
  
  return (
    <NavigationContainer>
    <Stack.Navigator >

    <Stack.Screen 
      name="Intro" 
      component={Intro}
      options={{
        headerShown:false
      }}
    />
    <Stack.Screen 
      name="Login" 
      component={Login}
      options={{
        headerShown:false
      }}
    />
     <Stack.Screen 
      name="SignUpOption" 
      component={SignUpOption}
      options={{
        headerShown:false
      }}
    />
    <Stack.Screen 
      name="RegisterStudent" 
      component={RegisterStudent}
      options={{
        headerShown:false
      }}
    />
    <Stack.Screen 
      name="Teacher" 
      component={Teacher}
      options={{
        headerShown:false
      }}
    />
    <Stack.Screen 
      name="Home" 
      component={Home}
      options={{
        headerShown:false
      }}
    />
        <Stack.Screen 
      name="TeacherHome" 
      component={TeacherHome}
      options={{
        headerShown:false
      }}
    />
        <Stack.Screen 
      name="TeacherDetail" 
      component={TeacherDetail}
      options={{
        headerShown:false
      }}
    />
            <Stack.Screen 
      name="TeacherProfile" 
      component={TeacherProfile}
      options={{
        headerShown:false
      }}
    />
            <Stack.Screen 
      name="HireTeacher" 
      component={HireTeacher}
      options={{
        headerShown:false
      }}
    />
                <Stack.Screen 
      name="BookNow" 
      component={BookNow}
      options={{
        headerShown:false
      }}
    />
     <Stack.Screen 
      name="TeacherHired" 
      component={TeacherHired}
      options={{
        headerShown:false
      }}
    />
                <Stack.Screen 
      name="TeacherRequest" 
      component={TeacherRequest}
      options={{
        headerShown:false
      }}
    />
    <Stack.Screen 
      name="Messages" 
      component={Messages}
      options={{
        headerShown:false
      }}
    />
     <Stack.Screen 
      name="TeacherMessages" 
      component={TeacherMessages}
      options={{
        headerShown:false
      }}
    />
    <Stack.Screen 
      name="ChatScreen" 
      component={ChatScreen}
      options={{
        headerShown:false
      }}
    />
        <Stack.Screen 
      name="TeacherChatScreen" 
      component={TeacherChatScreen}
      options={{
        headerShown:false
      }}
    />
    <Stack.Screen 
      name="UserProfile" 
      component={UserProfile}
      options={{
        headerShown:false
      }}
    />
        <Stack.Screen 
      name="AccountInformation" 
      component={AccountInformation}
      options={{
        headerShown:false
      }}
    />
    <Stack.Screen 
      name="Profile" 
      component={Profile}
      options={{
        headerShown:false
      }}
    />
    <Stack.Screen 
      name="NewPassword" 
      component={NewPassword}
      options={{
        headerShown:false
      }}
    />
   


    </Stack.Navigator>
  </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
