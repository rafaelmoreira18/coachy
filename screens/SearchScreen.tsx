import React from 'react';
import { View, TextInput, FlatList, Image, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const DUMMY_IMAGES = Array.from({ length: 15 }, (_, i) => ({
  id: String(i + 1),
  image: `https://picsum.photos/id/${i + 10}/300/300`,
}));

const numColumns = 3;
const screenWidth = Dimensions.get('window').width;
const tileSize = screenWidth / numColumns;

const SearchScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor="#666"
        />
      </View>
      <FlatList
        data={DUMMY_IMAGES}
        renderItem={({ item }) => (
          <Image
            source={{ uri: item.image }}
            style={styles.image}
          />
        )}
        keyExtractor={(item) => item.id}
        numColumns={numColumns}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    margin: 10,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  image: {
    width: tileSize,
    height: tileSize,
  },
});

export default SearchScreen; 