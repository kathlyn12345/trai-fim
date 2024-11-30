import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Linking,
} from "react-native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { signInWithEmailPassword } from "../firebase/firebaseConfig"; // Import the sign-in function

const SignIn = () => {
  const navigation = useNavigation();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); // For displaying messages (error or success)


  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSignIn = async () => {
    try {
      setMessage(""); // Clear any previous messages

      // Attempt to sign in
      await signInWithEmailPassword(email, password);

      // Show success message before navigating
      setMessage("Successfully signed in!");

      // Navigate to HomeScreen after a small delay to show the message
      setTimeout(() => {
        navigation.navigate("HomeScreen");
      }, 1000); // Adjust delay as needed (1 second in this case)
    } catch (error) {
      // Show error message if the sign-in fails
      setMessage("Invalid credentials");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trai-Film</Text>
      <Text style={styles.subtitle}>Sign in to your account</Text>

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

      {/* Show success or error message */}
      {message ? (
        <Text
          style={
            message === "Successfully signed in!"
              ? styles.successText
              : styles.errorText
          }
        >
          {message}
        </Text>
      ) : null}

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
        <TouchableOpacity
          onPress={togglePasswordVisibility}
          style={styles.eyeIcon}
        >
          <Ionicons
            name={passwordVisible ? "eye-off" : "eye"}
            size={20}
            color="rgba(255, 255, 255, 0.7)"
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={() =>
          Linking.openURL("https://www.example.com/forgot-password")
        }
        style={styles.fpContainer}
      >
        <Text style={styles.forgotP}>Forgot Password?</Text>
      </TouchableOpacity>

   

      <TouchableOpacity
        onPress={handleSignIn}
        style={[styles.signInButton]} // Disable button if not checked
      >
        <Text style={styles.signInText}>Sign In</Text>
      </TouchableOpacity>

      <View style={styles.signup}>
        <Text style={styles.signupText}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <Text style={styles.signUp}>Sign Up</Text>
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

  fpContainer: {
    alignSelf: "flex-end",
    marginTop: 5,
    marginBottom: 5,
    marginRight: 10,
  },

  forgotP: {
    fontFamily: "Roboto-Bold",
    color: "#FFFFFF",
    fontSize: 15,
    left : 5,
  },

  signInButton: {
    backgroundColor: "#FFFFFF",
    width: 318,
    height: 45,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },

  signInText: {
    color: "#000000",
    fontSize: 20,
    fontFamily: "Roboto-Bold",
  },

  signup: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },

  signupText: {
    fontFamily: "Roboto-Regular",
    fontSize: 15,
    color: "#FFFFFF",
  },

  signUp: {
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

  successText: {
    color: "#FF9500",
    fontSize: 16,
    marginBottom: 10,
  },


});

export default SignIn;
