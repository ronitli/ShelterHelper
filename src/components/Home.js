// Home.js

import React from "react";
import { View, Text, TouchableOpacity,StyleSheet  } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { styles } from '../styles';
import { List, MD3Colors,Divider ,Surface} from 'react-native-paper';

const Home = ({ navigation }) => {
  return (
    <View style={styles.container}> 
    <Icon name="home" size={60} color="#A0522D" />
    <Text style={styles.title}>Home Page</Text>
    
       <View style={styles.topRow}>
        <TouchableOpacity onPress={() => navigation.navigate('Requests')}>
        <Surface style={styles.surface} ><Text>Manage Requests</Text></Surface>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('AddDog')}>
        <Surface style={styles.surface}><Text>Add a New Dog</Text></Surface>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Dogs')}>
        <Surface style={styles.surface}><Text>All Dogs</Text></Surface>
        </TouchableOpacity>
      </View>
      <View style={styles.bottomRow}>
       <TouchableOpacity onPress={() => navigation.navigate('Calender')}>
        <Surface style={styles.surface}><Text>Calendar</Text></Surface>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Alerts')}>
        <Surface style={styles.surface}><Text>Check Notifications</Text></Surface>
        </TouchableOpacity>
      </View>
     

      
    </View>
  );
};

export default Home;
