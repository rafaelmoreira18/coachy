import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const CATEGORIES = ['Diet', 'Workout', 'Tips', 'Question'] as const;

export default function CreatePostScreen({ navigation }: any) {
  const [content, setContent] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<typeof CATEGORIES[number] | null>(null);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permissão necessária', 'Precisamos de acesso à sua galeria para adicionar fotos.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const handlePost = () => {
    if (!content.trim()) {
      Alert.alert('Erro', 'Por favor, escreva algo para compartilhar.');
      return;
    }

    if (!selectedCategory) {
      Alert.alert('Erro', 'Por favor, selecione uma categoria.');
      return;
    }

    // Aqui você implementaria a lógica para salvar o post
    console.log({
      content,
      image: selectedImage,
      category: selectedCategory,
    });

    // Volta para a tela anterior
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={28} color="#b2e4e4" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.postButton,
            (!content.trim() || !selectedCategory) && styles.postButtonDisabled,
          ]}
          onPress={handlePost}
          disabled={!content.trim() || !selectedCategory}
        >
          <Text style={styles.postButtonText}>Publicar</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.input}
        placeholder="O que você quer compartilhar?"
        placeholderTextColor="#b2e4e4"
        multiline
        value={content}
        onChangeText={setContent}
      />

      <View style={styles.categories}>
        <Text style={styles.sectionTitle}>Categoria:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {CATEGORIES.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                selectedCategory === category && styles.categoryButtonSelected,
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text
                style={[
                  styles.categoryButtonText,
                  selectedCategory === category && styles.categoryButtonTextSelected,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.imageSection}>
        <TouchableOpacity style={styles.addImageButton} onPress={pickImage}>
          <Ionicons name="image-outline" size={24} color="#b2e4e4" />
          <Text style={styles.addImageText}>Adicionar foto</Text>
        </TouchableOpacity>

        {selectedImage && (
          <View style={styles.selectedImageContainer}>
            <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
            <TouchableOpacity
              style={styles.removeImageButton}
              onPress={() => setSelectedImage(null)}
            >
              <Ionicons name="close-circle" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScrollView>
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
  },
  postButton: {
    backgroundColor: '#00b4b4',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  postButtonDisabled: {
    backgroundColor: 'rgba(0, 180, 180, 0.5)',
  },
  postButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  input: {
    color: '#b2e4e4',
    fontSize: 16,
    padding: 16,
    minHeight: 120,
    textAlignVertical: 'top',
  },
  categories: {
    padding: 16,
  },
  sectionTitle: {
    color: '#b2e4e4',
    fontSize: 16,
    marginBottom: 12,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#00b4b4',
    marginRight: 8,
  },
  categoryButtonSelected: {
    backgroundColor: '#00b4b4',
  },
  categoryButtonText: {
    color: '#b2e4e4',
    fontSize: 14,
  },
  categoryButtonTextSelected: {
    color: '#fff',
    fontWeight: 'bold',
  },
  imageSection: {
    padding: 16,
  },
  addImageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderWidth: 1,
    borderColor: '#b2e4e4',
    borderStyle: 'dashed',
    borderRadius: 12,
  },
  addImageText: {
    color: '#b2e4e4',
    marginLeft: 8,
    fontSize: 16,
  },
  selectedImageContainer: {
    marginTop: 16,
    position: 'relative',
  },
  selectedImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
  },
  removeImageButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 12,
  },
}); 