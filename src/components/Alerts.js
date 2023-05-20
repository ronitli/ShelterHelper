

import React from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { styles } from '../styles';
const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

const Item = ({title}) => (
  <View style={style.item}>
    <Text style={style.title}>{title}</Text>
  </View>
);
const notifications = [
  { id: 1, title: 'Adoption day!', icon: 'bell' },
  { id: 2, title: 'Bob Needs Rabies Vaccine!', icon: 'bell' },
  { id: 3, title: 'Nalla Needs Hexagonal Vaccine!', icon: 'bell' },
  { id: 4, title: 'Sandy Returns From Foster.', icon: 'bell' },
  { id: 5, title: 'Vet Appointment For Toto At 15:00.', icon: 'bell' },
  { id: 6, title: 'Charlie Needs Hexagonal Vaccine!', icon: 'bell' },
  { id: 7, title: 'Give Bath To Luna.', icon: 'bell' },
  { id: 8, title: 'Give Bath To Elvis.', icon: 'bell' },
 
];

const Alerts = ({ navigation }) => {
  return (
    <View style={styles.container}>
    <View style={{   marginTop: 50 }} />
    
   <Icon name="bell" size={50} color='sienna' />
   <Text style={styles.title}>Notifications</Text>
   <View style={{   marginTop: -40 }} />
    <SafeAreaView style={style.container}>
    {notifications.map((notification) => (
        <View key={notification.id} style={styles.notificationItem}>
          <Icon name={notification.icon} size={24} color="#D6A6A6" />
          <View style={{   width: 25 }} />
          <Text style={styles.notificationTitle}>{notification.title}</Text>
        </View>
        

      ))}
      {/* <FlatList
        data={DATA}
        renderItem={({item}) => <Item title={item.title} />}
        keyExtractor={item => item.id}
      /> */}
    </SafeAreaView>
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor:'#FCEFEF',
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default Alerts;




// import { Notifications } from 'expo';
// import * as Permissions from 'expo-permissions';

// // Function to request permission to send notifications
// async function getPermission() {
//   const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
//   if (status !== 'granted') {
//     alert('You need to grant permission to send notifications.');
//   }
// }

// // Function to schedule a notification
// async function scheduleNotification() {
//   // Get permission to send notifications
//   await getPermission();

//   // Set the date and time when you want the notification to appear
//   const notificationDate = new Date('2023-05-20T12:00:00');

//   // Schedule the notification
//   Notifications.scheduleLocalNotificationAsync({
//     title: 'Notification title',
//     body: 'Notification body',
//     ios: {
//       sound: true,
//     },
//     android: {
//       sound: true,
//       vibrate: true,
//       color: '#512DA8',
//       priority: 'high',
//     },
//   }, {
//     time: notificationDate.getTime(),
//     repeat: 'day', // Set the frequency to repeat the notification
//   });
// }

