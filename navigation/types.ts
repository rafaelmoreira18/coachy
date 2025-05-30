import { NavigatorScreenParams } from '@react-navigation/native';

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
};

export type MainTabParamList = {
  Feed: undefined;
  Community: undefined;
  Profile: undefined;
}; 