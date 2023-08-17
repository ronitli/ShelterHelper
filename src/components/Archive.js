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
  getDoc,
  setDoc,
  addDoc,
  updateDoc,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import { useEffect } from "react";
import { isSearchBarAvailableForCurrentPlatform } from "react-native-screens";
import Dogs from "./Dogs";
//from home page

const Archive = ({ route, navigation }) => {
  const handleReArchive = () =>
    //in here handle
    {
      Alert.alert(
        "Alert",
        "Are you sure you want to send him back to the shelter?",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ],
        { cancelable: false }
      );
    };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={styles.title}>Our Dogs</Text>
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
                  onPress={handleReArchive}
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
