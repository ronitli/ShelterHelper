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
} from "firebase/firestore";
import { useEffect } from "react";
import { isSearchBarAvailableForCurrentPlatform } from "react-native-screens";
const Choose_New_Password = ({ route, navigation }) => {
  const { Email } = route.params; //the email he typed in prevoius screen
  const [newPassword, setnewPassword] = useState("");
  const [newPasswordReType, setnewPasswordReType] = useState("");
  const handleResetPassword = () => {
    if (
      newPassword != "" &&
      newPasswordReType != "" &&
      newPassword == newPasswordReType
    ) {
      //reset the password
      //go back to the start screen so the user can reconnect to the app
      // navigation.navigate("Start");
    } else {
      Alert.alert(
        "Alert",
        "Please choose a new password and retype it",
        [
          {
            text: "OK",
            onPress: async () => {
              console.log("OK Pressed");
            },
            style: "OK",
          },
        ],
        { cancelable: false }
      );
    }
  };
  return (
    <View style={styles.container}>
      <Icon name="user" size={50} color="sienna" />
      <Text style={styles.registertitle}>Please choose a new Password:</Text>
      <TextInput
        style={styles.input}
        placeholder="new password:"
        placeholderTextColor="sienna"
        value={newPassword}
        onChangeText={setnewPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="please enter the new password again:"
        placeholderTextColor="sienna"
        value={newPasswordReType}
        onChangeText={setnewPasswordReType}
      />
      <TouchableOpacity
        style={styles.registerButton}
        onPress={handleResetPassword}
      >
        <Text style={styles.buttonText}>OK</Text>
      </TouchableOpacity>
      <View style={{ height: 15 }} />
    </View>
  );
};
export default Choose_New_Password;
