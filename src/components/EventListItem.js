import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";

const EventListItem = ({ event, onDelete, logged_in_user }) => {
  const handleDelete = () => {
    Alert.alert(
      "Delete Event",
      "Are you sure you want to delete this event?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "YES",
          onPress: () => onDelete(event), // Call the onDelete function with the event when the user presses "YES"
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.listItem}>
      {logged_in_user.role == "Manager" && (
        <TouchableOpacity onPress={handleDelete}>
          <Text style={styles.deleteButton}>X</Text>
        </TouchableOpacity>
      )}
      <Text style={styles.eventName}>{event}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  eventName: {
    fontSize: 16,
    fontFamily: "Mukta-Bold",
    color: "sienna",
    marginLeft: 10,
  },
  deleteButton: {
    fontSize: 16,
    color: "red",
  },
});

export default EventListItem;
