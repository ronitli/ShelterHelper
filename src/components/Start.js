import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
} from "react-native";
import { styles } from "../styles";
import { useNavigation } from "@react-navigation/native";
import { auth, signInWithEmailAndPassword } from "../../firebase";
// import { getAuth, onAuthStateChanged } from "firebase/auth";
import Icon from "react-native-vector-icons/FontAwesome";
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
  query,
  where,
} from "firebase/firestore";

const Start = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigation = useNavigation();
  // const navigation = useNavigation();

  const handleLogin = async () => {
    console.log(`Email: ${email}, password: ${password}`);
    if (email === "" || password === "") {
      Alert.alert("Error", "Please enter both email and password.");
    }
    const usersCollection = collection(db, "Users");
    const q = query(usersCollection, where("email", "==", email));
    const querySnapshot = await getDocs(q);
    const logged_in_user = querySnapshot.docs[0].data();
    const exist = await checkEmailAvailability(email);
    if (exist) {
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          console.log("logged in");
          setEmail("");
          setPassword("");
          navigation.navigate("Home", {
            id: logged_in_user?.id,
            shelterId: logged_in_user?.shelterId,
            role: logged_in_user?.role,
          });
        })
        .catch((err) => {
          console.error(err);
          alert(err.message);
        });
    } else {
      alert("user does not exist. please register");
    }

    return;
  };

  const checkEmailAvailability = async () => {
    console.log("ggggiiii");
    const usersCollection = collection(db, "Users");
    const q = query(usersCollection, where("email", "==", email));
    const querySnapshot = await getDocs(q);

    return !querySnapshot.empty;
  };

  const handleRegister = () => {
    console.log("Register button pressed");
    setEmail("");
    setPassword("");
    navigation.navigate("Register");
  };
  const handleForgotPassword = () => {
    navigation.navigate("Forgot_My_Password");
  };
  return (
    <View style={styles.container}>
      <Icon name="paw" size={60} color="#A0522D" />
      <Text style={styles.title}>ShelterHelper</Text>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={[styles.label, { marginLeft: 10 }]}>Email:</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Enter your email:"
        placeholderTextColor="#e8c7bf"
        value={email}
        onChangeText={setEmail}
        keyboardType="default"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <Text style={styles.label}>Password:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your password:"
        placeholderTextColor="#e8c7bf"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
        autoCapitalize="none"
        autoCorrect={false}
      />

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.nowTripButton}
        onPress={handleForgotPassword}
      >
        <Text style={styles.buttonText}>I forgot my password</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Start;
