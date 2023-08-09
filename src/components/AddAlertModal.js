import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

const AddAlertModal = ({ isVisible, onClose, onSave }) => {
  const [alertName, setAlertName] = useState('');
 
  const handleSaveAlert = () => {
    // Create a new event object with the provided details
     const newAlert = {
      name: alertName,
     };
     const trimmedAlertName = alertName.trim();
     if(trimmedAlertName === '')
     {
        alert("Empty Notification text!","You can not create an empty notification!");
        return;
     }
    // Call the onSave function to save the new event
    onSave(newAlert);
    // Clear the input fields
    setAlertName('');
   
    // Close the modal
    onClose();
  };

  return (
    <View style={styles.modalContainer}>
      {/* <Text style={styles.modalTitle}>Add Event</Text> */}
      <TextInput
        style={styles.input}
        placeholder="Notification:"
        placeholderTextColor="#D6A6A6"
        value={alertName}
        onChangeText={setAlertName}
      />
     
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveAlert}>
        <Text style={styles.saveButtonText}>Save Alert</Text>
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

export default AddAlertModal;
