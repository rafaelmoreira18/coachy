import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors } from '../theme/colors';
import { RootStackParamList } from '../navigation/types';
import { signIn } from '../lib/auth';
import { signInWithGoogle } from '../lib/auth';

// Definindo o tipo de navegação
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const LoginScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [loadingGoogle, setLoadingGoogle] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setError('');
    if (!email || !password) {
      setError('Preencha todos os campos.');
      setLoading(false);
      return;
    }
    const { data, error } = await signIn(email, password);
    setLoading(false);
    if (error) {
      setError('Email ou senha inválidos.');
    } else {
      navigation.replace('Main');
    }
  };

  const handleGoogleLogin = async () => {
    setLoadingGoogle(true);
    setError('');
    const { error } = await signInWithGoogle();
    setLoadingGoogle(false);
    if (error) {
      setError('Erro ao entrar com Google.');
    }
    // O redirecionamento será feito pelo Supabase após login
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#111518' }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.containerDark}>
        <ImageBackground
          source={{ uri: 'https://images.pexels.com/photos/416754/pexels-photo-416754.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }}
          style={styles.banner}
          imageStyle={{ borderRadius: 24 }}
          resizeMode="cover"
        />
        <Text style={styles.titleDark}>Encontre seu parceiro de treino ideal</Text>
        <Text style={styles.subtitleDark}>
          Junte-se a milhares de pessoas transformando sua jornada fitness!
        </Text>
        <TouchableOpacity
          style={styles.googleButton}
          onPress={handleGoogleLogin}
          disabled={loadingGoogle}
        >
          {loadingGoogle ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <>
              <Ionicons name="logo-google" size={22} color="#fff" style={{ marginRight: 8 }} />
              <Text style={styles.googleButtonText}>Entrar com Google</Text>
            </>
          )}
        </TouchableOpacity>
        <View style={styles.separatorContainer}>
          <View style={styles.separatorLine} />
          <Text style={styles.separatorText}>ou</Text>
          <View style={styles.separatorLine} />
        </View>
        <View style={styles.formDark}>
          <View style={styles.inputContainerDark}>
            <Ionicons name="mail-outline" size={20} color={colors.text.tertiary} style={styles.inputIcon} />
            <TextInput
              style={styles.inputDark}
              placeholder="Email"
              placeholderTextColor={colors.text.tertiary}
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>
          <View style={styles.inputContainerDark}>
            <Ionicons name="lock-closed-outline" size={20} color={colors.text.tertiary} style={styles.inputIcon} />
            <TextInput
              style={styles.inputDark}
              placeholder="Senha"
              placeholderTextColor={colors.text.tertiary}
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          <TouchableOpacity style={styles.buttonDark} onPress={handleLogin} disabled={loading}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonTextDark}>Entrar</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('RegisterType')} style={styles.linkContainerDark}>
            <Text style={styles.linkTextDark}>Não tem uma conta? Cadastre-se</Text>
          </TouchableOpacity>
        </View>
        <View style={{ height: 20 }} />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  containerDark: {
    flex: 1,
    backgroundColor: '#111518',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  banner: {
    width: '100%',
    height: 180,
    borderRadius: 24,
    marginTop: 24,
    marginBottom: 16,
    backgroundColor: '#22262a',
    // Você pode adicionar uma imagem de fundo aqui se quiser
  },
  titleDark: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    fontFamily: 'Lexend',
  },
  subtitleDark: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
    fontFamily: 'Noto Sans',
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1990e5',
    borderRadius: 999,
    height: 48,
    width: '100%',
    maxWidth: 480,
    marginBottom: 18,
    marginTop: 4,
    shadowColor: '#1990e5',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 2,
  },
  googleButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.2,
  },
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    maxWidth: 480,
    marginVertical: 8,
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#22262a',
  },
  separatorText: {
    color: '#fff',
    marginHorizontal: 12,
    fontSize: 14,
    fontFamily: 'Noto Sans',
  },
  formDark: {
    width: '100%',
    maxWidth: 480,
    marginTop: 8,
  },
  inputContainerDark: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#22262a',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  inputDark: {
    flex: 1,
    height: 48,
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Noto Sans',
  },
  buttonDark: {
    backgroundColor: '#1990e5',
    borderRadius: 999,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 10,
    width: '100%',
    maxWidth: 480,
  },
  buttonTextDark: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Lexend',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
  linkContainerDark: {
    marginTop: 18,
    alignItems: 'center',
  },
  linkTextDark: {
    color: '#1990e5',
    fontSize: 16,
    textDecorationLine: 'underline',
    fontFamily: 'Noto Sans',
  },
  inputIcon: {
    marginRight: 8,
  },
}); 