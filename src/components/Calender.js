import React,{ useState } from 'react';
import { View, Text,  StyleSheet,Dimensions ,TouchableOpacity, TextInput,FlatList, ScrollView,Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import Drawer from 'react-native-drawer';
import { Calendar,CalendarList, Agenda } from 'react-native-calendars';
import { styles } from '../styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import EventModal from './EventModal';
import AllEventsModal from './AllEventsModal';
import { Alert } from 'react-native';

const Calender = ({navigation}) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [events, setEvents] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAllEventsModalVisible, setIsAllEventsModalVisible] = useState(false);

  
  const onDayPress = (day) => {
    setSelectedDate(day.dateString);
  };

  const handleDeleteEvent = (date, event) => {
    const selectedDateEvents = events[date];
  
    // Create a copy of the events array and remove the event from it
    const updatedEvents = selectedDateEvents.filter((item) => item !== event);
  
    // Update the events state with the modified array
    const updatedEventsState = {
      ...events,
      [date]: updatedEvents,
    };
  
    // Remove the date entry from the state if all events for that date are deleted
    if (updatedEvents.length === 0) {
      delete updatedEventsState[date];
    }
  
    // Set the updated events state
    setEvents(updatedEventsState);
  
    // Close the AllEventsModal after deleting
    //setIsAllEventsModalVisible(false);
  };
  

  // const handleDeleteEvent = (date, index) => {
  // const selectedDateEvents = events[date];
  // const updatedEvents = selectedDateEvents.filter((event, i) => i !== index);
  // const updatedEventsState = {
  //   ...events,
  //   [date]: updatedEvents,
  // };
  // if (updatedEvents.length === 0) {
  //   delete updatedEventsState[date];
  // }
  // setEvents(updatedEventsState);
  // setIsModalVisible(false);
  // };

const handleCreateEvent = () => {
  // Show the event modal when the user clicks "Create Event"
  setIsModalVisible(true);
};

const handleSaveEvent = (newEvent) => {
  
  // Save the new event in the events state using the selected date as the key
  if (events[selectedDate]) {
    // If events exist, add the new event to the existing array of events for the selected date
    const newEvents = [...events[selectedDate], newEvent];
    setEvents({ ...events, [selectedDate]: newEvents });
  } else {
    // If events don't exist, create a new array with the new event as the first element
    setEvents({ ...events, [selectedDate]: [newEvent] });
  }
 
//save to database
alert("Event created!");
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

const markedDates = {};

for (const date in events) {
  if (events.hasOwnProperty(date)) {
    markedDates[date] = { marked: true, dotColor: 'sienna'};
  }
  
}


    return (
      <View style={styles.container}>
         <View style={{   marginTop: 50 }} />
         
        <Icon name="calendar" size={50} color='sienna' />
        <Text style={styles.title}>Calendar</Text>
        <View style={style.container}>
      <Calendar
       
        onDayPress={onDayPress}
        markedDates={{
          ...markedDates,
          [selectedDate]: {
            selected: true,
            disableTouchEvent: true,
            selectedColor: 'sienna',
            selectedTextColor: 'white',
          },
        }}
        theme={{
          calendarBackground: '#FCEFEF',
          textSectionTitleColor: '#7B3F00',
          dayTextColor: '#D6A6A6',
          todayTextColor: '#FF69B4', // Pink shade
          selectedDayTextColor: 'white',
          monthTextColor: 'sienna',
          selectedDayBackgroundColor: 'sienna',
          arrowColor: '#FF69B4', // Pink shade
        }}
      />
      </View>
      

      {/* Display created events */}
      {isModalVisible ? null : (
      events[selectedDate] && (
        <View style={styles.eventListContainer}>
          
        {events[selectedDate].slice(0, 4).map((event, index) => (
          <View key={index} style={styles.eventDetailsContainer}>
            <Text style={styles.notificationTitle}>&#x00B7; {event.name}</Text>
          </View>
        ))}
          </View >
      )
      )}

<View style={{ height: 10 }} />
{/* {selectedDate && (
  <View style={styles.createEventContainer}>
    
      <TouchableOpacity style={styles.loginButton} onPress={handleCreateEvent}>
        <Text style={styles.buttonText}>Add Event </Text>
      </TouchableOpacity>
   

    {isModalVisible && (
      <EventModal isVisible={isModalVisible} onClose={handleCloseModal} onSave={handleSaveEvent} />
    )}
  </View>
)} */}
{!isModalVisible && selectedDate &&(
  
<View style={styles.buttonContainer}>
<Pressable onPress={handleOpenAllEventsModal}>
        <Text style={styles.notificationTitle}>Tap Here to Show & Manage All Events for This Date</Text>
      </Pressable>
</View>
)}
<View style={{ height: 10 }} />
{selectedDate && (
  <View style={styles.createEventContainer}>
    
      <TouchableOpacity style={styles.loginButton} onPress={handleCreateEvent}>
        <Text style={styles.buttonText}>Add Event </Text>
      </TouchableOpacity>
   

    {isModalVisible && (
      <EventModal isVisible={isModalVisible} onClose={handleCloseModal} onSave={handleSaveEvent} />
    )}
  </View>
)}
 <AllEventsModal
        isVisible={isAllEventsModalVisible}
        onClose={handleCloseAllEventsModal}
        events={events[selectedDate]}
        selectedDate={selectedDate} 
        onDelete={handleDeleteEvent}
      />
    </View>

      );
  
};
const { width, height } = Dimensions.get('window');
const style = StyleSheet.create({
  eventListContainer: {
    flex: 1,
    flexDirection: 'column', // Align events in a vertical list
   justifyContent: 'center',
    marginTop: 'auto',
    alignItems: 'center',
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
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  calendar: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});
export default Calender;