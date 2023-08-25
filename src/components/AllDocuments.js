import React, { useState, useEffect } from "react";
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
  Linking,
} from "react-native";
import { styles } from "../styles";
import Icon from "react-native-vector-icons/FontAwesome";
import * as DocumentPicker from "expo-document-picker";
import { FileSystem } from "expo";
import {
  collection,
  doc,
  query,
  where,
  getDoc,
  setDoc,
  addDoc,
  updateDoc,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import { db, storage } from "../../firebase";
import { ref, deleteObject } from "firebase/storage";

const AllDocuments = ({ route, navigation }) => {
  const [documents, setDocuments] = useState([]);
  const { dog, logged_in_user } = route.params;
  //if reached this page- means you are a manager
  useEffect(() => {
    showDocs();
  }, []);

  const showDocs = async () => {
    const dogDocumentsRef = collection(db, "Dogs", dog.id, "Documents");

    // Query and retrieve all documents for the specified dog
    const querySnapshot = await getDocs(dogDocumentsRef);
    const documentsData = [];
    // Loop through the query snapshot to access each document's data
    querySnapshot.forEach((doc) => {
      const documentData = doc.data();
      //ronit here you present the doc
      documentsData.push({
        documentName: documentData.documentName,
        documentUrl: documentData.documentUrl,
        firestoreDocumentId: documentData.firestoreDocumentId,
        StorageFileName: documentData.srorageFileName,
      });
      // console.log("Document Name:", documentData.documentName);
      // console.log("Document URL:", documentData.documentUrl);
    });
    setDocuments(documentsData);
  };

  const deleteDocument = async (firestoreDocumentId, srorageFileName) => {
    await deleteDocumentFromStorage(dog.id, srorageFileName);
    await deleteDocumentFromFirestore(firestoreDocumentId);
  };

  const deleteDocumentFromStorage = async (dogId, srorageFileName) => {
    // Create a reference to the storage location of the document to be deleted
    const documentStorageRef = ref(
      storage,
      `dogs/${dogId}/documents/${srorageFileName}.pdf`
    );

    try {
      // Delete the document from storage
      await deleteObject(documentStorageRef);
      console.log("Document deleted from storage successfully");
    } catch (error) {
      console.error("Error deleting document from storage:", error);
    }
  };

  const deleteDocumentFromFirestore = async (firestoreDocumentId) => {
    const dogId = dog.id;

    const dogDocumentRef = doc(
      db,
      "Dogs",
      dogId,
      "Documents",
      firestoreDocumentId
    );

    try {
      await deleteDoc(dogDocumentRef);
      console.log("Document deleted successfully");
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.userItem}
      onPress={() => handleDocumentPress(item.documentUrl)}
    >
      <Text style={styles.label}>File Name:</Text>
      <Text style={styles.registertitle}>{item.documentName}</Text>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() =>
          Alert.alert(
            "Confirm Deletion",
            `Are you sure you want to delete ${item.documentName} file?`,
            [
              { text: "Cancel", style: "cancel" },
              {
                text: "Delete",
                onPress: () =>
                  deleteDocument(
                    item.firestoreDocumentId,
                    item.StorageFileName
                  ),
                style: "destructive",
              },
            ]
          )
        }
      >
        <Text style={styles.buttonText}>Delete</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const handleDocumentPress = (documentUrl) => {
    // Open the document URL using the Linking API
    Linking.openURL(documentUrl).catch((err) =>
      console.error("An error occurred", err)
    );
  };

  return (
    <View style={styles.container}>
      <View style={{ height: 40 }} />
      <Icon name="file" size={50} color="sienna" />
      <Text style={styles.title}>All Documents</Text>
      <FlatList
        data={documents}
        renderItem={renderItem}
        keyExtractor={(item) => item.firestoreDocumentId}
      />
      <View style={{ height: 20 }} />
    </View>
  );
};
export default AllDocuments;
