

import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

const Alerts = ({ navigation }) => {
  return (
    <View>
      <Text>Welcome to the Alerts\Reminders screen!</Text>
    </View>
  );
};

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

