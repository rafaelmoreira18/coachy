import React from 'react';
import { View, FlatList, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Post {
  id: string;
  user: string;
  userImage: string;
  image: string;
  likes: number;
  caption: string;
  comments: number;
}

const DUMMY_POSTS: Post[] = [
  {
    id: '1',
    user: 'john_doe',
    userImage: 'https://randomuser.me/api/portraits/men/1.jpg',
    image: 'https://picsum.photos/id/1/500/500',
    likes: 234,
    caption: 'Beautiful day! 🌞',
    comments: 15,
  },
  {
    id: '2',
    user: 'jane_smith',
    userImage: 'https://randomuser.me/api/portraits/women/1.jpg',
    image: 'https://picsum.photos/id/2/500/500',
    likes: 456,
    caption: 'Living my best life ✨',
    comments: 32,
  },
];

const FeedScreen = () => {
  const renderPost = ({ item }: { item: Post }) => (
    <View style={styles.post}>
      <View style={styles.postHeader}>
        <View style={styles.userInfo}>
          <Image source={{ uri: item.userImage }} style={styles.userImage} />
          <Text style={styles.username}>{item.user}</Text>
        </View>
        <TouchableOpacity>
          <Ionicons name="ellipsis-horizontal" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <Image source={{ uri: item.image }} style={styles.postImage} />

      <View style={styles.postActions}>
        <View style={styles.leftActions}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="heart-outline" size={28} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="chatbubble-outline" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="paper-plane-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <Ionicons name="bookmark-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.postFooter}>
        <Text style={styles.likes}>{item.likes} likes</Text>
        <View style={styles.captionContainer}>
          <Text style={styles.username}>{item.user}</Text>
          <Text style={styles.caption}>{item.caption}</Text>
        </View>
        <TouchableOpacity>
          <Text style={styles.comments}>View all {item.comments} comments</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={DUMMY_POSTS}
        renderItem={renderPost}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  post: {
    marginBottom: 15,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 10,
  },
  username: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  postImage: {
    width: '100%',
    height: 400,
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
  },
  leftActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    marginRight: 16,
  },
  postFooter: {
    paddingHorizontal: 12,
  },
  likes: {
    fontWeight: 'bold',
    marginBottom: 6,
  },
  captionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  caption: {
    marginLeft: 5,
  },
  comments: {
    color: '#666',
    marginTop: 6,
    marginBottom: 8,
  },
});

export default FeedScreen; 