import React, { useState } from "react";
import {
  View,
  Platform,
  DatePickerIOS,
  TimePickerAndroid,
  ScrollView,
  TouchableOpacity,
  Text,
  TextInput,
  Button,
  Image,
  StyleSheet,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import pickImage from "./pickImage";
import Icon from "react-native-vector-icons/FontAwesome";
import { styles } from "../styles";
import { SafeAreaView } from "react-native";
import { RadioButton } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  collection,
  doc,
  getDoc,
  setDoc,
  addDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";

//from page of a dog
// in here needs with cookies pass the dog details that we chose in order to update that he went on trip
//needs to fix time choosing and update in database
const Update_trip = ({ route, navigation }) => {
  const { dog } = route.params;
  const [tripdate, setTripDate] = React.useState(new Date());
  const [tripTime, setTripTime] = React.useState(new Date());
  const [showPicker, setShowPicker] = React.useState(false); //defalt val is flase
  const showDateTimePicker = () => {
    setShowPicker(true);
  };
  const onChangeDate = (event, selectedDate) => {
    // prperty
    const currentDate = selectedDate || tripdate;
    setTripDate(currentDate);
    setShowPicker(false);
  };
  const onPressNow = (event) => {
    setTripDate(new Date());
    setTripTime(new Date());
  };
  const onChangeTime = (event, selectedTime) => {
    // prperty
    const currentTime = selectedTime || tripTime;
    setTripTime(currentTime);
  };
  const onSave = () => {
    //save to database+alert acoordingly
    const updateDetails = {
      tripdate: tripdate,
      tripTime: tripTime,
    };
    const dogsRef = collection(db, "Dogs");
    const docRef = doc(db, "Dogs", dog.id);
    const docSnap = getDoc(docRef);
    updateDoc(docRef, updateDetails)
      .then(() => {
        console.log("Document successfully updated!");
      })
      .catch((error) => {
        console.error("Error updating document:", error);
      });
    // Navigate back to the profile screen with the updated information
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.tripContainer}>
          <Icon name="paw" size={50} color="sienna" />
          <Text style={styles.title}>Update Trip</Text>
          <Text style={styles.reqText}>
            {`${dog.name} last trip was at: ${dog.tripdate
              .toDate()
              .toLocaleDateString()} ${dog.tripTime
              .toDate()
              .toLocaleTimeString()}`}
          </Text>

          <TouchableOpacity style={styles.nowTripButton} onPress={onPressNow}>
            <Text style={styles.buttonText}>The trip was Now!</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={showDateTimePicker}
          >
            <Text style={styles.buttonText}>Choose date</Text>
          </TouchableOpacity>
          {showPicker && (
            <DateTimePicker
              value={tripdate}
              mode="date"
              is24Hour={true}
              display="default"
              onChange={onChangeDate}
            />
          )}
          <TouchableOpacity
            style={styles.loginButton}
            onPress={showDateTimePicker}
          >
            <Text style={styles.buttonText}>Choose time</Text>
          </TouchableOpacity>
          {showPicker && (
            <View>
              <DateTimePicker
                value={tripTime}
                mode="time"
                is24Hour={true}
                display="spinner"
                onChange={onChangeTime}
              ></DateTimePicker>
              <Button title="OK" onPress={() => setShowPicker(false)}></Button>
            </View>
          )}
          <TouchableOpacity style={styles.registerButton} onPress={onSave}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default Update_trip;
