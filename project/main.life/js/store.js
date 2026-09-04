// SMARANA Store - Persistent state, dataset & memory capsule

const DEFAULT_COMPANION = {
    id: 'c1',
    name: 'Anaya',
    type: 'Granddaughter', // Granddaughter, Grandson, Friend, Cat
    gender: 'female',
    relationship: 'Virtual Granddaughter',
    addressAs: 'Dadu', // Grandpa, Grandma, Dadu, Nani, Thatha, etc.
    personality: 'Caring', // Sunshine, Caring, Calm, Curious, Playful
    language: 'Telugu', // English, Telugu, Hindi, Tamil, etc.
    voiceType: 'Cheerful young female',
    voiceRate: 0.95,
    voicePitch: 1.1,
    appearance: {
        skinTone: '#E8B993', // Warm Indian skin tone
        hairStyle: 'long-braid',
        hairColor: '#1A1818',
        eyeColor: '#4A2E16',
        outfitStyle: 'traditional-saree', // traditional-saree, kurta, modern-casual, festive
        outfitColor: '#C0392B', // Warm Crimson Saree with Gold trim
        accessories: ['bindi', 'earrings', 'glasses'],
        glasses: true
    }
};

const DEFAULT_PATIENT = {
    id: 'p1',
    name: 'Ramesh Kumar',
    age: 72,
    gender: 'male',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
    preferredLanguage: 'Telugu',
    streakDays: 7,
    mindPoints: 245,
    moodToday: '😊 Great',
    completedActivities: 3,
    totalActivities: 6,
    gardenLevel: 3,
    gardenPlants: ['Sunflower', 'Tulsi', 'Jasmine', 'Marigold', 'Mango Sapling'],
    assignedDoctor: 'Dr. Priya Sharma',
    caregiverName: 'Anand Kumar (Son)'
};

const MOCK_PATIENTS_LIST = [
    {
        id: 'p1',
        name: 'Ramesh Kumar',
        age: 72,
        language: 'Telugu',
        companionName: 'Anaya (Granddaughter)',
        lastActive: '10 mins ago',
        engagementStatus: 'High Engagement',
        weeklyCompletion: 88,
        streak: 7,
        mindPoints: 245,
        attentionNeeded: false,
        moodTrend: 'Positive',
        recentObservation: 'Strongest engagement with music recall and family photograph memories this week.'
    },
{
    id: 'p2',
    name: 'Lakshmi Devi',
    age: 68,
    language: 'Tamil',
    companionName: 'Arjun (Grandson)',
    lastActive: '2 days ago',
    engagementStatus: 'Low Engagement',
    weeklyCompletion: 42,
    streak: 2,
    mindPoints: 110,
    attentionNeeded: true,
    moodTrend: 'Fluctuating',
    recentObservation: 'Missed morning routines for 2 consecutive days. Gentle family check-in recommended.'
},
{
    id: 'p3',
    name: 'Suresh Patel',
    age: 76,
    language: 'Gujarati',
    companionName: 'Maya (Friend)',
    lastActive: '1 hour ago',
    engagementStatus: 'Moderate Engagement',
    weeklyCompletion: 70,
    streak: 5,
    mindPoints: 190,
    attentionNeeded: false,
    moodTrend: 'Calm',
    recentObservation: 'Enjoys digital literacy simulations and cultural history quizzes.'
},
{
    id: 'p4',
    name: 'Sarojini Naidu',
    age: 81,
    language: 'Hindi',
    companionName: 'Leo (AI Cat)',
    lastActive: '3 hours ago',
    engagementStatus: 'High Engagement',
    weeklyCompletion: 92,
    streak: 12,
    mindPoints: 340,
    attentionNeeded: false,
    moodTrend: 'Joyful',
    recentObservation: 'Responds warmly to pet touch interactions and musical sing-alongs.'
}
];

const MOCK_DAILY_JOURNEY = [
    {
        id: 'j1',
        title: 'Morning Conversation',
        type: 'talk',
        icon: '🗣️',
        description: 'Share how you feel with your companion',
        completed: true,
        points: 20
    },
{
    id: 'j2',
    title: 'Memory Match Game',
    type: 'game',
    icon: '🧠',
    description: 'Match familiar cards to exercise recall',
    completed: true,
    points: 30
},
{
    id: 'j3',
    title: 'Learn Something New',
    type: 'learn',
    icon: '📚',
    description: 'Practical smartphone video call guide',
    completed: true,
    points: 25
},
{
    id: 'j4',
    title: 'Memory Moment',
    type: 'memory',
    icon: '❤️',
    description: 'Look at a family photo from 1982',
    completed: false,
    points: 30
},
{
    id: 'j5',
    title: 'Family Voice Message',
    type: 'family',
    icon: '👨‍👩‍👧',
    description: 'Listen to a audio message from Kavya',
    completed: false,
    points: 20
},
{
    id: 'j6',
    title: 'Move & Relax',
    type: 'relax',
    icon: '🚶',
    description: '3-minute gentle breathing with Anaya',
    completed: false,
    points: 20
}
];

const MOCK_MEMORIES = [
    {
        id: 'm1',
        title: 'Family Trip to Tirupati (1985)',
        category: 'Travel',
        date: 'October 1985',
        image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=600',
        description: 'Our annual temple visit with young Anand and Sunita. We stayed at the hill cottages.',
        audioNote: 'audio_tirupati_1985.mp3',
        people: ['Wife (Geeta)', 'Son (Anand)', 'Daughter (Sunita)'],
        storyText: 'We traveled by train from Hyderabad. The children were so excited to see the hills.'
    },
{
    id: 'm2',
    title: 'Kavya\'s First Birthday',
    category: 'Family',
    date: 'March 2015',
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600',
    description: 'Granddaughter Kavya turned 1 year old. Grandfather Dadu held the cake cutting knife with her.',
    audioNote: 'audio_kavya_bday.mp3',
    people: ['Granddaughter (Kavya)', 'Son (Anand)', 'Daughter-in-law (Ritu)'],
    storyText: 'She wore a small yellow frock and clapped whenever anyone sang.'
},
{
    id: 'm3',
    title: 'Railway Office Retirement Farewell',
    category: 'Career',
    date: 'June 2012',
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600',
    description: 'Completed 35 years of honorable service in South Central Railways.',
    audioNote: 'audio_retirement.mp3',
    people: ['Colleagues', 'Station Master Sharma'],
    storyText: 'All my colleagues presented a silver memento. Station Master Sharma gave a moving speech.'
}
];

const MOCK_LIFE_STORY = [
    { era: 'Childhood (1954-1965)', highlight: 'Grew up in Guntur village near Krishna river. Loved playing marbles under neem tree.' },
    { era: 'College & Early Life (1970-1974)', highlight: 'Graduated in Commerce from Loyola College Vijayawada.' },
    { era: 'Marriage & Family (1978)', highlight: 'Married Geeta Devi in a traditional ceremony in Rajahmundry.' },
    { era: 'Railways Career (1977-2012)', highlight: 'Dedicated 35 years as Chief Commercial Superintendent.' },
    { era: 'Grandfatherhood (2014-Present)', highlight: 'Blessed with grandchildren Kavya and Rohan. Enjoying garden & music.' }
];

const MOCK_FAMILY_MESSAGES = [
    {
        id: 'fm1',
        sender: 'Kavya (Granddaughter)',
        relation: 'Granddaughter',
        avatar: '👧',
        time: 'Today, 9:30 AM',
        type: 'voice',
        message: 'Dadu! I won 1st prize in school science exhibition today! I am bringing my trophy home to show you evening!',
        audioDuration: '0:28'
    },
{
    id: 'fm2',
    sender: 'Anand (Son)',
    relation: 'Son',
    avatar: '👨',
    time: 'Yesterday, 8:15 PM',
    type: 'photo',
    image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=600',
    message: 'Dad, we bought the fresh mangoes you like from the market. Bringing them on Sunday!',
    audioDuration: null
}
];

const MOCK_MEMORY_QUESTS = [
    {
        id: 'mq1',
        askedBy: 'Kavya',
        question: 'Ask Dadu about his very first bicycle when he was a boy in school!',
        rewardPoints: 40,
        status: 'Pending'
    },
{
    id: 'mq2',
    askedBy: 'Anand',
    question: 'Ask Dad about the recipe for his famous traditional tamarind rice (Pulihora)!',
    rewardPoints: 30,
    status: 'Completed'
}
];

const MOCK_CONSENT_MATRIX = [
    { feature: 'Share Activity Summaries with Doctor', granted: true, description: 'Allows Dr. Sharma to monitor daily cognitive game participation trends.' },
{ feature: 'Allow Family Photo Uploads', granted: true, description: 'Permits son Anand and granddaughter Kavya to upload family album photos.' },
{ feature: 'Personal Memory Graph Access for Companion', granted: true, description: 'Allows companion Anaya to ask gentle reminiscence questions about approved photos.' },
{ feature: 'Audio Recording in Memory Diary', granted: true, description: 'Stores voice notes securely in local memory capsule.' }
];

class SmarnaStore {
    constructor() {
        this.role = 'ELDER'; // ELDER, DOCTOR, LANDING
        this.companion = this.load('smarna_companion', DEFAULT_COMPANION);
        this.patient = this.load('smarna_patient', DEFAULT_PATIENT);
        this.journey = this.load('smarna_journey', MOCK_DAILY_JOURNEY);
        this.memories = this.load('smarna_memories', MOCK_MEMORIES);
        this.patientsList = MOCK_PATIENTS_LIST;
        this.accessibility = this.load('smarna_access', {
            highContrast: false,
            largeText: false,
            voiceFirst: false,
            easyMode: true
        });
        this.listeners = [];
    }

    load(key, fallback) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : fallback;
        } catch (e) {
            return fallback;
        }
    }

    save(key, val) {
        try {
            localStorage.setItem(key, JSON.stringify(val));
        } catch (e) {}
    }

    subscribe(fn) {
        this.listeners.push(fn);
        return () => {
            this.listeners = this.listeners.filter(l => l !== fn);
        };
    }

    notify() {
        this.listeners.forEach(fn => fn());
    }

    setRole(newRole) {
        this.role = newRole;
        this.notify();
    }

    updateCompanion(newConfig) {
        this.companion = { ...this.companion, ...newConfig };
        this.save('smarna_companion', this.companion);
        this.notify();
    }

    updatePatient(newPatient) {
        this.patient = { ...this.patient, ...newPatient };
        this.save('smarna_patient', this.patient);
        this.notify();
    }

    completeJourneyActivity(activityId) {
        let earned = 0;
        this.journey = this.journey.map(item => {
            if (item.id === activityId && !item.completed) {
                earned = item.points;
                return { ...item, completed: true };
            }
            return item;
        });
        this.save('smarna_journey', this.journey);

        if (earned > 0) {
            const completedCount = this.journey.filter(i => i.completed).length;
            this.patient.completedActivities = completedCount;
            this.patient.mindPoints += earned;

            // Check garden level up
            if (this.patient.mindPoints >= 300 && this.patient.gardenLevel < 4) {
                this.patient.gardenLevel = 4;
                this.patient.gardenPlants.push('Rose Bush');
            }
            this.save('smarna_patient', this.patient);
        }

        this.notify();
        return earned;
    }

    addMemory(newMem) {
        this.memories = [newMem, ...this.memories];
        this.save('smarna_memories', this.memories);
        this.notify();
    }

    updateAccessibility(cfg) {
        this.accessibility = { ...this.accessibility, ...cfg };
        this.save('smarna_access', this.accessibility);
        this.notify();
    }
}

window.smarnaStore = new SmarnaStore();

