// Home.js

import React from "react";
import { View, Text, TouchableOpacity,StyleSheet, Image  } from "react-native";
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
        <TouchableOpacity onPress={() => navigation.navigate('ManageUsers')}>
        <Surface style={styles.surface} >
        <Icon name="user" size={25} color='sienna' />
          <Text style={styles.radioButtonText}>Manage Users</Text></Surface>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('AddDog')}>
        <Surface style={styles.surface}>
        <Icon name="plus" size={25} color='sienna' />
        <View style={{ height: 10 }} />
          <Text style={styles.radioButtonText}>Add a New Dog</Text></Surface>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Dogs')}>
        <Surface style={styles.surface}>
        <Icon name="paw" size={25} color='sienna' />
        <View style={{ height: 10 }} />
          <Text style={styles.radioButtonText}>All Dogs</Text></Surface>
        </TouchableOpacity>
      </View>
     
      <View style={styles.bottomRow}>
       <TouchableOpacity onPress={() => navigation.navigate('Calender')}>
        <Surface style={styles.downsurface}>
        <Icon name="calendar" size={25} color='sienna' />
        <View style={{ height: 10 }} />
          <Text style={styles.radioButtonText}>Calendar</Text></Surface>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Alerts')}>
        <Surface style={styles.downsurface}>
        <Icon name="bell" size={25} color='sienna' />
        <View style={{ height: 5 }} />
          <Text style={styles.radioButtonText}>     Check Notifications</Text></Surface>
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={() => navigation.navigate('DoneAlerts')}>
        <Surface style={styles.downsurface}>
        <Icon name="check" size={25} color='sienna' />
        <View style={{ height: 10 }} />
          <Text style={styles.radioButtonText}>  Completed Notifications</Text></Surface>
        </TouchableOpacity> */}
      </View>
    
      <Image source={require('../../assets/try.jpg')} style={{ width: 350, height: 320  }}/>
      
    </View>
  );
};

export default Home;
