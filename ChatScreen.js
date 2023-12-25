import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList,Button,TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation,useRoute } from '@react-navigation/native';
import { getDatabase, ref, onValue, set, update, get,serverTimestamp } from "firebase/database";
import {
  getAuth,
} from "firebase/auth";
import { app } from "./Config.js";
import { TextInput } from 'react-native-paper';


export default function ChatScreen() {
  
  const [messageText, setMessageText] = useState('');

  
  const route=useRoute();
  const teacherUid=route.params.teacherUid;
  console.log(teacherUid);
  const [messages, setMessages] = useState([]);
  const auth = getAuth();
  const studentUid = auth.currentUser.uid;

const navigation = useNavigation();

  const homeHandle = () => {
    navigation.navigate('Home');
  };

  const profileHandle = () => {
    navigation.navigate('UserProfile');
  };

  const addChatMessageInStudent = async (messageText) => {
    try {
      const db = getDatabase(app);
      const dbRef = ref(db, "student/" + studentUid);
  
      const snapshot = await get(dbRef);
  
      if (snapshot.exists()) {
        const userData = snapshot.val();
        const chatArray = userData.chat || []; // If chat doesn't exist, initialize as an empty array
  
        // Add the new message to the chat array
        chatArray.push({
          senderUid:studentUid,
          receiverUid:teacherUid,
          text: messageText,
          timestamp: new Date().getTime(), // You may use ServerValue.TIMESTAMP for the server's timestamp
        });
  
        // Update the database with the new chat array
        update(dbRef, { chat: chatArray });
  
        console.log("Chat message added successfully");
      } else {
        console.error("User data not found for UID:", uid);
      }
    } catch (error) {
      console.error("Error adding chat message:", error);
    }
  };
  const addChatMessageInTeacher = async (messageText) => {
    try {
      const db = getDatabase(app);
      const dbRef = ref(db, "Teacher/" + teacherUid);
  
      const snapshot = await get(dbRef);
  
      if (snapshot.exists()) {
        const userData = snapshot.val();
        const chatArray = userData.chat || []; // If chat doesn't exist, initialize as an empty array
  
        // Add the new message to the chat array
        chatArray.push({
          senderUid:studentUid,
          receiverUid:teacherUid,
          text: messageText,
          timestamp: new Date().getTime(), // You may use ServerValue.TIMESTAMP for the server's timestamp
        });
  
        // Update the database with the new chat array
        update(dbRef, { chat: chatArray });
  
        console.log("Chat message added successfully");
      } else {
        console.error("User data not found for UID:", uid);
      }
    } catch (error) {
      console.error("Error adding chat message:", error);
    }
  };
//   addChatMessage(currentUser, "Hello world!");
// addChatMessageInStudent("hi teacher");
// addChatMessageInTeacher("hi teacher");

useEffect(() => {
  const fetchMessages = async () => {
    try {
      const db = getDatabase();
      const dbRef = ref(db, 'Teacher/' + teacherUid);

      onValue(dbRef, (snapshot) => {
        const userData = snapshot.val();

        if (userData) {
          const messagesArray = userData.chat || [];

          // Filter messages based on senderUid or receiverUid matching current user's uid
          const filteredMessages = messagesArray.filter(
            (message) => message.senderUid === studentUid || message.receiverUid === studentUid
          );

          // Sort filtered messages by time
          filteredMessages.sort((a, b) => a.timestamp - b.timestamp);

          setMessages(filteredMessages);
        }
      });
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  fetchMessages();
}, [teacherUid, studentUid]);


  useEffect(()=>{
    // console.log("message",messages)
  },[messages])

  const sendMessage = () => {
    // Ensure the message text is not empty before sending
    if (messageText.trim() === '') {
      console.warn('Cannot send an empty message');
      return;
    }

    // Call the appropriate function to add the message based on user role
      addChatMessageInStudent(messageText);
      addChatMessageInTeacher(messageText);

    // Clear the message input after sending
    setMessageText('');
  };
  
  const renderMessage = ({ item }) => {

    if(item){
      const isCurrentUserSender = item.senderUid === studentUid;
  
      return (
        <View style={isCurrentUserSender ? styles.senderMessage : styles.receiverMessage}>
          <Text style={styles.messageText}>{item.text}</Text>
        </View>
      );
    };
    }
   
  

  return (
    <View style={{flex:1,marginTop:40}}>

   
    {/* <View style={{ flex: 1, backgroundColor: '#06161C' }}>
      <View style={{ flex: 0.10, alignItems: 'center', flexDirection: 'row', marginTop: 30, backgroundColor: '#06161C' }}>
        <FontAwesome name="angle-left" size={30} style={{ color: 'white', marginLeft: 15 }} onPress={homeHandle} />
        <View style={{ flex: 1, alignItems: 'center', marginRight: 25 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>Chats</Text>
        </View>
      </View>

     
    </View> */}
   
    <View style={{ flex: 0.90}}>
        <FlatList
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}        />
      </View>
      {/* <TextInput>its me</TextInput> */}
      <View style={styles.messageInputContainer}>
  <TextInput
    style={styles.messageInput}
    placeholder="Type your message..."
    onChangeText={(text) => setMessageText(text)}
    value={messageText}
    multiline={true}
    numberOfLines={4}
  />
  <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
    <Text style={styles.sendButtonText}>Send</Text>
  </TouchableOpacity>
</View>

    </View>
  );
}

const styles = StyleSheet.create({
  senderMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#06161C', // Black background for sender message
    padding: 10,
    margin: 5,
    borderRadius: 10,
    maxWidth: '70%',
  },
  receiverMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#e01f50', // Pink background for receiver message
    padding: 10,
    margin: 5,
    borderRadius: 10,
    maxWidth: '70%',
  },
  messageText: {
    color: 'white', // White text color for both sender and receiver messages
  },
  messageInputContainer: {
    flex: 0.1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  messageInput: {
    flex: 1,
    borderRadius: 10,
    padding: 5,
    marginRight: 10,
    maxHeight: 50,
    minHeight: 40,
  },
  sendButton: {
    backgroundColor: '#e01f50',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  sendButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
