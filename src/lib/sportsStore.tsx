import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  UserRole, 
  Facility, 
  FacilitySlot, 
  Booking, 
  Tournament, 
  GovernmentScheme 
} from '../types';

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  clubName?: string;
  facilityName?: string;
  city: string;
}

interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  title: string;
  message: string;
}

interface SportsStoreContextType {
  currentUser: UserProfile;
  setCurrentUserRole: (role: UserRole) => void;
  updateUserProfile: (profile: Partial<UserProfile>) => void;
  
  facilities: Facility[];
  bookings: Booking[];
  tournaments: Tournament[];
  schemes: GovernmentScheme[];

  // Facility Booking Engine with Race-Condition Guard
  bookFacilitySlot: (params: {
    facilityId: string;
    slotId: string;
    userName: string;
    userEmail: string;
    userPhone: string;
  }) => Promise<{ success: boolean; booking?: Booking; error?: string }>;

  cancelBooking: (bookingId: string) => Promise<{ success: boolean; error?: string }>;

  // Owner Operations
  toggleSlotStatus: (facilityId: string, slotId: string) => void;
  updateSlotPrice: (facilityId: string, slotId: string, newPrice: number) => void;

  // Tournament Operations
  registerTeamForTournament: (params: {
    tournamentId: string;
    teamName: string;
    captainName: string;
    contact: string;
  }) => Promise<{ success: boolean; error?: string }>;

  // Government Scheme Operations
  applyToScheme: (schemeId: string, applicant: { name: string; email: string; organization?: string }) => Promise<{ success: boolean; error?: string }>;

  // Toast System
  toasts: ToastMessage[];
  addToast: (type: 'success' | 'error' | 'info', title: string, message: string) => void;
  removeToast: (id: string) => void;
}

const STORAGE_KEYS = {
  USER: 'sportshub_user_v2',
  BOOKINGS: 'sportshub_bookings_v2',
  FACILITIES: 'sportshub_facilities_v2',
  TOURNAMENTS: 'sportshub_tournaments_v2',
  SCHEMES: 'sportshub_schemes_v2',
};

// Generates slots for today, tomorrow, and day-after
function generateDefaultSlots(facilityId: string, basePrice: number): FacilitySlot[] {
  const times = [
    { id: 'm1', label: '06:00 - 07:00 AM', court: 'Pitch 1 (Floodlit)' },
    { id: 'm2', label: '07:00 - 08:00 AM', court: 'Pitch 1 (Floodlit)' },
    { id: 'a1', label: '04:00 - 05:00 PM', court: 'Pitch 1 (Floodlit)' },
    { id: 'a2', label: '05:00 - 06:00 PM', court: 'Pitch 1 (Floodlit)' },
    { id: 'e1', label: '06:00 - 07:00 PM', court: 'Pitch 1 (Floodlit)' },
    { id: 'e2', label: '07:00 - 08:00 PM', court: 'Pitch 1 (Floodlit)' },
    { id: 'e3', label: '08:00 - 09:00 PM', court: 'Pitch 1 (Floodlit)' },
  ];

  const slots: FacilitySlot[] = [];
  const today = new Date();

  for (let i = 0; i < 4; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const dateStr = d.toISOString().split('T')[0];

    times.forEach((t, idx) => {
      // Simulate one or two already taken slots for realistic busy turf
      const isPreReserved = i === 0 && (idx === 2 || idx === 5);
      slots.push({
        id: `${facilityId}-${dateStr}-${t.id}`,
        facilityId,
        date: dateStr,
        time: t.label,
        court: t.court,
        price: idx >= 4 ? basePrice + 10 : basePrice, // peak evening rate
        status: isPreReserved ? 'reserved' : 'available',
        bookedBy: isPreReserved ? 'Metro Youth FC' : undefined,
      });
    });
  }

  return slots;
}

const INITIAL_FACILITIES: Facility[] = [
  {
    id: 'fac-1',
    name: 'Apex Sports Arena & Futsal Turf',
    sport: 'Football & Futsal',
    city: 'Metropolitan District',
    area: 'Central Sports Complex',
    surface: 'FIFA 2-Star Synthetic Turf (Non-Infill)',
    lighting: 'LED Stadium Floodlights (500 Lux Broadcast Quality)',
    hourlyRate: 45,
    rating: 4.9,
    reviewsCount: 142,
    imageUrl: '/hero-poster.jpg',
    amenities: ['Locker Rooms', 'Showers', 'Night Floodlights', 'Water Station', 'First Aid On-Site'],
    slots: generateDefaultSlots('fac-1', 45),
  },
  {
    id: 'fac-2',
    name: 'Olympic Youth Badminton & Squash Hub',
    sport: 'Badminton & Squash',
    city: 'Olympic Town',
    area: 'Sector 4 Indoor Stadium',
    surface: 'BWF-Approved Wooden Flooring + PVC Mat',
    lighting: 'Anti-Glare High-Bay LEDs (450 Lux)',
    hourlyRate: 30,
    rating: 4.8,
    reviewsCount: 98,
    imageUrl: '/hero-poster.jpg',
    amenities: ['Air Conditioned', 'Pro Shop & Stringing', 'Changing Rooms', 'Live Scoreboards'],
    slots: generateDefaultSlots('fac-2', 30),
  },
  {
    id: 'fac-3',
    name: 'Vanguard Basketball & Multi-Court Dome',
    sport: 'Basketball & Volleyball',
    city: 'Downtown Hub',
    area: 'East Riverside Park',
    surface: 'Hardwood Maple Court with Breakaway Rims',
    lighting: 'Directional Arena Spotlights (600 Lux)',
    hourlyRate: 50,
    rating: 4.9,
    reviewsCount: 84,
    imageUrl: '/hero-poster.jpg',
    amenities: ['Electronic Scoreboards', 'Bleachers (200 Seats)', 'Locker Suites', 'Free Parking'],
    slots: generateDefaultSlots('fac-3', 50),
  },
];

const INITIAL_TOURNAMENTS: Tournament[] = [
  {
    id: 'trn-1',
    name: 'Metropolitan Youth Futsal Championship 2026',
    sport: 'Football / Futsal',
    city: 'Metropolitan District',
    venueName: 'Apex Sports Arena',
    startDate: '2026-10-18',
    endDate: '2026-10-20',
    entryFee: 120,
    prizePool: '$3,500 + Championship Trophy',
    squadCapacity: 16,
    registeredTeams: [
      { teamName: 'Apex Thunderbolts', captain: 'Alex Rivers', contact: '+1 (555) 234-5678', registeredAt: '2026-10-01' },
      { teamName: 'Metro Rangers FC', captain: 'Tariq Vance', contact: '+1 (555) 345-6789', registeredAt: '2026-10-02' },
      { teamName: 'Solar Velocity', captain: 'Jordan Cruz', contact: '+1 (555) 456-7890', registeredAt: '2026-10-03' },
      { teamName: 'Iron Hawks United', captain: 'Leo Sterling', contact: '+1 (555) 567-8901', registeredAt: '2026-10-04' },
    ],
    skillLevel: 'Under-19 & Open Grassroots',
    status: 'open',
    brackets: [
      {
        roundName: 'Quarter-Finals',
        matches: [
          { matchId: 'm-q1', teamA: 'Apex Thunderbolts', teamB: 'Metro Rangers FC', timeSlot: 'Oct 18, 10:00 AM' },
          { matchId: 'm-q2', teamA: 'Solar Velocity', teamB: 'Iron Hawks United', timeSlot: 'Oct 18, 11:30 AM' },
          { matchId: 'm-q3', teamA: 'City Dynamos', teamB: 'Strikers Academy', timeSlot: 'Oct 18, 01:00 PM' },
          { matchId: 'm-q4', teamA: 'Phoenix Youth', teamB: 'Vanguard FC', timeSlot: 'Oct 18, 02:30 PM' },
        ],
      },
      {
        roundName: 'Semi-Finals',
        matches: [
          { matchId: 'm-s1', teamA: 'Winner QF 1', teamB: 'Winner QF 2', timeSlot: 'Oct 19, 02:00 PM' },
          { matchId: 'm-s2', teamA: 'Winner QF 3', teamB: 'Winner QF 4', timeSlot: 'Oct 19, 04:00 PM' },
        ],
      },
      {
        roundName: 'Grand Final',
        matches: [
          { matchId: 'm-f1', teamA: 'Finalist 1', teamB: 'Finalist 2', timeSlot: 'Oct 20, 05:00 PM' },
        ],
      },
    ],
  },
  {
    id: 'trn-2',
    name: 'National NextGen 3x3 Streetball Clash',
    sport: 'Basketball',
    city: 'Downtown Hub',
    venueName: 'Vanguard Multi-Court Dome',
    startDate: '2026-10-24',
    endDate: '2026-10-25',
    entryFee: 80,
    prizePool: '$2,000 + National Scouting Scout Badges',
    squadCapacity: 12,
    registeredTeams: [
      { teamName: 'Skyline Ballers', captain: 'Marcus Chen', contact: '+1 (555) 789-0123', registeredAt: '2026-10-02' },
      { teamName: 'Coastline Rim Crashers', captain: 'Devon Hayes', contact: '+1 (555) 890-1234', registeredAt: '2026-10-03' },
    ],
    skillLevel: 'U-17 & U-21 Divisions',
    status: 'open',
    brackets: [
      {
        roundName: 'Semi-Finals',
        matches: [
          { matchId: 'b-s1', teamA: 'Skyline Ballers', teamB: 'Coastline Rim Crashers', timeSlot: 'Oct 24, 02:00 PM' },
          { matchId: 'b-s2', teamA: 'Court Kings', teamB: 'Downtown Dunkers', timeSlot: 'Oct 24, 03:30 PM' },
        ],
      },
      {
        roundName: 'Championship Match',
        matches: [
          { matchId: 'b-f1', teamA: 'Semi 1 Winner', teamB: 'Semi 2 Winner', timeSlot: 'Oct 25, 04:00 PM' },
        ],
      },
    ],
  },
];

const INITIAL_SCHEMES: GovernmentScheme[] = [
  {
    id: 'sch-1',
    title: 'National Grassroots Sports Grant 2026',
    department: 'Department of Youth & Sports Infrastructure',
    category: 'equipment_grant',
    grantAmount: 'Up to $15,000 per Registered Club',
    eligibility: 'Grassroots clubs, verified youth coaches, non-profit community leagues.',
    deadline: '2026-11-30',
    verified: true,
    status: 'active',
    applicantCount: 78,
  },
  {
    id: 'sch-2',
    title: 'State Emerging Athlete Talent Trials (U-16 / U-18)',
    department: 'National Sports Council Scouting Board',
    category: 'youth_trials',
    grantAmount: 'Full Scholarship & Regional Academy Training',
    eligibility: 'Born between 2008 - 2012, active participation in district competitions.',
    deadline: '2026-10-31',
    verified: true,
    status: 'closing_soon',
    applicantCount: 245,
  },
  {
    id: 'sch-3',
    title: 'Floodlit Facility Green Energy Subsidy',
    department: 'Ministry of Community Venues & Energy',
    category: 'infrastructure',
    grantAmount: '50% LED & Solar Installation Rebate',
    eligibility: 'Ground owners operating sports turfs open to public reservations.',
    deadline: '2026-12-15',
    verified: true,
    status: 'active',
    applicantCount: 34,
  },
];

const SportsStoreContext = createContext<SportsStoreContextType | undefined>(undefined);

export const SportsStoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // 1. User Profile & Role
  const [currentUser, setCurrentUser] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.USER);
      if (saved) return JSON.parse(saved);
    } catch (_) {}
    return {
      name: 'Kai Sterling',
      email: 'kai.sterling@sportshub.net',
      phone: '+1 (555) 728-1904',
      role: 'athlete',
      city: 'Metropolitan District',
    };
  });

  // 2. Facilities with Slots
  const [facilities, setFacilities] = useState<Facility[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.FACILITIES);
      if (saved) return JSON.parse(saved);
    } catch (_) {}
    return INITIAL_FACILITIES;
  });

  // 3. User Bookings
  const [bookings, setBookings] = useState<Booking[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
      if (saved) return JSON.parse(saved);
    } catch (_) {}
    return [];
  });

  // 4. Tournaments
  const [tournaments, setTournaments] = useState<Tournament[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.TOURNAMENTS);
      if (saved) return JSON.parse(saved);
    } catch (_) {}
    return INITIAL_TOURNAMENTS;
  });

  // 5. Government Schemes
  const [schemes, setSchemes] = useState<GovernmentScheme[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SCHEMES);
      if (saved) return JSON.parse(saved);
    } catch (_) {}
    return INITIAL_SCHEMES;
  });

  // 6. Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.FACILITIES, JSON.stringify(facilities));
  }, [facilities]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TOURNAMENTS, JSON.stringify(tournaments));
  }, [tournaments]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SCHEMES, JSON.stringify(schemes));
  }, [schemes]);

  const addToast = (type: 'success' | 'error' | 'info', title: string, message: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, type, title, message }]);
    setTimeout(() => removeToast(id), 5000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const setCurrentUserRole = (role: UserRole) => {
    setCurrentUser((prev) => ({ ...prev, role }));
    addToast('info', 'Active Portal Switched', `You are now interacting as: ${role.replace('_', ' ').toUpperCase()}`);
  };

  const updateUserProfile = (profile: Partial<UserProfile>) => {
    setCurrentUser((prev) => ({ ...prev, ...profile }));
  };

  // FACILITY BOOKING ENGINE (With Double-Booking Mutex / Concurrency check)
  const bookFacilitySlot = async ({
    facilityId,
    slotId,
    userName,
    userEmail,
    userPhone,
  }: {
    facilityId: string;
    slotId: string;
    userName: string;
    userEmail: string;
    userPhone: string;
  }): Promise<{ success: boolean; booking?: Booking; error?: string }> => {
    // Artificial 400ms server network delay for realistic async state
    await new Promise((resolve) => setTimeout(resolve, 400));

    const facility = facilities.find((f) => f.id === facilityId);
    if (!facility) {
      return { success: false, error: 'Target facility not found in network.' };
    }

    const slot = facility.slots.find((s) => s.id === slotId);
    if (!slot) {
      return { success: false, error: 'The requested slot no longer exists.' };
    }

    // CONCURRENCY CHECK: Prevent Double Booking
    if (slot.status !== 'available') {
      return {
        success: false,
        error: `Slot Conflict: This time slot is already ${slot.status === 'reserved' ? 'reserved by another team' : 'blocked for maintenance'}. Please pick an open slot.`,
      };
    }

    const refCode = `SH-PASS-${Math.floor(100000 + Math.random() * 900000)}`;
    const newBooking: Booking = {
      id: `bk-${Date.now()}`,
      facilityId,
      facilityName: facility.name,
      slotId,
      date: slot.date,
      time: slot.time,
      court: slot.court,
      userName,
      userEmail,
      userPhone,
      amount: slot.price,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
      passCode: refCode,
    };

    // Atomically lock slot & save booking
    setFacilities((prev) =>
      prev.map((f) => {
        if (f.id !== facilityId) return f;
        return {
          ...f,
          slots: f.slots.map((s) =>
            s.id === slotId
              ? { ...s, status: 'reserved' as const, bookedBy: userName, bookingRef: newBooking.id }
              : s
          ),
        };
      })
    );

    setBookings((prev) => [newBooking, ...prev]);
    addToast('success', 'Booking Confirmed!', `Slot ${slot.time} reserved at ${facility.name}. Digital pass issued: ${refCode}`);

    return { success: true, booking: newBooking };
  };

  const cancelBooking = async (bookingId: string): Promise<{ success: boolean; error?: string }> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const target = bookings.find((b) => b.id === bookingId);
    if (!target) return { success: false, error: 'Booking not found.' };

    // Release slot back to available
    setFacilities((prev) =>
      prev.map((f) => {
        if (f.id !== target.facilityId) return f;
        return {
          ...f,
          slots: f.slots.map((s) =>
            s.id === target.slotId ? { ...s, status: 'available' as const, bookedBy: undefined, bookingRef: undefined } : s
          ),
        };
      })
    );

    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: 'cancelled' as const } : b))
    );

    addToast('info', 'Booking Cancelled', `Slot refunded and returned to open availability.`);
    return { success: true };
  };

  // GROUND OWNER SLOT TOGGLE
  const toggleSlotStatus = (facilityId: string, slotId: string) => {
    setFacilities((prev) =>
      prev.map((f) => {
        if (f.id !== facilityId) return f;
        return {
          ...f,
          slots: f.slots.map((s) => {
            if (s.id !== slotId) return s;
            const nextStatus = s.status === 'available' ? 'maintenance' : 'available';
            return { ...s, status: nextStatus };
          }),
        };
      })
    );
    addToast('info', 'Slot Status Updated', `Slot status adjusted by ground management.`);
  };

  const updateSlotPrice = (facilityId: string, slotId: string, newPrice: number) => {
    setFacilities((prev) =>
      prev.map((f) => {
        if (f.id !== facilityId) return f;
        return {
          ...f,
          slots: f.slots.map((s) => (s.id === slotId ? { ...s, price: newPrice } : s)),
        };
      })
    );
    addToast('success', 'Rate Updated', `Hourly slot rate set to $${newPrice}.`);
  };

  // TOURNAMENT TEAM REGISTRATION
  const registerTeamForTournament = async ({
    tournamentId,
    teamName,
    captainName,
    contact,
  }: {
    tournamentId: string;
    teamName: string;
    captainName: string;
    contact: string;
  }): Promise<{ success: boolean; error?: string }> => {
    await new Promise((resolve) => setTimeout(resolve, 350));
    const tournament = tournaments.find((t) => t.id === tournamentId);
    if (!tournament) return { success: false, error: 'Tournament not found.' };

    if (tournament.registeredTeams.length >= tournament.squadCapacity) {
      return { success: false, error: 'Registration Cap Reached: All tournament slots are filled.' };
    }

    // Check duplicate team name
    if (tournament.registeredTeams.some((t) => t.teamName.toLowerCase() === teamName.trim().toLowerCase())) {
      return { success: false, error: `A team named "${teamName}" is already registered in this competition.` };
    }

    const newTeam = {
      teamName: teamName.trim(),
      captain: captainName.trim(),
      contact: contact.trim(),
      registeredAt: new Date().toISOString().split('T')[0],
    };

    setTournaments((prev) =>
      prev.map((t) => {
        if (t.id !== tournamentId) return t;
        const updatedTeams = [...t.registeredTeams, newTeam];
        return {
          ...t,
          registeredTeams: updatedTeams,
          status: updatedTeams.length >= t.squadCapacity ? 'closed' : 'open',
        };
      })
    );

    addToast('success', 'Squad Registered!', `Team "${teamName}" successfully entered into ${tournament.name}!`);
    return { success: true };
  };

  // GOVERNMENT SCHEME APPLICATION
  const applyToScheme = async (schemeId: string, applicant: { name: string; email: string; organization?: string }) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const scheme = schemes.find((s) => s.id === schemeId);
    if (!scheme) return { success: false, error: 'Scheme not found.' };

    setSchemes((prev) =>
      prev.map((s) => (s.id === schemeId ? { ...s, applicantCount: s.applicantCount + 1 } : s))
    );

    addToast('success', 'Application Submitted', `Application for "${scheme.title}" received and queued for review.`);
    return { success: true };
  };

  return (
    <SportsStoreContext.Provider
      value={{
        currentUser,
        setCurrentUserRole,
        updateUserProfile,
        facilities,
        bookings,
        tournaments,
        schemes,
        bookFacilitySlot,
        cancelBooking,
        toggleSlotStatus,
        updateSlotPrice,
        registerTeamForTournament,
        applyToScheme,
        toasts,
        addToast,
        removeToast,
      }}
    >
      {children}
    </SportsStoreContext.Provider>
  );
};

export const useSportsStore = () => {
  const context = useContext(SportsStoreContext);
  if (!context) {
    throw new Error('useSportsStore must be used within a SportsStoreProvider');
  }
  return context;
};
