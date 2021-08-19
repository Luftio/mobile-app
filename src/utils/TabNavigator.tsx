import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import { BottomNavigation, BottomNavigationTab, Icon } from "@ui-kitten/components";
import { useSafeAreaInsets } from "react-native-safe-area-context";

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
import DeviceSettingsScreen from "../screens/DeviceSettingsScreen";
import MeasureDetailScreen from "../../src/screens/MeasureDetailScreen";
import EducationScreen from "../screens/EducationScreen";

import { RootStackParamList } from "../../src/screens/RootStackParams";

const { Navigator, Screen } = createBottomTabNavigator<RootStackParamList>();

const Stack = createStackNavigator<RootStackParamList>();

const Profile = () => (
  <Stack.Navigator screenOptions={{ headerShown: false, animationEnabled: true }}>
    <Stack.Screen name="Profile" component={ProfileScreen} />
    <Stack.Screen name="Settings" component={SettingsScreen} />
    <Stack.Screen name="Informations" component={InformationScreen} />
    <Stack.Screen name="ReportProblem" component={ReportProblemScreen} />
    <Stack.Screen name="MyDevices" component={MyDevicesScreen} />
    <Stack.Screen name="AccountEdit" component={AccountEdit} />
    <Stack.Screen name="DeviceSettings" component={DeviceSettingsScreen} />
  </Stack.Navigator>
);

const Home = () => (
  <Stack.Navigator screenOptions={{ headerShown: false, animationEnabled: true }}>
    <Stack.Screen name="Home" options={{ headerShown: false }} component={HomeScreen} />
    <Stack.Screen name="MeasureDetail" options={{ headerShown: false }} component={MeasureDetailScreen} />
    <Stack.Screen name="Education" options={{ headerShown: false }} component={EducationScreen} />
  </Stack.Navigator>
);

const BottomTabBar = ({ navigation, state }: any) => {
  const insets = useSafeAreaInsets();
  return (
    <BottomNavigation selectedIndex={state.index} onSelect={(index) => navigation.navigate(state.routeNames[index])}>
      <BottomNavigationTab
        icon={(props) => <Icon {...props} name="home" />}
        style={{ paddingBottom: 8 + insets.bottom, paddingTop: 8 }}
      />
      <BottomNavigationTab
        icon={(props) => <Icon {...props} name="award" />}
        style={{ paddingBottom: 8 + insets.bottom, paddingTop: 8 }}
      />
      {/*<BottomNavigationTab
        icon={(props) => <Icon {...props} name="plus-circle" />}
        style={{ paddingBottom: 8 + insets.bottom, paddingTop: 8 }}
      />*/}
      <BottomNavigationTab
        icon={(props) => <Icon {...props} name="bell" />}
        style={{ paddingBottom: 8 + insets.bottom, paddingTop: 8 }}
      />
      <BottomNavigationTab
        icon={(props) => <Icon {...props} name="user" />}
        style={{ paddingBottom: 8 + insets.bottom, paddingTop: 8 }}
      />
    </BottomNavigation>
  );
};

export const TabNavigator = () => (
  <Navigator screenOptions={{ headerShown: false }} tabBar={(props) => <BottomTabBar {...props} />}>
    <Screen name="Home" component={Home} />
    <Screen name="Achievements" component={AchievementsScreen} />
    {/*<Screen name="Feedback" component={FeedbackScreen} />*/}
    <Screen name="Notifications" component={NotificationsScreen} />
    <Screen name="Profile" component={Profile} />
  </Navigator>
);
