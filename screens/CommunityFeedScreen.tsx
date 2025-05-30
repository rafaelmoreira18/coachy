import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import FloatingActionButton from '../components/FloatingActionButton';

const { width } = Dimensions.get('window');

interface Comment {
  id: string;
  user: string;
  text: string;
  timestamp: string;
}

interface Post {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  content: string;
  image?: string;
  likes: number;
  comments: Comment[];
  timestamp: string;
  category: 'Diet' | 'Workout' | 'Tips' | 'Question';
}

const INITIAL_POSTS: Post[] = [
  {
    id: '1',
    user: {
      name: 'Maria Silva',
      avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    },
    content: 'Minha refeição pré-treino de hoje! 🍎\nOvos mexidos, aveia com banana e café preto. Alguém mais tem essa rotina?',
    image: 'https://images.unsplash.com/photo-1494390248081-4e521a5940db',
    likes: 24,
    comments: [
      {
        id: '1',
        user: 'João',
        text: 'Ótima escolha! Eu adiciono whey protein na aveia também.',
        timestamp: '2h atrás',
      }
    ],
    timestamp: '3h atrás',
    category: 'Diet',
  },
  {
    id: '2',
    user: {
      name: 'Carlos Mendes',
      avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
    },
    content: 'Dica do dia: Para quem está começando, não precisa cortar 100% dos carboidratos! Foquem em reduzir açúcares refinados e aumentar o consumo de fibras. Quem concorda? 💪',
    likes: 45,
    comments: [
      {
        id: '2',
        user: 'Ana',
        text: 'Exatamente! Equilíbrio é tudo.',
        timestamp: '1h atrás',
      }
    ],
    timestamp: '5h atrás',
    category: 'Tips',
  },
  {
    id: '3',
    user: {
      name: 'Amanda Costa',
      avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
    },
    content: 'Alguém tem sugestões de lanches saudáveis para levar para o trabalho? Preciso de ideias! 🤔',
    likes: 12,
    comments: [
      {
        id: '3',
        user: 'Pedro',
        text: 'Iogurte grego com granola e frutas é prático e nutritivo!',
        timestamp: '30min atrás',
      }
    ],
    timestamp: '6h atrás',
    category: 'Question',
  },
];

const PostCard = ({ post }: { post: Post }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleComment = () => {
    if (newComment.trim()) {
      // Aqui você adicionaria a lógica para salvar o comentário
      setNewComment('');
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Image source={{ uri: post.user.avatar }} style={styles.avatar} />
          <View>
            <Text style={styles.userName}>{post.user.name}</Text>
            <Text style={styles.timestamp}>{post.timestamp}</Text>
          </View>
        </View>
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{post.category}</Text>
        </View>
      </View>

      <Text style={styles.content}>{post.content}</Text>

      {post.image && (
        <Image
          source={{ uri: post.image }}
          style={styles.postImage}
          resizeMode="cover"
        />
      )}

      <View style={styles.interactions}>
        <TouchableOpacity style={styles.interactionButton} onPress={handleLike}>
          <Ionicons
            name={isLiked ? 'heart' : 'heart-outline'}
            size={24}
            color={isLiked ? '#00b4b4' : '#b2e4e4'}
          />
          <Text style={styles.interactionText}>
            {post.likes + (isLiked ? 1 : 0)}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.interactionButton}
          onPress={() => setShowComments(!showComments)}
        >
          <Ionicons name="chatbubble-outline" size={22} color="#b2e4e4" />
          <Text style={styles.interactionText}>{post.comments.length}</Text>
        </TouchableOpacity>
      </View>

      {showComments && (
        <View style={styles.commentsSection}>
          {post.comments.map((comment) => (
            <View key={comment.id} style={styles.commentItem}>
              <Text style={styles.commentUser}>{comment.user}</Text>
              <Text style={styles.commentText}>{comment.text}</Text>
              <Text style={styles.commentTimestamp}>{comment.timestamp}</Text>
            </View>
          ))}

          <View style={styles.commentInput}>
            <TextInput
              style={styles.input}
              placeholder="Adicione um comentário..."
              placeholderTextColor="#b2e4e4"
              value={newComment}
              onChangeText={setNewComment}
            />
            <TouchableOpacity
              style={styles.sendButton}
              onPress={handleComment}
            >
              <Ionicons name="send" size={20} color="#00b4b4" />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default function CommunityFeedScreen({ navigation }: any) {
  const handleNewPost = () => {
    navigation.navigate('CreatePost');
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={INITIAL_POSTS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PostCard post={item} />}
        showsVerticalScrollIndicator={false}
      />
      <FloatingActionButton onPress={handleNewPost} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#16213e',
    paddingTop: 40,
  },
  card: {
    backgroundColor: '#1b2a49',
    borderRadius: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  header: {
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
  userName: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  timestamp: {
    color: '#b2e4e4',
    fontSize: 12,
  },
  categoryBadge: {
    backgroundColor: '#00b4b4',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  content: {
    color: '#b2e4e4',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 12,
  },
  interactions: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: 'rgba(178, 228, 228, 0.1)',
    paddingTop: 12,
  },
  interactionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
  interactionText: {
    color: '#b2e4e4',
    marginLeft: 6,
    fontSize: 14,
  },
  commentsSection: {
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(178, 228, 228, 0.1)',
    paddingTop: 12,
  },
  commentItem: {
    marginBottom: 12,
  },
  commentUser: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  commentText: {
    color: '#b2e4e4',
    fontSize: 14,
  },
  commentTimestamp: {
    color: '#b2e4e4',
    fontSize: 12,
    marginTop: 2,
  },
  commentInput: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  input: {
    flex: 1,
    backgroundColor: '#16213e',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    color: '#b2e4e4',
    marginRight: 8,
  },
  sendButton: {
    padding: 8,
  },
}); 