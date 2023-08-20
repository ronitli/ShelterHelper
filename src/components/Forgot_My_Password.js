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
const Forgot_My_Password = ({ navigation }) => {
  const [Email, setEmail] = useState("");
  const handleForgotPassword = () => {
    if (Email != "") {
      navigation.navigate("Reset_Password", { Email });
    } else {
      Alert.alert(
        "Alert",
        "Please enter your email in order to reset your password.",
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
        <Text style={styles.buttonText}>OK</Text>
      </TouchableOpacity>
      <View style={{ height: 15 }} />
    </View>
  );
};
export default Forgot_My_Password;
