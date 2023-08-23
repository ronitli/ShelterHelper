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
  query,
  where,
  addDoc,
  getDocs,
} from "firebase/firestore";
import { auth, createUserWithEmailAndPassword, db } from "../../firebase";
import { doc, deleteDoc } from "firebase/firestore";

const Requests = ({ route, navigation }) => {
  const logged_in_user = route.params;
  const [Name, setName] = React.useState(""); //properties of the component a change in here will run the return section again
  const [Email, setEmail] = React.useState("");
  const [Title, setTitle] = React.useState("");
  const [Request, setRequest] = React.useState("");
  const [requests, setRequests] = useState([]);
  useEffect(() => {
    //happens only at first upload of page
    //give me wait list for shelter id same as the user logged in
    const fetchData = async () => {
      const user_collection = collection(db, "UsersWaitList");
      const querySnapShot = query(
        user_collection,
        where("shelterId", "==", logged_in_user.shelterId)
      );
      const q = await getDocs(querySnapShot);
      const requestsArray = q.docs.map((doc) => doc.data());
      setRequests(requestsArray);
    };
    fetchData();
  }, []);

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
    const dbRef = collection(db, "Users");
    setDoc(doc(db, "Users", user.id), {
      ...user,
    })
      .then((docRef) => {
        console.log("SUCCESS: User add to users table");
        alert("New user add to user list");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const deleteUserFromWaitList = async (user) => {
    console.log("in delete function");
    const q = doc(collection(db, "UsersWaitList"), user.id);
    console.log(q);
    try {
      await deleteDoc(q);
      setRequests(requests.filter((currUser) => currUser.id != user.id));
      console.log("SUCCESS: User deleted from wait list!");
      navigation.navigate("Home", logged_in_user);
    } catch (error) {
      console.error("Error removing User from wait list: ", error);
    }
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
