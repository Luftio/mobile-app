import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
} from "@ui-kitten/components";

import HomeScreen from "../../src/screens/HomeScreen";
import FeedbackScreen from "../../src/screens/FeedbackScreen";
import NotificationsScreen from "../../src/screens/NotificationsScreen";
import AchievementsScreen from "../../src/screens/AchievementsScreen";
import ProfileScreen from "../../src/screens/ProfileScreen";
import SettingsScreen from "../../src/screens/SettingsScreen";
import InformationScreen from "../../src/screens/InformationsScreen";
import ReportProblemScreen from "../../src/screens/ReportProblemScreen";
import MyDevicesScreen from "../../src/screens/MyDevicesScreen";
import AccountEdit from "../../src/screens/AccountEditScreen";
import NightModeScreen from "../../src/screens/NightModeScreen";
import EducationScreen from "../screens/EducationScreen";

import { RootStackParamList } from "../../src/screens/RootStackParams";

const { Navigator, Screen } = createBottomTabNavigator<RootStackParamList>();

const Stack = createStackNavigator<RootStackParamList>();

const Profile = () => (
  <Stack.Navigator headerMode="none" screenOptions={{ animationEnabled: true }}>
    <Stack.Screen name="Profile" component={ProfileScreen} />
    <Stack.Screen name="Settings" component={SettingsScreen} />
    <Stack.Screen name="Informations" component={InformationScreen} />
    <Stack.Screen name="ReportProblem" component={ReportProblemScreen} />
    <Stack.Screen name="MyDevices" component={MyDevicesScreen} />
    <Stack.Screen name="AccountEdit" component={AccountEdit} />
    <Stack.Screen name="NightMode" component={NightModeScreen} />
  </Stack.Navigator>
);

const Home = () => (
  <Stack.Navigator headerMode="none" screenOptions={{ animationEnabled: true }}>
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="Education" component={EducationScreen} />
  </Stack.Navigator>
);

const BottomTabBar = ({ navigation, state }: any) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={(index) => navigation.navigate(state.routeNames[index])}>
    <BottomNavigationTab
      icon={(props) => <Icon {...props} name="home" />}
      style={{ paddingBottom: 30, paddingTop: 8 }}
    />
    <BottomNavigationTab
      icon={(props) => <Icon {...props} name="award" />}
      style={{ paddingBottom: 30, paddingTop: 8 }}
    />
    <BottomNavigationTab
      icon={(props) => <Icon {...props} name="plus-circle" />}
      style={{ paddingBottom: 30, paddingTop: 8 }}
    />
    <BottomNavigationTab
      icon={(props) => <Icon {...props} name="bell" />}
      style={{ paddingBottom: 30, paddingTop: 8 }}
    />
    <BottomNavigationTab
      icon={(props) => <Icon {...props} name="user" />}
      style={{ paddingBottom: 30, paddingTop: 8 }}
    />
  </BottomNavigation>
);

export const TabNavigator = () => (
  <Navigator tabBar={(props) => <BottomTabBar {...props} />}>
    <Screen name="Home" component={Home} />
    <Screen name="Achievements" component={AchievementsScreen} />
    <Screen name="Feedback" component={FeedbackScreen} />
    <Screen name="Notifications" component={NotificationsScreen} />
    <Screen name="Profile" component={Profile} />
  </Navigator>
);
