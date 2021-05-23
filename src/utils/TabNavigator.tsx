import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

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

import { RootStackParamList } from "../../src/screens/RootStackParams";

const { Navigator, Screen } = createBottomTabNavigator<RootStackParamList>();

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
    <Screen name="Home" component={HomeScreen} />
    <Screen name="Achievements" component={AchievementsScreen} />
    <Screen name="Feedback" component={FeedbackScreen} />
    <Screen name="Notifications" component={NotificationsScreen} />
    <Screen name="Profile" component={ProfileScreen} />
  </Navigator>
);
