import { NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Main: undefined;
  CreatePost: undefined;
  PostDetails: { postId: string };
  Comments: { postId: string };
  ScheduleTraining: {
    trainer: {
      name: string;
      specialty: string;
      price: string;
    };
  };
  RegisterType: undefined;
  PersonalRegister: undefined;
  StudentRegister: undefined;
  LessonList: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

export type MainTabParamList = {
  Feed: undefined;
  Community: undefined;
  Profile: undefined;
}; 