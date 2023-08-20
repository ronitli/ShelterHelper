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
//from home page

const Reset_Password = ({ route, navigation }) => {
  const { Email } = route.params; //the email he typed in prevoius screen
  const [resetCode, setResetCode] = useState("");
  const handleSendResetEmailAgain = () => {
    //
  };
  const handleResetPassword = () => {
    //in here here check the reset code if he is ok- go to the choose a new password page
    if (resetCode != "") {
      navigation.navigate("Choose_New_Password", { Email });
    } else {
      Alert.alert(
        "Alert",
        "Wrong code",
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
        placeholder="Please enter the code you got in your email:"
        placeholderTextColor="sienna"
        value={resetCode}
        onChangeText={setResetCode}
      />
      <TouchableOpacity
        style={styles.nowTripButton}
        onPress={handleSendResetEmailAgain}
      >
        <Text style={styles.buttonText}>Send the code again</Text>
      </TouchableOpacity>
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
export default Reset_Password;
