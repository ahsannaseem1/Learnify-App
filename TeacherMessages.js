import { StatusBar } from 'expo-status-bar';
import React, { cloneElement, useState,useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList,Image, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { SearchBar } from 'react-native-elements';
import { getTeachersList } from './Firebase/GetTeachers';
import { getStudentList } from './Firebase/GetStudent';
import { getAuth } from 'firebase/auth';
import { GetCurrentUser } from './Firebase/GetCurrentUser';
import { TeacherBottomNav } from './BottomNav';

const message = [
    { id: 0, name: 'Ahsan', text: 'Assalam o Alaikum', img: require('./images/Ahsan.jpg') },
    { id: 1, name: 'Babar', text: 'How are you?', img: require('./images/Ahsan.jpg') },
    { id: 2, name: 'Shaheen', text: 'How are you?', img: require('./images/Ahsan.jpg') },
    { id: 3, name: 'Abdullah', text: 'How are you?', img: require('./images/Ahsan.jpg') },
    { id: 4, name: 'Sameer', text: 'How are you?', img: require('./images/Ahsan.jpg') },
    { id: 5, name: 'Anaya', text: 'How are you?', img: require('./images/Ahsan.jpg') },
    { id: 6, name: 'Minahil', text: 'How are you?', img: require('./images/Ahsan.jpg') },

]

export default function TeacherMessages() {
    const [image,setImage]=useState('');
    const [name,setName]=useState('');
    useEffect(()=>{
        const getUser=async()=>{
            const user=await GetCurrentUser(role='Teacher');
            if(user){
                setImage(user.profileImage);
                setName(user.firstName);
            }
            
        }
        getUser();
    },[])
    const [hireRequests, setHireRequests] = useState([]);
    const [messages,setMessages]=useState([]);
    const auth=getAuth();

    useEffect(() => {
        const getStudentChat = async () => {
          try {
            let teachers = await getStudentList();
            teachers=Object.values(teachers)
            const currentUserUid = auth.currentUser.uid;
      
            // Filter teachers based on chat array
            const filteredTeachers = teachers.filter((teacher) => {
              if (teacher.chat) {
                // Check if the current user's UID matches with receiverUid or senderUid in any message
                return teacher.chat.some(
                  (message) =>
                    message.receiverUid === currentUserUid || message.senderUid === currentUserUid
                );
              }
              return false; // If chat array is not present, exclude the teacher
            });
    
            setMessages(filteredTeachers);
            console.log("Last Message:", filteredTeachers[0].chat[filteredTeachers[0].chat.length - 1]);
        } catch (error) {
            console.log("Error getting student chat:", error);
          }
        };
      
        getStudentChat();
      }, []);
      
    const [selectedIcon, setSelectedIcon] = useState('comments');
    const handleIconPress = (iconName) => {
        setSelectedIcon(iconName);
    };


    const navigation = useNavigation();

    const homeHandle = () => {

        navigation.navigate('Home')
    }
    const chatHandle = (item) => {
        console.log(item.uid)
        navigation.navigate('TeacherChatScreen',{studentUid:item.uid,name:name,image:image})
    }
    const profileHandle = () => {

        navigation.navigate('UserProfile')
    }

    const handleHiredTeacher=()=>{
        navigation.navigate("TeacherRequest")
      }
    return (
        <View style={{ flex: 1, backgroundColor: '#06161C', }}>
            <View style={{ flex: 0.10, alignItems: 'center', flexDirection: 'row', marginTop: 30, backgroundColor: '#06161C', }}>
                <FontAwesome name="angle-left" size={30} style={{ color: 'white', marginLeft: 15 }} onPress={homeHandle} />
                <View style={{ flex: 1, alignItems: 'center', marginRight: 25 }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>Chats</Text>
                </View>
            </View> 

            <View style={{ flex: 0.90, borderStartStartRadius: 50, borderStartEndRadius: 50, backgroundColor: 'white', }}>
                <View style={{ flex: 0.15, justifyContent: 'center', alignItems: 'center' }}>


                    <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', height: 45, width: '80%', borderBottomWidth: 1, borderRadius: 20 }}>
                        <FontAwesome name="search" size={15} style={{ color: 'black', marginRight: 5, paddingLeft: 15 }} />
                        <TextInput
                            style={{ height: 35, paddingLeft: 15, }}
                            placeholder='Search'
                            placeholderTextColor='#364c59'
                        />
                    </View>
                </View>
                <View style={{flex: 0.75, marginTop: 10}}>
  {messages && messages.length > 0 ? (
    <FlatList
      data={messages}
      keyExtractor={(item) => item.uid}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.itemContainer} onPress={() => chatHandle(item)}>
          <Image source={{ uri: item.profileImage }} style={styles.avatar} />
          <View style={styles.messageContainer}>
            <Text style={styles.name}>{item.firstName}</Text>
            <Text style={styles.text}>
              {item.chat
                .filter(
                  (message) =>
                    message.senderUid === auth.currentUser.uid || message.receiverUid === auth.currentUser.uid
                )
                .slice(-1)[0]?.text}
            </Text>
          </View>
        </TouchableOpacity>
      )}
    />
  ) : (
    <Text style={{ color: 'white', textAlign: 'center' }}>No messages to display.</Text>
  )}
</View>



{/* 
                <View style={styles.navContainer}>
                    <View style={styles.navbar}>
                        <TouchableOpacity
                            style={styles.icon}
                            onPress={() => handleIconPress('home')}
                        >
                            <FontAwesome
                                name="home"
                                size={25}
                                onPress={homeHandle}
                                style={{ color: selectedIcon === 'home' ? '#e01f50' : 'white' }}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.icon}
                            onPress={() => handleIconPress('comments')}
                        >
                            <FontAwesome
                                name="comments"
                                size={25}

                                style={{ color: selectedIcon === 'comments' ? '#e01f50' : 'white' }}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.icon}
                            onPress={() => handleHiredTeacher()}
                        >
                            <FontAwesome
                                name="gear"
                                size={25}
                                style={{ color: selectedIcon === 'gear' ? '#e01f50' : 'white' }}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.icon}
                            onPress={() => handleIconPress('user')}
                        >
                            <FontAwesome
                                name="user"
                                size={25}
                                onPress={profileHandle}
                                style={{ color: selectedIcon === 'user' ? '#e01f50' : 'white' }}
                            />
                        </TouchableOpacity>
                    </View>
                </View> */}




            </View>
<TeacherBottomNav image={image} name={name}></TeacherBottomNav>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    navContainer: {
        flex: 0.1,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 30,
        width: '100%',

    },
    navbar: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '80%',
        backgroundColor: '#06161C',
        borderRadius: 20,
    }, icon: {
        padding: 10,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tapbutton: {
        flex: 1,
        flexDirection: 'row',
        height: 35,
        width: 100,
        padding: 5,
        marginRight: 2,
        marginLeft: 15,
        backgroundColor: '#06161C',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        borderWidth: 1

    },
    itemContainer: {
      flexDirection: 'row',
      marginBottom: 25,
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft:15,
    },
    avatar: {
      width: 60,
      height: 60,
      borderRadius: 50,
      marginRight: 15,
    },
    messageContainer: {
      flex: 1,
      height:65,
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
      
    },
    name: {
      fontWeight: 'bold',
      marginBottom: 5,
      fontSize:16
    },
    text: {
    
    },
});
