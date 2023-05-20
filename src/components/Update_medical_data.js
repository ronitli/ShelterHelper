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
  // func declaration argugemnt navigation function adddogs (navigation) {}
  const { dog } = route.params;
  // const docRef = doc(db, "MedicalData", dog.id);
   //const data=docRef.segments;
   //console.log(data)
  // const docSnap = getDoc(docRef);
  // const data = docSnap.data();
   console.log(dog);
  //getData(dog.id);
  var tempAlergies = null,
    tempMedications = null,
    tempTreatments = null;
  var tempRabiesVaccine = null,
    tempChip = null,
    tempHexagonalVaccine = null,
    tempSpirocercaLupi = null,
    tempCastration = null,
    tempDeworming = null,
    tempfleaTreatment = null;
  const [rabiesVaccineDate, setRabiesVaccine] = React.useState(
    dog.rabiesVaccineDate
  );
  const [chipDate, setChip] = React.useState(dog.chipDate);
  const [canineHepatitisDate, setCanineHepatitis] = React.useState(
    dog.canineHepatitis
  );
  const [spirocercaLupiDate, setSpirocercaLupi] = React.useState(
    dog.spirocercaLupiDate
  );
  const [hexagonalVaccine, setHexagonalVaccine] = React.useState(
    dog.HexagonalVaccine
  );
  const [castration, setcastration] = React.useState(dog.castration);
  const [dewormingDate, setDeworming] = React.useState(dog.dewormingDate);
  const [fleaTreatmentDate, setfleaTreatment] = React.useState(
    dog.fleaTreatmentDate
  );
  const [alergies, setAlergies] = React.useState(dog.alergies);
  const [medications, setMedications] = React.useState(dog.medications);
  const [medicalTreatment, setTreatment] = React.useState(dog.treatment);
  const [showPicker, setShowPicker] = React.useState(false); //defalt val is flase
  const YesNoArray = [
    // array with two arguments
    { label: "Yes", value: "Yes" },
    { label: "No", value: "No" },
  ];
  const onChangeHexagonalVaccine = (event, selectedDate) => {
    tempHexagonalVaccine = selectedDate;
  };
  const onChangeDateRabbisVaccine = (event, selectedDate) => {
    tempRabiesVaccine = selectedDate;
  };
  const onChangeDateSpirocercaLupi = (event, selectedDate) => {
    tempSpirocercaLupi = selectedDate;
  };
  const onChangeDateDeworming = (event, selectedDate) => {
    tempDeworming = selectedDate;
  };
  const onChangeDateChip = (event, selectedDate) => {
    tempChip = selectedDate;
  };
  const onChangeDatefleaTreatment = (event, selectedDate) => {
    tempfleaTreatment = selectedDate;
  };
  const onChangeMedications = (event, selected) => {
    tempMedications = selected;
  };
  const onChangeCastration = (event, selected) => {
    tempCastration = selected;
  };
  const onChangeAlergies = (event, selected) => {
    tempAlergies = selected;
  };
  const onChangeMedicalTreatment = (event, selected) => {
    tempTreatments = selected;
  };
  const onSave = async () => {
    if (tempRabiesVaccine != null) {
      setRabiesVaccine(tempRabiesVaccine);
    }
    if (tempAlergies != null) {
      setAlergies(tempAlergies);
    }
    if (tempMedications != null) {
      setMedications(tempMedications);
    }
    if (tempTreatments != null) {
      setTreatment(tempTreatments);
    }
    if (tempChip != null) {
      setChip(tempChip);
    }
    if (tempHexagonalVaccine != null) {
      setHexagonalVaccine(tempHexagonalVaccine);
    }
    if (tempSpirocercaLupi != null) {
      setSpirocercaLupi(tempSpirocercaLupi);
    }
    if (tempCastration != null) {
      setcastration(tempCastration);
    }
    if (tempDeworming != null) {
      setDeworming(tempDeworming);
    }
    if (tempfleaTreatment != null) {
      setfleaTreatment(tempfleaTreatment);
    }
    //save to database+alert acoordingly
    const newMedicalData = {
      dogID: dog.id,
      rabiesVaccineDate: rabiesVaccineDate,
      chipDate: chipDate,
      canineHepatitisDate: canineHepatitisDate,
      spirocercaLupiDate: spirocercaLupiDate,
      castration: castration,
      dewormingDate: dewormingDate,
      fleaTreatmentDate: fleaTreatmentDate,
      alergies: alergies,
      medications: medications,
      medicalTreatment: medicalTreatment,
    };

    const MedicalDatabdRef = collection(db, "MedicalData");
    const docRef = doc(db, "MedicalData", dog.id);

    const docSnap = await getDoc(docRef);
    console.log(docSnap.exists());
    if (docSnap.exists()) {
      await updateDoc(docRef, newMedicalData)
        .then((docRef) => {
          console.log("SUCCESS: Medical Data has been updated successfully");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      await addDoc(MedicalDatabdRef, newMedicalData)
        .then((docRef) => {
          console.log("SUCCESS: new Medical Data add");
        })
        .catch((error) => {
          console.log(error);
        });
    }

    // Navigate back to the profile screen with the updated information
    navigation.goBack();
  };

  // const getData=async(dogId)=>{
  //  //const docRef = doc(db, "MedicalData", dogId);
  //   //const docSnap = getDoc(docRef);
  //   //const data = docSnap.data();
  //   console.log("hii");
  // }

  return (
    <SafeAreaView style={styles.tripContainer}>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.container}>
          <View style={{ height: 20 }} />
          <Icon name="user-md" size={50} color="sienna" />
          <Text style={styles.title}>Update Medical Data</Text>
          <View style={{ height: 20 }} />
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
            onChangeText={onChangeDateRabbisVaccine}
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
            onChangeText={onChangeDateChip}
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
            onChangeText={onChangeHexagonalVaccine}
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
            onChangeText={onChangeDateSpirocercaLupi}
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
            onChangeText={onChangeDateDeworming}
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
            onChangeText={onChangeDatefleaTreatment}
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
            onChangeText={onChangeCastration}
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
            Alergies?
          </Text>
          <TextInput
            style={styles.input}
            color="#8B5A33"
            value={alergies}
            onChangeText={onChangeAlergies}
          />
          <View style={{ height: 10 }} />
          <Text
            style={[
              styles.radioButtonText,
              { textDecorationLine: "underline" },
            ]}
          >
            Medications?
          </Text>
          <TextInput
            style={styles.input}
            color="#8B5A33"
            value={medications}
            onChangeText={onChangeMedications}
          />
          <View style={{ height: 10 }} />
          <Text
            style={[
              styles.radioButtonText,
              { textDecorationLine: "underline" },
            ]}
          >
            Other Medical Information?
          </Text>
          <TextInput
            style={styles.input}
            color="#8B5A33"
            value={medicalTreatment}
            onChangeText={onChangeMedicalTreatment}
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
