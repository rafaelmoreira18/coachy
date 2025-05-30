import React, { useState, useRef } from 'react';
import { View, Text, Image, StyleSheet, FlatList, ScrollView, Dimensions, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const { width } = Dimensions.get('window');
const CARD_PADDING = 16;
const CARD_WIDTH = width - (CARD_PADDING * 2);
const IMAGE_WIDTH = CARD_WIDTH * 0.8; // 80% da largura do card
const IMAGE_MARGIN = 8;

interface Trainer {
  id: string;
  name: string;
  specialty: string;
  avatar: string;
  bio: string;
  rating: number;
  price: string;
  photos: string[];
  certifications: string[];
}

const TRAINERS: Trainer[] = [
  {
    id: '1',
    name: 'Jake Wilson',
    specialty: 'Musculação e Força',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    bio: 'Especialista em treinamento de força e hipertrofia. 8 anos de experiência.',
    rating: 4.9,
    price: 'R$120/hora',
    photos: [
      'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b',
      'https://images.unsplash.com/photo-1546483875-ad9014c88eba',
      'https://images.unsplash.com/photo-1574680096145-d05b474e2155',
    ],
    certifications: ['CREF', 'Especialização em Treinamento Funcional', 'Nutrição Esportiva'],
  },
  {
    id: '2',
    name: 'Sarah Parker',
    specialty: 'Pilates e Yoga',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    bio: 'Instrutora de Pilates e Yoga com foco em bem-estar e postura.',
    rating: 4.8,
    price: 'R$100/hora',
    photos: [
      'https://images.unsplash.com/photo-1599447421416-3414500d18a5',
      'https://images.unsplash.com/photo-1603988363607-e1e4a66962c6',
      'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f',
    ],
    certifications: ['Pilates Clássico', 'Yoga Alliance', 'Especialização em Alongamento'],
  },
  {
    id: '3',
    name: 'Daniel Costa',
    specialty: 'Perda de Peso',
    avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
    bio: 'Especialista em emagrecimento e mudança de estilo de vida.',
    rating: 4.7,
    price: 'R$90/hora',
    photos: [
      'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5',
      'https://images.unsplash.com/photo-1605296867304-46d5465a13f1',
      'https://images.unsplash.com/photo-1536922246289-88c42f957773',
    ],
    certifications: ['CREF', 'Nutrição Esportiva', 'Treinamento HIIT'],
  },
  {
    id: '4',
    name: 'Amanda Silva',
    specialty: 'Treino Funcional',
    avatar: 'https://randomuser.me/api/portraits/women/28.jpg',
    bio: 'Personal trainer especializada em treinamento funcional e CrossFit.',
    rating: 4.9,
    price: 'R$110/hora',
    photos: [
      'https://images.unsplash.com/photo-1534258936925-c58bed479fcb',
      'https://images.unsplash.com/photo-1549576490-b0b4831ef60a',
      'https://images.unsplash.com/photo-1518611012118-696072aa579a',
    ],
    certifications: ['CrossFit L2', 'Treinamento Funcional', 'Primeiros Socorros'],
  },
  {
    id: '5',
    name: 'Ricardo Santos',
    specialty: 'Reabilitação',
    avatar: 'https://randomuser.me/api/portraits/men/56.jpg',
    bio: 'Fisioterapeuta e personal trainer focado em reabilitação e prevenção.',
    rating: 5.0,
    price: 'R$150/hora',
    photos: [
      'https://images.unsplash.com/photo-1576678927484-cc907957088c',
      'https://images.unsplash.com/photo-1597452485669-2c7bb5fef90d',
      'https://images.unsplash.com/photo-1579126038374-6064e9370f0f',
    ],
    certifications: ['Fisioterapia', 'Especialização em Reabilitação', 'RPG'],
  },
];

const TrainerCard = ({ trainer }: { trainer: Trainer }) => {
  const navigation = useNavigation<NavigationProp>();
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  const handleScroll = (event: any) => {
    const slideSize = IMAGE_WIDTH + (IMAGE_MARGIN * 2);
    const offset = event.nativeEvent.contentOffset.x;
    const activeIndex = Math.round(offset / slideSize);
    setActiveIndex(activeIndex);
  };

  const getItemLayout = (data: any, index: number) => ({
    length: IMAGE_WIDTH + (IMAGE_MARGIN * 2),
    offset: (IMAGE_WIDTH + (IMAGE_MARGIN * 2)) * index,
    index,
  });

  const handleSchedulePress = () => {
    Alert.alert('Debug', 'Tentando navegar para a tela de agendamento...');
    try {
      navigation.navigate('ScheduleTraining', {
        trainer: {
          name: trainer.name,
          specialty: trainer.specialty,
          price: trainer.price
        }
      });
    } catch (error) {
      Alert.alert('Erro', 'Erro ao tentar navegar: ' + (error as Error).message);
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Image source={{ uri: trainer.avatar }} style={styles.avatar} />
          <View style={styles.trainerInfo}>
            <Text style={styles.name}>{trainer.name}</Text>
            <Text style={styles.specialty}>{trainer.specialty}</Text>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={16} color="#00b4b4" />
              <Text style={styles.rating}>{trainer.rating}</Text>
            </View>
          </View>
        </View>
        <Text style={styles.price}>{trainer.price}</Text>
      </View>

      <Text style={styles.bio}>{trainer.bio}</Text>

      <View style={styles.carouselContainer}>
        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          decelerationRate="fast"
          snapToInterval={IMAGE_WIDTH + (IMAGE_MARGIN * 2)}
          snapToAlignment="center"
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.carouselContent}
          onMomentumScrollEnd={handleScroll}
        >
          {trainer.photos.map((photo, index) => (
            <View key={index} style={styles.imageContainer}>
              <Image
                source={{ uri: photo }}
                style={styles.carouselImage}
              />
            </View>
          ))}
        </ScrollView>
        <View style={styles.pagination}>
          {trainer.photos.map((_, index) => (
            <View
              key={index}
              style={[
                styles.paginationDot,
                index === activeIndex && styles.paginationDotActive,
              ]}
            />
          ))}
        </View>
      </View>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        style={styles.certificationsContainer}
      >
        {trainer.certifications.map((cert, index) => (
          <View key={index} style={styles.certificationBadge}>
            <Text style={styles.certificationText}>{cert}</Text>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity
        style={styles.trainButton}
        onPress={handleSchedulePress}
        activeOpacity={0.7}
      >
        <Text style={styles.trainButtonText}>Agendar Treino</Text>
      </TouchableOpacity>
    </View>
  );
};

export default function FeedScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={TRAINERS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TrainerCard trainer={item} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#16213e',
    paddingTop: 40,
    paddingHorizontal: 8,
  },
  card: {
    backgroundColor: '#1b2a49',
    borderRadius: 20,
    marginBottom: 24,
    padding: CARD_PADDING,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 12,
    borderWidth: 2,
    borderColor: '#00b4b4',
  },
  trainerInfo: {
    flex: 1,
  },
  name: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  specialty: {
    color: '#b2e4e4',
    fontSize: 14,
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    color: '#b2e4e4',
    marginLeft: 4,
    fontSize: 14,
  },
  price: {
    color: '#00b4b4',
    fontWeight: 'bold',
    fontSize: 16,
  },
  carouselContainer: {
    position: 'relative',
    marginVertical: 12,
  },
  carouselContent: {
    paddingHorizontal: (CARD_WIDTH - IMAGE_WIDTH) / 2 - IMAGE_MARGIN,
  },
  imageContainer: {
    width: IMAGE_WIDTH,
    marginHorizontal: IMAGE_MARGIN,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  carouselImage: {
    width: IMAGE_WIDTH,
    height: 300,
    borderRadius: 16,
    backgroundColor: '#222',
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 12,
    alignSelf: 'center',
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: '#00b4b4',
  },
  bio: {
    color: '#b2e4e4',
    fontSize: 14,
    marginVertical: 12,
    lineHeight: 20,
  },
  certificationsContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  certificationBadge: {
    backgroundColor: '#16213e',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#00b4b4',
  },
  certificationText: {
    color: '#b2e4e4',
    fontSize: 12,
  },
  trainButton: {
    backgroundColor: '#00b4b4',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
    shadowColor: '#00b4b4',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
    marginTop: 16,
  },
  trainButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
}); 