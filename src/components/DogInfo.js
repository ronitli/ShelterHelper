import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NavigationContainer } from "@react-navigation/native";
import {
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Text,
  TextInput,
  Button,
  Image,
  StyleSheet,
  Alert,
  FlatList,
} from "react-native";
import { styles } from "../styles";
import Icon from "react-native-vector-icons/FontAwesome";
import * as DocumentPicker from "expo-document-picker";
import { FileSystem } from "expo";
const DogInfo = ({ route, navigation }) => {
  const { dog, logged_in_user } = route.params;
  return (
    <View style={styles.container}>
      <Icon name="paw" size={50} color="sienna" />
      <Text style={styles.title}>Dog Information</Text>
      <View style={{ height: 20 }} />
      <TouchableOpacity
        style={styles.loginButton}
        onPress={() =>
          navigation.navigate("Update_Dog_Details", {
            dog: dog,
            logged_in_user: logged_in_user,
          })
        }
      >
        <Text style={styles.buttonText}>Dog Details</Text>
      </TouchableOpacity>
      <View style={{ height: 20 }} />
      <TouchableOpacity
        style={styles.loginButton}
        onPress={() =>
          navigation.navigate("Update_medical_data", {
            dog: dog,
            logged_in_user: logged_in_user,
          })
        }
      >
        <Text style={styles.buttonText}>Medical Data</Text>
      </TouchableOpacity>
    </View>
  );
};
export default DogInfo;
