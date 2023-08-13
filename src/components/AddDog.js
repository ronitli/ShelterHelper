import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Platform,
  Alert,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
//import pickImage from './pickImage';
import { styles } from "../styles";
import { RadioButton } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import Dogs from "./Dogs";
import { db, storage } from "../../firebase";
import {
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";
import { v4 } from "uuid";
//import { v4 as uuidv4 } from 'uuid';
import {
  collection,
  doc,
  getDoc,
  setDoc,
  addDoc,
  updateDoc,
} from "firebase/firestore";
import Icon from "react-native-vector-icons/FontAwesome";
// import * as ImageManipulator from 'expo-image-manipulator';
// import { manipulateAsync } from 'expo-image-manipulator';
// import * as FileSystem from 'expo-file-system';
// import { Asset } from 'expo-asset';
// import * as ExpoAsset from 'expo-asset';

const AddDog = ({ route, navigation }) => {
  // func declaration argugemnt navigation  function adddogs (navigation) {}

  const [name, setName] = React.useState(""); //properties of the component a change in here will run the return section again
  const [breed, setBreed] = React.useState(""); // return array with 2 att
  const [cell, setCell] = React.useState("");
  const [profilePicture, setProfilePicture] = React.useState(null);
  const [colors, setColors] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [ageInYears, setAgeInYears] = React.useState("");
  const [ageInMonths, setAgeInMonths] = React.useState("");
  const [enterdate, setEnterdate] = React.useState(new Date());
  const [status, setStatus] = React.useState("");
  const [info, setInfo] = React.useState("");
  const [showPicker, setShowPicker] = React.useState(false); //defalt val is flase

  const [rabiesVaccineDate, setRabiesVaccineDate] = useState("");
  const [chipDate, setChipDate] = useState("");
  const [hexagonalVaccine, setHexagonalVaccine] = useState("");
  const [spirocercaLupiDate, setSpirocercaLupi] = useState("");
  const [castration, setCastration] = useState("");
  const [dewormingDate, setDeworming] = useState("");
  const [fleaTreatmentDate, setFleaTreatment] = useState("");
  const [alergies, setAlergies] = useState("");
  const [medications, setMedications] = useState("");
  const [medicalTreatment, setTreatment] = useState("");

  /* TODO:  Convert all above fields into one object for better code consistency
    const [medicalData, setMedicalData] = useState({
      rabiesVaccineDate : '',
      chipDate : '',
      hexagonalVaccine : '',
      spirocercaLupiDate : '',
      castration : '',
      dewormingDate : '',
      fleaTreatmentDate : '',
      alergies : '',
      medications : '',
      medicalTreatment : '',
    })
    */

  const {
    paramRabies,
    paramChip,
    paramHex,
    paramLupi,
    paramCastration,
    paramDeworming,
    paramFlea,
    paramAlergies,
    paramMedications,
    paramTreatment,
  } = route.params ?? {};
  useEffect(() => {
    // console.log(`Inside useEffect ${JSON.stringify(paramAlergies)}`);
    setRabiesVaccineDate(paramRabies);
    setChipDate(paramChip);
    setAgeInMonths(ageInMonths);
    setAgeInYears(ageInYears);
    setHexagonalVaccine(paramHex);
    setSpirocercaLupi(paramLupi);
    setCastration(paramCastration);
    setDeworming(paramDeworming);
    setFleaTreatment(paramFlea);
    setAlergies(paramAlergies);
    setMedications(paramMedications);
    setTreatment(paramTreatment);
    /* For object implementation
      setMedicalData(route.params);
      setMedicalData({...medicalData, hexagonalVaccine : ''});
      */
  }, [route.params]);

  const handleMedical = () => {
    console.log("Add Medical Data button pressed");

    navigation.navigate("Add_Medical_Data");

    /*
    setRabiesVaccineDate(param1);
    setChipDate(param2);
    setHexagonalVaccine(param3);
    setSpirocercaLupi(param4);
    setcastration(param5);
    setDeworming(param6);
    setfleaTreatment(param7);
    //setAlergies(param8);

    setMedications(param9);
    setTreatment(param10);
    */
  };

  const onChange = (event, selectedDate) => {
    // prperty
    const currentDate = selectedDate || enterdate;
    setShowPicker(false);
    setEnterdate(currentDate);
  };

  const showDateTimePicker = () => {
    setShowPicker(true);
  };

  const handleCreateProfile = async () => {
    //backend validation
    if (name === "" && !profilePicture) {
      Alert.alert('Can not create profile',
        'You have at least to enter a name OR upload a picture of the dog.'
      );
      return;
    }

    //save to database & validate
    //     let image;
    //     const file = profilePicture;
    //     const reader = new FileReader();
    //     reader.onload = function(event) {
    //     const dataURL = event.target.result;
    //     image=dataURL;
    // };
    // reader.readAsDataURL(file);
  let imageUrl=null;
  // try {
  //   const uniqueFilename = v4(); // Generate a unique filename
  //   console.log(storage)
  //   const metadata  = {
  //     contentType: "image/jpeg",
  //   };
  //   const imageRef = ref(storage, `dogProfileImages/${uniqueFilename}.jpg`);
  //   await uploadBytes(imageRef, profilePicture, metadata);
  //   imageUrl = await getDownloadURL(imageRef);
  //   console.log("Image uploaded successfully. URL:", imageUrl);
  //   setProfilePicture(imageUrl);
  // } catch (error) {
  //   console.error("Error uploading image:", error);
  // }

  // const res = await fetch(imagen.uri);
  // const blob = await res.blob();
  // const filename = imagen.uri.substring(imagen.uri.lastIndexOf('/')+1)
  
  // // Upload file and metadata to the object 'images/mountains.jpg'
  // const storageRef = ref(storage, `./images/${filename}` + filename);
  // const uploadTask = uploadBytesResumable(storageRef, blob, profilePicture);
  try {
    // Check if a profile picture is available
    if (profilePicture) {
      const uniqueFilename = v4(); // Generate a unique filename
      const metadata = {
        contentType: "image/jpeg",
      };

      // Reference to the storage location
      const imageRef = ref(storage, `dogProfileImages/${uniqueFilename}.jpg`);
      
      // Upload the image bytes to the storage reference
      await uploadBytes(imageRef, profilePicture, metadata);
      
      // Get the download URL of the uploaded image
      imageUrl = await getDownloadURL(imageRef);
      console.log("Image uploaded successfully. URL:", imageUrl);

      // Update the profile picture URL
      setProfilePicture(imageUrl);
    }

    // ... (rest of your code)
  } catch (error) {
    console.error("Error uploading image:", error);
    // Handle the error here
  }
  
    const newDog = {
      name: name,
      breed: breed,
      profilePicture: imageUrl,
      colors: colors,
      gender: gender,
      ageInYears: ageInYears,
      ageInMonths: ageInMonths,
      enterdate: enterdate,
      status: status,
      info: info,
      cell: cell,
      tripdate: "",
      tripTime: "",
      id: "",
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

    let dogId;
    const dbRef = collection(db, "Dogs");
    await addDoc(dbRef, newDog)
      .then((docRef) => {
        const newDogId = docRef.id; // Retrieve the auto-generated ID
        dogId = docRef.id;
        console.log("Successfully added a new dog with ID:", newDogId);
        alert("Successfully added a new dog with ID: " + newDogId);
        const data = { ...newDog, id: newDogId };
        setDoc(docRef, data)
          .then((docRef) => {
            console.log("id has been updated successfully");
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .then(() => {
        console.log("Successfully updated the ID field of the document");
      })
      .catch((error) => {
        console.log("Error adding a new dog:", error);
      });

    // Clear the form fields after data is saved
    setName("");
    setBreed("");
    setProfilePicture(null);
    setColors("");
    setGender("");
    setStatus("");
    setInfo("");
    setAgeInMonths("");
    setAgeInMonths("");
    setCell("");
  };
  const handleDocuments = () => {
    console.log("Add Documentsbutton pressed");

    navigation.navigate("AddDocuments");
  };
  const handlePickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      Alert.alert('No permissions','Sorry, we need camera roll permissions to make this work!');
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
          <Icon name="paw" size={50} color="sienna" />
          <Text style={styles.title}>Add a New Dog</Text>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={handlePickImage}
          >
            <Text style={styles.buttonText}>Pick Image</Text>
          </TouchableOpacity>
          {profilePicture && (
            <Image
              source={{ uri: profilePicture }}
              style={styles.profilePicture}
            />
          )}
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Name:"
            placeholderTextColor="#8B5A33"
          />
          <TextInput
            style={styles.input}
            value={breed}
            onChangeText={setBreed}
            placeholder="Breed:"
            placeholderTextColor="#8B5A33"
          />
          <TextInput
            style={styles.input}
            value={colors}
            onChangeText={setColors}
            placeholder="Colors:"
            placeholderTextColor="#8B5A33"
          />
          <TextInput
            keyboardType="numeric"
            style={styles.input}
            value={ageInYears}
            onChangeText={setAgeInYears}
            placeholder="Age (in years):"
            placeholderTextColor="#8B5A33"
          />
          <TextInput
            keyboardType="numeric"
            style={styles.input}
            value={ageInMonths}
            onChangeText={setAgeInMonths}
            placeholder="Age (in months):"
            placeholderTextColor="#8B5A33"
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
            <Text style={styles.buttonText}>Select Shelter Enrty Date</Text>
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

          <TextInput
            keyboardType="numeric"
            style={styles.input}
            value={cell}
            onChangeText={setCell}
            placeholder="Cell number:"
            placeholderTextColor="#8B5A33"
          />
          <TextInput
            style={styles.input}
            value={status}
            onChangeText={setStatus}
            placeholder="Status:"
            placeholderTextColor="#8B5A33"
          />
          <TextInput
            style={styles.input}
            value={info}
            onChangeText={setInfo}
            placeholder="Additional information:"
            placeholderTextColor="#8B5A33"
          />
          <TouchableOpacity style={styles.loginButton} onPress={handleMedical}>
            <Text style={styles.buttonText}>Add Medical Data</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleDocuments}
          >
            <Text style={styles.buttonText}>Add Documents</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.registerButton}
            onPress={handleCreateProfile}
          >
            <Text style={styles.buttonText}>Create Profile</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddDog;
