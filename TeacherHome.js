import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Image,
  Alert,
  Pressable,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Searchbar } from "react-native-paper";
import { getStudentList } from "./Firebase/GetStudent";
import {
  getAuth,
 } from "firebase/auth";

import { useNavigation, useRoute } from "@react-navigation/native";
import { getTeachersList } from "./Firebase/GetTeachers";
import { getTeacher } from "./Firebase/GetTeachers";
import TeacherDetail from "./TeacherDetail";
import { TeacherBottomNav } from "./BottomNav";
export default function TeacherHome() {
  
  const [studentList, setStudentList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredStudents,setFilteredStudents]=useState([]);
  const [selectedIcon, setSelectedIcon] = useState("home");
  const[name1,setName1]=useState('');
  const[image1,setImage1]=useState('');

  const currentDate = new Date();
  const auth=getAuth();
  const time = currentDate.getHours();
  let greetingtext = "";
  const img1 = require("./images/web.jpg");

  if (time >= 0 && time < 12) {
    greetingtext = "Good Morning";
  } else if (time >= 12 && time <= 16) {
    greetingtext = "Good Afternoon";
  } else if (time >= 16 && time <= 18) {
    greetingtext = "Good Evening";
  } else if (time >= 18 && time <= 24) {
    greetingtext = "Good Night";
  }

  const route = useRoute();

  
  const navigation = useNavigation();
  const name = route.params.name;
  const image = route.params.profileImage;
  const role=route.params.role;

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getStudentList();
        setStudentList(Object.values(data));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getData();
  }, []);

  useEffect(()=>{
   
      studentList.map((student)=>{
        if(student.chat){
          for(const chat of student.chat){
            if(chat.senderUid===auth.currentUser.uid || chat.receiverUid===auth.currentUser.uid){
              setFilteredStudents((prevStudents)=>[...prevStudents,student]);
            }
          }
          console.log("filtered",[...new Set(filteredStudents)]);
        }
      })
//      setFilteredStudents([...new Set(filteredStudents)]);
  },[studentList])


  
  const handleProfile = () => {
    console.log(image,name)
    navigation.navigate("UserProfile", { profileImage: image,name:name,role:role });
  };
  const messagesHandle = () => {
    navigation.navigate("TeacherMessages");
  };

  const handleIconPress = (iconName) => {
    setSelectedIcon(iconName);
  };
  const goToChatScreen = (uid) => {
    navigation.navigate("TeacherChatScreen", { studentUid: uid });
  };

  
  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: "white" }}>
      <View
        style={{
          flex: 0.30,
          backgroundColor: "#06161C",
          borderBottomRightRadius: 60,
          borderBottomLeftRadius: 60,
        }}
      >
        <View
          style={{
            flex: 1,
            marginLeft: 35,
            flexDirection: "row",
            alignItems: "center",
            marginTop: 50,
          }}
        >
          {/* <FontAwesome name="bars" size={20} style={{ color: 'white' }} /> */}
          <Image
            source={{ uri: image }}
            style={{
              width: 45,
              height: 45,
              borderRadius: 50,
              borderColor:'white',
              borderWidth:1,
            }}
          />
          <Text style={{ color: "white", fontSize: 23, marginLeft: 20 }}>
            Hi, {name} !
          </Text>
        </View>

        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 50,
          }}
        >
          <Text
            style={{
              color: "#f2f4f5",
              fontSize: 15,
              width: "90%",
              marginLeft: 30,
              marginTop: 20,
            }}
          >
            {greetingtext}
          </Text>
         
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "white",
              borderRadius: 20,
              height: 35,
              width: "80%",
              marginTop: 20,
            }}
          >
            <FontAwesome
              name="search"
              size={15}
              style={{ color: "black", marginRight: 5, paddingLeft: 15 }}
            />
            <TextInput
              style={{ height: 35, paddingLeft: 15 }}
              placeholder="Search"
              placeholderTextColor="#364c59"
              onChangeText={(query) => setSearchQuery(query)}
            />
          </View>
        </View>
      </View>
      

      <View style={{ flex: 0.6, marginTop: 20 }}>
      <Text
      style={{fontSize:25,fontWeight:'bold',
      marginLeft:15,marginBottom:15}}>Students</Text>
        <FlatList
          data={[...new Set(filteredStudents)]}
          keyExtractor={(item) => item.uid}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.teacherItemContainer}
              onPress={() => goToChatScreen(item.id)}
            >
              <Image
                source={{ uri: item.profileImage }}
                style={styles.profileImage}
              />
              <View style={styles.textContainer}>
                <Text style={styles.nameText}>
                  {item.firstName} {item.lastName}
                </Text>
                <Text>{item.email}</Text>
                {/* Add more information as needed */}
              </View>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* <View style={styles.navContainer}>
        <View style={styles.navbar}>
          <TouchableOpacity
            style={styles.icon}
            onPress={() => handleIconPress("home")}
          >
            <FontAwesome name="home" size={25} style={{ color: "white" }} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.icon}
            onPress={() => handleIconPress("comments")}
          >
            <FontAwesome
              name="comments"
              size={25}
              onPress={messagesHandle}
              style={{ color: "white" }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.icon}
            onPress={() => handleIconPress("gear")}
          >
            <FontAwesome name="gear" size={25} style={{ color: "white" }} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.icon}
            onPress={() => handleIconPress("user")}
          >
            <FontAwesome
              name="user"
              size={25}
              onPress={handleProfile}
              style={{ color: "white" }}
            />
          </TouchableOpacity>
        </View>
      </View> */}

      {/* <View style={styles.navContainer}>
        <View style={styles.navbar}>
          <TouchableOpacity
            style={styles.icon}
            onPress={() => handleIconPress("home")}
          >
            <FontAwesome
              name="home"
              size={25}
              style={{ color: selectedIcon === "home" ? "#e01f50" : "white" }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.icon}
            onPress={() => messagesHandle()}
          >
            <FontAwesome
              name="comments"
              size={25}
              // onPress={messagesHandle}
              style={{
                color: selectedIcon === "comments" ? "#e01f50" : "white",
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.icon}
            onPress={() => handleIconPress("gear")}
          >
            <FontAwesome
              name="gear"
              size={25}
              style={{ color: selectedIcon === "gear" ? "#e01f50" : "white" }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.icon}
            onPress={() => handleIconPress("user")}
          >
            <FontAwesome
              name="user"
              size={25}
              onPress={handleProfile}
              style={{ color: selectedIcon === "user" ? "#e01f50" : "white" }}
            />
          </TouchableOpacity>
        </View>
      </View> */}
      <TeacherBottomNav image={image} name={name}></TeacherBottomNav>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  // ... (existing styles)

  teacherItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  textContainer: {
    marginLeft: 10,
  },
  nameText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  navContainer: {
    flex: 0.1,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 30,
    width: "100%",
  },
  navbar: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "80%",
    backgroundColor: "#06161C",
    borderRadius: 20,
  },
  icon: {
    padding: 10,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
