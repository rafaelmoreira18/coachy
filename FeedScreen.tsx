import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, FlatList, ScrollView, Dimensions, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

type Trainer = {
  id: string;
  name: string;
  specialty: string;
  avatar: string;
  photos: string[];
  hourlyRate: number;
  rating: number;
  availability: string[];
};

const featuredPhotos = [
  "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&h=600&fit=crop",
];

const trainers: Trainer[] = [
  {
    id: "1",
    name: "Jake Silva",
    specialty: "Musculação",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    photos: [
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=600&fit=crop",
    ],
    hourlyRate: 120,
    rating: 4.8,
    availability: ["Segunda", "Quarta", "Sexta"],
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
    hourlyRate: 100,
    rating: 4.5,
    availability: ["Segunda", "Quarta", "Sexta"],
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
    hourlyRate: 150,
    rating: 4.9,
    availability: ["Segunda", "Quarta", "Sexta"],
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
    hourlyRate: 130,
    rating: 4.7,
    availability: ["Segunda", "Quarta", "Sexta"],
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
    hourlyRate: 140,
    rating: 4.6,
    availability: ["Segunda", "Quarta", "Sexta"],
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
    hourlyRate: 110,
    rating: 4.4,
    availability: ["Segunda", "Quarta", "Sexta"],
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
    hourlyRate: 160,
    rating: 4.9,
    availability: ["Segunda", "Quarta", "Sexta"],
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
    hourlyRate: 120,
    rating: 4.8,
    availability: ["Segunda", "Quarta", "Sexta"],
  },
];

const FeaturedCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % featuredPhotos.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const renderPhoto = ({ item, index }: { item: string; index: number }) => (
    <Image
      source={{ uri: item }}
      style={styles.featuredImage}
    />
  );

  const renderPaginationDot = ({ index }: { index: number }) => (
    <View
      style={[
        styles.paginationDot,
        index === activeIndex && styles.paginationDotActive,
      ]}
    />
  );

  return (
    <View style={styles.featuredContainer}>
      <FlatList
        data={featuredPhotos}
        renderItem={renderPhoto}
        keyExtractor={(_, index) => `photo-${index}`}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const newIndex = Math.round(event.nativeEvent.contentOffset.x / width);
          setActiveIndex(newIndex);
        }}
      />
      <View style={styles.pagination}>
        <FlatList
          data={featuredPhotos}
          renderItem={({ index }) => renderPaginationDot({ index })}
          keyExtractor={(_, index) => `dot-${index}`}
          horizontal
          style={styles.paginationList}
        />
      </View>
    </View>
  );
};

const TrainerCard: React.FC<{ trainer: Trainer }> = ({ trainer }) => {
  const handleSchedule = () => {
    console.log(`Agendar com ${trainer.name}`);
  };

  const renderPhoto = ({ item }: { item: string }) => (
    <Image
      source={{ uri: item }}
      style={styles.carouselImage}
    />
  );

  const renderAvailabilityDay = ({ item }: { item: string }) => (
    <View style={styles.dayPill}>
      <Text style={styles.dayText}>{item}</Text>
    </View>
  );

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Image source={{ uri: trainer.avatar }} style={styles.avatar} />
        <View style={styles.trainerInfo}>
          <Text style={styles.name}>{trainer.name}</Text>
          <Text style={styles.specialty}>{trainer.specialty}</Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text style={styles.rating}>{trainer.rating}</Text>
          </View>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>Hora/Aula</Text>
          <Text style={styles.price}>R${trainer.hourlyRate}</Text>
        </View>
      </View>
      <FlatList
        data={trainer.photos}
        renderItem={renderPhoto}
        keyExtractor={(_, index) => `trainer-photo-${trainer.id}-${index}`}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.carousel}
      />
      <View style={styles.availabilityContainer}>
        <Text style={styles.availabilityLabel}>Disponível:</Text>
        <FlatList
          data={trainer.availability}
          renderItem={renderAvailabilityDay}
          keyExtractor={(_, index) => `availability-${trainer.id}-${index}`}
          horizontal
          style={styles.daysContainer}
        />
      </View>
      <TouchableOpacity style={styles.scheduleButton} onPress={handleSchedule}>
        <Text style={styles.scheduleButtonText}>Agendar Aula</Text>
      </TouchableOpacity>
    </View>
  );
};

export default function FeedScreen() {
  const renderTrainer = ({ item }: { item: Trainer }) => (
    <TrainerCard trainer={item} />
  );

  return (
    <ScrollView style={styles.container}>
      <FeaturedCarousel />
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Personal Trainers em Destaque</Text>
        <FlatList
          data={trainers}
          renderItem={renderTrainer}
          keyExtractor={(item) => `trainer-card-${item.id}`}
          scrollEnabled={false}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#16213e",
  },
  featuredContainer: {
    height: 300,
    position: "relative",
  },
  featuredImage: {
    width: width,
    height: 300,
  },
  pagination: {
    position: "absolute",
    bottom: 16,
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: "#fff",
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 16,
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
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rating: {
    color: "#fff",
    marginLeft: 4,
    fontSize: 14,
  },
  priceContainer: {
    alignItems: "flex-end",
  },
  priceLabel: {
    color: "#b2e4e4",
    fontSize: 12,
  },
  price: {
    color: "#00b4b4",
    fontSize: 18,
    fontWeight: "bold",
  },
  carousel: {
    marginTop: 8,
  },
  carouselImage: {
    width: width * 0.7,
    height: 200,
    borderRadius: 16,
    marginRight: 12,
    backgroundColor: "#222",
  },
  availabilityContainer: {
    marginTop: 12,
  },
  availabilityLabel: {
    color: "#b2e4e4",
    fontSize: 14,
    marginBottom: 8,
  },
  daysContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  dayPill: {
    backgroundColor: "rgba(0, 180, 180, 0.2)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  dayText: {
    color: "#00b4b4",
    fontSize: 12,
  },
  scheduleButton: {
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
  scheduleButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  paginationList: {
    flexGrow: 0,
  },
});