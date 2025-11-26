
export type TripId = 'nyc' | 'mystic' | 'la' | 'boston';
export type Voter = 'Mayla' | 'Lennon';

export interface TripOption {
  id: TripId;
  title: string;
  description: string[];
  imageUrl: string;
  imageAlt: string;
  galleryUrls: string[];
}

export interface AppState {
  selectedTripId: TripId | null;
  isYayaJoining: boolean;
  voter: Voter;
}
