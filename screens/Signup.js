//////////////////////////////////////////////////////////////////
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { signUpWithEmailPassword } from "../firebase/firebaseConfig";

const SignUp = () => {
  const navigation = useNavigation();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match!");
      return;
    }
    try {
      setErrorMessage(""); 
      await signUpWithEmailPassword(email, password);
      alert("Account created successfully!");
      navigation.navigate("Signin"); 
    } catch (error) {
      setErrorMessage("Error creating account: " + error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>MovieNest</Text>
      <Text style={styles.subtitle}>Create an account</Text>

      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

      <View style={styles.Slashcontainer}>
        <View style={[styles.slash, styles.two]} />
        <TouchableOpacity
          style={[styles.socialButton]}
          onPress={() => Linking.openURL("https://www.google.com")}
        >
          <Image
            source={require("../assets/icons/Google.png")}
            style={styles.socialIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.socialButton]}
          onPress={() => Linking.openURL("https://www.facebook.com")}
        >
          <Image
            source={require("../assets/icons/Facebook.png")}
            style={styles.socialIcon}
          />
        </TouchableOpacity>
        <View style={[styles.slash, styles.two]} />
      </View>

      <View style={styles.inputContainer}>
        <FontAwesome name="envelope" size={20} color="rgba(255, 255, 255, 0.7)" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="rgba(255, 255, 255, 0.7)"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name="lock-closed" size={20} color="rgba(255, 255, 255, 0.7)" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="rgba(255, 255, 255, 0.7)"
          secureTextEntry={!passwordVisible}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
          <Ionicons name={passwordVisible ? "eye-off" : "eye"} size={20} color="rgba(255, 255, 255, 0.7)" />
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name="lock-closed" size={20} color="rgba(255, 255, 255, 0.7)" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor="rgba(255, 255, 255, 0.7)"
          secureTextEntry={!confirmPasswordVisible}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <TouchableOpacity onPress={toggleConfirmPasswordVisibility} style={styles.eyeIcon}>
          <Ionicons name={confirmPasswordVisible ? "eye-off" : "eye"} size={20} color="rgba(255, 255, 255, 0.7)" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={handleSignUp} style={styles.signUpButton}>
        <Text style={styles.signUpText}>Sign Up</Text>
      </TouchableOpacity>

      <View style={styles.signIn}>
        <Text style={styles.signInText}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Signin")}>
          <Text style={styles.signInLink}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000000",
    padding: 20,
  },
  
  title: {
    fontFamily: "Raleway-ExtraBold",
    fontSize: 50,
    color: "#FF9500",
    marginBottom: 5,
  },

  subtitle: {
    fontFamily: "Roboto-Medium",
    fontSize: 20,
    color: "#FFFFFF",
    marginBottom: 30,
  },

  Slashcontainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },

  slash: {
    height: 1,
    backgroundColor: "#FFFFFF",
  },

  one: {
    width: 100,
  },

  two: {
    width: 100,
  },

  socialIcon: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },

  socialButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    width: 318,
    height: 45,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.6)",
  },

  input: {
    flex: 1,
    paddingVertical: 10,
    paddingLeft: 20,
    fontSize: 16,
    color: "#000000",
    height: 45,
    borderRadius: 8,
  },

  inputIcon: {
    marginLeft: 15,
  },

  eyeIcon: {
    position: "absolute",
    right: 10,
  },

  signUpButton: {
    backgroundColor: "#FFFFFF",
    width: 318,
    height: 45,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },

  signUpText: {
    color: "#000000",
    fontSize: 20,
    fontFamily: "Roboto-Bold",
  },

  signIn: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },

  signInText: {
    fontFamily: "Roboto-Regular",
    fontSize: 15,
    color: "#FFFFFF",
  },

  signInLink: {
    fontFamily: "Roboto-Regular",
    fontSize: 15,
    color: "#E38400",
    fontWeight: "bold",
  },

  errorText: {
    color: "red",
    fontSize: 16,
    marginBottom: 10,
  },
});

export default SignUp;