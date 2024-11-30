import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
  Linking,
  ScrollView,
} from "react-native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { signUpWithEmailPassword } from "../firebase/firebaseConfig";
import Checkbox from "expo-checkbox";

const SignUp = () => {
  const navigation = useNavigation();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isAgreed, setIsAgreed] = useState(false); // State for the checkbox
  const [modalVisible, setModalVisible] = useState(false); // State to control modal visibility
  const [hasReadTerms, setHasReadTerms] = useState(false); // Track if the user has read the Terms

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

    if (!isAgreed) {
      setErrorMessage("You must agree to the Terms and Conditions!");
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

  // Toggle the checkbox state
  const handleCheckboxChange = () => {
    if (hasReadTerms) {
      setIsAgreed(!isAgreed);
    }
  };

  // Handle when user confirms they've read the terms
  const handleReadTerms = () => {
    setHasReadTerms(true); // Set hasReadTerms to true when the user clicks to acknowledge reading the terms
    setIsAgreed(true); // Automatically check the box after acknowledging
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trai-Film</Text>
      <Text style={styles.subtitle}>Create an account</Text>

      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

      <View style={styles.Slashcontainer}>
        <View style={[styles.slash, styles.two]} />
        <TouchableOpacity
          style={[styles.socialButton]}
          onPress={() => Linking.openURL("https://www.google.com")}
        >
          <Image source={require("../assets/icons/Google.png")} style={styles.socialIcon} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.socialButton]}
          onPress={() => Linking.openURL("https://www.facebook.com")}
        >
          <Image source={require("../assets/icons/Facebook.png")} style={styles.socialIcon} />
        </TouchableOpacity>
        <View style={[styles.slash, styles.two]} />
      </View>

      <View style={styles.inputContainer}>
        <FontAwesome
          name="envelope"
          size={20}
          color="rgba(255, 255, 255, 0.7)"
          style={styles.inputIcon}
        />
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
        <Ionicons
          name="lock-closed"
          size={20}
          color="rgba(255, 255, 255, 0.7)"
          style={styles.inputIcon}
        />
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
        <Ionicons
          name="lock-closed"
          size={20}
          color="rgba(255, 255, 255, 0.7)"
          style={styles.inputIcon}
        />
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

      {/* Agree to Terms and Conditions Checkbox */}
      <View style={styles.checkboxContainer}>
        <Checkbox
          value={isAgreed}
          onValueChange={handleCheckboxChange}
          tintColors={{ true: "#FF9500", false: "rgba(255, 255, 255, 0.7)" }}
          disabled={!hasReadTerms} // Disable checkbox if terms haven't been read
        />
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Text style={styles.checkboxText}>Agree to Terms and Conditions</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={handleSignUp}
        style={[styles.signUpButton, { opacity: isAgreed ? 1 : 0.5 }]}
        disabled={!isAgreed} // Disable button if terms are not agreed
      >
        <Text style={styles.signUpText}>Sign Up</Text>
      </TouchableOpacity>

      <View style={styles.signIn}>
        <Text style={styles.signInText}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Signin")}>
          <Text style={styles.signInLink}>Sign In</Text>
        </TouchableOpacity>
      </View>

      {/* Modal for Terms and Conditions */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <ScrollView contentContainerStyle={styles.modalScroll}>
              <Text style={styles.modalTitle}>Terms and Conditions</Text>
              <Text style={styles.modalText}>
                By agreeing to these Terms and Conditions, you acknowledge and agree to abide by copyright laws as they pertain to this service. All content, including but not limited to text, images, videos, and software, are protected by copyright laws and may not be reproduced, distributed, or used in any manner without the express permission of the copyright holder.

                Unauthorized use of copyrighted materials may result in legal action. You must not use the service in a way that violates the copyright rights of others. If you have any questions about the copyright laws, please refer to the applicable copyright regulations in your jurisdiction.

                <Text style={{ fontWeight: "bold" }}>Copyright © 2024 MovieNest. All rights reserved.</Text>
              </Text>
            </ScrollView>
            <TouchableOpacity onPress={handleReadTerms} style={styles.modalCloseButton}>
              <Text style={styles.modalCloseText}>I have read the Terms</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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

  checkboxContainer: {
    flexDirection: "row",
    marginVertical: 10,
    marginRight: 90,
  },

  checkboxText: {
    color: "#FF9500",
    marginLeft: 10,
  },

  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },

  modalContent: {
    backgroundColor: "#FFFFFF",
    width: "80%",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },

  modalScroll: {
    paddingBottom: 20,
  },

  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },

  modalText: {
    fontSize: 16,
    color: "#333333",
  },

  modalCloseButton: {
    backgroundColor: "#FF9500",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },

  modalCloseText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
});

export default SignUp;
