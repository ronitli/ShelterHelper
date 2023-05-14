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
  var tempAlergies, tempMedications, tempTreatments;
  var tempRabiesVaccine,
    tempChip,
    tempCanineHepatitis,
    tempSpirocercaLupi,
    tempCastration,
    tempDeworming,
    tempfleaTreatment;
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

  const handleUpdateMedicalData = async () => {
    //backend validation
  };
  const onChangeDateRabbisVaccine = (event, selectedDate) => {
    tempRabiesVaccine = selectedDate || rabiesVaccineDate;
    setRabiesVaccine(tempRabiesVaccine);
  };
  const onChangeDatecanineHepatitis = (event, selectedDate) => {
    tempCanineHepatitis = selectedDate || canineHepatitisDate;
    setCanineHepatitis(tempCanineHepatitis);
  };
  const onChangeDateSpirocercaLupi = (event, selectedDate) => {
    tempSpirocercaLupi = selectedDate || spirocercaLupiDate;
    setSpirocercaLupi(tempSpirocercaLupi);
  };
  const onChangeDateDeworming = (event, selectedDate) => {
    tempDeworming = selectedDate || dewormingDate;
    setDeworming(tempDeworming);
  };
  const onChangeDateChip = (event, selectedDate) => {
    tempChip = selectedDate || chipDate;
    setChip(tempChip);
  };
  const onChangeDatefleaTreatment = (event, selectedDate) => {
    tempfleaTreatment = selectedDate || fleaTreatmentDate;
    setfleaTreatment(tempfleaTreatment);
  };
  const onChangeMedications = (event, selected) => {
    tempMedications = selected || medications;
  };
  const onChangeCastration = (event, selected) => {
    tempCastration = selected || castration;
  };
  const showDateTimePicker = () => {
    setShowPicker(true);
  };
  const onChangeAlergies = (event, selected) => {
    tempAlergies = selected || alergies;
  };
  const onChangeMedicalTreatment = (event, selected) => {
    tempTreatments = selected || medicalTreatment;
  };
  const onSave = async () => {
    //save to database+alert acoordingly
    const newMedicalData = {
      dogName: dog.name,
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
  return (
    <SafeAreaView style={styles.tripContainer}>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.container}>
          <Icon name="user-md" size={50} color="sienna" />
          <Text style={styles.title}>Update Medical Details</Text>
        </View>
        <Text style={styles.radioButtonText}>Choose rabies vaccine date:</Text>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={showDateTimePicker}
        >
          <Text style={styles.buttonText}>Choose date</Text>
        </TouchableOpacity>
        {showPicker && (
          <DateTimePicker
            value={rabiesVaccineDate}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={onChangeDateRabbisVaccine}
          />
        )}
        <Text style={styles.radioButtonText}>Choose Chip date:</Text>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={showDateTimePicker}
        >
          <Text style={styles.buttonText}>Choose date</Text>
        </TouchableOpacity>
        {showPicker && (
          <DateTimePicker
            value={chipDate}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={onChangeDateChip}
          />
        )}
        <Text style={styles.radioButtonText}>
          Choose canine hepatitis Date:
        </Text>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={showDateTimePicker}
        >
          <Text style={styles.buttonText}>Choose date</Text>
        </TouchableOpacity>
        {showPicker && (
          <DateTimePicker
            value={canineHepatitisDate}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={onChangeDatecanineHepatitis}
          />
        )}
        <Text style={styles.radioButtonText}>Choose spirocerca lupi Date:</Text>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={showDateTimePicker}
        >
          <Text style={styles.buttonText}>Choose date</Text>
        </TouchableOpacity>
        {showPicker && (
          <DateTimePicker
            value={spirocercaLupiDate}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={onChangeDateSpirocercaLupi}
          />
        )}

        <Text style={styles.radioButtonText}>Choose deworming Date:</Text>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={showDateTimePicker}
        >
          <Text style={styles.buttonText}>Choose date</Text>
        </TouchableOpacity>
        {showPicker && (
          <DateTimePicker
            value={dewormingDate}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={onChangeDateDeworming}
          />
        )}
        <Text style={styles.radioButtonText}>Choose fleas treatment Date:</Text>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={showDateTimePicker}
        >
          <Text style={styles.buttonText}>Choose date</Text>
        </TouchableOpacity>
        {showPicker && (
          <DateTimePicker
            value={fleaTreatmentDate}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={onChangeDatefleaTreatment}
          />
        )}
        <Text style={styles.radioButtonText}>castration?</Text>
        <View style={{ height: 10 }} />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          {YesNoArray.map((option) => (
            <TouchableOpacity
              key={option.value}
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginRight: 30,
              }}
              onPress={() => onChangeCastration(option.value)}
            >
              <View style={styles.radioCircle}>
                {YesNoArray === option.value && (
                  <View style={styles.selectedRadioCircle} />
                )}
              </View>
              <Text style={styles.radioButtonText}>{option.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <TextInput
          style={styles.input}
          value={alergies}
          onChangeText={onChangeAlergies}
          placeholder="Alergies:"
          placeholderTextColor="#8B5A33"
        />
        <TextInput
          style={styles.input}
          value={medications}
          onChangeText={onChangeMedications}
          placeholder="Medical :"
          placeholderTextColor="#8B5A33"
        />
        <TextInput
          style={styles.input}
          value={medicalTreatment}
          onChangeText={onChangeMedicalTreatment}
          placeholder="Medical Treatment:"
          placeholderTextColor="#8B5A33"
        />
        <TouchableOpacity style={styles.registerButton} onPress={onSave}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};
export default Update_medical_data;
