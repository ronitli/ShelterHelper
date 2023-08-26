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
  const logged_in_user = route.params;
  const [name, setName] = React.useState(""); //properties of the component a change in here will run the return section again
  const [breed, setBreed] = React.useState(""); // return array with 2 att
  const [cell, setCell] = React.useState("");
  const [birthday, setBirthday] = React.useState(new Date());
  const [profilePicture, setProfilePicture] = React.useState(null);
  const [colors, setColors] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [enterdate, setEnterdate] = React.useState(new Date());
  const [status, setStatus] = React.useState("");
  const [info, setInfo] = React.useState("");
  const [showEntrencePicker, setShowEntrencePicker] = React.useState(false);
  const [showBirthdayPicker, setShowBirthdayPicker] = React.useState(false);
  useEffect(() => {}, []);
  const onChangeEnetrDate = (event, selectedDate) => {
    const currentDate = selectedDate || enterdate;
    setShowEntrencePicker(false);
    setEnterdate(currentDate);
  };
  const onChangeBirthday = (event, selectedDate) => {
    const currentDate = selectedDate || birthday;
    setShowBirthdayPicker(false);
    setBirthday(currentDate);
  };
  const handleCreateProfile = async () => {
    //backend validation
    if (name === "" && !profilePicture) {
      Alert.alert(
        "Can not create profile",
        "You have at least to enter a name OR upload a picture of the dog."
      );
      return;
    }
    let imageUrl = null;
    try {
      // Check if a profile picture is available
      if (profilePicture) {
        const uniqueFilename = v4(); // Generate a unique filename
        const metadata = {
          contentType: "image/jpeg",
        };
        // Reference to the storage location
        const imageRef = ref(storage, `dogProfileImages/${uniqueFilename}.jpg`);
        const response = await fetch(profilePicture);
        const blob = await response.blob();
        // Upload the image bytes to the storage reference
        await uploadBytes(imageRef, blob, metadata)
          .then((snapshot) => {
            console.log("successfully");
          })
          .catch((error) => {
            console.log(error.massage);
          });

        // Get the download URL of the uploaded image
        imageUrl = await getDownloadURL(imageRef);
        console.log("Image uploaded successfully. URL:", imageUrl);

        // Update the profile picture URL
        setProfilePicture(imageUrl);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
    const newDog = {
      name: name,
      shelterId: logged_in_user.shelterId,
      birthday: birthday,
      breed: breed,
      profilePicture: imageUrl,
      colors: colors,
      gender: gender,
      enterdate: enterdate,
      status: status,
      info: info,
      cell: cell,
      tripdate: "",
      tripTime: "",
      id: "",
    };
    let dogId;
    const dbRef = collection(db, "Dogs");
    await addDoc(dbRef, newDog)
      .then((docRef) => {
        const newDogId = docRef.id; // Retrieve the auto-generated ID
        dogId = docRef.id;
        console.log("Successfully added a new dog with ID:", newDogId);
        alert("Successfully added a new dog");
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
    setCell("");
    //go back to home page
    navigation.navigate("Home", logged_in_user);
  };
  const handlePickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "No permissions",
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
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => setShowBirthdayPicker(true)}
          >
            <Text style={styles.buttonText}>Select Birthday Date</Text>
          </TouchableOpacity>
          {showBirthdayPicker && (
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
            Chosen Date: {birthday.toDateString()}
          </Text>
          <View style={{ height: 20 }} />
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
            onPress={() => setShowEntrencePicker(true)}
          >
            <Text style={styles.buttonText}>Select Shelter Enrty Date</Text>
          </TouchableOpacity>
          {showEntrencePicker && (
            <DateTimePicker
              value={enterdate}
              mode="date"
              is24Hour={true}
              display="default"
              onChange={onChangeEnetrDate}
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
