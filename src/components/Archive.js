import React, { useCallback, useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import _ from "lodash";
import { Alert } from "react-native";
import { Checkbox, Title } from "react-native-paper";
import { SafeAreaView } from "react-native";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Button,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import pickImage from "./pickImage";
import { styles } from "../styles";
import { RadioButton } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import Update_Dog_Details from "./Update_Dog_Details";
import { db } from "../../firebase";
import {
  collection,
  doc,
  where,
  query,
  getDoc,
  setDoc,
  addDoc,
  updateDoc,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import { useEffect } from "react";
import { isSearchBarAvailableForCurrentPlatform } from "react-native-screens";
//from Dogs page
const Archive = ({ route, navigation }) => {
  const logged_in_user = route.params;
  const [dogs, setDogs] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const dogs_collection = collection(db, "DogsArchive");
      const querySnapShot = query(
        dogs_collection,
        where("shelterId", "==", logged_in_user.shelterId)
      );
      const q = await getDocs(querySnapShot);
      let dogsArray = q.docs.map((doc) => doc.data());
      setDogs(dogsArray);
    };
    fetchData(); // Call the fetchData function to fetch data when the component mounts
  }, []);

  const deleteOldDogsFromArchive = async () => {
    const q = collection(db, "DogsArchive");
    const querySnapshot = await getDocs(q);
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - 1); // 30 days ago
    const deletePromises = [];
    querySnapshot.forEach((doc) => {
      const deleteTimestamp = doc.data().deleteTimestamp.toDate();
      if (deleteTimestamp <= currentDate) {
        deleteDogFromDogsArchiveTable(doc);
        deleteOldImageFromStorage(doc);
      }
    });
  };
  deleteOldDogsFromArchive();
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

  const handleImageError = (dogId) => {
    // Handle image loading errors here
    console.log("Image loading error for dog with ID:", dogId);
  };
  const transferToShelter = async (dog) => {
    setDoc(doc(db, "Dogs", dog.id), {
      ...dog,
    })
      .then((docRef) => {
        console.log(
          "SUCCESS: Dog name and id: (dog name and id:" + dog.name,
          dog.id + ") add to Dogs"
        );
        alert("The dog added back to the shelter data.");
      })
      .catch((error) => {
        console.log("Error adding Dog back to the shelter: ", error);
      });

    deleteDogFromDogsArchiveTable(dog);
  };

  const deleteDogFromDogsArchiveTable = async (dog) => {
    const q = doc(collection(db, "DogsArchive"), dog.id);
    console.log(q);
    try {
      await deleteDoc(q);
      setDogs(dogs.filter((currDog) => currDog.id != dog.id));
      console.log("SUCCESS: Dog deleted from Dogs Archive table!");
    } catch (error) {
      console.error("Error removing Dog from Dogs Archive table: ", error);
    }
  };
  const handleReArchive = (dog) => {
    Alert.alert(
      "Alert",
      "Are you sure you want to send him back to the shelter data?",
      [
        {
          text: "Cancel",
          onPress: () => {
            console.log("Cancel Pressed");
          },
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async () => {
            console.log("OK Pressed");
            await transferToShelter(dog);
            navigation.navigate("Home", logged_in_user);
          },
          style: "OK",
        },
      ],
      { cancelable: false }
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={styles.title}>Dog's Archive</Text>
          <Icon name="folder-open" size={50} color="sienna" />
          <View style={styles.reqContainer}>
            {dogs.map((dog) => (
              <View key={dog.id} style={styles.request}>
                <Image
                  style={{ width: 200, height: 200 }}
                  source={{ uri: dog.profilePicture }}
                  onError={() => handleImageError(dog.id)}
                />
                <Text style={styles.reqText}>Name: {dog.name}</Text>
                <Text style={styles.reqText}>Color: {dog.colors}</Text>
                <Text style={styles.reqText}>Gender: {dog.gender}</Text>
                <Text style={styles.reqText}>breed: {dog.breed}</Text>
                <TouchableOpacity
                  style={styles.registerButton}
                  onPress={() => handleReArchive(dog)}
                >
                  <Text style={styles.buttonText}>Back to the shelter</Text>
                </TouchableOpacity>

                <View style={styles.underline} />
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default Archive;
