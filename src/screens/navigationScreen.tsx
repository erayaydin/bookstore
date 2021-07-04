import "react-native-gesture-handler";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/types";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./auth/login.screen";
import RegisterScreen from "./auth/register.screen";
import HomeScreen from "./guarded/home.screen";
import SplashScreen from "./splash.screen";
import { NavigationContainer } from "@react-navigation/native";
import ViewBookScreen from "./guarded/view.book.screen";
import {View} from "react-native";
import {GlobalStyles} from "../styles/global";

const Stack = createStackNavigator();

const NavigationScreen = () => {
  const isLoggedIn = useSelector<RootState>(state => state.auth.isLoggedIn);

  return (
          <NavigationContainer>
              <Stack.Navigator initialRouteName="splashScreen" screenOptions={{ headerShown: false }}>
                  <Stack.Screen name="splashScreen" component={SplashScreen} />
                  {!isLoggedIn && (
                      <>
                          <Stack.Screen name="login" component={LoginScreen} />
                          <Stack.Screen name="register" component={RegisterScreen} />
                      </>
                  )}
                  {isLoggedIn && (
                      <>
                          <Stack.Screen name="home" component={HomeScreen} />
                          <Stack.Screen name="viewBook" component={ViewBookScreen} />
                      </>
                  )}
              </Stack.Navigator>
          </NavigationContainer>
  );
};

export default NavigationScreen;
