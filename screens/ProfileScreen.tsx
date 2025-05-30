import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const DUMMY_USER = {
  username: 'john_doe',
  name: 'John Doe',
  avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
  posts: 42,
  followers: 1234,
  following: 567,
  bio: 'Living life one photo at a time 📸\nTravel enthusiast 🌎\nFood lover 🍕',
};

const DUMMY_POSTS = Array.from({ length: 12 }, (_, i) => ({
  id: String(i + 1),
  image: `https://picsum.photos/id/${i + 20}/300/300`,
}));

const numColumns = 3;
const screenWidth = Dimensions.get('window').width;
const tileSize = screenWidth / numColumns;

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: DUMMY_USER.avatar }} style={styles.avatar} />
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{DUMMY_USER.posts}</Text>
            <Text style={styles.statLabel}>Posts</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{DUMMY_USER.followers}</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{DUMMY_USER.following}</Text>
            <Text style={styles.statLabel}>Following</Text>
          </View>
        </View>
      </View>

      <View style={styles.bioSection}>
        <Text style={styles.username}>{DUMMY_USER.name}</Text>
        <Text style={styles.bio}>{DUMMY_USER.bio}</Text>
      </View>

      <TouchableOpacity style={styles.editButton}>
        <Text style={styles.editButtonText}>Edit Profile</Text>
      </TouchableOpacity>

      <View style={styles.gridHeader}>
        <TouchableOpacity style={[styles.gridTab, styles.activeTab]}>
          <Ionicons name="grid-outline" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.gridTab}>
          <Ionicons name="person-outline" size={24} color="#666" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={DUMMY_POSTS}
        renderItem={({ item }) => (
          <Image source={{ uri: item.image }} style={styles.gridImage} />
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
  header: {
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  statsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginLeft: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statLabel: {
    color: '#666',
    fontSize: 12,
  },
  bioSection: {
    paddingHorizontal: 20,
  },
  username: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  bio: {
    color: '#262626',
  },
  editButton: {
    margin: 20,
    padding: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#dbdbdb',
    alignItems: 'center',
  },
  editButtonText: {
    fontWeight: '600',
  },
  gridHeader: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#dbdbdb',
  },
  gridTab: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#dbdbdb',
  },
  activeTab: {
    borderBottomColor: '#262626',
  },
  gridImage: {
    width: tileSize,
    height: tileSize,
    borderWidth: 0.5,
    borderColor: '#fff',
  },
});

export default ProfileScreen; 