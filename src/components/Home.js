// Home.js

import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import { styles } from "../styles";
import { List, MD3Colors, Divider, Surface } from "react-native-paper";

const Home = ({ route, navigation }) => {
  const logged_in_user = route.params;
  return (
    <View style={styles.container}>
      <Icon name="home" size={60} color="#A0522D" />
      <Text style={styles.title}>Home Page</Text>
      <View style={styles.topRow}>
        {logged_in_user.role == "Manager" && (
          <TouchableOpacity
            onPress={() => navigation.navigate("ManageUsers", logged_in_user)}
          >
            <Surface style={styles.surface}>
              <Icon name="user" size={25} color="sienna" />
              <Text style={styles.radioButtonText}>Manage Users</Text>
            </Surface>
          </TouchableOpacity>
        )}
        {logged_in_user.role == "Manager" && (
          <TouchableOpacity
            onPress={() => navigation.navigate("AddDog", logged_in_user)}
          >
            <Surface style={styles.surface}>
              <Icon name="plus" size={25} color="sienna" />
              <View style={{ height: 10 }} />
              <Text style={styles.radioButtonText}>Add a New Dog</Text>
            </Surface>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          onPress={() => navigation.navigate("Dogs", logged_in_user)}
        >
          <Surface style={styles.surface}>
            <Icon name="paw" size={25} color="sienna" />
            <View style={{ height: 10 }} />
            <Text style={styles.radioButtonText}>All Dogs</Text>
          </Surface>
        </TouchableOpacity>
      </View>

      <View style={styles.bottomRow}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Calender", logged_in_user)}
        >
          <Surface style={styles.downsurface}>
            <Icon name="calendar" size={25} color="sienna" />
            <View style={{ height: 10 }} />
            <Text style={styles.radioButtonText}>Calendar</Text>
          </Surface>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Alerts", logged_in_user)}
        >
          <Surface style={styles.downsurface}>
            <Icon name="bell" size={25} color="sienna" />
            <View style={{ height: 5 }} />
            <Text style={styles.radioButtonText}> Check Notifications</Text>
          </Surface>
        </TouchableOpacity>
        {}
      </View>
      <Image
        source={require("../../assets/try.jpg")}
        style={{ width: 350, height: 320 }}
      />
    </View>
  );
};

export default Home;
