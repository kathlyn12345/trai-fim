import React, { useState, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Modal,
  Text,
  ScrollView,
  TextInput,
  Platform, 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SlideShow from '../components/Slide';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { Video } from 'expo-av';
import Recommendation from '../components/Recommendation';
import Action from '../components/Action';
import Horror from '../components/Horror';
import Fantasy from '../components/Fantasy';
import Thriller from '../components/Thriller'; 
import Drama from '../components/Drama';
import Sidebar from '../components/SideBar';
import { getDatabase, ref, onValue, off } from 'firebase/database';

const HomeScreen = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [slides, setSlides] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchModalVisible, setSearchModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isPaused, setIsPaused] = useState(false);
  const [videoStatusText, setVideoStatusText] = useState('');
  const [currentVideoUrl, setCurrentVideoUrl] = useState('');
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);  // State for search bar expansion

  // Fetch slide data from Firestore
  const fetchSlides = async () => {
    try {
      const q = query(collection(db, 'slides'), orderBy('order'));
      const querySnapshot = await getDocs(q);
      const fetchedSlides = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSlides(fetchedSlides);
    } catch (error) {
      console.error('Error fetching slides:', error);
    }
  };

  // Firebase Realtime Database listener
  useEffect(() => {
    const db = getDatabase();
    const testRef = ref(db, '/test');
    
    const listener = onValue(testRef, (snapshot) => {
      const data = snapshot.val();
      console.log('Received data from Firebase:', data);

      if (data === 1 && isPaused) {
        setIsPaused(false);
        setVideoStatusText('Video Resumed');
      } else if (data === 0 && !isPaused) {
        setIsPaused(true);
        setVideoStatusText('Video Paused');
      } else if (data !== 0 && data !== 1) {
        console.warn('Unexpected Firebase value:', data);
      }
    });

    fetchSlides();

    return () => {
      off(testRef);
    };
  }, [isPaused]);

  const toggleSidebar = () => {
    setSidebarVisible((prev) => !prev);
  };

  const handleSlidePress = (videoUrl) => {
    if (videoUrl) {
      setCurrentVideoUrl(videoUrl);
      setModalVisible(true);
    }
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setCurrentVideoUrl('');
    setVideoStatusText('');
  };

  const toggleSearch = () => {
    setIsSearchExpanded(!isSearchExpanded);  // Toggle search bar expansion
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 0 }} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity onPress={toggleSidebar}>
            {sidebarVisible ? (
              <Ionicons name="close" size={30} color="#FFFFFF" />
            ) : (
              <Ionicons name="menu" size={30} color="#FFFFFF" />
            )}
          </TouchableOpacity>
          
          {/* Search Bar (Visible only when expanded) */}
          {isSearchExpanded && (
            <TextInput
              style={styles.searchInput}
              placeholder="Search..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor="#AAAAAA"
            />
          )}

          {/* Search Icon */}
          <TouchableOpacity onPress={toggleSearch} style={styles.searchIconContainer}>
            <Ionicons name="search" size={30} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          {slides.length > 0 && (
            <>
              <SlideShow slides={slides} onSlidePress={handleSlidePress} />
              <Recommendation />
              <Action />
              <Horror />
              <Fantasy />
              <Thriller />
              <Drama />
            </>
          )}
        </View>

        {/* Video Modal */}
        <Modal visible={modalVisible} onRequestClose={handleCloseModal} transparent={true}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              {Platform.OS !== 'web' && (
                <Video
                  source={{ uri: currentVideoUrl }}
                  style={styles.videoPlayer}
                  useNativeControls={true}
                  resizeMode="cover"
                  shouldPlay={!isPaused}
                  onPlaybackStatusUpdate={(status) => {
                    if (status.isPlaying !== !isPaused) {
                      setIsPaused(status.isPlaying ? false : true);
                    }
                  }}
                />
              )}
              <Text style={styles.videoStatusText}>{videoStatusText}</Text>
            </View>
          </View>
        </Modal>
      </ScrollView>

      {/* Sidebar component */}
      <Sidebar isVisible={sidebarVisible} onClose={() => setSidebarVisible(false)} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#000000',
    zIndex: 2,
  },
  content: {
    flex: 1,
    backgroundColor: '#000000',
  },
  searchInput: {
    flex: 1,
    fontSize: 18,
    padding: 10,
    borderColor: '#CCCCCC', // Color for the border
    borderWidth: 1,
    borderRadius: 5,
    marginLeft: 10,  // Spacing between icon and input
    backgroundColor: '#FFFFFF', // Matching your UI color
    color: '#000000',  // Text color inside the search bar
  },
  searchIconContainer: {
    paddingLeft: 10, // Padding between search icon and the border
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    width: '90%',
    height: '80%',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoPlayer: {
    width: '100%',
    height: '100%',
  },
  videoStatusText: {
    position: 'absolute',
    bottom: 20,
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default HomeScreen;
