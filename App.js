import { StatusBar } from "expo-status-bar";
import React from "react";
import { Pressable } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Button, View, Text } from "react-native";
import Start from "./src/components/Start";
import { styles } from "./src/styles";
import Home from "./src/components/Home";
import Forgot_My_Password from "./src/components/Forgot_My_Password";
import Register from "./src/components/Register";
import AddDog from "./src/components/AddDog";
import Archive from "./src/components/Archive";
import Alerts from "./src/components/Alerts";
import Requests from "./src/components/Requests";
import Update_medical_data from "./src/components/Update_medical_data";
import Dogs from "./src/components/Dogs";
import Update_trip from "./src/components/Update_trip";
import Calender from "./src/components/Calender";
import ManageDocuments from "./src/components/ManageDocuments";
import EventModal from "./src/components/EventModal";
import AllEventsModal from "./src/components/AllEventsModal";
import Update_Dog_Details from "./src/components/Update_Dog_Details";
import EventListItem from "./src/components/EventListItem";
import UploadNewDocument from "./src/components/UploadNewDocument";
import AllDocuments from "./src/components/AllDocuments";
import DogInfo from "./src/components/DogInfo";
import ManageUsers from "./src/components/ManageUsers";
import DeleteUsers from "./src/components/DeleteUsers";
import * as Font from "expo-font";
//import { loadFonts } from './styles';
import AppLoading from "expo-app-loading";
import * as SplashScreen from "expo-splash-screen";

const Stack = createStackNavigator();

function App() {
  const [isReady, setIsReady] = React.useState(false);

  React.useEffect(() => {
    async function prepare() {
      // Hide the splash screen
      await SplashScreen.hideAsync();
      // Load any necessary assets here
      await Font.loadAsync({
        "LilitaOne-Regular": require("./assets/fonts/LilitaOne-Regular.ttf"),
        "Mukta-Bold": require("./assets/fonts/Mukta-Bold.ttf"),
        "CormorantUpright-Bold": require("./assets/fonts/CormorantUpright-Bold.ttf"),
      });
      setIsReady(true);
    }
    prepare();
  }, []);

  if (!isReady) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen
          name="Start"
          component={Start}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Forgot_My_Password"
          component={Forgot_My_Password}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Archive"
          component={Archive}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddDog"
          component={AddDog}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Alerts"
          component={Alerts}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Requests"
          component={Requests}
          options={{ headerShown: false }}
        />
        
        {/* <Stack.Screen name="EventListItem" component={EventListItem} options={{headerShown:false}}/> */}
        <Stack.Screen
          name="Update_medical_data"
          component={Update_medical_data}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Dogs"
          component={Dogs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EventModal"
          component={EventModal}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UploadNewDocument"
          component={UploadNewDocument}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AllDocuments"
          component={AllDocuments}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AllEventsModal"
          component={AllEventsModal}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EventListItem "
          component={EventListItem}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Calender"
          component={Calender}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Update_trip"
          component={Update_trip}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Update_Dog_Details"
          component={Update_Dog_Details}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DogInfo"
          component={DogInfo}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="ManageDocuments"
          component={ManageDocuments}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ManageUsers"
          component={ManageUsers}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DeleteUsers"
          component={DeleteUsers}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;
