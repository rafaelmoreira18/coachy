import React from "react";
import { View, Text, Image, StyleSheet, FlatList, ScrollView, Dimensions, TouchableOpacity } from "react-native";

const { width } = Dimensions.get("window");

type Trainer = {
  id: string;
  name: string;
  specialty: string;
  avatar: string;
  photos: string[];
};

const trainers: Trainer[] = [
  {
    id: "1",
    name: "Jake",
    specialty: "Musculação",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    photos: [
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=600&fit=crop",
    ],
  },
  {
    id: "2",
    name: "Ana",
    specialty: "Funcional",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    photos: [
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&h=600&fit=crop",
    ],
  },
  {
    id: "3",
    name: "Lucas",
    specialty: "Crossfit",
    avatar: "https://randomuser.me/api/portraits/men/65.jpg",
    photos: [
      "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=600&fit=crop",
    ],
  },
  {
    id: "4",
    name: "Bruna",
    specialty: "HIIT",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    photos: [
      "https://images.unsplash.com/photo-1550259979-ed79b48d2a30?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&h=600&fit=crop",
    ],
  },
  {
    id: "5",
    name: "Carlos",
    specialty: "Personal Trainer",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
    photos: [
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1566241440091-ec10de8db2e1?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&h=600&fit=crop",
    ],
  },
  {
    id: "6",
    name: "Fernanda",
    specialty: "Pilates",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    photos: [
      "https://images.unsplash.com/photo-1506629905607-d405b7a30db9?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=600&fit=crop",
    ],
  },
  {
    id: "7",
    name: "Rafael",
    specialty: "Treinamento Funcional",
    avatar: "https://randomuser.me/api/portraits/men/85.jpg",
    photos: [
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=600&fit=crop",
    ],
  },
  {
    id: "8",
    name: "Juliana",
    specialty: "Yoga e Alongamento",
    avatar: "https://randomuser.me/api/portraits/women/85.jpg",
    photos: [
      "https://images.unsplash.com/photo-1506629905607-d405b7a30db9?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=600&fit=crop",
    ],
  },
];

const TrainerCard: React.FC<{ trainer: Trainer }> = ({ trainer }) => {
  const handleTrainPress = () => {
    console.log(`Treinar com ${trainer.name}`);
    // Aqui você pode adicionar a navegação ou lógica desejada
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Image source={{ uri: trainer.avatar }} style={styles.avatar} />
        <View style={styles.trainerInfo}>
          <Text style={styles.name}>{trainer.name}</Text>
          <Text style={styles.specialty}>{trainer.specialty}</Text>
        </View>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.carousel}>
        {trainer.photos.map((photo, idx) => (
          <Image
            key={idx}
            source={{ uri: photo }}
            style={styles.carouselImage}
          />
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.trainButton} onPress={handleTrainPress}>
        <Text style={styles.trainButtonText}>Treinar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default function FeedScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={trainers}
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
    backgroundColor: "#16213e",
    paddingTop: 40,
    paddingHorizontal: 8,
  },
  card: {
    backgroundColor: "#1b2a49",
    borderRadius: 20,
    marginBottom: 24,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 12,
    borderWidth: 2,
    borderColor: "#00b4b4",
  },
  trainerInfo: {
    flex: 1,
  },
  name: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  specialty: {
    color: "#b2e4e4",
    fontSize: 14,
  },
  carousel: {
    marginTop: 8,
  },
  carouselImage: {
    width: width * 0.7,
    height: 300, // Aumentado significativamente para 350px
    borderRadius: 16,
    marginRight: 12,
    backgroundColor: "#222",
  },
  trainButton: {
    backgroundColor: "#00b4b4",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginTop: 16,
    alignItems: "center",
    shadowColor: "#00b4b4",
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  trainButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});