// Home.js

import React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

const Home = ({ navigation }) => {
  return (
    <View>
      <Text onPress={() => navigation.navigate("AddDog")}>AddDog</Text>
      <Text onPress={() => navigation.navigate("Requests")}>Requests</Text>
      <Text onPress={() => navigation.navigate("Alerts")}>Alerts</Text>
      <Text onPress={() => navigation.navigate("Dogs")}>All Dogs</Text>
      <Text onPress={() => navigation.navigate("Calender")}>My calender</Text>
    </View>
  );
};

export default Home;
