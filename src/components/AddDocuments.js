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
    FlatList
  } from "react-native";
  import { styles } from '../styles';
  import Icon from "react-native-vector-icons/FontAwesome";
  import * as DocumentPicker from 'expo-document-picker';
  import { FileSystem } from 'expo';
const AddDocuments = ({ route,navigation }) => {
    const [fileUri, setFileUri] = useState(null);
    const [fileName, setFileName] = useState();

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
    //save document to database
  }

    return (
     <SafeAreaView >
      <ScrollView >
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
          <Image source={{ uri: fileUri }} style={styles.previewImage} />
         
        </View>
      )}
      <View style={{ height: 20 }} />
       <TextInput style={styles.input} value={fileName} onChangeText={setFileName} placeholder='Document Name:' placeholderTextColor="#8B5A33"/>
      
      <View style={{ height: 20 }} />
        <TouchableOpacity style={styles.registerButton} onPress={saveDocumentLocally}>
        <Text style={styles.buttonText}>Save Document</Text>
      </TouchableOpacity>
      
    </View>

</View>
</ScrollView>
 </SafeAreaView>
    );
};

export default AddDocuments;