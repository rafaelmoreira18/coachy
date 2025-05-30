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
          <Ionicons name="grid-outline" size={24} color="#00b4b4" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.gridTab}>
          <Ionicons name="person-outline" size={24} color="#b2e4e4" />
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
    backgroundColor: '#16213e',
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#1b2a49',
    marginHorizontal: 10,
    marginTop: 10,
    borderRadius: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#00b4b4',
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
    color: '#fff',
  },
  statLabel: {
    color: '#b2e4e4',
    fontSize: 12,
  },
  bioSection: {
    paddingHorizontal: 20,
    marginTop: 15,
  },
  username: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#fff',
    marginBottom: 4,
  },
  bio: {
    color: '#b2e4e4',
  },
  editButton: {
    margin: 20,
    padding: 12,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#00b4b4',
    alignItems: 'center',
    backgroundColor: '#1b2a49',
  },
  editButtonText: {
    fontWeight: '600',
    color: '#fff',
  },
  gridHeader: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#1b2a49',
    backgroundColor: '#1b2a49',
    marginTop: 10,
  },
  gridTab: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#1b2a49',
  },
  activeTab: {
    borderBottomColor: '#00b4b4',
  },
  gridImage: {
    width: tileSize,
    height: tileSize,
    margin: 1,
    borderRadius: 8,
  },
});

export default ProfileScreen; 