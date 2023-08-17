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
//from home page

const Archive = ({ route, navigation }) => {
  const [dogs, setDogs] = useState([]);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={styles.title}>Our Dogs</Text>
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
                <Text style={styles.reqText}>
                  Age: {dog.ageInYears} years and {dog.ageInMonths} months.
                </Text>
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
