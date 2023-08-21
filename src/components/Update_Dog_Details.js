import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import pickImage from "./pickImage";
import { styles } from "../styles";
import { RadioButton } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  collection,
  doc,
  getDoc,
  setDoc,
  addDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";

const Update_Dog_Details = ({ route, navigation }) => {
  const { dog } = route.params;
  const [name, setName] = useState(dog.name);
  const [breed, setBreed] = React.useState(dog.breed); // return array with 2 att
  const [profilePicture, setProfilePicture] = React.useState(
    dog.profilePicture
  );
  const [colors, setColors] = React.useState(dog.colors);
  const [gender, setGender] = React.useState(dog.gender);
  const [ageInYears, setAgeInYears] = React.useState(dog.ageInYears);
  const [ageInMonths, setAgeInMonths] = React.useState(dog.ageInMonths);
  const [enterdate, setEnterdate] = React.useState(dog.enterdate.toDate());
  const [status, setStatus] = React.useState(dog.status);
  const [birthday, setBirthday] = React.useState(dog.birthday.toDate());
  const [info, setInfo] = React.useState(dog.info);
  const [showPicker, setShowPicker] = React.useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || enterdate;
    setShowPicker(false);
    setEnterdate(currentDate);
  };

  const onChangeBirthday = (event, selectedDate) => {
    const currentBirthday = selectedDate || birthday;
    setShowPicker(false);
    setBirthday(currentBirthday);
  };

  const showDateTimePicker = () => {
    setShowPicker(true);
  };
  const onSave = () => {
    //save to database+alert acoordingly ---------------------------------->RAZ - update database
    const updateDetails = {
      name: name,
      breed: breed,
      profilePicture: profilePicture,
      colors: colors,
      gender: gender,
      enterdate: enterdate,
      birthday: birthday,
      status: status,
      info: info,
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
  const handlePickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "No permissions.",
        "Sorry, we need camera roll permissions to make this work!"
      );
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setProfilePicture(result.assets[0].uri);
    }
  };
  const genders = [
    // array with two argu
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.container}>
          <Icon name="pencil" size={50} color="sienna" />
          <Text style={styles.title}>Update Dog Details</Text>

          <Text
            style={[
              styles.radioButtonText,
              { textDecorationLine: "underline" },
            ]}
          >
            Name:
          </Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            color="#8B5A33"
          />
          <View style={{ height: 10 }} />

          <Text
            style={[
              styles.radioButtonText,
              { textDecorationLine: "underline" },
            ]}
          >
            Colors:
          </Text>
          <TextInput
            style={styles.input}
            color="#8B5A33"
            value={colors}
            onChangeText={setColors}
          />
          <View style={{ height: 10 }} />

          <Text
            style={[
              styles.radioButtonText,
              { textDecorationLine: "underline" },
            ]}
          >
            Breed:
          </Text>
          <TextInput
            style={styles.input}
            color="#8B5A33"
            value={breed}
            onChangeText={setBreed}
          />

          <Text style={styles.radioButtonText}>Choose dog gender:</Text>
          <View style={{ height: 10 }} />
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {genders.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginRight: 20,
                  marginLeft: 20,
                }}
                onPress={() => setGender(option.value)}
              >
                <Text style={styles.radioButtonText}>{option.label}</Text>
                <View style={{ width: 7 }} />
                <View style={styles.radioCircle}>
                  {gender === option.value && (
                    <View style={styles.selectedRadioCircle} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>

          <View style={{ height: 20 }} />

          <TouchableOpacity
            style={styles.loginButton}
            onPress={showDateTimePicker}
          >
            <Text style={styles.buttonText}>Change Birthday Date</Text>
          </TouchableOpacity>

          {showPicker && (
            <DateTimePicker
              value={birthday}
              mode="date"
              is24Hour={true}
              display="default"
              onChange={onChangeBirthday}
              maximumDate={new Date()}
            />
          )}
          <View style={{ marginTop: -15 }} />
          <Text style={styles.radioButtonText}>
            Birthday: {birthday.toDateString()}
          </Text>

          <View style={{ height: 20 }} />
          
          <TouchableOpacity
            style={styles.loginButton}
            onPress={showDateTimePicker}
          >
            <Text style={styles.buttonText}>Change Shelter Entry Date</Text>
          </TouchableOpacity>
          {showPicker && (
            <DateTimePicker
              value={enterdate}
              mode="date"
              is24Hour={true}
              display="default"
              onChange={onChange}
              maximumDate={new Date()}
            />
          )}
          <View style={{ marginTop: -15 }} />
          <Text style={styles.radioButtonText}>
            Shelter Entery Date: {enterdate.toDateString()}
          </Text>
          <View style={{ height: 20 }} />
          <Text
            style={[
              styles.radioButtonText,
              { textDecorationLine: "underline" },
            ]}
          >
            Status:
          </Text>
          <TextInput
            style={styles.input}
            color="#8B5A33"
            value={status}
            onChangeText={setStatus}
          />
          <View style={{ height: 10 }} />

          <Text
            style={[
              styles.radioButtonText,
              { textDecorationLine: "underline" },
            ]}
          >
            Additional Information:
          </Text>
          <TextInput
            style={styles.input}
            color="#8B5A33"
            value={info}
            onChangeText={setInfo}
          />
          <View style={{ height: 10 }} />

          <Text
            style={[
              styles.radioButtonText,
              { textDecorationLine: "underline" },
            ]}
          >
            Picture:
          </Text>
          {profilePicture && (
            <Image
              source={{ uri: profilePicture }}
              style={styles.profilePicture}
            />
          )}
          <TouchableOpacity
            style={styles.loginButton}
            onPress={handlePickImage}
          >
            <Text style={styles.buttonText}>Change Image</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.registerButton} onPress={onSave}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Update_Dog_Details;
