import { Button, StyleSheet, Text, View } from "react-native";
import styles from "./styles";
import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MyTabBar } from "./components/MyTabBar";
import { HomeScreen } from "./components/screens/HomeScreen";
import { SettingsScreen } from "./components/screens/SettingsScreen";
import { NavigationContainer } from "@react-navigation/native";
import { CalendarScreen } from "./components/screens/CalendarScreen";
import moment from "moment";
import { Provider } from "react-redux";
import { store } from "./stores";

export type RootStackParamList = {
  Home: { date: number };
  Calendar: undefined;
  Settings: undefined;
};

const Tab = createBottomTabNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator tabBar={(props) => <MyTabBar {...props} />}>
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            initialParams={{ date: moment().valueOf() }}
          />
          <Tab.Screen name="Calendar" component={CalendarScreen} />
          <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
