import React, { useCallback, useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import _, { curry } from "lodash";
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
import Archive from "./Archive";
import { db } from "../../firebase";
import {
  collection,
  doc,
  getDoc,
  setDoc,
  addDoc,
  updateDoc,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import { useEffect } from "react";
import { isSearchBarAvailableForCurrentPlatform } from "react-native-screens";
//from home page

const Dogs = ({ navigation }) => {
  const [dogs, setDogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState();
  const [activeFilter, setActiveFilter] = useState("");
  const [selectedFiletrs, setSelectedFilters] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const q = collection(db, "Dogs");
      const querySnapshot = await getDocs(q);
      let dogsArray = querySnapshot.docs.map((doc) => doc.data());
      //console.log("Fetched dogs data:", dogsArray); // Check if the profilePicture URLs are present
      //console.log(dogsArray);
      if (searchTerm) {
        dogsArray = dogsArray.filter((dog) =>
          dog.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      setDogs(dogsArray);
    };
    fetchData();
  }, [searchTerm, activeFilter, selectedFiletrs]);

  const getFilteredDogs = () => {
    //console.log(selectedFiletrs, dogs);
    let filteredDogs = [...dogs];
    for (const filterKey in selectedFiletrs) {
      if (selectedFiletrs[filterKey]?.size === 0) continue;

      filteredDogs = filteredDogs.filter((dog) =>
        selectedFiletrs[filterKey]?.has(dog[filterKey])
      );
    }

    return filteredDogs;
  };
  const handleUploadDocuments = () => {}; //ronit here you wotk

  //const deleteDog = async (dog) => {
  // i need to get the specific dog
  //  await transferToArchive(dog);
  //need to wait (30)? days
  //  await permanentlyDeleteFromArchive(dog);
  //};

  const handleDocuments = () => {
    console.log("Add Documentsbutton pressed");

    navigation.navigate("ManageDocuments");
  };

  const transferToArchive = async (dog) => {
    setDoc(doc(db, "DogsArchive", dog.id), {
      ...dog,
    })
      .then((docRef) => {
        console.log(
          "SUCCESS: Dog name and id: (dog name and id:" + dog.name,
          dog.id + ") add to Dogs Archive"
        );
        alert("Dog add to Dogs Archive for 30 days untill full deletion");
      })
      .catch((error) => {
        console.log("Error adding Dog to dog archive: ", error);
      });

    await deleteDogFromDogsTable(dog);
  };

  const deleteDogFromDogsTable = async (dog) => {
    const q = doc(collection(db, "Dogs"), dog.id);
    console.log(q);
    try {
      await deleteDoc(q);
      setDogs(dogs.filter((currDog) => currDog.id != dog.id));
      console.log("SUCCESS: Dog deleted from Dogs table!");
    } catch (error) {
      console.error("Error removing Dog from Dogs table: ", error);
    }
  };

  const permanentlyDeleteFromArchive = async (dog) => {
    const q = doc(collection(db, "DogsArchive"), dog.id);
    console.log(q);
    try {
      await deleteDoc(q);
      console.log("SUCCESS: Dog deleted from Dogs archive!");
    } catch (error) {
      console.error("Error removing Dog from Dogs archive: ", error);
    }
  };

  const getFilterOptions = () => {
    console.log("in get active filetr option");
    if (!activeFilter) return [];
    console.log("af ", activeFilter);

    const optionsSet = new Set();
    for (const dog of dogs) {
      optionsSet.add(dog[activeFilter]);
    }

    return [...optionsSet];
  };
  const getDate = (timeStamp) => {
    const date = timeStamp.toDate();
    //console.log(date);
    return date;
  };
  const handleDelete = (dog) => {
    // let needsToDelete = false; // Corrected variable name

    Alert.alert(
      "Alert",
      "Are you sure you want to send him to the archive?",
      [
        {
          text: "Cancel",
          onPress: () => {
            console.log("Cancel Pressed");
            //needsToDelete = false;
          },
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async () => {
            console.log("OK Pressed");
            //console.error(dog);
            await transferToArchive(dog);
          },
          style: "OK",
        },
      ],
      { cancelable: false }
    );
  };

  const handleImageError = (dogId) => {
    // Handle image loading errors here
    console.log("Image loading error for dog with ID:", dogId);
  };

  const getDogAge = (dog) => {
    const birthdate = dog.birthday.toDate();
    const today = new Date();
    const ageInMilliseconds = today - birthdate;
    const ageInYears = ageInMilliseconds / (1000 * 60 * 60 * 24 * 365.25);
    if (ageInYears < 1) {
      const ageInMonths = ageInMilliseconds / (1000 * 60 * 60 * 24 * 30.44);
      return `${ageInMonths.toFixed(0)} months`;
    } else {
      return `${Math.floor(ageInYears)} years`;
    }
  };

  const selectFilterOption = (option) => {
    const newSelectedFiletrs = { ...selectedFiletrs };
    if (!newSelectedFiletrs[activeFilter]) {
      newSelectedFiletrs[activeFilter] = new Set();
    }

    if (newSelectedFiletrs[activeFilter].has(option)) {
      newSelectedFiletrs[activeFilter].delete(option);
    } else {
      newSelectedFiletrs[activeFilter].add(option);
    }

    setSelectedFilters(newSelectedFiletrs);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={styles.title}>Our Dogs</Text>
          <View style={styles.menuContainer}>
            <View style={styles.searchBar}>
              <TextInput
                style={styles.input}
                placeholder="Search a dog name..."
                placeholderTextColor="#e8c7bf"
                value={searchTerm}
                onChangeText={(val) => setSearchTerm(val)}
                keyboardType="default"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
            <View style={styles.filterIconContainer}>
              <View style={styles.filtersRow}>
                <Icon
                  style={styles.fIcon}
                  name="filter"
                  size={34}
                  color="sienna"
                />
                <TouchableOpacity
                  onPress={() => {
                    if (activeFilter === "colors") {
                      setActiveFilter("");
                    } else {
                      setActiveFilter("colors");
                    }
                  }}
                >
                  <Text style={styles.filter}>
                    Color{" "}
                    {selectedFiletrs["colors"] &&
                      `(${selectedFiletrs["colors"].size})`}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    if (activeFilter === "age") {
                      setActiveFilter("");
                    } else {
                      setActiveFilter("age");
                    }
                  }}
                >
                  <Text style={styles.filter}>
                    Age{" "}
                    {selectedFiletrs["age"] &&
                      `(${selectedFiletrs["age"].size})`}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    if (activeFilter === "breed") {
                      setActiveFilter("");
                    } else {
                      setActiveFilter("breed");
                    }
                  }}
                >
                  <Text style={styles.filter}>
                    Breed{" "}
                    {selectedFiletrs["breed"] &&
                      `(${selectedFiletrs["breed"].size})`}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    if (activeFilter === "gender") {
                      setActiveFilter("");
                    } else {
                      setActiveFilter("gender");
                    }
                  }}
                >
                  <Text style={styles.filter}>
                    Gender{" "}
                    {selectedFiletrs["gender"] &&
                      `(${selectedFiletrs["gender"].size})`}
                  </Text>
                </TouchableOpacity>
              </View>

              {activeFilter && (
                <View style={styles.filtersMenu}>
                  <Title style={styles.filterTitle}>{activeFilter}</Title>
                  <ScrollView>
                    {getFilterOptions().map((option) => (
                      <View style={styles.filterOptionContainer}>
                        <View style={styles.filterCheckbox}>
                          <Checkbox
                            status={
                              selectedFiletrs[activeFilter]?.has(option)
                                ? "checked"
                                : ""
                            }
                            onPress={() => selectFilterOption(option)}
                          ></Checkbox>
                        </View>
                        <View style={styles.filterOptionTextContainer}>
                          <Text style={styles.filterOption}>{option}</Text>
                        </View>
                      </View>
                    ))}
                  </ScrollView>
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => setActiveFilter()}
                  >
                    <Text style={styles.closeButton}>Close</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
          <View>
            <TouchableOpacity
              style={styles.nowTripButton}
              onPress={() => navigation.navigate("Archive")}
            >
              <Text style={styles.buttonText}> See dogs Archive</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.reqContainer}>
            {getFilteredDogs().map((dog) => (
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
                <Text style={styles.reqText}>Age: {getDogAge(dog)}.</Text>
                <Text style={styles.reqText}>
                  Shelter entry date: {getDate(dog.enterdate).toDateString()}
                </Text>
                <Text style={styles.reqText}>Cell number: {dog.cell}</Text>
                <Text style={styles.reqText}>Alergies: {dog.alergies}</Text>
                <Text style={styles.reqText}> Status: {dog.status}</Text>
                <Text style={styles.reqText}>
                  {" "}
                  Additional information: {dog.info}
                </Text>
                <TouchableOpacity
                  style={styles.loginButton}
                  onPress={() => navigation.navigate("Update_trip", { dog })}
                >
                  <Text style={styles.buttonText}>Update trip</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.loginButton}
                  onPress={() =>
                    navigation.navigate("DogInfo", { dog })
                  }
                >
                  <Text style={styles.buttonText}>More Information</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.loginButton}
                  onPress={handleDocuments}
                >
                  <Text style={styles.buttonText}>Manage Documents</Text>
                </TouchableOpacity>
          
                <TouchableOpacity
                  style={styles.registerButton}
                  onPress={() => handleDelete(dog)}
                >
                  <Text style={styles.buttonText}>Send To archive</Text>
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
export default Dogs;
