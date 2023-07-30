import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const EventListItem = ({ event, onDelete }) => {
  return (
    // <View style={styles.listItem}>
    //   <Text style={styles.eventName}>{event.name}</Text>
    //   <TouchableOpacity onPress={onDelete}>
    //     <Text style={styles.deleteButton}>X</Text>
    //   </TouchableOpacity>
      
    // </View>
    <View style={styles.listItem}>
    <TouchableOpacity onPress={onDelete}>
      <Text style={styles.deleteButton}>X</Text>
    </TouchableOpacity>
    <Text style={styles.eventName}>{event.name}</Text>
  </View>
  );
};

const styles = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  eventName: {
    fontSize: 16,
    fontFamily: 'Mukta-Bold',
    color: 'sienna',
    marginLeft: 10,
  },
  deleteButton: {
    fontSize: 16,
    color: 'red',
  },
});

export default EventListItem;
