import React from "react";
import { StyleSheet, View, Text, StatusBar } from "react-native";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import * as Font from "expo-font";

export const loadFonts = async () => {
  await Font.loadAsync({
    "LilitaOne-Regular": require("../assets/fonts/LilitaOne-Regular.ttf"),
    "Mukta-Bold": require("../assets/fonts/Mukta-Bold.ttf"),
    "CormorantUpright-Bold": require("../assets/fonts/CormorantUpright-Bold.ttf"),
  });
};
export const styles = StyleSheet.create({
  checkbox: {
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
  },

  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FCEFEF",
    paddingTop: StatusBar.currentHeight,
  },

  menuCOntainer: {
    flex: 1,
  },

  searchBar: {
    width: 300,
    marginLeft: 80,
  },

  filtersMenu: {
    width: 250,
    height: 250,
    backgroundColor: "#eeeeee",
    fontSize: 30,
    marginLeft: 40,
    display: "flex",
    justifyContent: "space-between",
  },

  filterIcon: {
    marginLeft: 25,
    fontSize: 30,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  filterIconContainer: {
    marginLeft: 25,
    fontSize: 30,
    display: "flex",
    flexDirection: "column",
  },

  tripContainer: {
    marginLeft: 10,
    marginRight: 10,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  scrollContainer: {
    width: "100%",
    paddingHorizontal: 10,
  },

  reqContainer: {
    zIndex: 1,
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },

  request: {
    paddingTop: 10,
    paddingBottom: 30,
    backgroundColor: "#FCEFEF",
    textAlign: "left",
  },

  reqText: {
    fontFamily: "CormorantUpright-Bold",
    fontSize: 22,
    color: "#8B5A33",
    marginBottom: 3,
  },

  underline: {
    borderStyle: "solid",
    borderBottomWidth: 2,
    borderColor: "#8B5A33",
    marginTop: 70,
  },

  title: {
    fontFamily: "LilitaOne-Regular",
    fontSize: 43,
    color: "#A0522D",
    marginBottom: 50,
  },
  registertitle: {
    fontFamily: "CormorantUpright-Bold",
    fontSize: 45,
    color: "#8B5A33",
    marginBottom: 30,
  },
  input: {
    width: "80%",
    height: 50,
    padding: 10,
    borderWidth: 1,
    borderColor: "sienna",
    marginBottom: 20,
    backgroundColor: "white",
    borderRadius: 10,
  },
  radioButtonText: {
    fontFamily: "CormorantUpright-Bold",
    fontSize: 18,
    color: "#8B5A33",
    marginLeft: 5,
  },
  radioButtonTextRight: {
    marginLeft: 10,
    fontSize: 16,
    fontFamily: "CormorantUpright-Bold",
    color: "#8B5A33",
  },
  radioCircle: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#8B5A33",
    alignItems: "center",
    justifyContent: "center",
  },
  selectedRadioCircle: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#8B5A33",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  separator: {
    width: 16,
  },
  radioButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: 'space-between',
    width: "80%",
    marginBottom: 20,
  },
  profilePicture: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    color: "#6F4E37",
    fontFamily: "Mukta-Bold",
  },
  loginButton: {
    backgroundColor: "#E59C8A",
    width: "80%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginBottom: 20,
  },
  registerButton: {
    backgroundColor: "#B08975",
    width: "80%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
  acceptButton: {
    backgroundColor: "#B08975",
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  denyButton: {
    backgroundColor: "#B08975",
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  button: {
    backgroundColor: 'sienna',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
    width: "80%",
  },
  surface: {
    padding: 8,
    height: 90,
    width:100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
