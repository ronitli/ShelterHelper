import React, { useState, useEffect } from "react";

//import React,{ useState,useEffect } from 'react';

import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
  FlatList,
  ScrollView,
  Pressable,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import Drawer from "react-native-drawer";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import { styles } from "../styles";
import Icon from "react-native-vector-icons/FontAwesome";
import EventModal from "./EventModal";
import AllEventsModal from "./AllEventsModal";
import { Alert } from "react-native";
import { db } from "../../firebase";
import {
  collection,
  doc,
  getDoc,
  query,
  where,
  setDoc,
  addDoc,
  updateDoc,
  getDocs,
  deleteDoc,
  QuerySnapshot,
} from "firebase/firestore";

const Calender = ({ route, navigation }) => {
  const logged_in_user = route.params;
  //console.error(logged_in_user.role);
  const [selectedDate, setSelectedDate] = useState("");
  const [events, setEvents] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAllEventsModalVisible, setIsAllEventsModalVisible] = useState(false);
  const [eventsArray, setEventsArray] = useState({});
  const [markedDates, setMarkedDates] = useState({});

  useEffect(() => {
    //console.log("fetching events");
    fetchEvents();
  }, []);

  useEffect(() => {
    let tmpMarkedDates = { ...markedDates };

    for (const date in eventsArray) {
      tmpMarkedDates[date] = { marked: true, dotColor: "sienna" };
    }

    setMarkedDates(tmpMarkedDates);
  }, [eventsArray]);

  const fetchEvents = async () => {
    const events_collection = collection(db, "Events");
    const querySnapShot = query(
      events_collection,
      where("shelterId", "==", logged_in_user.shelterId)
    );
    const q = await getDocs(querySnapShot);
    const fetchedEvents = q.docs.map((doc) => doc.data());

    const eventsDictionary = fetchedEvents.reduce((dictionary, obj) => {
      const name = obj.name;
      const date = obj.date;
      const id = obj.id;
      if (dictionary[date]) {
        dictionary[date].push([name, id]);
      } else {
        dictionary[date] = [[name, id]];
      }
      return dictionary;
    }, {});
    setEventsArray(eventsDictionary);
  };

  const onDayPress = (day) => {
    setSelectedDate(day.dateString);
  };

  const handleDeleteEvent = async (event) => {
    //func get (event) only
    await deleteEvent(event[1]);
    Alert.alert("Event Deleted!", "Event Deleted Successfully.");
    navigation.navigate("Home", logged_in_user);
  };

  const handleCreateEvent = () => {
    // Show the event modal when the user clicks "Create Event"
    setIsModalVisible(true);
  };
  // come from event modal - when clicked save modal
  const handleSaveEvent = async (newEvent) => {
    const eventObject = {
      shelterId: logged_in_user.shelterId,
      name: newEvent,
      date: selectedDate,
    };
    //save to database
    await saveEventToDatabase(eventObject);
    Alert.alert("Event Deleted!", "Event Deleted Successfully.");
    navigation.navigate("Home", logged_in_user);
  };

  const handleOpenAllEventsModal = () => {
    setIsAllEventsModalVisible(true);
  };
  const handleCloseAllEventsModal = () => {
    setIsAllEventsModalVisible(false);
  };

  const handleCloseModal = () => {
    // Close the modal
    setIsModalVisible(false);
  };

  const saveEventToDatabase = async (newEvent) => {
    let eventId;
    const dbRef = collection(db, "Events");
    await addDoc(dbRef, newEvent)
      .then((docRef) => {
        eventId = docRef.id;
        console.log("Successfully added a new evet with ID:", eventId);
        alert("Successfully added a new event!");
        const data = { ...newEvent, id: eventId };
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
        console.log("Error adding a new event:", error);
        alert("Error adding a new event:", error);
      });
  };

  const deleteEvent = async (eventID) => {
    const q = doc(collection(db, "Events"), eventID);
    try {
      await deleteDoc(q);
      console.log("SUCCESS: Event deleted from events collection!");
    } catch (error) {
      console.error("Error removing event from events collection: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ marginTop: 50 }} />

      <Icon name="calendar" size={50} color="sienna" />
      <Text style={styles.title}>Calendar</Text>
      <View style={style.container}>
        <Calendar
          onDayPress={onDayPress}
          markedDates={{
            ...markedDates,
            [selectedDate]: {
              selected: true,
              disableTouchEvent: true,
              selectedColor: "sienna",
              selectedTextColor: "white",
            },
          }}
          theme={{
            calendarBackground: "#FCEFEF",
            textSectionTitleColor: "#7B3F00",
            dayTextColor: "#D6A6A6",
            todayTextColor: "#FF69B4", // Pink shade
            selectedDayTextColor: "white",
            monthTextColor: "sienna",
            selectedDayBackgroundColor: "sienna",
            arrowColor: "#FF69B4", // Pink shade
          }}
        />
      </View>

      {/* Display created events */}
      {isModalVisible
        ? null
        : eventsArray[selectedDate] && (
            <View style={styles.eventListContainer}>
              {eventsArray[selectedDate].slice(0, 4).map((event, index) => (
                <View key={index} style={styles.eventDetailsContainer}>
                  <Text style={styles.notificationTitle}>
                    &#x00B7; {event[0]}
                  </Text>
                </View>
              ))}
            </View>
          )}

      <View style={{ height: 10 }} />

      {!isModalVisible && selectedDate && (
        <View style={styles.buttonContainer}>
          <Pressable onPress={handleOpenAllEventsModal}>
            <Text style={styles.notificationTitle}>
              Tap Here to Show & Manage All Events for This Date
            </Text>
          </Pressable>
        </View>
      )}
      <View style={{ height: 10 }} />
      {selectedDate && (
        <View style={styles.createEventContainer}>
          {logged_in_user.role == "Manager" && (
            <TouchableOpacity
              style={styles.loginButton}
              onPress={handleCreateEvent}
            >
              <Text style={styles.buttonText}>Add Event </Text>
            </TouchableOpacity>
          )}

          {isModalVisible && (
            <EventModal
              isVisible={isModalVisible}
              onClose={handleCloseModal}
              onSave={handleSaveEvent}
            />
          )}
        </View>
      )}
      <AllEventsModal
        isVisible={isAllEventsModalVisible}
        logged_in_user={logged_in_user}
        onClose={handleCloseAllEventsModal}
        events={eventsArray[selectedDate]}
        selectedDate={selectedDate}
        onDelete={handleDeleteEvent}
      />
    </View>
  );
};
const { width, height } = Dimensions.get("window");
const style = StyleSheet.create({
  eventListContainer: {
    flex: 1,
    flexDirection: "column", // Align events in a vertical list
    justifyContent: "center",
    marginTop: "auto",
    alignItems: "center",
    marginVertical: 10,
    // height: 20, // Align events to the top of the container
  },
  container: {
    flex: 1,
    width: width,
    //height: '100%',
    //marginTop: 20,
    backgroundColor: "#FCEFEF",
  },
  calendarContainer: {
    flex: 1,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  calendar: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});
export default Calender;
