import React from "react";
import { View, Text, Image, StyleSheet, FlatList, Dimensions } from "react-native";

const trainers = [
  {
    name: "Jake",
    specialty: "Strength",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Fitness",
    specialty: "Fitness",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Daniel",
    specialty: "Weight Loss",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
  },
];

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.headerImageContainer}>
        <Image
          source={{ uri: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c" }}
          style={styles.headerImage}
        />
        <View style={styles.headerTextBox}>
          <Text style={styles.headerText}>HEALTH{"\n"}AND{"\n"}WELLNESS</Text>
        </View>
      </View>
      <Text style={styles.mainTitle}>Be stronger than your excuses</Text>
      <Text style={styles.subtitle}>Recommended Trainers</Text>
      <FlatList
        data={trainers}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.name}
        contentContainerStyle={styles.trainersList}
        renderItem={({ item }) => (
          <View style={styles.trainerCard}>
            <Image source={{ uri: item.image }} style={styles.trainerImg} />
            <Text style={styles.trainerName}>{item.name}</Text>
            <Text style={styles.trainerSpecialty}>{item.specialty}</Text>
          </View>
        )}
      />
    </View>
  );
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#16213e",
    paddingTop: 40,
    paddingHorizontal: 16,
  },
  headerImageContainer: {
    position: "relative",
    borderRadius: 32,
    overflow: "hidden",
    marginBottom: 32,
    width: "100%",
    height: width * 0.6,
    alignSelf: "center",
  },
  headerImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    opacity: 0.95,
  },
  headerTextBox: {
    position: "absolute",
    top: 24,
    left: 24,
    backgroundColor: "rgba(0,180,180,0.7)",
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  headerText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  mainTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#b2e4e4",
    textAlign: "center",
    marginBottom: 16,
  },
  trainersList: {
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  trainerCard: {
    backgroundColor: "#1b2a49",
    borderRadius: 70,
    width: 120,
    height: 160,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 20,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  trainerImg: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 3,
    borderColor: "#00b4b4",
    marginBottom: 10,
  },
  trainerName: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
    marginBottom: 2,
  },
  trainerSpecialty: {
    color: "#b2e4e4",
    fontSize: 14,
  },
});