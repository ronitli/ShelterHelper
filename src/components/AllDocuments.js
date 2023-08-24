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
import {
  collection,
  doc,
  getDoc,
  setDoc,
  addDoc,
  updateDoc,
  getDocs,
} from "firebase/firestore";
import { db, storage } from "../../firebase";
import { ref, deleteObject } from "firebase/storage";



const AllDocuments = ({ route, navigation }) => {
  const { dog, logged_in_user } = route.params;


const showDocs=async()=>
{
  const dogDocumentsRef = collection(db, "Dogs", dog.id, "Documents");
  
  // Query and retrieve all documents for the specified dog
  const querySnapshot = await getDocs(dogDocumentsRef);
  
  // Loop through the query snapshot to access each document's data
  querySnapshot.forEach((doc) => {
    const documentData = doc.data();
    //ronit here you present the doc
    console.log("Document Name:", documentData.documentName);
    console.log("Document URL:", documentData.documentUrl);
  });

}

const deleteDocument=async(firestoreDocumentId, srorageFileName)=>
{
  await deleteDocumentFromStorage(dog.id, srorageFileName);
  await deleteDocumentFromFirestore(firestoreDocumentId);
}

const deleteDocumentFromStorage=async(dogId, srorageFileName)=>
{
  // Create a reference to the storage location of the document to be deleted
  const documentStorageRef = ref(
    storage,
    `dogs/${dogId}/documents/${srorageFileName}`
  );

  try {
    // Delete the document from storage
    await deleteObject(documentStorageRef);
    console.log("Document deleted from storage successfully");
  } catch (error) {
    console.error("Error deleting document from storage:", error);
  }
}

const deleteDocumentFromFirestore=async(firestoreDocumentId)=>
{
  const dogId = dog.id;
  
  const dogDocumentRef = doc(db, "Dogs", dogId, "Documents", firestoreDocumentId);
  
  try {
    await deleteDoc(dogDocumentRef);
    console.log("Document deleted successfully");
  } catch (error) {
    console.error("Error deleting document:", error);
  }
}


  return (
    <View style={styles.container}>
      <View style={{ height: 40 }} />
      <Icon name="file" size={50} color="sienna" />
      <Text style={styles.title}>All Documents</Text>
      <View style={{ height: 20 }} />
    </View>
  );
};
export default AllDocuments;
