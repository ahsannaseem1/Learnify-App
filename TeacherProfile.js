import { StatusBar } from "expo-status-bar";
import React, { cloneElement, useState, useEffect } from "react";
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
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Searchbar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import Checkbox from "expo-checkbox";
import { Feather } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { format, startOfWeek, addDays } from "date-fns";
import { getStudentWithUid } from "./Firebase/GetStudent";
import { getAuth } from "firebase/auth";
import { getTeacher } from "./Firebase/GetTeachers";
import { useRoute } from "@react-navigation/native";
import {
  addHireRequestInStudent,
  addHireRequestInTeacher,
} from "./Firebase/HireRequestToTeacher";

export default function TeacherProfile() {
  const route = useRoute();

  const auth = getAuth();
  const studentUid = auth.currentUser.uid;

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [teacherDetail, setTeacherDetail] = useState(null);
  const [student, setStudent] = useState();
  const [selectedDay, setSelectedDay] = useState();

  useEffect(() => {
    const getTeacherDetails = async () => {
      try {
        const teacherData = await getTeacher(route.params?.teacherUid);
        setTeacherDetail(teacherData);
      } catch (error) {
        console.error("Error fetching teacher details:", error);
      }
    };
    getTeacherDetails();
  }, [route.params?.teacherUid]);

  useEffect(() => {
    const getStudent = async () => {
      const studentData = await getStudentWithUid(studentUid);
      setStudent(studentData);
    };
    getStudent();
  }, []);

  var time = [
    { id: 0, time: "01:00 pm" },
    { id: 1, time: "02:00 pm" },
    { id: 2, time: "03:00 pm" },
    { id: 3, time: "04:00 pm" },
    { id: 4, time: "05:00 pm" },
    { id: 5, time: "06:00 pm" },
    { id: 6, time: "07:00 pm" },
    { id: 7, time: "08:00 pm" },
  ];
  
  const daysInWeek = 7;

  const getWeekDays = () => {
    const today = new Date();
    const startOfCurrentWeek = startOfWeek(today);

    const weekDays = Array.from({ length: daysInWeek }, (_, index) => {
      const currentDate = addDays(startOfCurrentWeek, index);
      return {
        id: index,
        date: format(currentDate, 'dd'),
        day: format(currentDate, 'E'),
      };
    });

    return weekDays;
  };

  const confirmHire = () => {
    Alert.alert(
      "Confirm Hire",
      "Are you sure you want to hire this teacher?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => {
            const data = {
              studentUid: studentUid,
              teacherUid: teacherDetail.uid,
              teacherName:
                teacherDetail.firstName + " " + teacherDetail.lastName,
              teacherProfileImage: teacherDetail.profileImage,
              date: selectedDate,
              time: selectedTime,
              request: "pending",
              name: student.firstName + " " + student.lastName,
              studentImage: student.profileImage,
            };
            addHireRequestInTeacher(data);
            addHireRequestInStudent(data);
            Alert.alert("Hire Confirmed", "Teacher hired successfully!");
            navigation.goBack();
          },
        },
      ],
      { cancelable: false }
    );
  };

  const navigation = useNavigation();

  const homeHandle = () => {
    navigation.navigate("Home");
  };

  const bookingHandle = () => {
    if (!selectedDay || !selectedTime || !selectedDate) {
      Alert.alert(
        "Select Day and Time",
        "Please select a day and time before making an appointment."
      );
      return;
    } else {
      confirmHire();
    }
  };

  const selectDayAndDate = (item) => {
    setSelectedDate(item.date);
    setSelectedDay(item.day);
  };

  const goToChatScreen = () => {
    navigation.navigate("ChatScreen", { teacherUid: teacherDetail.uid });
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#06161C" }}>
      <View
        style={{
          flex: 0.1,
          alignItems: "center",
          flexDirection: "row",
          marginTop: 30,
          backgroundColor: "#06161C",
        }}
      >
        <FontAwesome
          name="angle-left"
          size={30}
          style={{ color: "white", marginLeft: 15 }}
        />
        <View style={{ flex: 1, alignItems: "center", marginRight: 15 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>
            Teacher's Profile
          </Text>
        </View>
      </View>

      {teacherDetail ? (
        <View
          style={{
            flex: 0.9,
            borderStartStartRadius: 50,
            borderStartEndRadius: 50,
            backgroundColor: "white",
          }}
        >
          <View style={{ flexDirection: "row", marginLeft: 20 }}>
            <View style={{ marginTop: 30 }}>
              <Image
                style={{ width: 80, height: 80, borderRadius: 50 }}
                source={{ uri: teacherDetail.profileImage }}
              ></Image>
            </View>
            <View style={{ marginTop: 40, marginLeft: 20 }}>
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                {teacherDetail.firstName + " " + teacherDetail.lastName}
              </Text>
              <Text style={{ fontSize: 15, color: "#6b6969", marginTop: 5 }}>
                {teacherDetail.education}
              </Text>
            </View>
          </View>

          <View
            style={{
              flex: 0.1,
              marginRight: 20,
              marginTop: 20,
              alignItems: "flex-end",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity onPress={() => goToChatScreen()}>
              <View
                style={{
                  backgroundColor: "#e01f50",
                  borderRadius: 15,
                  width: 150,
                  height: 35,
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "row",
                }}
              >
                <Feather name="message-circle" size={15} color="white" />
                <Text style={{ color: "white", marginLeft: 5, fontSize: 15 }}>
                  Message
                </Text>
              </View>
            </TouchableOpacity>
          </View>


          <View style={{ flex: 0.30, marginTop: 40 }}>
            <Text style={{ fontWeight: "bold", marginLeft: 20, fontSize: 20 }}>
              Teaching Hours
            </Text>
            <FlatList
  horizontal
  pagingEnabled={true}
  showsHorizontalScrollIndicator={false}
  data={time}
  renderItem={({ item }) => (
    <TouchableOpacity
      style={{
        padding: 5,
        marginTop: 20,
        height: "40%",
        width: 120,
        borderRadius: 10,
        marginRight: 5,
        marginLeft: 15,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: selectedTime === item.time ? 0 : 1,
        backgroundColor:
          selectedTime === item.time ? "#e01f50" : "white",
      }}
      onPress={() => setSelectedTime(item.time)}
    >
      <View>
        <Text
          style={{
            color: selectedTime === item.time ? "#edebe8" : "#06161C",
          }}
        >
          {" "}
          {item.time}{" "}
        </Text>
      </View>
    </TouchableOpacity>
  )}
  keyExtractor={(item) => item.id.toString()}
/>

          </View>

          <View style={{ flex: 0.30 }}>
            <Text style={{ fontWeight: "bold", marginLeft: 20, fontSize: 20 }}>
              Select Date
            </Text>
            <FlatList
  horizontal
  pagingEnabled={true}
  showsHorizontalScrollIndicator={false}
  data={getWeekDays()}
  renderItem={({ item }) => (
    <TouchableOpacity
      style={{
        padding: 5,
        marginTop: 20,
        height: "80%",
        width: 50,
        borderRadius: 10,
        marginLeft: 20,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: selectedDay === item.day ? 0 : 1,
        backgroundColor:
          selectedDay === item.day ? "#e01f50" : "white",
      }}
      onPress={() => selectDayAndDate(item)}
    >
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: selectedDay === item.day ? "#edebe8" : "#06161C",
            fontWeight: "bold",
            fontSize: 20,
          }}
        >
          {" "}
          {item.date}{" "}
        </Text>
        <Text
          style={{
            color: selectedDay === item.day ? "#edebe8" : "#706f70",
            fontSize: 15,
            marginTop: 5,
          }}
        >
          {" "}
          {item.day}{" "}
        </Text>
      </View>
    </TouchableOpacity>
  )}
  keyExtractor={(item) => item.id.toString()}
/>

          </View>

          <View
            style={{
              flex: 0.30,
              marginLeft: 20,
              marginTop: 10,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity onPress={bookingHandle}>
              <View
                style={{
                  backgroundColor: "#e01f50",
                  borderRadius: 15,
                  width: 250,
                  height: 35,
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "row",
                }}
              >
                <FontAwesome5 name="calendar-day" size={15} color="white" />
                <Text style={{ color: "white", marginLeft: 10, fontSize: 15 }}>
                  Make Appointment
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View
          style={{ flex: 0.90, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            Loading teacher details...
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  tapbutton: {
    flexDirection: "row",
    height: "100%",
    width: 120,
    padding: 15,
    marginRight: 5,
    marginLeft: 20,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    borderWidth: 1,
  },
});
