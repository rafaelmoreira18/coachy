import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
  ListRenderItemInfo,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

import Modal from 'react-native-modal';
import { Calendar } from 'react-native-calendars';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native'; // Importe o useNavigation
 

const { width } = Dimensions.get('window');

interface Trainer {
  id: string;
  name: string;
  avatar: string;
  specialty: string;
  hourlyRate: number;
  rating: number;
  photos: string[];
  description: string;
  availability: string[];
}

const trainers: Trainer[] = [
  {
    id: '1',
    name: 'João Silva',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    specialty: 'Musculação',
    hourlyRate: 120,
    rating: 4.8,
    photos: [
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=600&fit=crop',
    ],
    description: 'Especialista em hipertrofia e força. 5 anos de experiência.',
    availability: ['Segunda', 'Quarta', 'Sexta'],
  },
  {
    id: '2',
    name: 'Maria Santos',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    specialty: 'Funcional',
    hourlyRate: 100,
    rating: 4.9,
    photos: [
      'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&h=600&fit=crop',
    ],
    description: 'Treinamento funcional e HIIT. Foco em resultados rápidos.',
    availability: ['Terça', 'Quinta', 'Sábado'],
  },
  {
    id: '3',
    name: 'Carlos Oliveira',
    avatar: 'https://randomuser.me/api/portraits/men/65.jpg',
    specialty: 'Crossfit',
    hourlyRate: 140,
    rating: 4.7,
    photos: [
      'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=600&fit=crop',
    ],
    description: 'Coach certificado em Crossfit. Treinos intensos e desafiadores.',
    availability: ['Segunda', 'Terça', 'Quinta', 'Sexta'],
  },
  {
    id: '4',
    name: 'Ana Paula',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    specialty: 'Yoga e Pilates',
    hourlyRate: 130,
    rating: 4.9,
    photos: [
      'https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1599447421416-3414500d18a5?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1601925260368-ae2f124d88f9?w=800&h=600&fit=crop',
    ],
    description: 'Instrutora certificada de Yoga e Pilates. Foco em bem-estar e flexibilidade.',
    availability: ['Segunda', 'Quarta', 'Sexta', 'Sábado'],
  },
  {
    id: '5',
    name: 'Ricardo Mendes',
    avatar: 'https://randomuser.me/api/portraits/men/92.jpg',
    specialty: 'Boxe e Muay Thai',
    hourlyRate: 150,
    rating: 4.8,
    photos: [
      'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1615117972428-28de87cf5d29?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1591117207239-788bf8de6c3b?w=800&h=600&fit=crop',
    ],
    description: 'Campeão estadual de Muay Thai. Aulas para iniciantes e avançados.',
    availability: ['Segunda', 'Terça', 'Quinta', 'Sexta', 'Sábado'],
  },
  {
    id: '6',
    name: 'Juliana Costa',
    avatar: 'https://randomuser.me/api/portraits/women/55.jpg',
    specialty: 'Dança e Zumba',
    hourlyRate: 90,
    rating: 4.9,
    photos: [
      'https://images.unsplash.com/photo-1524594152303-9fd13543fe6e?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1509773896068-7fd2f28dab1e?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1519925610903-381054cc2a1c?w=800&h=600&fit=crop',
    ],
    description: 'Professora de dança há 8 anos. Aulas divertidas e energéticas.',
    availability: ['Segunda', 'Quarta', 'Sexta', 'Sábado'],
  },
  {
    id: '7',
    name: 'Pedro Almeida',
    avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
    specialty: 'Natação',
    hourlyRate: 160,
    rating: 4.7,
    photos: [
      'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600965962102-9d260a71890d?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1438029071396-1e831a7fa6d8?w=800&h=600&fit=crop',
    ],
    description: 'Ex-atleta profissional. Aulas para todas as idades e níveis.',
    availability: ['Terça', 'Quinta', 'Sábado', 'Domingo'],
  },
  {
    id: '8',
    name: 'Fernanda Lima',
    avatar: 'https://randomuser.me/api/portraits/women/33.jpg',
    specialty: 'Treino para Gestantes',
    hourlyRate: 140,
    rating: 5.0,
    photos: [
      'https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=800&h=600&fit=crop',
    ],
    description: 'Especialista em exercícios para gestantes. Formação em fisioterapia.',
    availability: ['Segunda', 'Quarta', 'Sexta'],
  },
  {
    id: '9',
    name: 'Lucas Santos',
    avatar: 'https://randomuser.me/api/portraits/men/42.jpg',
    specialty: 'Treino para Idosos',
    hourlyRate: 130,
    rating: 4.9,
    photos: [
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&h=600&fit=crop',
    ],
    description: 'Especializado em exercícios para a terceira idade. Abordagem personalizada.',
    availability: ['Segunda', 'Terça', 'Quinta', 'Sexta'],
  },
  {
    id: '10',
    name: 'Beatriz Martins',
    avatar: 'https://randomuser.me/api/portraits/women/89.jpg',
    specialty: 'Reabilitação',
    hourlyRate: 170,
    rating: 4.8,
    photos: [
      'https://images.unsplash.com/photo-1576678927484-cc907957088c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1571388208497-dc88d28c14e4?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
    ],
    description: 'Fisioterapeuta e personal trainer. Especialista em reabilitação pós-lesão.',
    availability: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'],
  }
];

interface TrainerCardProps {
  trainer: Trainer;
  onPress: (trainer: Trainer) => void;
}

const TrainerCard: React.FC<TrainerCardProps> = ({ trainer, onPress }) => {
  const [showSchedule, setShowSchedule] = useState(false);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);

  const renderPhoto = ({ item }: ListRenderItemInfo<string>) => (
    <Image
      source={{ uri: item }}
      style={{
        width: width - 32,
        height: 300,
        resizeMode: 'cover',
      }}
    />
  );

  const handleSchedulePress = () => {
    setModalVisible(true);
  };

  const handleDateSelect = (day: any) => {
    setSelectedDate(day.dateString);
  };

  const handleTimeChange = (event: any, date?: Date) => {
    setShowTimePicker(false);
    if (date) {
      setSelectedTime(date);
    }
  };

  const handleConfirm = () => {
    if (selectedDate && selectedTime) {
      setModalVisible(false);
      // You can call a callback or show a toast here
      alert(`Aula agendada para ${selectedDate} às ${selectedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`);
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.photoContainer}>
        <FlatList
          data={trainer.photos}
          renderItem={renderPhoto}
          keyExtractor={(_, index) => `photo-${trainer.id}-${index}`}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={(event) => {
            const newIndex = Math.floor(event.nativeEvent.contentOffset.x / (width - 32));
            setActivePhotoIndex(newIndex);
          }}
          snapToInterval={width - 32}
          snapToAlignment="center"
          decelerationRate="fast"
          style={{ width: width - 32 }}
          contentContainerStyle={{ width: (width - 32) * trainer.photos.length }}
        />
        <View style={styles.paginationDots}>
          <FlatList
            data={trainer.photos.map((_, index) => index)}
            renderItem={({ index }) => (
              <View
                style={[
                  styles.paginationDot,
                  index === activePhotoIndex && styles.paginationDotActive,
                ]}
              />
            )}
            keyExtractor={(index) => `dot-${trainer.id}-${index}`}
            horizontal
            style={styles.paginationList}
            scrollEnabled={false}
          />
        </View>
      </View>

      <TouchableOpacity 
        style={styles.cardContent} 
        onPress={() => onPress(trainer)}
        activeOpacity={0.9}
      >
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.trainerName}>{trainer.name}</Text>
            <Text style={styles.specialty}>{trainer.specialty}</Text>
          </View>
          <Image source={{ uri: trainer.avatar }} style={styles.avatar} />
        </View>

        <Text style={styles.description}>{trainer.description}</Text>

        <View style={styles.ratingRow}>
          <View style={styles.rating}>
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text style={styles.ratingText}>{trainer.rating}</Text>
          </View>
          <Text style={styles.price}>R$ {trainer.hourlyRate}/hora</Text>
        </View>

        <View style={styles.availabilityContainer}>
          <Text style={styles.availabilityLabel}>Disponível:</Text>
          <FlatList
            data={trainer.availability}
            renderItem={({ item }) => (
              <View style={styles.dayPill}>
                <Text style={styles.dayText}>{item}</Text>
              </View>
            )}
            keyExtractor={(item, index) => `day-${trainer.id}-${index}`}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>

        <TouchableOpacity 
          style={styles.scheduleButton} 

          onPress={handleSchedulePress}

          activeOpacity={0.7}
        >
          <Text style={styles.scheduleButtonText}>Agendar Aula</Text>
        </TouchableOpacity>
      </TouchableOpacity>

      <Modal isVisible={modalVisible} onBackdropPress={() => setModalVisible(false)}>
        <View style={{ backgroundColor: 'white', borderRadius: 16, padding: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 12 }}>Selecione o dia</Text>
          <Calendar
            onDayPress={handleDateSelect}
            markedDates={selectedDate ? { [selectedDate]: { selected: true, selectedColor: colors.primary } } : {}}
            theme={{
              selectedDayBackgroundColor: colors.primary,
              todayTextColor: colors.primary,
              arrowColor: colors.primary,
              monthTextColor: colors.primary,
              textSectionTitleColor: colors.primary,
              selectedDayTextColor: colors.white,
            }}
          />
          <TouchableOpacity
            style={{ marginTop: 20, backgroundColor: colors.primary, borderRadius: 8, padding: 12, alignItems: 'center' }}
            onPress={() => setShowTimePicker(true)}
            disabled={!selectedDate}
          >
            <Text style={{ color: 'white', fontWeight: 'bold' }}>
              {selectedTime ? `Horário: ${selectedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` : 'Selecionar Horário'}
            </Text>
          </TouchableOpacity>
          {showTimePicker && (
            <DateTimePicker
              value={selectedTime || new Date()}
              mode="time"
              is24Hour={true}
              display="default"
              onChange={handleTimeChange}
            />
          )}
          <TouchableOpacity
            style={{ marginTop: 20, backgroundColor: selectedDate && selectedTime ? colors.primary : '#ccc', borderRadius: 8, padding: 12, alignItems: 'center' }}
            onPress={handleConfirm}
            disabled={!(selectedDate && selectedTime)}
          >
            <Text style={{ color: 'white', fontWeight: 'bold' }}>Confirmar</Text>
          </TouchableOpacity>
        </View>
      </Modal>

    </View>
  );
};

export default function FeedScreen() {
  const navigation = useNavigation<any>(); // Use o hook useNavigation tipado como any

  const handleTrainerPress = (trainer: Trainer) => {
    console.log(`Selected trainer: ${trainer.name}`);
    // Aqui você pode navegar para a tela de detalhes do personal
  };

  const renderTrainer = ({ item }: ListRenderItemInfo<Trainer>) => (
    <TrainerCard trainer={item} onPress={handleTrainerPress} />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={trainers}
        renderItem={renderTrainer}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.feedContainer}
        showsVerticalScrollIndicator={false}
      />
      <TouchableOpacity // Adicione o botão aqui
        style={styles.lessonListButton}
        
        onPress={() => navigation.navigate('LessonList')}
      >
        <Text style={styles.lessonListButtonText}>Ver Aulas</Text>
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
    borderRadius: 16,
    marginBottom: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  photoContainer: {
    height: 300,
    position: 'relative',
    width: width - 32,
    overflow: 'hidden',
  },
  trainerPhoto: {
    width: width - 32,
    height: 300,
    resizeMode: 'cover',
  },
  paginationDots: {
    position: 'absolute',
    bottom: 16,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paginationList: {
    flexGrow: 0,
    flexShrink: 0,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: colors.white,
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  cardContent: {
    padding: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  trainerName: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 4,
  },
  specialty: {
    fontSize: 16,
    color: colors.text.secondary,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  description: {
    fontSize: 14,
    color: colors.text.primary,
    marginBottom: 12,
    lineHeight: 20,
  },
  ratingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 16,
    color: colors.text.primary,
    fontWeight: '600',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
  },
  availabilityContainer: {
    marginBottom: 16,
  },
  availabilityLabel: {
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: 8,
  },
  dayPill: {
    backgroundColor: `${colors.primary}20`,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginRight: 8,
  },
  dayText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '500',
  },
  scheduleButton: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  scheduleButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  lessonListButton: { // Estilos para o botão de ver aulas
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 16,
  },
  lessonListButtonText: { // Estilos para o texto do botão de ver aulas
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
});