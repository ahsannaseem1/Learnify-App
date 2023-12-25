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
  ScrollView
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Searchbar } from "react-native-paper";
import { useNavigation, useRoute } from "@react-navigation/native";
import { getTeachersList } from "./Firebase/GetTeachers";
import { getTeacher } from "./Firebase/GetTeachers";
import TeacherDetail from "./TeacherDetail";

export default function Home() {
  const currentDate = new Date();
  const time = currentDate.getHours();
  let greetingtext = "";
  const img1 = require("./images/web.jpg");

  if (time >= 0 && time < 12) {
    greetingtext = "Good Morning";
  } else if (time > 12 && time <= 16) {
    greetingtext = "Good Afternoon";
  } else if (time > 16 && time <= 18) {
    greetingtext = "Good Evening";
  } else if (time > 18 && time <= 24) {
    greetingtext = "Good Night";
  }

  var subjects = [
    { id: 0, title: "All" },
    { id: 1, title: "Islamiyat" },
    { id: 2, title: "English" },
    { id: 3, title: "Urdu" },
    { id: 4, title: "Maths" },
    { id: 5, title: "Science" },
    { id: 6, title: "Pakistan St" },
  ];

  var courses = [
    { id: 0, heading: "All", price: "$1" },
    { id: 1, heading: "Islamiyat", price: "$1" },
    { id: 2, heading: "English", price: "$1" },
    { id: 3, heading: "Urdu", price: "$1" },
  ];

  const [selectedSubject, setSelectedSubject] = useState(subjects[0].title);
  const [selectedIcon, setSelectedIcon] = useState("home");
  const [teacherList, setTeacherList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const route = useRoute();
  const name = route.params.name;
  const image = route.params.profileImage;
  console.log(image)
  
  const navigation = useNavigation();

  const profileHandle = () => {
    navigation.navigate("UserProfile", { profileImage: image, name: name });
  };
  const messagesHandle = () => {
    navigation.navigate("Messages");
  };
  const handleIconPress = (iconName) => {
    setSelectedIcon(iconName);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getTeachersList();
        setTeacherList(Object.values(data));
        // console.log("home data", data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getData();
  }, []);

  const goToTeacherDetail = (uid) => {
    console.log(uid)
    navigation.navigate("TeacherProfile", { teacherUid: uid });
    // navigation.navigate("TeacherProfile")    
  };
  const getSubject = (item) => {
    console.log(item);
    setSelectedSubject(item);
  };

  const handleHiredTeacher = () => {
    navigation.navigate("TeacherHired")
  }
  const renderTeacherItem = ({ item }) => (
    <TouchableOpacity onPress={() => goToTeacherDetail(item.uid)}>
      {(selectedSubject === "All" || item.category === selectedSubject) && (
        <View style={styles.teacherItemContainer}>
          <Image
            source={{ uri: item.profileImage }}
            style={styles.profileImage}
          />
          <View style={styles.textContainer}>
            <Text
              style={styles.nameText}
            >{`${item.firstName} ${item.lastName}`}</Text>
            <Text>{`Email: ${item.email}`}</Text>
            <Text>{`Category: ${item.category}`}</Text>
            <Text>{`City: ${item.city}`}</Text>
            <Text>{`Education: ${item.education}`}</Text>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );

  const filteredTeacherList = teacherList.filter(
    (teacher) =>
      (selectedSubject === "All" || (teacher.category && teacher.category === selectedSubject)) &&
      (teacher.category && teacher.category.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: "white" }}>
      <View
        style={{
          flex: 0.6,
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
            marginTop: 30,
            marginBottom: 10
          }}
        >
          <Image
            source={{ uri: image }}
            style={{
              width: 35,
              height: 35,
              borderRadius: 50,
              borderColor: 'white',
              borderWidth: 1
            }}
          />
          <Text style={{ color: "white", fontSize: 20, marginLeft: 10 }}>
            Hi, {name}!
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
              marginBottom: 0,
            }}
          >
            {greetingtext}
          </Text>
          <Text
            style={{
              color: "white",
              fontSize: 25,
              width: "90%",
              marginLeft: 30,
              marginTop: 10,
              fontWeight: "bold",
            }}
          >
            Find Expert Tutors for Academic Excellence!
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


      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>


        <View style={{ flex: 1, marginTop: 20 }}>
          <Text
            style={{
              fontSize: 25,
              fontWeight: "bold",
              marginLeft: 15,
              marginBottom: 15,
            }}
          >
            Categories
          </Text>



          <View>
            {teacherList && teacherList.length > 0 ? (
              <FlatList
                horizontal
                pagingEnabled={true}
                showsHorizontalScrollIndicator={false}
                data={subjects}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={[
                      styles.tapbutton,
                      {
                        backgroundColor:
                          selectedSubject === item.title ? "#e01f50" : "white",
                        borderWidth: selectedSubject === item.title ? 0 : 1,
                      },
                    ]}
                    onPress={() => getSubject(item.title)}
                  >
                    <View>
                      <Text
                        style={{
                          color:
                            selectedSubject === item.title ? "white" : "#06161C",
                        }}
                      >
                        {" "}
                        {item.title}{" "}
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item.title}
              />
            ) : (
              <Text>Loading...</Text>
            )}
          </View>
        </View>

        <View style={{ flex: 0.4, marginTop: 20 }}>
          <Text style={{ fontSize: 25, fontWeight: 'bold', marginLeft: 15, marginBottom: 15 }}>Our Teachers</Text>

          {/* Display the teacher list or the message */}
          {filteredTeacherList.length > 0 ? (
            <FlatList
              data={filteredTeacherList}
              keyExtractor={(item) => `${selectedSubject}_${item.email}`}
              renderItem={renderTeacherItem}
            />
          ) : (
            <Text style={{ margin: 80 }}>
              No available teachers for {selectedSubject}
            </Text>
          )}
        </View>

      </ScrollView>

      <View style={styles.navContainer}>
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
              style={{
                color: selectedIcon === "comments" ? "#e01f50" : "white",
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.icon}
            onPress={() => handleHiredTeacher()}
          >

            <FontAwesome
              name="calendar"
              size={25}
              style={{ color: selectedIcon === "calendar" ? "#e01f50" : "white" }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.icon}
            onPress={() => handleIconPress("user")}
          >
            <FontAwesome
              name="user"
              size={25}
              onPress={profileHandle}
              style={{ color: selectedIcon === "user" ? "#e01f50" : "white" }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  navContainer: {
    flex: 0.1,
    alignItems: "center",
    justifyContent: "center",
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
  tapbutton: {
    flex: 1,
    flexDirection: "row",
    height: 35,
    width: 100,
    padding: 5,
    marginRight: 2,
    marginLeft: 15,
    backgroundColor: "#06161C",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    borderWidth: 1,
  },
  button: {
    alignItems: "center",
    backgroundColor: "green",
    padding: 10,
  },
  cardContainer: {
    width: "40%",
    backgroundColor: "#fafcfa",
    borderRadius: 15,
    marginLeft: 15,
    height: 130,
  },
  cardImage: {
    width: "100%",
    height: "60%",
    borderStartEndRadius: 10,
    borderStartStartRadius: 10,
  },
  cardHeading: {
    fontSize: 13,
    fontWeight: "bold",
    marginTop: 8,
    marginLeft: 10,
  },
  cardPrice: {
    fontSize: 12,
    marginTop: 10,
    marginLeft: 10,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
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
});
