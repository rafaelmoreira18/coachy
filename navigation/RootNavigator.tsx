import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainTabNavigator from './MainTabNavigator';
import CreatePostScreen from '../screens/CreatePostScreen';
import ScheduleTrainingScreen from '../screens/ScheduleTrainingScreen';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        presentation: 'modal',
        animation: 'slide_from_bottom',
      }}
    >
      <Stack.Screen 
        name="Main" 
        component={MainTabNavigator}
        options={{
          headerShown: false,
          animation: 'fade',
        }}
      />
      <Stack.Screen
        name="CreatePost"
        component={CreatePostScreen}
      />
      <Stack.Screen
        name="ScheduleTraining"
        component={ScheduleTrainingScreen}
      />
    </Stack.Navigator>
  );
} 