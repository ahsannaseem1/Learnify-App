import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Image,
  Alert,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { FontAwesome } from "@expo/vector-icons";
import { AddUser } from "./Firebase/AddUser.js";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker"; // Import DocumentPicker
import { AddTeacher } from "./Firebase/AddUser.js";
import { Feather } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function Teacher() {
  const [fontsLoaded] = useFonts({
    Inconsolata: require("./assets/fonts/Inconsolata/Inconsolata.ttf"),
    Montserrat: require("./assets/fonts/Montserrat/Montserrat.ttf"),
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [teacherProfileImage, setTeacherProfileImage] = useState();
  const [loading, setLoading] = useState(false);
  const [valueEducation, setValueEducation] = useState(null);
  const [valueCategory, setValueCategory] = useState(null);

  const education = [
    { label: "Bachelors", value: "1" },
    { label: "Masters", value: "2" },
    { label: "M.Phil", value: "3" },
    { label: "PHD", value: "4" },
  ];
  const subject = [
    { label: "Maths", value: "1" },
    { label: "English", value: "2" },
    { label: "Urdu", value: "3" },
    { label: "Science", value: "4" },
  ];

  const [value, setValue] = useState(null);

  const renderItem = (item) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
        {item.value === value && (
          <AntDesign
            style={styles.icon}
            color="black"
            name="Safety"
            size={20}
          />
        )}
      </View>
    );
  };
  //   const [selectedImageName, setSelectedImageName] = useState();
  const [cv, setCv] = useState();

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
    education: "",
    city: "",
    category: "",
  });
  const [error, setError] = useState("");

  const handleChange = (name, value) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      //   allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      console.log(result.assets[0].uri);
      setTeacherProfileImage(result.assets[0].uri); // Get the image name from the URI
      console.log("profile Image is", teacherProfileImage);
    }
  };

  useEffect(() => {
    console.log("profile Image is", teacherProfileImage);
  }, [teacherProfileImage]);

  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      //   setteacherProfileImage(result.assets[0].uri); // Get the image name from the URI
      console.log(result.uri);
    }
  };

  const pickCV = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: "application/pdf",
    });

    if (!result.cancelled) {
      // console.log(result.assets[0].uri)
      // storeCV(result.assets[0].uri);
      setCv(result.assets[0].uri);
      //   console.log(result);
    }
  };

  const signUp = async () => {
    try {
      if (
        formData.firstName.trim() === "" ||
        formData.email.trim() === "" ||
        formData.password.trim() === "" ||
        formData.confirmPassword.trim() === "" ||
        teacherProfileImage.trim() === "" ||
        cv.trim() === "" ||
        formData.lastName.trim() === "" ||
        formData.city.trim() === "" ||
        formData.education.trim() === "" ||
        formData.category.trim() === ""
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
      const data = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        city: formData.city,
        category: formData.category,
        education: formData.education,
        CV: cv,
        profileImage: teacherProfileImage,
      };
      setLoading(true);
      AddTeacher(data)
        .then(({ user, errorCode }) => {
          // console.log("after add user")

          // Handle the user data and error code here
          if (user) {
            console.log("User data:", user.uid);
            setError("");
            setFormData({
              firstName: "",
              lastName: "",
              email: "",
              password: "",
              confirmPassword: "",
              city: "",
              education: "",
              cv: "",
              profileImage: "",
              category: "",
            });
            setLoading(false);
            navigation.navigate("Login");
          } else {
            setError(errorCode);
            console.log("Error creating user:", errorCode);
          }
        })
        .catch((error) => {
          // Handle the error
          setError(error);
          console.log("Error creating user:", error);
        });
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const handleSubmit = (e) => {
    // console.log(formData);
    e.preventDefault();
    signUp();
  };

  const loginHandle = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      city: "",
      education: "",
      cv: "",
      profileImage: "",
    });
    navigation.navigate("Login");
  };

  const educationOptions = ["English", "Urdu", "Maths"];

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, backgroundColor: "white" }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {/* Your existing UI code */}
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
            <Text
              style={{ color: "#06161C", fontSize: 30, fontWeight: "bold" }}
            >
              Create Account
            </Text>
            <Text style={{ marginTop: 10, width: "70%", textAlign: "center" }}>
              Fill your information below or register with your social account.
            </Text>
          </View>

          <View
            style={{
              flex: 0.4,
              alignItems: "center",
              justifyContent: "center",
            }}
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
                <TextInput
                  style={{
                    width: 315,
                    height: 35,
                    borderRadius: 5,
                    paddingLeft: 10,
                    marginTop: 20,
                    borderBottomWidth: 1,
                  }}
                  placeholder="City"
                  placeholderTextColor="#364c59"
                  onChangeText={(text) => handleChange("city", text)}
                  value={formData.city}
                />

                <View>
                  <Dropdown
                    style={styles.dropdown}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={education}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={
                      formData.education
                        ? formData.education
                        : "Select Education"
                    }
                    searchPlaceholder="Search..."
                    value={formData.education}
                    onChange={(item) => handleChange("education", item.label)}
                    renderItem={renderItem}
                  />
                  <Dropdown
                    style={styles.dropdown}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={subject}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={
                      formData.category ? formData.category : "Select Subject"
                    }
                    searchPlaceholder="Search..."
                    value={formData.category}
                    onChange={(item) => handleChange("category", item.label)}
                    renderItem={renderItem}
                  />

                  {/* <TextInput
                style={{
                  width: 315,
                  height: 35,
                  borderRadius: 5,
                  paddingLeft: 10,
                  marginTop: 20,
                  borderBottomWidth: 1,
                }}
                placeholder="Category (e.g English)"
                placeholderTextColor="#364c59"
                onChangeText={(text) => handleChange("category", text)}
                value={formData.category}
              /> */}

                  {/* <Picker
                  style={{
                    width: 315,
                    height: 35,
                    borderRadius: 5,
                    marginTop: 10,
                    borderBottomWidth: 1,
                  }}
                  selectedValue={formData.education}
                  onValueChange={(itemValue) => handleChange('education', itemValue)}
                >
                  <Picker.Item label="Select Subject" value="" />
                  <Picker.Item label="Maths" value="Maths" />
                  <Picker.Item label="English" value="English" />
                  <Picker.Item label="Urdu" value="Urdu" />
                </Picker> */}

                  {/* <TextInput
                style={{
                  width: 315,
                  height: 35,
                  borderRadius: 5,
                  paddingLeft: 10,
                  marginTop: 20,
                  borderBottomWidth: 1,
                }}
                placeholder="Education (e.g Bachelors) "
                placeholderTextColor="#364c59"
                onChangeText={(text) => handleChange("education", text)}
                value={formData.education}
              /> */}

                  {/* <Picker
                  style={{
                    width: 315,
                    height: 35,
                    borderRadius: 5,
                    marginTop: 10,
                    borderBottomWidth: 1,
                  }}
                  selectedValue={formData.education}
                  onValueChange={(itemValue) => handleChange('education', itemValue)}
                >
                  <Picker.Item label="Select Education" value="" />
                  <Picker.Item label="Bachelors" value="Bachelors" />
                  <Picker.Item label="Masters" value="Masters" />
                  <Picker.Item label="PHD" value="PHD" />
                </Picker> */}
                </View>

                <View
                  style={{
                    flex: 0.2,
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 30,
                  }}
                >
                  <TouchableOpacity onPress={pickCV}>
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
                        Select CV
                      </Text>
                    </View>
                    {/* <Text>{selectedImageName}</Text> */}
                  </TouchableOpacity>
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
                        flexDirection: "row",
                      }}
                    >
                      <Feather name="image" size={18} color="white" />
                      <Text
                        style={{
                          color: "white",
                          textAlign: "center",
                          marginLeft: 5,
                        }}
                      >
                        Select Image
                      </Text>
                    </View>
                    {/* <Text>{selectedImageName}</Text> */}
                  </TouchableOpacity>
                  {/* <TouchableOpacity onPress={takePhoto}>
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
              </TouchableOpacity> */}
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
                // marginTop: 10,
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
                    <Text style={{ color: "white", textAlign: "center" }}>
                      Sign Up
                    </Text>
                  )}
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              flex: 0.25,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
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
  dropdown: {
    marginTop: 20,
    height: 50,
    width: 315,
    backgroundColor: "white",
    borderBottomColor: "black",
    borderRadius: 10,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textItem: {
    flex: 1,
    fontSize: 15,
  },
  placeholderStyle: {
    fontSize: 15,
    color: "#364c59",
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 15,
    borderRadius: 10,
    marginLeft: 5,
  },
});
