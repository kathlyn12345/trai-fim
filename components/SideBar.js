import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useCustomFonts } from "./font";

const Sidebar = ({ isVisible, onClose }) => {
  if (!isVisible) return null; 

  const fontsLoaded = useCustomFonts();

  if (!fontsLoaded) {
    return (
      <View>
        <Text>Loading Fonts...</Text>
      </View>
    );
  }

  return (
    <View style={styles.sidebar}>
      <TouchableOpacity onPress={onClose} style={styles.closeButton}>
        <Ionicons name="close" size={30} color="#FFFFFF" />
      </TouchableOpacity>

      
      <TouchableOpacity style={styles.item} onPress={onClose}>
        <Ionicons name="home" size={20} color="#FFFFFF" />
        <Text style={styles.text}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item} onPress={onClose}>
        <Ionicons name="person" size={20} color="#FFFFFF" />
        <Text style={styles.text}>Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item} onPress={onClose}>
        <Ionicons name="information-circle" size={20} color="#FFFFFF" />
        <Text style={styles.text}>About Us</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  sidebar: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 220,
    height: "100%",
    backgroundColor: "#000000",
    padding: 15,
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
    zIndex: 10,
  },

  closeButton: {
    marginBottom: 20,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 20,
    fontFamily: "Roboto-Bold",
    marginBottom: 20,
  },

  item: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },

  text: {
    fontFamily: "Roboto-Regular",
    color: "#FFFFFF",
    fontSize: 16,
    marginLeft: 10,
  },
});

export default Sidebar;
