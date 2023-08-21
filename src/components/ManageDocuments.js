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
const ManageDocuments = ({ navigation }) => {
  

    return (
      // <SafeAreaView>
      // <ScrollView >
      <View style={styles.container}>
      {/* <View style={{ height: 40 }} /> */}
      
          <Icon name="file" size={50} color="sienna" />
          <Text style={styles.title}>Manage Documents</Text>
          <View style={{ height: 20 }} />
         
      <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('UploadNewDocument')} >
        <Text style={styles.buttonText}>Add a New Document</Text>
      </TouchableOpacity>
      <View style={{ height: 20 }} />
      <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('AllDocuments')} >
        <Text style={styles.buttonText}>All Documents</Text>
      </TouchableOpacity>
     
      </View>
      
      // </ScrollView >
      // </SafeAreaView>
    );
};

export default ManageDocuments;