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
  // func declaration argugemnt navigation  function adddogs (navigation) {}
  const { dog } = route.params;
  console.log(dog);
  const [rabiesVaccineDate, setRabiesVaccine] = React.useState(
    dog.rabiesVaccineDate
  );
  const [chipDate, setChip] = React.useState(dog.chipDate);
  const [spirocercaLupiDate, setSpirocercaLupi] = React.useState(
    dog.spirocercaLupiDate
  );
  const [hexagonalVaccine, setHexagonalVaccine] = React.useState(
    dog.hexagonalVaccine
  );
  const [castration, setcastration] = React.useState(dog.castration);
  const [dewormingDate, setDeworming] = React.useState(dog.dewormingDate);
  const [fleaTreatmentDate, setfleaTreatment] = React.useState(
    dog.fleaTreatmentDate
  );
  const [alergies, setAlergies] = React.useState(dog.alergies);
  const [medications, setMedications] = React.useState(dog.medications);
  const [medicalTreatment, setTreatment] = React.useState(dog.medicalTreatment);
  const onSave = async () => {
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
    // Navigate back to the profile screen with the updated information
    navigation.goBack();
  };
  return (
    <SafeAreaView style={styles.tripContainer}>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.container}>
          <View style={{ height: 20 }} />
          <Icon name="user-md" size={50} color="sienna" />
          <Text style={styles.title}>Update Medical Data</Text>
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
          />
          <View style={{ height: 10 }} />
          <Text
            style={[
              styles.radioButtonText,
              { textDecorationLine: "underline" },
            ]}
          >
            Hexagonal Vaccine:
          </Text>
          <TextInput
            style={styles.input}
            color="#8B5A33"
            value={hexagonalVaccine}
            onChangeText={setHexagonalVaccine}
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
