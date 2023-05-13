import React, { useCallback, useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import _ from "lodash";
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

  useEffect(() => {
    const fetchData = async () => {
      const q = collection(db, "Dogs");
      const querySnapshot = await getDocs(q);
      let dogsArray = querySnapshot.docs.map((doc) => doc.data());
      console.log(dogsArray);
      if (searchTerm) {
        console.log("hi " + searchTerm);
        dogsArray = dogsArray.filter((dog) =>
          dog.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      setDogs(dogsArray);
    };
    fetchData();
  }, [searchTerm]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={styles.title}>Our Dogs</Text>
          <View>
            <View style={styles.searchBar}>
              <View style={styles.filterIcon}>
                <Icon name="filter" size={50} color="sienna" />
              </View>
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
          </View>
          <View style={styles.reqContainer}>
            {dogs.map((dog) => (
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
                {/* <Text onPress={() => navigation.navigate('Update_Dog_Details',{dog})}>Update Dog Details</Text>
      <Text onPress={() => navigation.navigate('Update_trip')}>Update trip</Text>
      <Text onPress={() => navigation.navigate('Update_medical_data')}>Update medical data</Text> */}
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
