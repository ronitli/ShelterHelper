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
  const [rabiesVaccineDate, setRabiesVaccine] = React.useState(new Date());
  const [chipDate, setChip] = React.useState(dog.chip);
  const [canineHepatitisDate, setCanineHepatitis] = React.useState(
    dog.canineHepatitis
  );
  const [spirocercaLupiDate, setSpirocercaLupi] = React.useState(
    dog.spirocercaLupi
  );
  const [castration, setcastration] = React.useState(dog.castration);
  const [dewormingDate, setDeworming] = React.useState(dog.deworming);
  const [fleaTreatmentDate, setfleaTreatment] = React.useState(
    dog.fleaTreatment
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
  };
  const onChangeDatecanineHepatitis = (event, selectedDate) => {
    tempCanineHepatitis = selectedDate || canineHepatitisDate;
  };
  const onChangeDateSpirocercaLupi = (event, selectedDate) => {
    tempSpirocercaLupi = selectedDate || spirocercaLupiDate;
  };
  const onChangeDateDeworming = (event, selectedDate) => {
    tempDeworming = selectedDate || dewormingDate;
  };
  const onChangeDateChip = (event, selectedDate) => {
    tempChip = selectedDate || chipDate;
  };
  const onChangeDatefleaTreatment = (event, selectedDate) => {
    tempfleaTreatment = selectedDate || fleaTreatmentDate;
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
  const onSave = () => {
    //save to database+alert acoordingly
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
