import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Modal,
  TouchableOpacity,
} from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import Icon from "react-native-vector-icons/FontAwesome";
import { Video } from "expo-av";
import { useCustomFonts } from "./font";

const Horror = () => {
  const [horror, sethorror] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentVideoUrl, setCurrentVideoUrl] = useState("");
  const [currentTitle, setCurrentTitle] = useState("");
  const [currentDescription, setCurrentDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const fontsLoaded = useCustomFonts();

  useEffect(() => {
    const fetchHorror = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "horror"));
        const fetchedHorror = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        sethorror(fetchedHorror);
      } catch (error) {
        console.error("Error fetching horror:", error);
      }
    };

    fetchHorror();
  }, []);

  const handleSlidePress = (videoUrl, title, description) => {
    if (videoUrl) {
      setCurrentVideoUrl(videoUrl);
      setCurrentTitle(title);
      setCurrentDescription(description);
      setModalVisible(true);
      setIsLoading(true);
    }
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setCurrentVideoUrl("");
    setCurrentTitle("");
    setCurrentDescription("");
  };

  const handleFullScreen = (status) => {
    console.log("Fullscreen status:", status);
  };

  if (!fontsLoaded) {
    return (
      <View>
        <Text>Loading Fonts...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Horror</Text>
      <ScrollView horizontal>
        {horror.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.card}
            onPress={() =>
              handleSlidePress(item.videoUrl, item.title, item.description)
            }
          >
            <Image source={{ uri: item.imageUrl }} style={styles.image} />
            <Text
              style={styles.cardTitle}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {item.title}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Modal for details */}
      <Modal
        visible={modalVisible}
        onRequestClose={handleCloseModal}
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalBackdrop} />
          <View style={styles.modalContent}>
            <TouchableOpacity
              onPress={handleCloseModal}
              style={styles.arrowButton}
            >
              <Icon name="arrow-left" size={19} color="#FFFFFF" />
            </TouchableOpacity>
            <Video
              source={{ uri: currentVideoUrl }}
              style={styles.videoPlayer}
              useNativeControls={true}
              resizeMode="cover"
              shouldPlay={true}
              onFullscreenUpdate={handleFullScreen}
              onLoadStart={() => setIsLoading(true)}
              onLoad={() => setIsLoading(false)}
            />
            <Text style={styles.modalTitle}>{currentTitle}</Text>
            <Text style={styles.modalDescription}>{currentDescription}</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },

  title: {
    fontSize: 30,
    color: "#FFFFFF",
    fontFamily: "Roboto-Bold",
    marginBottom: 10,
  },

  card: {
    marginRight: 10,
    alignItems: "center",
  },

  image: {
    width: 120,
    height: 180,
    borderRadius: 10,
  },

  cardTitle: {
    fontFamily: "Roboto-Bold",
    marginTop: 5,
    fontSize: 14,
    color: "#FFFFFF",
    textAlign: "left",
    width: 120,
  },

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.95)", // Semi-transparent backdrop
  },

  modalContent: {
    width: "90%",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    padding: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  videoPlayer: {
    width: "105%",
    height: 200,
    borderRadius: 10,
  },

  modalTitle: {
    fontSize: 22,
    fontFamily: "Roboto-Bold",
    color: "#FFFFFF",
    textAlign: "left",
    marginVertical: 10,
    width: "94%",
  },

  modalDescription: {
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    color: "#CCCCCC",
    textAlign: "left",
    paddingHorizontal: 10,
    width: "100%",
  },

  arrowButton: {
    position: "absolute",
    top: 10,
    left: 10,
    zIndex: 1,
    padding: 10,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 50,
  },
});

export default Horror;
