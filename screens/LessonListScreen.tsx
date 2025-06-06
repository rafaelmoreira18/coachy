import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import { supabase } from '../lib/supabase';
import { colors } from '../theme/colors';
import { Ionicons } from '@expo/vector-icons';

// Defina o tipo da aula conforme esperado no Supabase
interface Lesson {
  id: string;
  title: string;
  description: string;
  date: string;
  personal_id: string; // Mudou de 'trainer' para 'personal_id'
  price: number; // Adicione o price que existe na tabela
}

export default function LessonListScreen() {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchLessons = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
      .from('aulas')
      .select('*')
      .order('date', { ascending: true });
      console.log('Aulas retornadas:', data);
console.log('Erro:', error);
      if (error) {
        console.error('Erro do Supabase ao buscar aulas:', error);
        throw error;
      }
      setLessons(data || []);
    } catch (err: any) {
      console.error('Erro inesperado ao buscar aulas:', err);
      setError('Erro ao carregar as aulas. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLessons();
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchLessons();
    setRefreshing(false);
  }, []);

  const renderLesson = ({ item }: { item: Lesson }) => (
    <View style={styles.lessonCard}>
      <View style={styles.lessonHeader}>
        <Ionicons name="book" size={28} color={colors.primary} style={{ marginRight: 12 }} />
        <View>
          <Text style={styles.lessonTitle}>{item.title}</Text>
          <Text style={styles.lessonTrainer}>Personal ID: {item.personal_id}</Text>
        </View>
      </View>
      <Text style={styles.lessonDescription}>{item.description}</Text>
      <Text style={styles.lessonPrice}>Preço: R$ {item.price}</Text>
      <Text style={styles.lessonDate}>{new Date(item.date).toLocaleString('pt-BR')}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Carregando aulas...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Ionicons name="alert-circle" size={40} color={colors.error} />
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchLessons}>
          <Text style={styles.retryButtonText}>Tentar novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={lessons}
        renderItem={renderLesson}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[colors.primary]}
            tintColor={colors.primary}
          />
        }
        ListEmptyComponent={
          <View style={styles.centered}>
            <Ionicons name="information-circle-outline" size={40} color={colors.text.tertiary} />
            <Text style={styles.emptyText}>Nenhuma aula encontrada.</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  listContent: {
    paddingBottom: 32,
  },
  lessonCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  lessonHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  lessonTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text.primary,
  },
  lessonTrainer: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  lessonDescription: {
    fontSize: 15,
    color: colors.text.primary,
    marginVertical: 8,
  },
  lessonPrice: {
    fontSize: 15,
    color: colors.primary,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  lessonDate: {
    fontSize: 13,
    color: colors.text.tertiary,
    textAlign: 'right',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  loadingText: {
    marginTop: 16,
    color: colors.text.secondary,
    fontSize: 16,
  },
  errorText: {
    marginTop: 16,
    color: colors.error,
    fontSize: 16,
    textAlign: 'center',
  },
  retryButton: {
    marginTop: 24,
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 24,
  },
  retryButtonText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
  emptyText: {
    marginTop: 16,
    color: colors.text.tertiary,
    fontSize: 16,
    textAlign: 'center',
  },
}); 