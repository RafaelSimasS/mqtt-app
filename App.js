import { StyleSheet, Text, View } from "react-native";

// Componentes:
import React, { Component } from "react";
import HomeScreen from "./Screens/Home";
import AjustesScreen from "./Screens/Ajustes";

// Bibliotecas Externas:
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
const Tab = createMaterialBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      activeColor="#aeb4e8"
      inactiveColor="#ffffff"
      labelStyle={{ fontSize: 12 }}
      barStyle={{ backgroundColor: "#004751" }}
      backBehavior="history"
    >
      <Tab.Screen
        name="Feed"
        component={HomeScreen} //Home Screen
        options={{
          tabBarLabel: "Inicio",
          tabBarAccessibilityLabel: "Inicio",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={30} />
          ),
        }}
      />

      <Tab.Screen
        name="Configuracoes"
        component={AjustesScreen} // Profile Screen
        options={{
          tabBarLabel: "Ajustes",
          tabBarAccessibilityLabel: "Ajustes",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="cog" color={color} size={30} />
          ),
         
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <MyTabs />
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
