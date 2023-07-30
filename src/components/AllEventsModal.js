import React from 'react';
import { View, Text, Modal, FlatList,TouchableOpacity, StyleSheet, ScrollView, } from 'react-native';
import { styles } from '../styles';
import EventListItem from './EventListItem';
const AllEventsModal = ({ isVisible, onClose, events, onDelete,selectedDate}) => {
   
      
  return (
    <Modal visible={isVisible} animationType="slide">
       
    <View style={style.container}>
        
    <View style={{ height: 25 }} />
      <Text style={style.title}>All Events:</Text>
      <View style={{ height: 25 }} />
      <FlatList
        data={events}
        renderItem={({ item}) => (
          <View style={style.listItem}>
           
            <EventListItem event={item} onDelete={() => onDelete(selectedDate, item)} />
            
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={() => <View style={style.closeText} />}
      />
      
      <TouchableOpacity onPress={onClose}>
        <Text style={style.closeText}>Close</Text>
      </TouchableOpacity>
    </View>
  
  </Modal>
);
};
const style = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#FCEFEF', // Change the background color here
      padding: 16,
    },
    title: {
        color: 'sienna',
      fontSize: 25,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    listItem: {
        color:'sienna',
        marginLeft: 10,
        fontSize: 16,
       
        fontFamily: "Mukta-Bold",
        
      },
    closeText: {
      fontSize: 16,
      fontWeight: 'bold',
      color:'sienna',
      alignSelf: 'center',
      marginTop: 20,
      //backgroundColor: 'brown',
    },
   
  });

export default AllEventsModal;
