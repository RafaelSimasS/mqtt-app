import { StyleSheet, Text, View, PermissionsAndroid } from "react-native";
import React, { Component } from "react";

// Screens:
import HomeScreen from "./Screens/Home";
import AjustesScreen from "./Screens/Ajustes";
import NewUser from "./Screens/NewUser";
import FaceCam from "./Screens/FaceCam";

// Bibliotecas Externas:
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
const Tab = createMaterialBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MyTabs({ navigation, route }) {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      activeColor="#00f800"
      inactiveColor="#ffffff"
      labelStyle={{ fontSize: 28 }}
      barStyle={{ backgroundColor: "#004751" }}
      backBehavior="history"
    >
      <Tab.Screen
        name="Feed"
        component={HomeScreen} //Home Screen
        options={{
          title: "Início",
          tabBarLabel: "Inicio",
          tabBarAccessibilityLabel: "Inicio",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={30} />
          ),
        }}
      />

      <Tab.Screen
        name="Settings"
        component={AjustesScreen} // Profile Screen
        options={{
          tabBarLabel: "Ajustes",
          tabBarAccessibilityLabel: "Ajustes",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="cog" color={color} size={30} />
          ),
          title: "Ajustes",
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {
              backgroundColor: "#71ccc7",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "400",
            },
            headerTitleAlign: "center",
          }}
        >
          <Stack.Screen
            name="Home"
            component={MyTabs}
            options={{ title: "Inicio" }}
          />

          <Stack.Screen
            name="NewUser"
            component={NewUser}
            options={{
              title: "Cadastro de Rosto",
            }}
          />
          <Stack.Screen
            name="FaceCam"
            component={FaceCam}
            options={{
              title: "Cadastro de Rosto",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
