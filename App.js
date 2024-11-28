///////////////////////////////////////////////////////////////////////////
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaView, StatusBar } from "react-native";
import SplashScreen from "./screens/Splash";
import SigninandCreate from "./screens/Signinandcreate";
import HomeScreen from "./screens/HomeScreen";
import SignIn from "./screens/Signin";
import Signup from "./screens/Signup";
import ProfileScreen from "./screens/ProfileScreen";
import AboutUsScreen from "./screens/AboutUsScreen";


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#000000" }}>
        <StatusBar barStyle="light-content" backgroundColor="#000000" />

        <Stack.Navigator initialRouteName="SplashScreen">
          <Stack.Screen
            name="SplashScreen"
            component={SplashScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="SigninandCreate"
            component={SigninandCreate}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{ headerShown: false }}
          />

          
          <Stack.Screen
            name="Signin"
            component={SignIn}
            options={{ headerShown: false }}
          />
          
          <Stack.Screen
            name="Signup"
            component={Signup}
            options={{ headerShown: false }}
          />
          
          <Stack.Screen
            name="ProfileScreen"
            component={ProfileScreen}
            options={{ headerShown: false }}
          />          
          <Stack.Screen
            name="AboutUsScreen"
            component={AboutUsScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
}
