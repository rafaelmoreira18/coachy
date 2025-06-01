import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

const mockProfile = {
  name: 'João Silva',
  type: 'trainer',
  avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  specialty: 'Musculação',
  bio: 'Personal trainer especializado em musculação e hipertrofia. Formado em Educação Física com 5 anos de experiência.',
  stats: {
    students: 15,
    rating: 4.8,
    experience: '5 anos',
  },
  certifications: [
    'CREF: 123456-G/SP',
    'Especialização em Musculação',
    'Nutrição Esportiva',
    'Primeiros Socorros',
  ],
  schedule: [
    { day: 'Segunda', time: '6h - 22h' },
    { day: 'Terça', time: '6h - 22h' },
    { day: 'Quarta', time: '6h - 22h' },
    { day: 'Quinta', time: '6h - 22h' },
    { day: 'Sexta', time: '6h - 18h' },
    { day: 'Sábado', time: '8h - 12h' },
  ],
};

const StatCard = ({ label, value }: { label: string; value: string | number }) => (
  <View style={styles.statCard}>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

export default function ProfileScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: mockProfile.avatar }} style={styles.avatar} />
        <View style={styles.headerInfo}>
          <Text style={styles.name}>{mockProfile.name}</Text>
          <View style={styles.specialtyContainer}>
            <Text style={styles.specialty}>{mockProfile.specialty}</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Personal</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.statsContainer}>
        <StatCard label="Alunos" value={mockProfile.stats.students} />
        <StatCard label="Avaliação" value={mockProfile.stats.rating} />
        <StatCard label="Experiência" value={mockProfile.stats.experience} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sobre</Text>
        <Text style={styles.bio}>{mockProfile.bio}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Certificações</Text>
        <View style={styles.certifications}>
          {mockProfile.certifications.map((cert, index) => (
            <View key={index} style={styles.certificationItem}>
              <Ionicons name="checkmark-circle" size={20} color={colors.primary} />
              <Text style={styles.certificationText}>{cert}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Horários Disponíveis</Text>
        <View style={styles.scheduleContainer}>
          {mockProfile.schedule.map((item, index) => (
            <View key={index} style={styles.scheduleItem}>
              <Text style={styles.scheduleDay}>{item.day}</Text>
              <Text style={styles.scheduleTime}>{item.time}</Text>
            </View>
          ))}
        </View>
      </View>

      <TouchableOpacity style={styles.editButton}>
        <Ionicons name="create-outline" size={20} color={colors.white} />
        <Text style={styles.editButtonText}>Editar Perfil</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: 20,
    alignItems: 'center',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  headerInfo: {
    alignItems: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 8,
  },
  specialtyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  specialty: {
    fontSize: 16,
    color: colors.text.secondary,
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
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.border,
    marginBottom: 20,
  },
  statCard: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 12,
  },
  bio: {
    fontSize: 15,
    color: colors.text.secondary,
    lineHeight: 22,
  },
  certifications: {
    gap: 12,
  },
  certificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  certificationText: {
    fontSize: 15,
    color: colors.text.primary,
  },
  scheduleContainer: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  scheduleItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  scheduleDay: {
    fontSize: 15,
    color: colors.text.primary,
    fontWeight: '500',
  },
  scheduleTime: {
    fontSize: 15,
    color: colors.text.secondary,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    margin: 20,
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  editButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
}); 