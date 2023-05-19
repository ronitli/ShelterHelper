import React, { useCallback, useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import _ from "lodash";
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
  getFirestore,
  collection,
  setDoc,
  addDoc,
  getDocs,
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
      console.log(dogsArray);
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
    console.log(selectedFiletrs, dogs);
    let filteredDogs = [...dogs];
    for (const filterKey in selectedFiletrs) {
      if (selectedFiletrs[filterKey]?.size === 0) continue;

      filteredDogs = filteredDogs.filter((dog) =>
        selectedFiletrs[filterKey]?.has(dog[filterKey])
      );
    }

    console.log(filteredDogs);

    return filteredDogs;
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
    console.log(date);
    return date;
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
              <View style={styles.filterIcon}>
                <Icon name="filter" size={50} color="sienna" />
                <Button
                  title="Colors"
                  onPress={() => {
                    setActiveFilter("colors");
                  }}
                ></Button>
                <Button
                  title="Breed"
                  onPress={() => setActiveFilter("breed")}
                ></Button>
                <Button
                  title="Age"
                  onPress={() => setActiveFilter("age")}
                ></Button>
                <Button
                  title="Gender"
                  onPress={() => setActiveFilter("gender")}
                ></Button>
              </View>

              {activeFilter && (
                <View style={styles.filtersMenu}>
                  <Title>{activeFilter}</Title>
                  {getFilterOptions().map((option) => (
                    <View style={styles.checkbox}>
                      <Checkbox
                        status={
                          selectedFiletrs[activeFilter]?.has(option)
                            ? "checked"
                            : ""
                        }
                        onPress={() => selectFilterOption(option)}
                      ></Checkbox>
                      <Text>{option}</Text>
                    </View>
                  ))}
                  <Button
                    title="Close"
                    onPress={() => setActiveFilter()}
                  ></Button>
                </View>
              )}
            </View>
          </View>
          <View style={styles.reqContainer}>
            {getFilteredDogs().map((dog) => (
              <View key={dog.id} style={styles.request}>
                <Image
                  source={{ uri: dog.profilePicture }}
                  style={{ width: 200, height: 200 }}
                />
                <Text style={styles.reqText}>Name: {dog.name}</Text>
                <Text style={styles.reqText}>Color: {dog.colors}</Text>
                <Text style={styles.reqText}>Gender: {dog.gender}</Text>
                <Text style={styles.reqText}>breed: {dog.breed}</Text>
                <Text style={styles.reqText}>Age: {dog.age}</Text>
                <Text style={styles.reqText}>
                  Shelter entry date: {getDate(dog.enterdate).toDateString()}
                </Text>
                <Text style={styles.reqText}>Cell number: {dog.cell}</Text>
                <Text style={styles.reqText}>
                  Medical information: {dog.medical_info}
                </Text>
                <Text style={styles.reqText}> Status: {dog.status}</Text>
                <Text style={styles.reqText}>
                  {" "}
                  Additional information: {dog.info}
                </Text>
                <TouchableOpacity
                  style={styles.loginButton}
                  onPress={() =>
                    navigation.navigate("Update_Dog_Details", { dog })
                  }
                >
                  <Text style={styles.buttonText}>Update Dog Details</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.loginButton}
                  onPress={() => navigation.navigate("Update_trip", { dog })}
                >
                  <Text style={styles.buttonText}>Update trip</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.loginButton}
                  onPress={() =>
                    navigation.navigate("Update_medical_data", { dog })
                  }
                >
                  <Text style={styles.buttonText}>Update medical data</Text>
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
