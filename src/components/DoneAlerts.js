import React ,{useState} from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  ScrollView,
  Pressable,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { styles } from '../styles';

const DoneAlerts = ({ navigation }) => {
  


  return (
    <View style={styles.container}>
        <View style={{   marginTop: 200 }} />
     <Icon name="check" size={50} color='sienna' />
   <Text style={styles.title}>  Completed Notifications</Text>
   
   <SafeAreaView >
   <ScrollView style={styles.scrollContainer}>
    </ScrollView>
    </SafeAreaView>

    </View>
  );
};


export default DoneAlerts;


