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
const DeleteUsers = ({  navigation }) => {
   
    return (
    
      <View style={styles.container}>
      
      
          <Icon name="user" size={50} color="sienna" />
          <Text style={styles.title}>Delete Users</Text>
          <View style={{ height: 20 }} />
         
     
      </View>
     
    );
};

export default DeleteUsers;