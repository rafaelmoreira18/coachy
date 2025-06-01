import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors } from '../theme/colors';
import { RootStackParamList } from '../navigation/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface RouteParams {
  trainer: {
    name: string;
    specialty: string;
    price: string;
  };
}

const timeSlots = [
  '06:00', '07:00', '08:00', '09:00', '10:00',
  '11:00', '14:00', '15:00', '16:00', '17:00',
  '18:00', '19:00', '20:00', '21:00',
];

const weekDays = [
  'Domingo', 'Segunda', 'Terça', 'Quarta',
  'Quinta', 'Sexta', 'Sábado',
];

export default function ScheduleTrainingScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute();
  const { trainer } = route.params as RouteParams;

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const getDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
    });
  };

  const handleSchedule = () => {
    if (!selectedTime) {
      Alert.alert('Erro', 'Por favor, selecione um horário.');
      return;
    }

    Alert.alert(
      'Confirmar Agendamento',
      `Deseja agendar um treino com ${trainer.name} para ${formatDate(selectedDate)} às ${selectedTime}?`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Confirmar',
          onPress: () => {
            // Implementação futura
            console.log('Agendamento:', {
              trainer,
              date: selectedDate,
              time: selectedTime,
            });
            navigation.goBack();
          },
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color={colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Agendar Treino</Text>
        <View style={styles.backButton} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.trainerInfo}>
          <Text style={styles.trainerName}>{trainer.name}</Text>
          <Text style={styles.trainerSpecialty}>{trainer.specialty}</Text>
          <Text style={styles.trainerPrice}>{trainer.price}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Selecione uma data</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.datesContainer}
          >
            {getDates().map((date, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.dateButton,
                  selectedDate.toDateString() === date.toDateString() && styles.dateButtonSelected,
                ]}
                onPress={() => setSelectedDate(date)}
              >
                <Text style={[
                  styles.dateDay,
                  selectedDate.toDateString() === date.toDateString() && styles.dateTextSelected,
                ]}>
                  {weekDays[date.getDay()].slice(0, 3)}
                </Text>
                <Text style={[
                  styles.dateText,
                  selectedDate.toDateString() === date.toDateString() && styles.dateTextSelected,
                ]}>
                  {formatDate(date)}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Selecione um horário</Text>
          <View style={styles.timeGrid}>
            {timeSlots.map((time, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.timeButton,
                  selectedTime === time && styles.timeButtonSelected,
                ]}
                onPress={() => setSelectedTime(time)}
              >
                <Text style={[
                  styles.timeText,
                  selectedTime === time && styles.timeTextSelected,
                ]}>
                  {time}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.scheduleButton,
            !selectedTime && styles.scheduleButtonDisabled,
          ]}
          onPress={handleSchedule}
          disabled={!selectedTime}
        >
          <Text style={styles.scheduleButtonText}>Agendar Treino</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: colors.text.primary,
  },
  content: {
    flex: 1,
  },
  trainerInfo: {
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  trainerName: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 4,
  },
  trainerSpecialty: {
    fontSize: 16,
    color: colors.text.secondary,
    marginBottom: 8,
  },
  trainerPrice: {
    fontSize: 18,
    color: colors.primary,
    fontWeight: '500',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 16,
  },
  datesContainer: {
    flexDirection: 'row',
  },
  dateButton: {
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    backgroundColor: colors.surface,
    marginRight: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  dateButtonSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  dateDay: {
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: 4,
  },
  dateText: {
    fontSize: 15,
    color: colors.text.primary,
    fontWeight: '500',
  },
  dateTextSelected: {
    color: colors.white,
  },
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  timeButton: {
    width: '22%',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  timeButtonSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  timeText: {
    fontSize: 15,
    color: colors.text.primary,
  },
  timeTextSelected: {
    color: colors.white,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  scheduleButton: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  scheduleButtonDisabled: {
    backgroundColor: colors.primaryLight,
  },
  scheduleButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
}); 