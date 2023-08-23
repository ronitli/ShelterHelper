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
  closeButton: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    color: "#8B5A33",
    fontSize: 20,
    margin: 5,
    justifyContent: "center",
  },
  picker: {
    height: 50,
    width: 200,
    borderColor: "#sienna",
    borderWidth: 1,
  },
  pickerLabelStyle: {
    fontSize: 18, // Adjust the font size
    color: "blue", // Change the text color
    fontFamily: "Arial", // Change the font family
  },

  filterOptionTextContainer: { display: "flex", justifyContent: "center" },
  filterCheckbox: {
    width: 40,
    margin: 2,
    paddingTop: 3,
    height: 40,
    backgroundColor: "rgba(255, 255, 255, 0)",
    borderStyle: "solid",
    borderWidth: 1,
  },
  filterOptionContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 1,
  },
  filter: {
    fontFamily: "CormorantUpright-Bold",
    fontSize: 20,
    color: "#8B5A33",
    textAlign: "left",
    width: 86,
    marginRight: 2,
    marginLeft: 2,
  },

  fIcon: { marginLeft: 5, marginRight: 5 },

  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FCEFEF",
    paddingTop: StatusBar.currentHeight,
  },
  // calendarContainer:
  // {
  //   flex: 1,
  //   // alignItems: "center",
  //   // justifyContent: "center",
  //   backgroundColor: "#FCEFEF",
  //   width: width,
  //   height: height,
  //   marginTop: 20,
  //   //paddingTop: StatusBar.currentHeight,
  // },

  menuCOntainer: {
    flex: 1,
  },

  searchBar: {
    width: 300,
    marginLeft: 80,
  },

  filterTitle: {
    fontFamily: "CormorantUpright-Bold",
    color: "#8B5A33",
    fontSize: 32,
    marginBottom: 12,
    marginTop: 6,
  },

  filterOption: {
    fontSize: 18,
    marginTop: 2,
    marginLeft: 3,
  },

  filtersMenu: {
    width: 250,
    maxHeight: 350,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    shadowColor: "#171717",
    shadowOffset: { width: -4, height: -2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    fontSize: 30,
    marginLeft: 40,
    paddingLeft: 5,
    paddingRight: 5,
    display: "flex",
  },

  filtersRow: {
    display: "flex",
    flexDirection: "row",
  },

  filterIconContainer: {
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
    width: 300,
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
  dropdownShelters: {
    maxWidth: 300,
    fontSize: 18,
    fontFamily: "CormorantUpright-Bold",
    color: "#8B5A33",
    maxHeight: 900,
    minHeight: 50,
    minWidth: 300,
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
    width: 300,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginBottom: 20,
  },
  registerButton: {
    backgroundColor: "#B08975",
    width: 300,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginBottom: 20,
  },
  nowTripButton: {
    backgroundColor: "#CEA38D",
    width: 300,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginBottom: 20,
  },
  notificationItem: {
    flexDirection: "row-reverse",
    marginBottom: 10,
    marginVertical: 30,
    borderBottomWidth: 1,
    borderBottomColor: "pink",
    justifyContent: "space-between",
    //paddingHorizontal: 10,
    paddingVertical: 5,
    //alignItems: 'center',
    flex: 1,
    //marginLeft: 10,
  },
  notificationTitle: {
    marginLeft: 10,

    fontSize: 16,
    color: "sienna",
    fontFamily: "Mukta-Bold",
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
    backgroundColor: "sienna",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
    width: "80%",
  },
  surface: {
    padding: 8,
    height: 90,
    width: 140,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FDF0F4",
  },
  downsurface: {
    padding: 8,
    height: 90,
    width: 140,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FDF0F4",
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 1,
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 1,
  },
  previewContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  previewImage: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
  previewText: {
    marginTop: 10,
    fontSize: 16,
  },
  previewContainer: {
    alignItems: "center",
    justifyContent: "center",
  },

  previewImage: {
    width: 300,
    height: 400,
  },

  webView: {
    width: 245,
    height: 200,
  },

  deleteButton: {
    backgroundColor: "#E59C8A",
    width: 100,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    marginTop: 10,
  },
  userItem: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    borderColor: "sienna",
  },
  approveButton: {
    backgroundColor: "#B08975",
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 10,
  },
  rejectButton: {
    backgroundColor: "#B08975",
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },

});
