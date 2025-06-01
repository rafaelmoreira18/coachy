import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

interface Post {
  id: string;
  user: {
    name: string;
    avatar: string;
    type: 'trainer' | 'student';
  };
  content: string;
  likes: number;
  comments: number;
  time: string;
  tags: string[];
}

const mockPosts: Post[] = [
  {
    id: '1',
    user: {
      name: 'Carlos Oliveira',
      avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
      type: 'student',
    },
    content: 'Alguém tem recomendações de personal trainer especializado em treino para corrida? Estou me preparando para uma maratona! 🏃‍♂️',
    likes: 15,
    comments: 8,
    time: '30min',
    tags: ['Corrida', 'Maratona', 'BuscaPersonal'],
  },
  {
    id: '2',
    user: {
      name: 'Ana Paula',
      avatar: 'https://randomuser.me/api/portraits/women/55.jpg',
      type: 'trainer',
    },
    content: 'Grupo de treino funcional aos sábados no Parque Villa-Lobos! Venham participar! 💪',
    likes: 42,
    comments: 12,
    time: '1h',
    tags: ['TreinoFuncional', 'VillaLobos', 'Sábado'],
  },
];

const CommunityPost = ({ post }: { post: Post }) => (
  <View style={styles.card}>
    <View style={styles.cardHeader}>
      <View style={styles.userInfo}>
        <Image
          source={{ uri: post.user.avatar }}
          style={styles.avatar}
        />
        <View>
          <View style={styles.nameContainer}>
            <Text style={styles.userName}>{post.user.name}</Text>
            {post.user.type === 'trainer' && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>Personal</Text>
              </View>
            )}
          </View>
          <Text style={styles.timeText}>{post.time}</Text>
        </View>
      </View>
      <TouchableOpacity>
        <Ionicons name="ellipsis-horizontal" size={24} color={colors.text.secondary} />
      </TouchableOpacity>
    </View>

    <Text style={styles.content}>{post.content}</Text>

    <View style={styles.tagsContainer}>
      {post.tags.map((tag, index) => (
        <TouchableOpacity key={index} style={styles.tag}>
          <Text style={styles.tagText}>#{tag}</Text>
        </TouchableOpacity>
      ))}
    </View>

    <View style={styles.cardFooter}>
      <View style={styles.footerActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="heart-outline" size={22} color={colors.text.secondary} />
          <Text style={styles.actionText}>{post.likes}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="chatbubble-outline" size={22} color={colors.text.secondary} />
          <Text style={styles.actionText}>{post.comments}</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.shareButton}>
        <Ionicons name="share-social-outline" size={22} color={colors.text.secondary} />
      </TouchableOpacity>
    </View>
  </View>
);

export default function CommunityScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={mockPosts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CommunityPost post={item} />}
        contentContainerStyle={styles.feedContainer}
        showsVerticalScrollIndicator={false}
      />
      <TouchableOpacity style={styles.fab}>
        <Ionicons name="create" size={24} color={colors.white} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  feedContainer: {
    padding: 16,
  },
  card: {
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
  },
  badge: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '500',
  },
  timeText: {
    fontSize: 14,
    color: colors.text.tertiary,
    marginTop: 2,
  },
  content: {
    fontSize: 15,
    color: colors.text.primary,
    lineHeight: 22,
    marginBottom: 12,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  tag: {
    backgroundColor: colors.surface,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  tagText: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  footerActions: {
    flexDirection: 'row',
    gap: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  actionText: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  shareButton: {
    padding: 4,
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: colors.text.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
}); 