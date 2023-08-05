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
import { useEffect } from "react";
import {
  getFirestore,
  collection,
  setDoc,
  addDoc,
  getDocs,
} from "firebase/firestore";
import { auth, createUserWithEmailAndPassword, db } from "../../firebase";
import { doc, deleteDoc } from "firebase/firestore";

const Requests = ({ navigation }) => {
  const [Name, setName] = React.useState(""); //properties of the component a change in here will run the return section again
  const [Email, setEmail] = React.useState("");
  const [Title, setTitle] = React.useState("");
  const [Request, setRequest] = React.useState("");

  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const q = collection(db, "UsersWaitList");
      const querySnapshot = await getDocs(q);
      const requestsArray = querySnapshot.docs.map((doc) => doc.data());
      setRequests(requestsArray);
    };
    fetchData();
  }, [requests]);

  const handleApprovedRequest = async (request) => {
    let email = request?.email;
    const user = requests.find((user) => user.email === email);

    await insertUserToFirebaseAuth(user);
    await insertUserToUsersTable(user);

    await deleteUserFromWaitList(request);

    return;
  };

  const handleRejectRequest = async (request) => {
    await deleteUserFromWaitList(request);
    return;
  };

  const insertUserToFirebaseAuth = async (user) => {
    try {
      const res = createUserWithEmailAndPassword(
        auth,
        user.email,
        user.password
      );
      console.log("SUCCESS: User add to firebase auth user list");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const insertUserToUsersTable = async (user) => {
    //if admin:
    //if(user.isAdmin){}
    const dbRef = collection(db, "Users");
    addDoc(dbRef, user)
      .then((docRef) => {
        console.log("SUCCESS: User add to users table");
        alert("New user add to user list");
      })
      .catch((error) => {
        console.log(error);
      });
      //else{}
      // const dbRef = collection(db, "volunteer");
      // addDoc(dbRef, user)
      //   .then((docRef) => {
      //     console.log("SUCCESS: User add to volunteer table");
      //     alert("New user add to volunteer list");
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });
  };

  const deleteUserFromWaitList = async (user) => {
    console.log("in delete function");
    const q = doc(collection(db, "UsersWaitList"), user.id);
    console.log(q);
    try {
      await deleteDoc(q);
      console.log("SUCCESS: User deleted from wait list!");
    } catch (error) {
      console.error("Error removing User from wait list: ", error);
    }

    //update the requsts temp array
    const updatedRequests = requests.filter((user) => user.id !== user.id);
    setRequests(updatedRequests);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={styles.title}>Upcomming Requests</Text>
          <View style={styles.reqContainer}>
            {requests.map((request) => (
              <View key={request.email} style={styles.request}>
                <Text style={styles.reqText}>Request: {request.Request}</Text>
                <Text style={styles.reqText}>Name: {request.username}</Text>
                <Text style={styles.reqText}>Email: {request.email}</Text>
                <Text style={styles.reqText}>
                  Title: {request.selectedOption}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                  }}
                >
                  <TouchableOpacity
                    style={[styles.acceptButton, { marginRight: 10 }]}
                    onPress={() => handleApprovedRequest(request)}
                  >
                    <Text style={styles.buttonText}>Approve</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.denyButton, { marginLeft: 10 }]}
                    onPress={() => handleRejectRequest(request)}
                  >
                    <Text style={styles.buttonText}>Reject</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.underline} />
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Requests;
