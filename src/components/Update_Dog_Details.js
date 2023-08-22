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
import { db, storage } from "../../firebase";
import {
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
  listAll,
  list,
  getStorage,
  deleteObject,
} from "firebase/storage";
import { v4 } from "uuid";

const Update_Dog_Details = ({ route, navigation }) => {
  const { dog } = route.params;
  const [name, setName] = useState(dog.name);
  const [breed, setBreed] = React.useState(dog.breed); // return array with 2 att
  const [profilePicture, setProfilePicture] = React.useState(
    dog.profilePicture
  );
  const [colors, setColors] = React.useState(dog.colors);
  const [gender, setGender] = React.useState(dog.gender);
  const [enterdate, setEnterdate] = React.useState(dog.enterdate.toDate());
  const [status, setStatus] = React.useState(dog.status);
  const [cell, setCell] = React.useState(dog.cell);
  const [birthday, setBirthday] = React.useState(dog.birthday.toDate());
  const [info, setInfo] = React.useState(dog.info);
  const [showBirthdayPicker, setBirthdayShowPicker] = React.useState(false);
  const [showEnterDatePicker, setEnterDateShowPicker] = React.useState(false);
  const onChangeEnterDate = (event, selectedDate) => {
    const currentDate = selectedDate || enterdate;
    setEnterDateShowPicker(false);
    setEnterdate(currentDate);
  };

  const onChangeBirthday = (event, selectedDate) => {
    const currentBirthday = selectedDate || birthday;
    setBirthdayShowPicker(false);
    setBirthday(currentBirthday);
  };
  const onSave = () => {
    //save to database+alert acoordingly ---------------------------------->RAZ - update database
    const updateDetails = {
      name: name,
      breed: breed,
      colors: colors,
      profilePicture: profilePicture,
      gender: gender,
      enterdate: enterdate,
      birthday: birthday,
      status: status,
      cell: cell,
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

    
    Alert.alert("Saved!", "The changes were saved successfully!");
    navigation.navigate('Home')
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

    deleteOldImageFromStorage(dog);
    uploadNewImage(result);
  };
  const deleteOldImageFromStorage = async (dog) => {
    const oldImagetRef = ref(storage, profilePicture);
    deleteObject(oldImagetRef)
      .then(() => {
        console.log("old image deleted");
      })
      .catch((error) => {
        console.log("error delete old image:", error);
      });
  };

  const uploadNewImage = async (result) => {
    //replace image
    if (!result.canceled) {
      const uniqueFilename = v4(); // Generate a unique filename
      const metadata = {
        contentType: "image/jpeg",
      };
      const imageRef = ref(storage, `dogProfileImages/${uniqueFilename}.jpg`);
      const response = await fetch(result.assets[0].uri);
      const blob = await response.blob();
      // Upload the image bytes to the storage reference
      await uploadBytes(imageRef, blob, metadata)
        .then((snapshot) => {
          console.log("successfully");
        })
        .catch((error) => {
          console.log(error.massage);
        });
      imageUrl = await getDownloadURL(imageRef);
      console.log("Image uploaded successfully. URL:", imageUrl);
      setProfilePicture(imageUrl);
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
            Cell:
          </Text>
          <TextInput
            style={styles.input}
            value={cell}
            onChangeText={setCell}
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
            onPress={() => setBirthdayShowPicker(true)}
          >
            <Text style={styles.buttonText}>Change Birthday Date</Text>
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
            Birthday: {birthday.toDateString()}
          </Text>

          <View style={{ height: 20 }} />

          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => setEnterDateShowPicker(true)}
          >
            <Text style={styles.buttonText}>Change Shelter Entry Date</Text>
          </TouchableOpacity>
          {showEnterDatePicker && (
            <DateTimePicker
              value={enterdate}
              mode="date"
              is24Hour={true}
              display="default"
              onChange={onChangeEnterDate}
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
