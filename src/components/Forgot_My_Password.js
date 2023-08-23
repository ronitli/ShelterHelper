import React, { useCallback, useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import _, { curry } from "lodash";
import { Alert } from "react-native";
import { Checkbox, Title } from "react-native-paper";
import { SafeAreaView } from "react-native";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Button,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import pickImage from "./pickImage";
import { styles } from "../styles";
import { RadioButton } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import Update_Dog_Details from "./Update_Dog_Details";
import Archive from "./Archive";
import { db } from "../../firebase";
import {
  collection,
  doc,
  getDoc,
  setDoc,
  addDoc,
  updateDoc,
  getDocs,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";
import { useEffect } from "react";
import { isSearchBarAvailableForCurrentPlatform } from "react-native-screens";
import { getAuth,sendPasswordResetEmail } from "firebase/auth";
const Forgot_My_Password = ({ navigation }) => {
  const [Email, setEmail] = useState("");
  const handleForgotPassword = () => {
    if (Email != "") {
        handleResetPssword(Email);
      //navigation.navigate("Reset_Password", { Email });
    } else {
      Alert.alert(
        "Alert",
        "Please enter your email in order to reset your password.",
        [
          {
            text: "send email",
            onPress: async () => {
              console.log("OK Pressed");
            },
            style: "send email",
          },
        ],
        { cancelable: false }
      );
    }
  };

  const handleResetPssword=async(Email)=>{
    //send reset password email
  
    if (checkEmailAvailability(Email)) {
      console.log(Email)
      const auth = getAuth();
      sendPasswordResetEmail(auth,Email).then(()=>{
        alert("email sent")
      }).catch((error)=>{
        if (error == "FirebaseError: Firebase: Error (auth/user-not-found)."){
        alert("Email doesn't exist in this shelter. You should register")
        }
        else{
          alert(error)
        }
        console.log(error)
          });
        }
        else{
          alert("user dont exist in the system. please register")
        }
  }

  async function checkEmailAvailability(email) {
    const usersCollection = collection(db, "Users");
    const q = query(usersCollection, where("email", "==", email));
    const querySnapshot = await getDocs(q);

    return !querySnapshot.empty;
  }

  return (
    <View style={styles.container}>
      <Icon name="user" size={50} color="sienna" />
      <Text style={styles.registertitle}>Reset Your Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Please enter your email address:"
        placeholderTextColor="sienna"
        value={Email}
        onChangeText={setEmail}
      />
      <TouchableOpacity
        style={styles.registerButton}
        onPress={handleForgotPassword}
      >
        <Text style={styles.buttonText}>Send email</Text>
      </TouchableOpacity>
      <View style={{ height: 15 }} />
    </View>
  );
};
export default Forgot_My_Password;
