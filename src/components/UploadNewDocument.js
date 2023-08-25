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
import { v4 } from "uuid";
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
  deleteDoc,
} from "firebase/firestore";
import { db, storage } from "../../firebase";
import {
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";

import * as mime from "react-native-mime-types"; //
import { WebView } from "react-native-webview"; //

const UploadNewDocument = ({ route, navigation }) => {
  const [fileUri, setFileUri] = useState(null);
  const [fileName, setFileName] = useState("");
  const { dog, logged_in_user } = route.params;
  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf", // Only allow PDF files
      });

      if (!result.cancelled) {
        setFileUri(result.uri);
      }
    } catch (error) {
      console.log("Error picking document", error);
    }
  };
  const saveDocument = async (dog) => {
    //check that a document was added and given a name
    if (!fileUri) {
      Alert.alert("Error", "Please pick a document before saving.");
      return;
    }
    console.log("1");
    if (!fileName.trim()) {
      Alert.alert("Error", "Please enter a document name before saving.");
      return;
    }
    console.log("2");

    //save document to database
    const uniqueFilename = v4();
    const metadata = {
      contentType: "application/pdf",
    };
    //const documentName = `document_${Date.now()}.pdf`;
    const storageRef = ref(
      storage,
      `dogs/${dog.id}/documents/${uniqueFilename}.pdf`
    );

    console.log("3");

    try {
      console.log(fileUri);
      const response = await fetch(fileUri);
      // try {
      //   if (!response.ok) {
      //     throw new Error(`Fetch failed with status ${response.status}`);
      //   }
      const blob = await response.blob();
      //upload to storage
      await uploadBytes(storageRef, blob, metadata)
        .then((snapshot) => {
          console.log("successfully upload file");
          alert("file uploaded");
        })
        .catch((error) => {
          console.log(error.massage);
        });
      const documentUrl = await getDownloadURL(storageRef);
      // Save the document details to the subcollection 'Documents' under the dog's document
      const dogDocumentsRef = collection(db, "Dogs", dog.id, "Documents");
      const newDocumentRef = await addDoc(dogDocumentsRef, {
        documentName: fileName, // Save user-given file name
        documentUrl: documentUrl,
        srorageFileName: uniqueFilename,
        firestoreDocumentId: "",
      });
      const newDocumentId = newDocumentRef.id;
      await updateDoc(newDocumentRef, {
        firestoreDocumentId: newDocumentId,
      });
    } catch (error) {
      console.log("Error uploading document:", error);
    }
    // } catch (error) {
    //   console.log("Error converting response to blob:", error);
    // }

    //reset
    setFileUri(null);
    setFileName("");
    //navigation.navigate("Home", logged_in_user);
  };

  return (
    <View style={styles.container}>
      <View style={{ height: 20 }} />
      <Icon name="file" size={50} color="sienna" />
      <Text style={styles.title}>Add Documents</Text>
      <View style={{ height: 20 }} />

      <View>
        <TouchableOpacity style={styles.loginButton} onPress={pickDocument}>
          <Text style={styles.buttonText}>Pick Document (PDF ONLY)</Text>
        </TouchableOpacity>

        {fileUri && (
          <View style={styles.previewContainer}>
            {mime.lookup(fileUri) &&
            mime.lookup(fileUri).startsWith("image/") ? (
              <Image source={{ uri: fileUri }} style={styles.previewImage} />
            ) : (
              <Image
                source={require("../../assets/document.jpg")}
                style={styles.webView}
              />
            )}
          </View>
        )}

        <View style={{ height: 20 }} />
        <TextInput
          style={styles.input}
          value={fileName}
          onChangeText={setFileName}
          placeholder="Document Name:"
          placeholderTextColor="#8B5A33"
        />

        <View style={{ height: 20 }} />
        <TouchableOpacity
          style={styles.registerButton}
          onPress={() => saveDocument(dog)}
        >
          <Text style={styles.buttonText}>Save Document</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UploadNewDocument;
