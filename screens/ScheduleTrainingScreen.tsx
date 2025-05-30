import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Ionicons } from '@expo/vector-icons';

// Simulated available time slots
const AVAILABLE_TIMES = {
  morning: ['07:00', '08:00', '09:00', '10:00', '11:00'],
  afternoon: ['14:00', '15:00', '16:00', '17:00'],
  evening: ['18:00', '19:00', '20:00'],
};

interface ScheduleTrainingScreenProps {
  navigation: any;
  route: {
    params: {
      trainer: {
        name: string;
        specialty: string;
        price: string;
      };
    };
  };
}

export default function ScheduleTrainingScreen({ navigation, route }: ScheduleTrainingScreenProps) {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const { trainer } = route.params;

  const handleDateSelect = (date: any) => {
    setSelectedDate(date.dateString);
    setSelectedTime('');
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleSchedule = () => {
    if (!selectedDate || !selectedTime) {
      Alert.alert('Erro', 'Por favor, selecione uma data e horário.');
      return;
    }

    Alert.alert(
      'Confirmar Agendamento',
      `Deseja agendar um treino com ${trainer.name} para ${selectedDate} às ${selectedTime}?\n\nValor: ${trainer.price}`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Confirmar',
          onPress: () => {
            // Aqui você implementaria a lógica para salvar o agendamento
            Alert.alert(
              'Sucesso!',
              'Seu treino foi agendado com sucesso! O personal entrará em contato para confirmar.',
              [{ text: 'OK', onPress: () => navigation.goBack() }]
            );
          },
        },
      ]
    );
  };

  const renderTimeSlots = () => {
    if (!selectedDate) return null;

    return (
      <View style={styles.timeSlotsContainer}>
        <Text style={styles.sectionTitle}>Horários Disponíveis</Text>
        
        <Text style={styles.periodTitle}>Manhã</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.timeSlotRow}>
            {AVAILABLE_TIMES.morning.map((time) => (
              <TouchableOpacity
                key={time}
                style={[
                  styles.timeSlot,
                  selectedTime === time && styles.timeSlotSelected,
                ]}
                onPress={() => handleTimeSelect(time)}
              >
                <Text
                  style={[
                    styles.timeSlotText,
                    selectedTime === time && styles.timeSlotTextSelected,
                  ]}
                >
                  {time}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        <Text style={styles.periodTitle}>Tarde</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.timeSlotRow}>
            {AVAILABLE_TIMES.afternoon.map((time) => (
              <TouchableOpacity
                key={time}
                style={[
                  styles.timeSlot,
                  selectedTime === time && styles.timeSlotSelected,
                ]}
                onPress={() => handleTimeSelect(time)}
              >
                <Text
                  style={[
                    styles.timeSlotText,
                    selectedTime === time && styles.timeSlotTextSelected,
                  ]}
                >
                  {time}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        <Text style={styles.periodTitle}>Noite</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.timeSlotRow}>
            {AVAILABLE_TIMES.evening.map((time) => (
              <TouchableOpacity
                key={time}
                style={[
                  styles.timeSlot,
                  selectedTime === time && styles.timeSlotSelected,
                ]}
                onPress={() => handleTimeSelect(time)}
              >
                <Text
                  style={[
                    styles.timeSlotText,
                    selectedTime === time && styles.timeSlotTextSelected,
                  ]}
                >
                  {time}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={28} color="#b2e4e4" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Agendar Treino</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView>
        <View style={styles.trainerInfo}>
          <Text style={styles.trainerName}>{trainer.name}</Text>
          <Text style={styles.trainerSpecialty}>{trainer.specialty}</Text>
          <Text style={styles.trainerPrice}>{trainer.price}</Text>
        </View>

        <View style={styles.calendarContainer}>
          <Calendar
            onDayPress={handleDateSelect}
            markedDates={{
              [selectedDate]: {
                selected: true,
                selectedColor: '#00b4b4',
              },
            }}
            theme={{
              backgroundColor: '#1b2a49',
              calendarBackground: '#1b2a49',
              textSectionTitleColor: '#b2e4e4',
              selectedDayBackgroundColor: '#00b4b4',
              selectedDayTextColor: '#ffffff',
              todayTextColor: '#00b4b4',
              dayTextColor: '#b2e4e4',
              textDisabledColor: '#4a5878',
              dotColor: '#00b4b4',
              selectedDotColor: '#ffffff',
              arrowColor: '#00b4b4',
              monthTextColor: '#b2e4e4',
              textMonthFontWeight: 'bold',
              textDayFontSize: 14,
              textMonthFontSize: 16,
            }}
            minDate={new Date().toISOString().split('T')[0]}
          />
        </View>

        {renderTimeSlots()}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.scheduleButton,
            (!selectedDate || !selectedTime) && styles.scheduleButtonDisabled,
          ]}
          onPress={handleSchedule}
          disabled={!selectedDate || !selectedTime}
        >
          <Text style={styles.scheduleButtonText}>Agendar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#16213e',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingTop: 40,
    backgroundColor: '#1b2a49',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  trainerInfo: {
    padding: 16,
    backgroundColor: '#1b2a49',
    marginBottom: 16,
  },
  trainerName: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  trainerSpecialty: {
    color: '#b2e4e4',
    fontSize: 16,
    marginTop: 4,
  },
  trainerPrice: {
    color: '#00b4b4',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
  },
  calendarContainer: {
    backgroundColor: '#1b2a49',
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 16,
    overflow: 'hidden',
  },
  timeSlotsContainer: {
    padding: 16,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  periodTitle: {
    color: '#b2e4e4',
    fontSize: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  timeSlotRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  timeSlot: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#00b4b4',
    marginRight: 8,
    minWidth: 80,
    alignItems: 'center',
  },
  timeSlotSelected: {
    backgroundColor: '#00b4b4',
  },
  timeSlotText: {
    color: '#b2e4e4',
    fontSize: 14,
  },
  timeSlotTextSelected: {
    color: '#fff',
    fontWeight: 'bold',
  },
  footer: {
    padding: 16,
    backgroundColor: '#1b2a49',
  },
  scheduleButton: {
    backgroundColor: '#00b4b4',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  scheduleButtonDisabled: {
    backgroundColor: 'rgba(0, 180, 180, 0.5)',
  },
  scheduleButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 