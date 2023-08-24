import React, { useState, useEffect } from "react";
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
  Alert,
} from "react-native";
import {
  collection,
  doc,
  query,
  where,
  getDoc,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
} from "firebase/firestore";
import { db, storage } from "../../firebase";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import { styles } from "../styles";
const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
  },
];

const Item = ({ title }) => (
  <View style={style.item}>
    <Text style={style.title}>{title}</Text>
  </View>
);

const Alerts = ({ route, navigation }) => {
  const logged_in_user = route.params;
  const [alerts, setAlerts] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [notificationText, setNotificationText] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [loadAlert, setLoadAlerts] = useState(false);
  const [alertsArray, setAlertsArray] = useState({});

  useEffect(() => {
    //console.log("fetching events");
    fetchAlerts();
  }, [loadAlert]);

  const fetchAlerts = async () => {
    const notifications_collection = collection(db, "Notifications");
    const querySnapShot = query(
      notifications_collection,
      where("shelterId", "==", logged_in_user.shelterId)
    );
    const q = await getDocs(querySnapShot);
    const fetchedAlerts = q.docs.map((doc) => doc.data());
    setAlertsArray(fetchedAlerts);
  };

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleSaveNotification = async () => {
    if (notificationText.trim() === "") {
      Alert.alert("Empty Notification!", "Notification text cannot be empty.");
      return;
    }
    const newNotification = {
      title: notificationText,
      shelterId: logged_in_user.shelterId,
    };

    // Save the new notification to the notifications dictionary
    await onSave(newNotification);
    handleCloseModal();
    setLoadAlerts(!loadAlert);
  };

  const onSave = async (newNotification) => {
    const dbRef = collection(db, "Notifications");
    addDoc(dbRef, newNotification)
      .then((docRef) => {
        const newId = docRef.id;
        console.log("new Notifications add to Notificationss");
        const data = { ...newNotification, id: newId };
        setDoc(docRef, data)
          .then((docRef) => {
            console.log("id has been updated successfully");
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .then(() => {
        console.log("Successfully updated the ID field of the document");
      })
      .catch((error) => {
        console.log("Error updated the ID field:", error);
      });
    console.log();
  };

  const handleMarkNotification = async (notificationId) => {
    Alert.alert(
      "Confirm Check",
      "Are you sure you want to complete this notification?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Yes", //save to database
          onPress: () => {
            const updatedNotifications = notifications.filter(
              (notification) => notification.id !== notificationId
            );
            setNotifications(updatedNotifications);
          },
        },
      ]
    );
    await transferToCompletedNotification(notification);
    await deleteFromNotificationTable(notification);
  };

  const handleDeleteNotification = async (notification) => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this notification?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Yes",
          onPress: async () => {
            // const updatedNotifications = notifications.filter(
            //   (notification) => notification.id !== notificationId
            // );
            // setNotifications(updatedNotifications);
            await deleteFromNotificationTable(notification);
            setLoadAlerts(!loadAlert);
          },
        },
      ]
    );
  };

  const transferToCompletedNotification = async (notification) => {
    let firebaseNotiID;
    const dbRef = collection(db, "ComletedNotifications");
    await addDoc(dbRef, notification)
      .then((docRef) => {
        const newNotiID = docRef.id; // Retrieve the auto-generated ID
        firebaseNotiID = docRef.id;
        console.log(
          "Successfully transfer Notification with firebase ID:",
          newNotiID
        );
        const data = { ...notification, firebaseID: newNotiID };
        setDoc(docRef, data)
          .then((docRef) => {
            console.log("firebase id has been updated successfully");
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .then(() => {
        console.log("Successfully updated the ID field of the document");
      })
      .catch((error) => {
        console.log("Error transfer Notification:", error);
      });
  };
  const deleteFromNotificationTable = async (notification) => {
    console.log(notification);

    const q = doc(collection(db, "Notifications"), notification);
    console.log(q);
    try {
      await deleteDoc(q);
      console.log("SUCCESS: Notification deleted from Notifications table!");
    } catch (error) {
      console.error(
        "Error removing Notification from Notifications table: ",
        error
      );
    }
  };

  return (
    <View style={styles.container}>
      {logged_in_user.role == "Manager" && (
        <Pressable onPress={handleOpenModal}>
          <Text style={style.addNotification}>+ Add Notification</Text>
        </Pressable>
      )}
      <View style={{ marginTop: 50 }} />

      <Icon name="bell" size={50} color="sienna" />
      <Text style={styles.title}>Notifications</Text>
      {/* <View style={{   marginTop: 165 }} /> */}
      <ScrollView>
        {(() => {
          const textComponents = [];
          for (let i = 0; i < alertsArray.length; i++) {
            const singleAlert = alertsArray[i];
            textComponents.push(
              <View key={i} style={styles.notificationItem}>
                <Text style={styles.notificationTitle}>
                  {singleAlert.title}
                </Text>
                {logged_in_user.role == "Manager" && (
                  <TouchableOpacity
                    onPress={() => handleDeleteNotification(singleAlert.id)}
                  >
                    <Text style={[styles.notificationTitle, { color: "red" }]}>
                      X
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            );
          }
          return textComponents;
        })()}
      </ScrollView>

      <Modal visible={isModalVisible} animationType="slide">
        <View style={style.modalContainer}>
          <Text style={style.modalTitle}>Create New Notification</Text>
          <TextInput
            style={style.notificationInput}
            placeholder="Enter notification text..."
            placeholderTextColor={"#D6A6A6"}
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
    backgroundColor: "#FCEFEF",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  addNotification: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    position: "absolute",
    top: 20,
    left: 45,
    //right: 45,
    color: "white",
    fontFamily: "Mukta-Bold",

    backgroundColor: "#D6A6A6",
    borderRadius: 15,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#D6A6A6",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "white",
  },
  notificationInput: {
    width: 300,
    height: 40,
    backgroundColor: "white",
    paddingHorizontal: 10,
    marginBottom: 20,

    borderWidth: 1,
    borderColor: "#FCEFEF",

    borderRadius: 5,
    //padding: 10,
    //marginBottom: 10,
  },
  modalButtonsContainer: {
    flexDirection: "row",
  },
  modalButton: {
    backgroundColor: "sienna",
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 5,
  },
  modalButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  deleteButton: {
    color: "red",
    fontSize: 20,
    marginLeft: "auto",
    marginRight: 10,
  },

  markButton: {
    color: "green",
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
