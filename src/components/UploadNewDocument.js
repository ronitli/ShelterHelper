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
  import { styles } from '../styles';
  import Icon from "react-native-vector-icons/FontAwesome";
  import * as DocumentPicker from 'expo-document-picker';
  import { FileSystem } from 'expo';
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

  import * as mime from 'react-native-mime-types';//
  import { WebView } from 'react-native-webview';//

const UploadNewDocument = ({ route,navigation }) => {
    const [fileUri, setFileUri] = useState(null);
    const [fileName, setFileName] = useState('');

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*',
      });

      if (!result.cancelled) {
        setFileUri(result.uri);
      }
    } catch (error) {
      console.log('Error picking document', error);
    }

  };

  const saveDocumentLocally = async () => {
    // if (fileUri) {
    //   const fileExtension = fileUri.split('.').pop(); // Get the file extension
    //   const fileName = `file_${Date.now()}.${fileExtension}`; // Generate a unique file name
    //   const newPath = FileSystem.documentDirectory + fileName;

    //   try {
    //     await FileSystem.copyAsync({
    //       from: fileUri,
    //       to: newPath,
    //     });
    //     console.log('File saved locally:', newPath);
    //   } catch (error) {
    //     console.log('Error saving file locally', error);
    //   }
    // }
  };
  const saveDocument = async () => {
    //check that a document was added and given a name
    if (!fileUri) {
      Alert.alert('Error', 'Please pick a document before saving.');
      return;
    }
  
    if (!fileName.trim()) {
      Alert.alert('Error', 'Please enter a document name before saving.');
      return;
    }
    //save document to database

    const documentName = `document_${Date.now()}`;
    const storageRef = ref(storage,`dogs/${dog.id}/documents/${documentName}`);
    
    try {
      const response = await fetch(fileUri);
      const blob = await response.blob();
  
      // Upload the blob to the storage reference
      await uploadBytes(storageRef, blob);
  
      const documentUrl = await getDownloadURL(storageRef);
  
      // Save the document details to the subcollection 'Documents' under the dog's document
      const dogDocumentsRef = collection(db, 'Dogs', dogId, 'Documents');
      await addDoc(dogDocumentsRef, {
        documentName: fileName, // Save user-given file name
        documentUrl: documentUrl,
      });
  
      // ...other actions
    } catch (error) {
      console.log('Error uploading document:', error);
    }


    Alert.alert('Document saved!',
    'Document was saved successfully.',
    );
//reset
    setFileUri(null);
    setFileName('');
  }

    return (
     
        <View style={styles.container}>
        <View style={{ height: 20 }} />
          <Icon name="file" size={50} color="sienna" />
          <Text style={styles.title}>Add Documents</Text>
          <View style={{ height: 20 }} />
         
          <View>
         
          <TouchableOpacity style={styles.loginButton} onPress={pickDocument}>
        <Text style={styles.buttonText}>Pick Document</Text>
      </TouchableOpacity>
     
      {fileUri && (
        
        <View style={styles.previewContainer}>
     {mime.lookup(fileUri) && mime.lookup(fileUri).startsWith('image/') ? (
      <Image source={{ uri: fileUri }} style={styles.previewImage} />
    ) : (
      <Image source={require('../../assets/document.jpg' )} style={styles.webView} />
    )}
  </View>
      )}

      <View style={{ height: 20 }} />
       <TextInput style={styles.input} value={fileName} onChangeText={setFileName} placeholder='Document Name:' placeholderTextColor="#8B5A33"/>
      
      <View style={{ height: 20 }} />
        <TouchableOpacity style={styles.registerButton} onPress={saveDocument}>
        <Text style={styles.buttonText}>Save Document</Text>
      </TouchableOpacity>
      
    </View>

</View>

    );
};

export default UploadNewDocument;