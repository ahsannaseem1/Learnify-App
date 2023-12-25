import { StatusBar } from "expo-status-bar";
import React, { useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Image,
  Alert,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { FontAwesome } from "@expo/vector-icons";
import { AddUser } from "./Firebase/AddUser.js";
import * as ImagePicker from "expo-image-picker";

export default function RegisterStudent() {
  const [fontsLoaded] = useFonts({
    Inconsolata: require("./assets/fonts/Inconsolata/Inconsolata.ttf"),
    Montserrat: require("./assets/fonts/Montserrat/Montserrat.ttf"),
  });

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [selectedImageName, setSelectedImageName] = useState();
  const [loading, setLoading] = useState(false);

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const navigation = useNavigation();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (name, value) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const signUp = async () => {
    try {
      // setLoading(true);

      if (
        formData.firstName.trim() === "" ||
        formData.email.trim() === "" ||
        formData.password.trim() === "" ||
        formData.confirmPassword.trim() === "" ||
        selectedImageName.trim === ""
      ) {
        setError("Please fill in all fields.");
        return;
      }

      const hasSpecialCharacters = /[^\w\s]/.test(
        formData.firstName + formData.lastName
      );
      if (hasSpecialCharacters) {
        setError("Name can only contain alphabets");
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        setError("Invalid email address.");
        return;
      }

      if (formData.password.length < 6) {
        setError("Password should be at least 6 characters long.");
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setError("Password and confirm Password do not match.");
        return;
      }
      setLoading(true);

      AddUser(
        formData.firstName,
        formData.lastName,
        formData.email,
        formData.password,
        selectedImageName
      )
        .then(({ user, errorCode }) => {
          if (user) {
            console.log("User data:", user.uid);
          } else {
            setError(errorCode);
            console.error("Error creating user:", errorCode);
          }
        })
        .catch((error) => {
          setError(error);
          console.error("Error creating user:", error);
        })
        .finally(() => {
          setLoading(false);
        });

      navigation.navigate("Login");
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred");
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    signUp();
  };

  const loginHandle = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    navigation.navigate("Login");
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setProfileImage(result.uri);
      setSelectedImageName(result.assets[0].uri); // Get the image name from the URI
      console.log(result);
    }
  };

  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setProfileImage(result.uri);
      console.log(result.uri);
    }
  };

  return (
    <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    style={{ flex: 1, backgroundColor: 'white' }}
  >
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View
        style={{
          flex: 0.1,
          flexDirection: "row",
          marginTop: 10,
          marginLeft: 20,
          alignItems: "center",
          marginTop: 40,
        }}
      >
        <FontAwesome
          name="angle-left"
          size={30}
          style={{ color: "#06161C" }}
          onPress={loginHandle}
        />
      </View>

      <View
        style={{
          flex: 0.1,
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <Text style={{ color: "#06161C", fontSize: 30, fontWeight: "bold" }}>
          Create Account
        </Text>
        <Text style={{ marginTop: 10, width: "70%", textAlign: "center" }}>
          Fill your information below or register with your social account.
        </Text>
      </View>

      <View
        style={{ flex: 0.4, alignItems: "center", justifyContent: "center" }}
      >
        <View>
          <View style={{ flexDirection: "row" }}>
            <TextInput
              style={{
                width: 150,
                height: 35,
                borderRadius: 5,
                paddingLeft: 10,
                marginRight: 15,
                borderBottomWidth: 1,
              }}
              placeholder="First Name"
              placeholderTextColor="#364c59"
              onChangeText={(text) => handleChange("firstName", text)}
              value={formData.firstName}
            />
            <TextInput
              style={{
                width: 150,
                height: 35,
                borderRadius: 5,
                paddingLeft: 10,
                borderBottomWidth: 1,
              }}
              placeholder="Last Name"
              placeholderTextColor="#364c59"
              onChangeText={(text) => handleChange("lastName", text)}
              value={formData.lastName}
            />
          </View>
          <TextInput
            style={{
              width: 315,
              height: 35,
              borderRadius: 5,
              paddingLeft: 10,
              marginTop: 20,
              borderBottomWidth: 1,
            }}
            placeholder="Email"
            placeholderTextColor="#364c59"
            onChangeText={(text) => handleChange("email", text)}
            value={formData.email}
          />

          <View>
            <TextInput
              style={{
                width: 315,
                height: 35,
                marginTop: 20,
                borderRadius: 5,
                paddingLeft: 10,
                borderBottomWidth: 1,
              }}
              placeholder="Password"
              placeholderTextColor="#364c59"
              secureTextEntry={!passwordVisible}
              onChangeText={(text) => handleChange("password", text)}
              value={formData.password}
            />
            <TouchableOpacity
              onPress={togglePasswordVisibility}
              style={{
                position: "absolute",
                right: 10,
                top: 29,
              }}
            >
              {passwordVisible ? (
                <FontAwesome name="eye" size={15} />
              ) : (
                <FontAwesome name="eye-slash" size={15} />
              )}
            </TouchableOpacity>
          </View>
          <View>
            <TextInput
              style={{
                width: 315,
                height: 35,
                marginTop: 20,
                borderRadius: 5,
                paddingLeft: 10,
                borderBottomWidth: 1,
              }}
              placeholder="Confirm Password"
              placeholderTextColor="#364c59"
              secureTextEntry={!confirmPasswordVisible}
              onChangeText={(text) => handleChange("confirmPassword", text)}
              value={formData.confirmPassword}
            />
            <TouchableOpacity
              onPress={toggleConfirmPasswordVisibility}
              style={{
                position: "absolute",
                top: 29,
                right: 10,
              }}
            >
              {confirmPasswordVisible ? (
                <FontAwesome name="eye" size={15} />
              ) : (
                <FontAwesome name="eye-slash" size={15} />
              )}
            </TouchableOpacity>
            <View
              style={{
                flex: 0.2,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 30,

              }}
            >
              <TouchableOpacity onPress={pickImage}>
                <View
                  style={{
                    backgroundColor: "#06161C",
                    borderRadius: 5,
                    width: 150,
                    height: 35,
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: 10,
                  }}
                >
                  <Text style={{ color: "white", textAlign: "center" }}>
                    Select Image
                  </Text>
                </View>
                {/* <Text>{selectedImageName}</Text> */}
              </TouchableOpacity>
              <TouchableOpacity onPress={takePhoto}>
                <View
                  style={{
                    backgroundColor: "#06161C",
                    borderRadius: 5,
                    width: 150,
                    height: 35,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ color: "white", textAlign: "center" }}>
                    Take Photo
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            {error && <Text style={{ color: "#ED2B2A" }}>{error}</Text>}
          </View>
          {/* <View>
      {selectedImageName ? (

        <Image
          source={{ uri: selectedImageName }}
          style={{ width: 200, height: 200 }}
        />
      ) : (
        <Text>No image selected</Text>
      )}
      {imageName && <Text>{imageName}</Text>}
    </View> */}
        </View>

        <View
          style={{
            flex: 0.05,
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            marginTop: 10,
          }}
        >
          <TouchableOpacity onPress={handleSubmit}>
            <View
              style={{
                backgroundColor: "#06161C",
                borderRadius: 5,
                width: 315,
                height: 35,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
             {loading ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text style={{ color: "white", textAlign: "center" }}>Sign Up</Text>
                )}
              {/* <Text style={{ color: "white", textAlign: "center" }}>
                Sign Up
              </Text> */}
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{ flex: 0.25, alignItems: "center", justifyContent: "center" }}
      >
        {/* <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 30 }}
        > */}
          {/* <View
            style={{
              flex: 0.35,
              height: 1,
              backgroundColor: "black",
              borderWidth: 0.1,
            }}
          /> */}
          {/* <View>
            <Text
              style={{ marginLeft: 7, marginRight: 7, textAlign: "center" }}
            >
              OR
            </Text>
          </View> */}
          {/* <View
            style={{
              flex: 0.35,
              height: 1,
              backgroundColor: "black",
              borderWidth: 0.1,
            }}
          /> */}
        {/* </View> */}

        {/* <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <TouchableOpacity>
            <View style={[styles.socialIcon, { marginRight: 20 }]}>
              <FontAwesome name="apple" size={24} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={[styles.socialIcon, { marginRight: 20 }]}>
              <FontAwesome name="google" size={24} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.socialIcon}>
              <FontAwesome name="facebook" size={24} />
            </View>
          </TouchableOpacity>
        </View> */}

        <View
          style={{
            flex: 0.2,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "black" }}>Already have an account?</Text>
          <TouchableOpacity onPress={loginHandle}>
            <Text
              style={{
                color: "red",
                marginLeft: 5,
                fontWeight: "bold",
                textDecorationLine: "underline",
              }}
            >
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
    </ScrollView>
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
  title: {
    // fontFamily: 'Montserrat',
    fontSize: 40,
    marginBottom: 70,
    fontWeight: "bold",
  },
  socialIcon: {
    borderRadius: 50,
    borderWidth: 1,
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
});
