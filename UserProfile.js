import { StatusBar } from "expo-status-bar";
import React, { cloneElement, useState } from "react";
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
import { useNavigation, useRoute } from "@react-navigation/native";
import Checkbox from "expo-checkbox";
import { GetCurrentUser } from "./Firebase/GetCurrentUser";
import { useEffect } from "react";
import { getAuth } from "firebase/auth";

export default function Profile() {
    const auth=getAuth();
  const route = useRoute();
  const img1 = require("./images/Ahsan.jpg");
  const profileImage = route.params.profileImage;
  const role=route.params.role
  const [student, setStudent] = useState();

  const navigation = useNavigation();

  const loginHandle = () => {
    navigation.navigate("Login");
  };
  const homeHandle = () => {
    navigation.navigate("Home");
  };
  const passwordHandle = () => {
    navigation.navigate("NewPassword");
  };

  useEffect(() => {
    const getStudent = async () => {
      const studentData = await GetCurrentUser(role);
      setStudent(studentData);
      console.log("userprofile", student);
    };
    getStudent();
    // console.log("current usr is", auth.currentUser);
  }, []);
  

  useEffect(() => {}, [student]);

  const handleAccountInfo=()=>{
    navigation.navigate("AccountInformation",{role:role});
  }
  return (
    student && (
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
            onPress={homeHandle}
          />
          <View style={{ flex: 1, alignItems: "center", marginRight: 25 }}>
            <Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>
              Profile
            </Text>
          </View>
        </View>

        <View
          style={{
            flex: 0.9,
            borderStartStartRadius: 50,
            borderStartEndRadius: 50,
            backgroundColor: "white",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              flex: 0.3,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View style={{ marginTop: 30 }}>
              <Image
                style={{ width: 100, height: 100, borderRadius: 50 }}
                source={{ uri: student.profileImage }}
              ></Image>
            </View>
            <View style={{ marginTop: 20 }}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                {student.firstName + " " + student.lastName}
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  color: "#6b6969",
                  marginTop: 5,
                  textAlign: "center",
                }}
              >
                {student.email}
              </Text>
            </View>
          </View>

          <View
            style={{
              flex: 0.45,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                flex: 0.15,
                backgroundColor: "#fcfcfc",
                borderRadius: 20,
                width: "80%",
                height: "10%",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingLeft: 9,
              }}
            >
              <TouchableOpacity
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
                onPress={handleAccountInfo}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginLeft: 10,
                  }}
                >
                  <FontAwesome
                    name="user"
                    size={20}
                    style={{ color: "black" }}
                  />
                  <Text style={{ fontWeight: "bold", marginLeft: 10 }}>
                    Account Information
                  </Text>
                </View>
                <FontAwesome
                  name="angle-right"
                  size={20}
                  style={{ color: "black", marginRight: 10 }}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                flex: 0.15,
                backgroundColor: "#fcfcfc",
                borderRadius: 20,
                width: "80%",
                height: "10%",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 20,
                paddingLeft: 9,
              }}
            >
              <TouchableOpacity
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
                onPress={passwordHandle}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginLeft: 10,
                  }}
                >
                  <FontAwesome
                    name="lock"
                    size={20}
                    style={{ color: "black" }}
                  />
                  <Text style={{ fontWeight: "bold", marginLeft: 10 }}>
                    Change Password
                  </Text>
                </View>
                <FontAwesome
                  name="angle-right"
                  size={20}
                  style={{ color: "black", marginRight: 10 }}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              flex: 0.2,
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
            }}
          >
            <TouchableOpacity onPress={loginHandle}>
              <View
                style={{
                  backgroundColor: "#06161C",
                  borderRadius: 20,
                  width: 300,
                  height: 35,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ color: "white", textAlign: "center" }}>
                  Log out
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
