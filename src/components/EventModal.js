import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';



const EventModal = ({ isVisible, onClose, onSave }) => {
  const [eventName, setEventName] = useState('');
 
  const handleSaveEvent = () => {
    // Create a new event object with the provided details
     const newEvent = {
      name: eventName,
     };
     const trimmedEventName = eventName.trim();
     if(trimmedEventName === '')
     {
        Alert.alert('Empty Event!','You can not create an empty event.');
        return;
     }
    // Call the onSave function to save the new event
    onSave(newEvent);
    
    // Clear the input fields
    setEventName('');
   
    // Close the modal
    onClose();
  };


  return (
    <View style={styles.modalContainer}>
      {/* <Text style={styles.modalTitle}>Add Event</Text> */}
      <TextInput
        style={styles.input}
        placeholder="Event:"
        placeholderTextColor="#D6A6A6"
        value={eventName}
        onChangeText={setEventName}
      />
     
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveEvent}>
        <Text style={styles.saveButtonText}>Save Event</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
        <Text style={styles.cancelButtonText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D6A6A6',
    
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: 'sienna',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  cancelButton: {
    padding: 10,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: 'sienna',
    fontWeight: 'bold',
  },
});

export default EventModal;
