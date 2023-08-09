

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
// const notifications = [
//   { id: 1, title: 'Adoption day!', icon: 'bell' },
//   { id: 2, title: 'Bob Needs Rabies Vaccine!', icon: 'bell' },
//   { id: 3, title: 'Nalla Needs Hexagonal Vaccine!', icon: 'bell' },
//   { id: 4, title: 'Sandy Returns From Foster.', icon: 'bell' },
//   { id: 5, title: 'Vet Appointment For Toto At 15:00.', icon: 'bell' },
//   { id: 6, title: 'Charlie Needs Hexagonal Vaccine!', icon: 'bell' },
//   { id: 7, title: 'Give Bath To Luna.', icon: 'bell' },
//   { id: 8, title: 'Give Bath To Elvis.', icon: 'bell' },
//   { id: 9, title: 'Give Bath To Elvis.', icon: 'bell' },
//   { id: 10, title: 'Give Bath To Elvis.', icon: 'bell' },
 
// ];

const Alerts = ({ navigation }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [notificationText, setNotificationText] = useState('');
  const [notifications, setNotifications] = useState([]);


  const handleOpenModal = () => {
    setIsModalVisible(true);
  };
  
  const handleCloseModal = () => {
    setIsModalVisible(false);
  };
  
  const handleSaveNotification = () => {

   if (notificationText.trim() === '') {
    Alert.alert('Empty Notification!','Notification text cannot be empty.');
    return;
  }
  const newNotificationId = Date.now().toString();
  const newNotification = {
    id: newNotificationId,
    title: notificationText,
    icon: 'bell', // You can update the icon here as needed
  };

  // Save the new notification to the notifications dictionary
  setNotifications([...notifications, newNotification]);
  setNotificationText('');
  Alert.alert('Notification saved!','');
    console.log('Notification saved:', notificationText);
  
    // Close the modal after saving the notification
    handleCloseModal();
  };
  


  const handleDeleteNotification = (notificationId) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this notification?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Yes',
          onPress: () => {
            const updatedNotifications = notifications.filter(
              (notification) => notification.id !== notificationId
            );
            setNotifications(updatedNotifications);
          },
        },
      ]
    );
  };

  const handleMarkNotification = (notificationId) => {
    Alert.alert(
      'Confirm Check',
      'Are you sure you want to complete this notification?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Yes', //save to database
          onPress: () => {
            const updatedNotifications = notifications.filter(
              (notification) => notification.id !== notificationId
            );
            setNotifications(updatedNotifications);
          },
        },
      ]
    );
    
  };


  return (
    <View style={styles.container}>
     
<Pressable onPress={handleOpenModal} >
        <Text style={style.addNotification}>+ Add Notification</Text>
      </Pressable>


    <View style={{   marginTop: 50 }} />
    
    

    
   <Icon name="bell" size={50} color='sienna' />
   <Text style={styles.title}>Notifications</Text>
   <View style={{   marginTop: -65 }} />
    <SafeAreaView style={style.container}>
    <ScrollView style={styles.scrollContainer}>
    {notifications.map((notification) => (
        <View key={notification.id} style={styles.notificationItem}>
          <Icon name={notification.icon} size={24} color="#D6A6A6" />
          <View style={{   width: 20 }} />
          <Text style={styles.notificationTitle}>{notification.title}</Text>
          <View style={{   width: 30 }} />
          <View style={style.buttonContainer}>
          <TouchableOpacity
              onPress={() => handleDeleteNotification(notification.id)}
            >
              
              <Text style={style.deleteButton}>X</Text>
            </TouchableOpacity>
            {/* <View style={{   width: 30 }} /> */}
            <TouchableOpacity
              onPress={() => handleMarkNotification(notification.id)}
            >
              <Icon name="check" size={20} color='green' />
            </TouchableOpacity>
            </View>

        </View>
        

      ))}
      {/* <FlatList
        data={DATA}
        renderItem={({item}) => <Item title={item.title} />}
        keyExtractor={item => item.id}
      /> */}
      </ScrollView>
    </SafeAreaView>


    <Modal visible={isModalVisible} animationType="slide">
        <View style={style.modalContainer}>
          <Text style={style.modalTitle}>Create New Notification</Text>
          <TextInput
            style={style.notificationInput}
            placeholder="Enter notification text..."
            placeholderTextColor={'#D6A6A6'}
            value={notificationText}
            onChangeText={setNotificationText}
          />
          <View style={style.modalButtonsContainer}>
            <TouchableOpacity
              style={style.modalButton}
              onPress={handleCloseModal}
            >
              <Text style={style.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={style.modalButton}
              onPress={handleSaveNotification}
            >
              <Text style={style.modalButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </View>
  );
};
const style = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor:'#FCEFEF',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
  addNotification: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'absolute',
    top: 20,
    left: 45,
   //right: 45,
    color:'white',
    fontFamily: "Mukta-Bold",
   
    backgroundColor: "#D6A6A6",
    borderRadius: 15,
    paddingVertical: 8,
    paddingHorizontal: 12,
   
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:"#D6A6A6",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
  },
  notificationInput: {
    width: 300,
    height: 40,
    backgroundColor: 'white',
    paddingHorizontal: 10,
    marginBottom: 20,

    borderWidth: 1,
    borderColor: '#FCEFEF',
    
    borderRadius: 5,
    //padding: 10,
    //marginBottom: 10,
  },
  modalButtonsContainer: {
    flexDirection: 'row',
  },
  modalButton: {
    backgroundColor: 'sienna',
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 5,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  deleteButton: {
    color: 'red',
    fontSize: 20,
    marginLeft: 'auto',
    marginRight: 10,
   
  },

  markButton: {
    color: 'green',
    fontSize: 20,
  
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

