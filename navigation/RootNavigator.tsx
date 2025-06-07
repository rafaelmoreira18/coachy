import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainTabNavigator from './MainTabNavigator';
import CreatePostScreen from '../screens/CreatePostScreen';
import ScheduleTrainingScreen from '../screens/ScheduleTrainingScreen';
import { RegisterTypeScreen } from '../screens/RegisterTypeScreen';
import { PersonalRegisterScreen } from '../screens/PersonalRegisterScreen';
import { StudentRegisterScreen } from '../screens/StudentRegisterScreen';
import LessonListScreen from '../screens/LessonListScreen';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        presentation: 'card',
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen 
        name="Main" 
        component={MainTabNavigator}
      />
      <Stack.Screen 
        name="CreatePost" 
        component={CreatePostScreen} 
      />
      <Stack.Screen 
        name="ScheduleTraining" 
        component={ScheduleTrainingScreen} 
      />
      <Stack.Screen 
        name="RegisterType" 
        component={RegisterTypeScreen}
        options={{
          headerShown: false,
          presentation: 'modal',
          animation: 'slide_from_bottom',
        }}
      />
      <Stack.Screen 
        name="PersonalRegister" 
        component={PersonalRegisterScreen}
        options={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen 
        name="StudentRegister" 
        component={StudentRegisterScreen}
        options={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen 
        name="LessonList" 
        component={LessonListScreen}
        options={{
          headerShown: true,
          title: 'Aulas',
        }}
      />
    </Stack.Navigator>
  );
} 