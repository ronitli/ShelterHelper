import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList, Alert } from "react-native";
import { db } from "../../firebase";
import {
  collection,
  doc,
  getDoc,
  setDoc,
  addDoc,
  updateDoc,
  getDocs,
  query,
  where,
  deleteDoc,
} from "firebase/firestore";
import Icon from "react-native-vector-icons/FontAwesome";
import { styles } from "../styles";
import { getAuth, deleteUser, getUserByEmail } from "firebase/auth";

const DeleteUsers = ({ route, navigation }) => {
  const [users, setUsers] = useState([]);
  const logged_in_user = route.params;
  useEffect(() => {
    const fetchData = async () => {
      const users_collection = collection(db, "Users");
      const querySnapShot = query(
        users_collection,
        where("shelterId", "==", logged_in_user.shelterId)
      );
      const q = await getDocs(querySnapShot);
      let usersArray = q.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setUsers(usersArray);
    };
    fetchData();
  }, []);

  const handleDeleteUser = async (user) => {
    await deleteUserFromUserTable(user);
  };

  const deleteUserFromUserTable = async (user) => {
    try {
      await deleteDoc(doc(db, "Users", user.id));
      setUsers(users.filter((currentUser) => currentUser.id !== user.id));
      Alert.alert("User Deleted", "The user has been successfully deleted.");
    } catch (error) {
      console.error("Error deleting user:", error);
      Alert.alert("Error", "An error occurred while deleting the user.");
    }
  };

  const deleteUserFromAuth = async (email) => {
    console.log(email);
    console.log("1");
    const auth = getAuth(); // Get the authentication instance
    console.log("2");
    try {
      const user = await getUserByEmail(auth, email);
      console.log("3");
      if (user) {
        await deleteUser(user);
        console.log("4");
        console.log("User deleted successfully");
        // You can also perform additional actions after user deletion here
      } else {
        console.log("User not found");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Icon name="user" size={50} color="sienna" />
      <Text style={styles.title}>Delete Users</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.userItem}>
            <Text style={styles.username}>{item.username}</Text>
            <Text>Email: {item.email}</Text>
            <Text>First Name: {item.fname}</Text>
            <Text>Last Name: {item.lname}</Text>
            <Text>Role: {item.role}</Text>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() =>
                Alert.alert(
                  "Confirm Deletion",
                  `Are you sure you want to delete ${item.username}?`,
                  [
                    { text: "Cancel", style: "cancel" },
                    {
                      text: "Delete",
                      onPress: () => handleDeleteUser(item),
                      style: "destructive",
                    },
                  ]
                )
              }
            >
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

export default DeleteUsers;
