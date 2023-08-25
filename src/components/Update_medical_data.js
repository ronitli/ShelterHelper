import React, { useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Text,
  TextInput,
  Button,
  Image,
  StyleSheet,
  Alert,
} from "react-native";
import {
  collection,
  doc,
  getDoc,
  setDoc,
  addDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import pickImage from "./pickImage";
import { styles } from "../styles";
import { RadioButton } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
//from the specefic dog page - will get dog to update
//note currently start date from today- needs to get from database
const Update_medical_data = ({ route, navigation }) => {
  let alertShown = false;
  // func declaration argugemnt navigation  function adddogs (navigation) {}
  const { dog, logged_in_user } = route.params;
  //console.log(dog);
  const [rabiesVaccineDate, setRabiesVaccine] = React.useState(
    dog.rabiesVaccineDate ? dog.rabiesVaccineDate : ''
  );
  const [chipDate, setChip] = React.useState(dog.chipDate ? dog.chipDate : '');
  const [spirocercaLupiDate, setSpirocercaLupi] = React.useState(
    dog.spirocercaLupiDate ? dog.spirocercaLupiDate : ''
  );
  const [hexagonalVaccine, setHexagonalVaccine] = React.useState(
    dog.hexagonalVaccine ? dog.hexagonalVaccine : ''
  );
  const [castration, setcastration] = React.useState(dog.castration ? dog.castration : '');
  const [dewormingDate, setDeworming] = React.useState(dog.dewormingDate ? dog.dewormingDate : '');
  const [fleaTreatmentDate, setfleaTreatment] = React.useState(
    dog.fleaTreatmentDate ? dog.fleaTreatmentDate : ''
  );
  const [alergies, setAlergies] = React.useState(dog.alergies ? dog.alergies : '');
  const [medications, setMedications] = React.useState(dog.medications ? dog.medications : '');
  const [medicalTreatment, setTreatment] = React.useState(dog.medicalTreatment ? dog.medicalTreatment : '');

  const dateValidation = async (date) => {
    const regex = /^\d{2}\/\d{2}\/\d{4}$/; // Regular expression for DD/MM/YYYY format
    if (regex.test(date)) {
      const [day, month, year] = date.split("/");

      // Validate the day, month, and year
      if (
        day < 1 ||
        day > 31 ||
        month < 1 ||
        month > 12 ||
        year < 1000 ||
        year > 9999
      ) {
        Alert.alert("Invalid Date", "All entered dates must be valid");
        alertShown = true;
      } else {
        const date = new Date(year, month - 1, day);

        if (
          date.getDate() !== Number(day) ||
          date.getMonth() !== month - 1 ||
          date.getFullYear() !== Number(year)
        ) {
          Alert.alert("Invalid Date", "All entered dates must be valid");
          alertShown = true;
        } else if (date > new Date()) {
          Alert.alert("Future Date", "Entered dates can not be in the future.");
          alertShown = true;
        } else {
          //Alert.alert('Valid Date', 'The entered date is valid and not in the future.');
        }
      }
    } else {
      Alert.alert(
        "Invalid Date Format",
        "All entered dates must be in \nDD/MM/YYYY format."
      );
      alertShown = true;
    }
  };

  const onSave = async () => {
    //frontend validation:
    const dates = [
      rabiesVaccineDate,
      chipDate,
      hexagonalVaccine,
      spirocercaLupiDate,
      dewormingDate,
      fleaTreatmentDate,
      castration,
    ];
    dates.forEach((dateParam) => {
      if (dateParam) {
        dateValidation(dateParam);
        console.log(rabiesVaccineDate);
        if (alertShown === true) {
          return;
        }
      }
    });
    if (alertShown === true) {
      return;
    }
    console.log("on navigation");
    //save to database+alert acoordingly
    const newMedicalData = {
      rabiesVaccineDate: rabiesVaccineDate,
      chipDate: chipDate,
      hexagonalVaccine: hexagonalVaccine,
      spirocercaLupiDate: spirocercaLupiDate,
      castration: castration,
      dewormingDate: dewormingDate,
      fleaTreatmentDate: fleaTreatmentDate,
      alergies: alergies,
      medications: medications,
      medicalTreatment: medicalTreatment,
    };
    console.log(rabiesVaccineDate);
    const dogsRef = collection(db, "Dogs");
    const docRef = doc(db, "Dogs", dog.id);
    const docSnap = getDoc(docRef);
    updateDoc(docRef, newMedicalData)
      .then(() => {
        console.log("Document successfully updated!");
      })
      .catch((error) => {
        console.error("Error updating document:", error);
      });

    console.log("in navigation");
    Alert.alert("Saved!", "Medical Information was Saved Successfully!");
    // Navigate back to the profile screen with the updated information
    navigation.navigate("Home", logged_in_user);
  };
  return (
    <SafeAreaView style={styles.tripContainer}>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.container}>
          <View style={{ height: 20 }} />
          <Icon name="user-md" size={50} color="sienna" />
          <Text style={styles.title}>Medical Data</Text>
          <Text
            style={[
              styles.radioButtonText,
              { textDecorationLine: "underline" },
            ]}
          >
            Rabies Vaccine Date:
          </Text>
          <TextInput
            style={styles.input}
            color="#8B5A33"
            value={rabiesVaccineDate}
            onChangeText={setRabiesVaccine}
            placeholder="Format: DD/MM/YYYY"
            placeholderTextColor="#8B5A33"
          />
          <View style={{ height: 10 }} />
          <Text
            style={[
              styles.radioButtonText,
              { textDecorationLine: "underline" },
            ]}
          >
            Chip Date:
          </Text>
          <TextInput
            style={styles.input}
            color="#8B5A33"
            value={chipDate}
            onChangeText={setChip}
            placeholder="Format: DD/MM/YYYY"
            placeholderTextColor="#8B5A33"
          />
          <View style={{ height: 10 }} />
          <Text
            style={[
              styles.radioButtonText,
              { textDecorationLine: "underline" },
            ]}
          >
            Hexagonal Vaccine Date:
          </Text>
          <TextInput
            style={styles.input}
            color="#8B5A33"
            value={hexagonalVaccine}
            onChangeText={setHexagonalVaccine}
            placeholder="Format: DD/MM/YYYY"
            placeholderTextColor="#8B5A33"
          />
          <View style={{ height: 10 }} />
          <Text
            style={[
              styles.radioButtonText,
              { textDecorationLine: "underline" },
            ]}
          >
            Spirocerca Lupi Date:
          </Text>
          <TextInput
            style={styles.input}
            color="#8B5A33"
            value={spirocercaLupiDate}
            onChangeText={setSpirocercaLupi}
            placeholder="Format: DD/MM/YYYY"
            placeholderTextColor="#8B5A33"
          />
          <View style={{ height: 10 }} />
          <Text
            style={[
              styles.radioButtonText,
              { textDecorationLine: "underline" },
            ]}
          >
            Deworming Date:
          </Text>
          <TextInput
            style={styles.input}
            color="#8B5A33"
            value={dewormingDate}
            onChangeText={setDeworming}
            placeholder="Format: DD/MM/YYYY"
            placeholderTextColor="#8B5A33"
          />
          <View style={{ height: 10 }} />
          <Text
            style={[
              styles.radioButtonText,
              { textDecorationLine: "underline" },
            ]}
          >
            Fleas/Ticks Treatment Date:
          </Text>
          <TextInput
            style={styles.input}
            color="#8B5A33"
            value={fleaTreatmentDate}
            onChangeText={setfleaTreatment}
            placeholder="Format: DD/MM/YYYY"
            placeholderTextColor="#8B5A33"
          />
          <View style={{ height: 10 }} />
          <Text
            style={[
              styles.radioButtonText,
              { textDecorationLine: "underline" },
            ]}
          >
            Spaying / Neutering Date:
          </Text>
          <TextInput
            style={styles.input}
            color="#8B5A33"
            value={castration}
            onChangeText={setcastration}
            placeholder="Format: DD/MM/YYYY"
            placeholderTextColor="#8B5A33"
          />
          <View style={{ height: 10 }} />
          <Text
            style={[
              styles.radioButtonText,
              { textDecorationLine: "underline" },
            ]}
          >
            Alergies:
          </Text>
          <TextInput
            style={styles.input}
            color="#8B5A33"
            value={alergies}
            onChangeText={setAlergies}
          />
          <View style={{ height: 10 }} />
          <Text
            style={[
              styles.radioButtonText,
              { textDecorationLine: "underline" },
            ]}
          >
            Medications:
          </Text>
          <TextInput
            style={styles.input}
            color="#8B5A33"
            value={medications}
            onChangeText={setMedications}
          />
          <View style={{ height: 10 }} />
          <Text
            style={[
              styles.radioButtonText,
              { textDecorationLine: "underline" },
            ]}
          >
            Other Medical Information:
          </Text>
          <TextInput
            style={styles.input}
            color="#8B5A33"
            value={medicalTreatment}
            onChangeText={setTreatment}
          />
          <View style={{ height: 10 }} />
          <TouchableOpacity style={styles.registerButton} onPress={onSave}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default Update_medical_data;
