import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useCustomFonts } from "../components/font";

const SigninandCreate = () => {
  const fontsLoaded = useCustomFonts();
  const navigation = useNavigation();

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.Tagline}>Where Every Story Finds a Home</Text>

      <View style={styles.ButtonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("HomeScreen")}
        >
          <Text style={styles.signin}>Sign In</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.bButton]}
          onPress={() => navigation.navigate("SignUp")}
        >
          <Text style={styles.Text}>Create an Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#000000",
    padding: 20,
  },

  Tagline: {
    fontFamily: "Roboto-Bold",
    fontSize: 50,
    lineHeight: 70,
    color: "#ffffff",
    textAlign: "left",
    marginRight: 65,
    marginTop: 100,
  },

  ButtonContainer: {
    position: "absolute",
    bottom: 50,
    width: "100%",
    alignItems: "center",
  },

  button: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 12,
    paddingHorizontal: 40,
    marginBottom: 15,
    borderRadius: 30,
    width: "80%",
    alignItems: "center",
  },

  bButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#000000",
  },

  Text: {
    fontFamily: "Roboto-Bold",
    fontSize: 20,
    color: "#FFFFFF",
    textAlign: "center",
  },

  signin: {
    fontFamily: "Roboto-Bold",
    fontSize: 20,
    color: "#000000",
    textAlign: "center",
  },
});

export default SigninandCreate;