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
import { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export const TeacherBottomNav=(image,name)=>{


    const navigation=useNavigation();
  const [selectedIcon, setSelectedIcon] = useState('home');

  const profileHandle = (iconName) => {
    setSelectedIcon(iconName);
    navigation.navigate("UserProfile", { profileImage: image, name: name,role:"teacher" });
  };
  const messagesHandle = (iconName) => {
    setSelectedIcon(iconName);
    navigation.navigate("TeacherMessages");
  };

  const handleHiredTeacher = (iconName) => {
    setSelectedIcon(iconName);
    navigation.navigate("TeacherRequest");
  };
  const handleHome=(iconName)=>{
    setSelectedIcon(iconName);
    navigation.navigate("Home", {
      profileImage: image,
      name: name
    });  }

  return (
    <View style={styles.navContainer}>
      <View style={styles.navbar}>
        <TouchableOpacity
          style={styles.icon}
          onPress={() => handleHome("home")}
        >
          <FontAwesome
            name="home"
            size={25}
            style={{ color: selectedIcon === "home" ? "#e01f50" : "white" }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.icon}
          onPress={() => messagesHandle("comments")}
        >
          <FontAwesome
            name="comments"
            size={25}
            style={{
              color: selectedIcon === "comments" ? "#e01f50" : "white",
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.icon}
          onPress={() => handleHiredTeacher("calendar")}
        >
          <FontAwesome
            name="calendar"
            size={25}
            style={{ color: selectedIcon === "calendar" ? "#e01f50" : "white" }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.icon}
          onPress={() => profileHandle("user")}
        >
          <FontAwesome
            name="user"
            size={25}
            //   onPress={profileHandle}
            style={{ color: selectedIcon === "user" ? "#e01f50" : "white" }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const BottomNav = (image,name) => {

    const navigation=useNavigation();
  const [selectedIcon, setSelectedIcon] = useState('home');

  const profileHandle = (iconName) => {
    setSelectedIcon(iconName);
    navigation.navigate("UserProfile", { profileImage: image, name: name });
  };
  const messagesHandle = (iconName) => {
    setSelectedIcon(iconName);
    navigation.navigate("Messages");
  };

  const handleHiredTeacher = (iconName) => {
    setSelectedIcon(iconName);
    navigation.navigate("TeacherHired");
  };
  const handleHome=(iconName)=>{
    setSelectedIcon(iconName);
    navigation.navigate("Home",{ profileImage: image, name: name })
  }

  return (
    <View style={styles.navContainer}>
      <View style={styles.navbar}>
        <TouchableOpacity
          style={styles.icon}
          onPress={() => handleHome("home")}
        >
          <FontAwesome
            name="home"
            size={25}
            style={{ color: selectedIcon === "home" ? "#e01f50" : "white" }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.icon}
          onPress={() => messagesHandle("comments")}
        >
          <FontAwesome
            name="comments"
            size={25}
            style={{
              color: selectedIcon === "comments" ? "#e01f50" : "white",
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.icon}
          onPress={() => handleHiredTeacher("calendar")}
        >
          <FontAwesome
            name="calendar"
            size={25}
            style={{ color: selectedIcon === "calendar" ? "#e01f50" : "white" }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.icon}
          onPress={() => profileHandle("user")}
        >
          <FontAwesome
            name="user"
            size={25}
            //   onPress={profileHandle}
            style={{ color: selectedIcon === "user" ? "#e01f50" : "white" }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
    padding:10
  },
});
