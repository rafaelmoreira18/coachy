import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

const { width } = Dimensions.get('window');

interface ScheduleScreenProps {
  visible: boolean;
  onClose: () => void;
  trainer: {
    name: string;
    specialty: string;
    availability: string[];
  };
}

const timeSlots = [
  '06:00', '07:00', '08:00', '09:00', '10:00',
  '11:00', '14:00', '15:00', '16:00', '17:00',
  '18:00', '19:00', '20:00'
];

const weekDays = {
  'Segunda': 'SEG',
  'Terça': 'TER',
  'Quarta': 'QUA',
  'Quinta': 'QUI',
  'Sexta': 'SEX',
  'Sábado': 'SAB',
  'Domingo': 'DOM'
};

const ScheduleScreen: React.FC<ScheduleScreenProps> = ({ visible, onClose, trainer }) => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const generateDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      const dayName = date.toLocaleDateString('pt-BR', { weekday: 'long' }).split('-')[0];
      const dayNumber = date.getDate();
      const month = date.toLocaleDateString('pt-BR', { month: 'short' });
      
      // Only include days when trainer is available
      if (trainer.availability.includes(dayName)) {
        dates.push({
          fullDate: date.toISOString(),
          dayName,
          dayNumber,
          month
        });
      }
    }
    return dates;
  };

  const handleConfirm = () => {
    if (selectedDate && selectedTime) {
      console.log('Agendamento confirmado:', {
        date: selectedDate,
        time: selectedTime,
        trainer: trainer.name
      });
      onClose();
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color={colors.text.primary} />
            </TouchableOpacity>
            <Text style={styles.title}>Agendar Aula</Text>
          </View>

          <View style={styles.trainerInfo}>
            <Text style={styles.trainerName}>{trainer.name}</Text>
            <Text style={styles.trainerSpecialty}>{trainer.specialty}</Text>
          </View>

          <Text style={styles.sectionTitle}>Selecione uma data</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.datesContainer}
          >
            {generateDates().map((date) => (
              <TouchableOpacity
                key={date.fullDate}
                style={[
                  styles.dateCard,
                  selectedDate === date.fullDate && styles.dateCardSelected
                ]}
                onPress={() => setSelectedDate(date.fullDate)}
              >
                <Text style={[
                  styles.dateWeekday,
                  selectedDate === date.fullDate && styles.dateTextSelected
                ]}>
                  {weekDays[date.dayName as keyof typeof weekDays]}
                </Text>
                <Text style={[
                  styles.dateNumber,
                  selectedDate === date.fullDate && styles.dateTextSelected
                ]}>
                  {date.dayNumber}
                </Text>
                <Text style={[
                  styles.dateMonth,
                  selectedDate === date.fullDate && styles.dateTextSelected
                ]}>
                  {date.month}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <Text style={styles.sectionTitle}>Horários disponíveis</Text>
          <ScrollView style={styles.timeSlotsContainer}>
            <View style={styles.timeGrid}>
              {timeSlots.map((time) => (
                <TouchableOpacity
                  key={time}
                  style={[
                    styles.timeSlot,
                    selectedTime === time && styles.timeSlotSelected
                  ]}
                  onPress={() => setSelectedTime(time)}
                >
                  <Text style={[
                    styles.timeText,
                    selectedTime === time && styles.timeTextSelected
                  ]}>
                    {time}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          <TouchableOpacity
            style={[
              styles.confirmButton,
              (!selectedDate || !selectedTime) && styles.confirmButtonDisabled
            ]}
            onPress={handleConfirm}
            disabled={!selectedDate || !selectedTime}
          >
            <Text style={styles.confirmButtonText}>
              Confirmar Agendamento
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    height: '90%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  closeButton: {
    padding: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text.primary,
    marginLeft: 12,
  },
  trainerInfo: {
    marginBottom: 24,
  },
  trainerName: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 4,
  },
  trainerSpecialty: {
    fontSize: 16,
    color: colors.text.secondary,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 12,
  },
  datesContainer: {
    marginBottom: 24,
  },
  dateCard: {
    width: 70,
    height: 90,
    backgroundColor: colors.background,
    borderRadius: 12,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  dateCardSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  dateWeekday: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text.secondary,
    marginBottom: 4,
  },
  dateNumber: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 2,
  },
  dateMonth: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  dateTextSelected: {
    color: colors.white,
  },
  timeSlotsContainer: {
    flex: 1,
    marginBottom: 24,
  },
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  timeSlot: {
    width: (width - 60) / 3,
    height: 44,
    backgroundColor: colors.background,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  timeSlotSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  timeText: {
    fontSize: 16,
    color: colors.text.primary,
  },
  timeTextSelected: {
    color: colors.white,
  },
  confirmButton: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  confirmButtonDisabled: {
    backgroundColor: colors.border,
  },
  confirmButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ScheduleScreen; 