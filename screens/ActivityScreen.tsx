import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Activity {
  id: string;
  user: {
    username: string;
    avatar: string;
  };
  type: 'follow' | 'like' | 'comment';
  content?: string;
  timestamp: string;
  postImage?: string;
}

const DUMMY_ACTIVITIES: Activity[] = [
  {
    id: '1',
    user: {
      username: 'jane_smith',
      avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    },
    type: 'follow',
    timestamp: '2h',
  },
  {
    id: '2',
    user: {
      username: 'mike_wilson',
      avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
    },
    type: 'like',
    timestamp: '4h',
    postImage: 'https://picsum.photos/id/42/300/300',
  },
  {
    id: '3',
    user: {
      username: 'sarah_parker',
      avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
    },
    type: 'comment',
    content: 'Amazing shot! 🔥',
    timestamp: '6h',
    postImage: 'https://picsum.photos/id/43/300/300',
  },
];

const ActivityScreen = () => {
  const renderActivity = ({ item }: { item: Activity }) => {
    const getActivityText = () => {
      switch (item.type) {
        case 'follow':
          return 'started following you';
        case 'like':
          return 'liked your post';
        case 'comment':
          return `commented: ${item.content}`;
        default:
          return '';
      }
    };

    return (
      <TouchableOpacity style={styles.activityItem}>
        <Image source={{ uri: item.user.avatar }} style={styles.avatar} />
        <View style={styles.activityContent}>
          <Text style={styles.activityText}>
            <Text style={styles.username}>{item.user.username}</Text>
            {' '}{getActivityText()}
          </Text>
          <Text style={styles.timestamp}>{item.timestamp}</Text>
        </View>
        {item.postImage && (
          <Image source={{ uri: item.postImage }} style={styles.postImage} />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Activity</Text>
      </View>
      <FlatList
        data={DUMMY_ACTIVITIES}
        renderItem={renderActivity}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
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
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#1b2a49',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  activityItem: {
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#1b2a49',
    backgroundColor: '#1b2a49',
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 12,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 12,
    borderWidth: 2,
    borderColor: '#00b4b4',
  },
  activityContent: {
    flex: 1,
    marginRight: 10,
  },
  activityText: {
    fontSize: 14,
    color: '#b2e4e4',
    flexWrap: 'wrap',
  },
  username: {
    fontWeight: 'bold',
    color: '#fff',
  },
  timestamp: {
    fontSize: 12,
    color: '#b2e4e4',
    marginTop: 4,
  },
  postImage: {
    width: 44,
    height: 44,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#00b4b4',
  },
});

export default ActivityScreen; 