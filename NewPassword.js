import { StatusBar } from "expo-status-bar";
import React, { cloneElement, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
// import { resetPass } from './Firebase'
import { ResetPassword } from "./Firebase/ResetPassword";
export default function NewPassword() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [currentPassword, setCurrentpassword] = useState("");
  const [currentPasswordVisible, setCurrentpasswordVisible] = useState(false);
  const [error, setError] = useState("");

  const toggleCurrentPasswordVisibility = () => {
    setCurrentpasswordVisible(!currentPasswordVisible);
  };
  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const navigation = useNavigation();

  const homeHandle = () => {
    navigation.navigate("Home");
  };
  const navigateToLogin = () => {
    navigation.navigate("Login");
  };
  const resetPassword = async () => {
    setError("");
    if (password !== confirmPassword) {
      setError("New password and confirm new password do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Password should be at least 6 characters long.");
      return;
    }

    try {
      const result = await ResetPassword(currentPassword, password);

      if (result.message) {
        setError("");
        console.log("Password reset successful");
        Alert.alert("Password Updated Successfully", "", [
          {
            text: "OK",
            onPress: navigateToLogin,
          },
        ]);
      } else {
        //   console.error('Password reset failed:', result.error);
        setError(result.error);
      }
    } catch (error) {
      setError(error);
      // console.error('An error occurred during password reset:', error);
    }

    // ResetPassword(currentPassword,password).then(({message,error})=>{
    //     console.log(message,error)
    //     if(error){
    //         console.log(error)
    //         setError(error);
    //     }
    //     if(message){
    //         Alert.alert('Password Updated Successfully', '', [
    //                     {
    //                       text: 'OK',
    //                       onPress:navigateToLogin,
    //                     },
    //                   ]);
    //         // console.log(message)
    //     }
    // });

    // try{
    //     let user=await AsyncStorage.getItem('userId');
    //     user=JSON.parse(user);
    //     const response=await axios.post('http://10.135.48.157:5000/resetPassword',{email:user.email,password:password,currentPassword:currentPassword});
    // if(response.status===200){
    //     Alert.alert('Password Updated Successfully', '', [
    //         {
    //           text: 'OK',
    //           onPress:navigateToLogin,
    //         },
    //       ]);
    // }
    // }
    // catch(error){
    //     console.log(error);
    //     setError(error.response.data.message);
    // }
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
          onPress={homeHandle}
        />
      </View>

      <View
        style={{
          flex: 0.9,
          borderStartStartRadius: 50,
          borderStartEndRadius: 50,
          backgroundColor: "white",
        }}
      >
        <View style={{ flex: 0.2, marginTop: "15%", marginLeft: "10%" }}>
          <Text style={{ fontSize: 25, fontWeight: "bold", marginBottom: 5 }}>
            Create New Password
          </Text>
          <Text>create new password for your account</Text>
        </View>
        <View style={{ flex: 0.5, marginTop: "5%", marginLeft: "10%" }}>
          <Text style={{ fontWeight: "bold" }}>Current Password</Text>

          <View>
            <TextInput
              style={{
                width: "90%",
                height: 35,
                borderBottomWidth: 1,
                marginBottom: 40,
              }}
              secureTextEntry={!currentPasswordVisible}
              value={currentPassword}
              onChangeText={(text) => setCurrentpassword(text)}
            />
            {/* <TouchableOpacity
                            onPress={toggleCurrentPasswordVisibility}
                            style={{
                                position: 'absolute',
                                right: 10,
                                top: 29,
                            }}
                        >
                            {currentPasswordVisible ? (
                                <FontAwesome name="eye" size={15} />
                            ) : (
                                <FontAwesome name="eye-slash" size={15} />
                            )}
                        </TouchableOpacity> */}
          </View>

          <Text style={{ fontWeight: "bold" }}>New Password</Text>

          <View>
            <TextInput
              style={{
                width: "90%",
                height: 35,
                borderBottomWidth: 1,
                marginBottom: 40,
              }}
              secureTextEntry={!passwordVisible}
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
            {/* <TouchableOpacity
                            onPress={togglePasswordVisibility}
                            style={{
                                position: 'absolute',
                                right: 10,
                                top: 29,
                            }}
                        >
                            {passwordVisible ? (
                                <FontAwesome name="eye" size={15} />
                            ) : (
                                <FontAwesome name="eye-slash" size={15} />
                            )}
                        </TouchableOpacity> */}
          </View>

          <Text style={{ fontWeight: "bold" }}>Confirm New Password</Text>
          <View>
            <TextInput
              style={{ width: "90%", height: 35, borderBottomWidth: 1 }}
              secureTextEntry={!confirmPasswordVisible}
              value={confirmPassword}
              onChangeText={(text) => setConfirmPassword(text)}
            />
            <Text style={{ color: "red" }}>{error}</Text>
            {/* <TouchableOpacity
                            onPress={toggleConfirmPasswordVisibility}
                            style={{
                                position: 'absolute',
                                top: 29,
                                right: 10,

                            }}
                        >
                            {confirmPasswordVisible ? (
                                <FontAwesome name="eye" size={15} />
                            ) : (
                                <FontAwesome name="eye-slash" size={15} />
                            )}
                        </TouchableOpacity> */}
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
          <TouchableOpacity onPress={resetPassword}>
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
                Continue
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
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
});
