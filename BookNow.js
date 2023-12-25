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
import { useNavigation } from "@react-navigation/native";
import Checkbox from "expo-checkbox";
import { Feather } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

export default function BookNow() {
  const [isChecked, setChecked] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);

  const img1 = require("./images/Ahsan.jpg");

  const navigation = useNavigation();

  const TeacherProfileHandle = () => {
    navigation.navigate("TeacherProfile");
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
          onPress={TeacherProfileHandle}
        />
        <View style={{ flex: 1, alignItems: "center", marginRight: 15 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>
            Appointment
          </Text>
        </View>
      </View>

      <View
        style={{
          flex: 0.9,
          borderStartStartRadius: 50,
          borderStartEndRadius: 50,
          backgroundColor: "white",
        }}
      ></View>
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
