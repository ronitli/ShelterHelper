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
const ManageUsers = ({  navigation }) => {
   
    return (
    
      <View style={styles.container}>
      
      
          <Icon name="user" size={50} color="sienna" />
          <Text style={styles.title}>Manage Users</Text>
          <View style={{ height: 20 }} />
         
      <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Requests')} >
        <Text style={styles.buttonText}>Manage Requests</Text>
      </TouchableOpacity>
      <View style={{ height: 20 }} />
      <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('DeleteUsers')} >
        <Text style={styles.buttonText}>Delete Users</Text>
      </TouchableOpacity>
     
      </View>
     
    );
};

export default ManageUsers ;