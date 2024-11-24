import React, { useState } from "react";
import { TextInput, View, StyleSheet, Text } from "react-native";

const SearchBar = ({ searchTerm, onSearch, onClose }) => {
  return (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search movie titles"
        placeholderTextColor="#CCCCCC"
        value={searchTerm}
        onChangeText={onSearch}
      />
      <View style={styles.closeIcon} onTouchEnd={onClose}>
        <Text style={styles.closeText}>X</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    backgroundColor: "#333333",
    padding: 10,
    borderRadius: 5,
    margin: 15,
  },
  searchInput: {
    flex: 1,
    color: "#FFFFFF",
    paddingLeft: 10,
    fontSize: 16,
  },
  closeIcon: {
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
  },
  closeText: {
    color: "#FFFFFF",
    fontSize: 18,
  },
});

export default SearchBar;
