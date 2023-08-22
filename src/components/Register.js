import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../styles";
import { Dropdown } from "react-native-element-dropdown";
import { RadioButton } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
//import { auth } from 'firebase/app';
import { db } from "../../firebase";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  getFirestore,
  collection,
  setDoc,
  addDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { async } from "@firebase/util";
import { useEffect } from "react";

const Register = ({ navigation }) => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [fname, setFname] = React.useState("");
  const [lname, setLname] = React.useState("");
  const [isFocus, setIsFocus] = React.useState();
  const [checkpswd, setCheckPswd] = React.useState("");
  const [selectedOption, setSelectedOption] = React.useState("");
  const [shelterNames, setShelterNames] = React.useState();
  const [selectedShelter, setSelectedShelter] = React.useState({});

  useEffect(() => {
    const getShelterNames = async () => {
      const querySnapshot = await getDocs(collection(db, "Shelters"));
      const data = querySnapshot.docs.map((doc) => doc.data());
      setShelterNames(data);
    };
    getShelterNames();
  }, []);

  const Stack = createStackNavigator();
  const handleRegister = () => {
    if (
      username === "" ||
      password === "" ||
      email === "" ||
      fname === "" ||
      lname === "" ||
      checkpswd === "" ||
      selectedOption === "" ||
      !selectedShelter.id
    ) {
      Alert.alert("Error", "Please enter all the fields.");
      return;
    } else if (password != checkpswd) {
      Alert.alert("Error", "The passwords do not match.");
      return;
    }

    const newUser = {
      username: username,
      password: password,
      email: email,
      fname: fname,
      lname: lname,
      selectedOption: selectedOption,
      id: "",
      shelterName: selectedShelter.name,
      shelterId: selectedShelter.id,
    };
    //check if user already exist befor
    const usersCollection = collection(db, "Users");
    checkEmailAvailability(email)
      .then((isEmailUsed) => {
        if (isEmailUsed) {
          console.log("Email is already used");
          alert("Email is already used. please try another one");
        } else {
          console.log("Email is available");
          insertUserToWaitList(newUser);
        }
      })
      .catch((error) => {
        console.log("Error checking email availability:", error);
        // Handle the error
      });

    async function checkEmailAvailability(email) {
      const q = query(usersCollection, where("email", "==", email));
      const querySnapshot = await getDocs(q);

      return !querySnapshot.empty;
    }

    const insertUserToWaitList = (newUser) => {
      const dbRef = collection(db, "UsersWaitList");
      addDoc(dbRef, newUser)
        .then((docRef) => {
          const newUserId = docRef.id;
          console.log("new user add to waiting list");
          alert("we have got your request! soon the manager approve you");
          const data = { ...newUser, id: newUserId };
          setDoc(docRef, data)
            .then((docRef) => {
              console.log("id has been updated successfully");
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .then(() => {
          console.log("Successfully updated the ID field of the document");
        })
        .catch((error) => {
          console.log("Error updated the ID field:", error);
        });
    };
  };

  const setProperty = () => {
    setUsername("");
    setEmail("");
    setPassword("");
    setFname("");
    setLname("");
    setCheckPswd("");
    setSelectedOption("");
  };
  const options = [
    { label: "Manager", value: "Manager" },
    { label: "Worker", value: "Worker" },
    { label: "Volunteer", value: "Volunteer" },
  ];
  return (
    <View style={styles.container}>
      <Icon name="pencil" size={50} color="sienna" />
      <Text style={styles.registertitle}>Registration</Text>
      <TextInput
        style={styles.input}
        placeholder="First Name:"
        placeholderTextColor="sienna"
        value={fname}
        onChangeText={setFname}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name:"
        placeholderTextColor="sienna"
        value={lname}
        onChangeText={setLname}
      />
      <TextInput
        style={styles.input}
        placeholder="Username:"
        placeholderTextColor="sienna"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Email:"
        placeholderTextColor="sienna"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password:"
        placeholderTextColor="sienna"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Retype Password:"
        placeholderTextColor="sienna"
        secureTextEntry={true}
        value={checkpswd}
        onChangeText={setCheckPswd}
      />
      <Text style={styles.reqText}>Shelter name:</Text>
      {shelterNames ? (
        <Dropdown
          style={styles.dropdownShelters}
          selectedTextStyle={styles.dropdownShelters}
          placeholderStyle={styles.dropdownShelters}
          containerStyle={styles.dropdownShelters}
          fontFamily="CormorantUpright-Bold"
          mode="modal"
          data={shelterNames}
          searchField="name"
          labelField="name"
          valueField="id"
          search
          placeholder={!isFocus ? "Select item" : "..."}
          searchPlaceholder="Search..."
          value={selectedShelter.id}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(item) => {
            setSelectedShelter(item);
            setIsFocus(false);
          }}
        />
      ) : (
        <Text style={styles.reqText}>Loading...</Text>
      )}
      <Text style={styles.radioButtonText}>Choose Your Role:</Text>
      <View style={{ height: 10 }} />
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {options.map((option) => (
          <TouchableOpacity
            key={option.value}
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginRight: 30,
            }}
            onPress={() => setSelectedOption(option.value)}
          >
            <Text style={styles.radioButtonText}>{option.label}</Text>
            <View style={{ width: 7 }} />
            <View style={styles.radioCircle}>
              {selectedOption === option.value && (
                <View style={styles.selectedRadioCircle} />
              )}
            </View>
          </TouchableOpacity>
        ))}
      </View>
      <View style={{ height: 15 }} />
      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Register;
