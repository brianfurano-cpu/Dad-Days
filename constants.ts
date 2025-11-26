import { TripOption } from './types';

export const TRIPS: TripOption[] = [
  {
    id: 'nyc',
    title: 'Option 1: New York City Adventure',
    description: [
      'Take the train from Niantic, Connecticut to New York City',
      'Stay in an incredible corner room with floor-to-ceiling windows overlooking the city lights',
      'See a Broadway show! We can choose from The Outsiders, & Juliet, Harry Potter, Wicked, or The Book of Mormon',
      'Wander through Times Square at night and feel the energy of the city',
      'Have a nice dinner somewhere fun, maybe near the theater',
      'Do a little shopping and just enjoy being together in the city'
    ],
    // User-provided City View / Main
    imageUrl: 'https://i.imgur.com/VbV9suI.jpeg', 
    imageAlt: 'Hotel room view looking out over NYC',
    galleryUrls: [
      'https://i.imgur.com/1t9yEhu.mp4', // Greatest Day Video (Priority)
      'https://i.imgur.com/s8uLOin.jpeg', // Brooklyn Girls
      'https://i.imgur.com/ImYqVao.png', // City View Collage (Previous Cover)
      'https://i.imgur.com/2Yhl440.png', // New Bedroom View
      'https://i.imgur.com/XKHFI6Y.png', // Broadway Collage
      'https://i.imgur.com/G5NU788.png', // NYC Street/View 2
    ]
  },
  {
    id: 'mystic',
    title: 'Option 2: Cozy Mystic Getaway',
    description: [
      'Stay close to home in a cute Airbnb near Mystic',
      'Heated pool and hot tub vibes',
      'Snacks, movies, and hanging out',
      'Coffee runs, a visit to the bookstore, and a little bit of shopping'
    ],
    // New Street Cover Image
    imageUrl: 'https://i.imgur.com/BLvXIfI.png', 
    imageAlt: 'Mystic Downtown',
    galleryUrls: [
      'https://i.imgur.com/4itKgTE.jpeg', // Street Scene (Added to gallery)
      'https://i.imgur.com/h1PXG2O.png', // Bedroom
    ]
  },
  {
    id: 'la',
    title: 'Option 3: LA with Dad',
    description: [
      'Fly to LA and spend a couple of nights with Dad',
      'Visit some old favorite spots like Layla Bagels',
      'Go to Santa Monica or the pier',
      'See friends and enjoy the warm weather'
    ],
    // Hollywood Sign Cover
    imageUrl: 'https://i.imgur.com/qa2j3Nc.jpeg',
    imageAlt: 'Los Angeles Adventure',
    galleryUrls: [
      'https://i.imgur.com/qa2j3Nc.jpeg', // Hollywood Sign
      'https://i.imgur.com/vBfM4Es.png', // Layla Bagels
      'https://i.imgur.com/ytFW8jX.png', // Santa Monica 2
      'https://i.imgur.com/1FFKpxF.png', // Santa Monica Arch
    ]
  },
  {
    id: 'boston',
    title: 'Option 4: Boston City Break',
    description: [
      'Head up to Boston for a fun city trip',
      'Shop \'til we drop on Newbury Street',
      'Eat like queens and kings (maybe a fancy Italian dinner in the North End?)',
      'See if there is a fun play or show we can catch',
      'Walk around and explore the beautiful city streets'
    ],
    // User Provided Main Image
    imageUrl: 'https://i.imgur.com/DLb3NGL.jpeg',
    imageAlt: 'Boston City View',
    galleryUrls: [
      'https://i.imgur.com/DLb3NGL.jpeg', // Main Image
      'https://images.unsplash.com/photo-1493236296276-d17357e28b6b?auto=format&fit=crop&w=800&q=80', // Newbury Street / Shopping
      'https://images.unsplash.com/photo-1584950839832-72c1c3608139?auto=format&fit=crop&w=800&q=80', // North End Food
      'https://images.unsplash.com/photo-1506543730-36a9277061d4?auto=format&fit=crop&w=800&q=80', // Skyline / Seaport
      'https://images.unsplash.com/photo-1525091465222-2b6670809228?auto=format&fit=crop&w=800&q=80', // Public Garden
    ]
  }
];

export const STORAGE_KEY = 'trip_proposal_preferences';