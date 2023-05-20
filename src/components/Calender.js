import React,{ useState } from 'react';
import { View, Text,  StyleSheet,Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import Drawer from 'react-native-drawer';
import { Calendar,CalendarList, Agenda } from 'react-native-calendars';
import { styles } from '../styles';
import Icon from 'react-native-vector-icons/FontAwesome';

const Calender = ({navigation}) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [events, setEvents] = useState({});
  const addEvent = (day) => {
    const newEvents = { ...events };
    newEvents[day.dateString] = { selected: true, marked: true, dotColor: 'blue' };
    setEvents(newEvents);
  };
  const onDayPress = (day) => {
    setSelectedDate(day.dateString);
  };

    return (
      <View style={styles.container}>
         <View style={{   marginTop: 50 }} />
         
        <Icon name="calendar" size={50} color='sienna' />
        <Text style={styles.title}>Calendar</Text>
        <View style={style.container}>
      <Calendar
       
        onDayPress={onDayPress}
        markedDates={{
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
    </View>
      );
  
};
const { width, height } = Dimensions.get('window');
const style = StyleSheet.create({
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