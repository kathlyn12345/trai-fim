import React from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const AboutUsScreen = () => {
  const navigation = useNavigation();

  // List of developers with names and roles
  const developers = [
    { id: '1', name: 'Kath Puyat gods', role: 'Team Leader' },
    { id: '2', name: 'Nads Mamaw', role: 'UI/UX Designer' },
    { id: '3', name: 'Ralph Lutang', role: 'Backend Developer' },
    { id: '4', name: 'Solsona FullStack', role: 'Frontend Developer' },
    { id: '5', name: 'Avenido asawa ni polizon', role: 'Database Manager' },
    { id: '6', name: 'Sophia Brown', role: 'Quality Assurance' },
    { id: '7', name: 'David Wilson', role: 'Mobile Developer' },
  ];

  const fadeAnim = new Animated.Value(0);

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <ScrollView style={styles.container}>
      {/* Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
          <Ionicons name="arrow-back" size={30} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>About Us</Text>
      </View>

      {/* Description Section */}
      <Text style={styles.description}>
        We are a group of seven passionate developers collaborating to bring this application to life. 
        Each member has contributed their unique expertise to make this app a success.
      </Text>

      {/* Developer List with Animation */}
      <Animated.View style={[styles.listContainer, { opacity: fadeAnim }]}>
        <FlatList
          data={developers}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Ionicons name="person-circle" size={60} color="#6200ee" style={styles.icon} />
              <View style={styles.info}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.role}>{item.role}</Text>
              </View>
            </View>
          )}
        />
      </Animated.View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1f1f1f', // Dark background for modern look
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: 'transparent',
    paddingVertical: 15,
    borderRadius: 30,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  headerText: {
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 15,
    letterSpacing: 1.5,
  },
  description: {
    fontSize: 16,
    color: '#ddd',
    marginBottom: 30,
    textAlign: 'center',
    fontStyle: 'italic',
    lineHeight: 24,
    letterSpacing: 0.5,
  },
  listContainer: {
    paddingBottom: 20,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2d2d2d',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
    transform: [{ scale: 1 }],
    transition: 'transform 0.3s ease',
  },
  cardHovered: {
    transform: [{ scale: 1.05 }],
  },
  icon: {
    marginRight: 20,
    borderRadius: 30,
    backgroundColor: '#6200ee',
    padding: 10,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    color: 'white',
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  role: {
    fontSize: 16,
    color: '#bbb',
    fontStyle: 'italic',
    letterSpacing: 0.5,
  },
});

export default AboutUsScreen;
