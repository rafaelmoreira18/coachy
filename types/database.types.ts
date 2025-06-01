export type UserType = 'trainer' | 'client';

export interface Profile {
  id: string;
  user_id: string;
  user_type: UserType;
  full_name: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Omit<Profile, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Profile, 'id'>>;
      };
    };
  };
} 