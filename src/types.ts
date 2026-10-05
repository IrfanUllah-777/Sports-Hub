export type PageId = 'home' | 'gap' | 'solution' | 'opportunities' | 'vision' | 'demo';

export interface NavItem {
  id: PageId;
  label: string;
}

export type StakeholderRole =
  | 'athlete'
  | 'enthusiast'
  | 'facility_owner'
  | 'academy_coach'
  | 'organizer'
  | 'community_leader';

export type UserRole =
  | 'guest'
  | 'athlete'
  | 'club_manager'
  | 'facility_owner'
  | 'organizer'
  | 'government_officer'
  | 'admin';

export interface EcosystemNode {
  id: string;
  name: string;
  category: string;
  role: string;
  description: string;
  iconName: string;
}

export interface FacilitySlot {
  id: string;
  facilityId: string;
  date: string; // YYYY-MM-DD
  time: string; // e.g. "07:00 - 08:00 AM"
  court: string; // e.g. "Pitch 1" or "Court A"
  price: number;
  status: 'available' | 'reserved' | 'maintenance';
  bookedBy?: string;
  bookingRef?: string;
}

export interface Facility {
  id: string;
  name: string;
  sport: string;
  city: string;
  area: string;
  surface: string;
  lighting: string;
  hourlyRate: number;
  rating: number;
  reviewsCount: number;
  imageUrl: string;
  amenities: string[];
  slots: FacilitySlot[];
}

export interface Booking {
  id: string;
  facilityId: string;
  facilityName: string;
  slotId: string;
  date: string;
  time: string;
  court: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  amount: number;
  status: 'confirmed' | 'pending' | 'cancelled';
  createdAt: string;
  passCode: string;
}

export interface TournamentMatch {
  matchId: string;
  teamA: string;
  teamB: string;
  scoreA?: number;
  scoreB?: number;
  winner?: string;
  timeSlot?: string;
}

export interface TournamentBracket {
  roundName: string; // "Quarter-Finals", "Semi-Finals", "Championship Final"
  matches: TournamentMatch[];
}

export interface Tournament {
  id: string;
  name: string;
  sport: string;
  city: string;
  venueName: string;
  startDate: string;
  endDate: string;
  entryFee: number;
  prizePool: string;
  squadCapacity: number;
  registeredTeams: {
    teamName: string;
    captain: string;
    contact: string;
    registeredAt: string;
  }[];
  skillLevel: string;
  status: 'open' | 'closed' | 'in_progress' | 'completed';
  brackets: TournamentBracket[];
}

export interface GovernmentScheme {
  id: string;
  title: string;
  department: string;
  category: 'youth_trials' | 'equipment_grant' | 'academy_subsidy' | 'infrastructure';
  grantAmount?: string;
  eligibility: string;
  deadline: string;
  verified: boolean;
  status: 'active' | 'closing_soon' | 'closed';
  applicantCount: number;
}
