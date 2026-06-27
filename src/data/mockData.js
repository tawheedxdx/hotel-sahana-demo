export const hotelRooms = [
  {
    id: "deluxe-room",
    name: "Deluxe Heritage Sanctuary",
    type: "Deluxe Room",
    price: 14500,
    rating: 4.8,
    reviewsCount: 142,
    size: "45 m²",
    occupancy: "2 Adults",
    bedType: "King Bed",
    view: "Palace Garden View",
    image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "The Deluxe Heritage Sanctuary offers a seamless blend of classic Indian architecture and contemporary refinement. Overlooking our meticulously manicured Mughal gardens, this room provides an exquisite haven of peace featuring handcrafted teak furniture, fine silk upholstery, and a marble-clad bathroom with a deep soaking tub.",
    amenities: ["Free High-Speed WiFi", "24/7 Butler Service", "Private Balcony", "Premium Mini Bar", "Espresso Machine", "Marble Bath", "Smart IP TV", "Luxury Bathrobes & Slippers"],
    policies: {
      checkIn: "Check-in from 2:00 PM. Early check-in subject to availability.",
      checkOut: "Check-out by 12:00 PM. Express check-out available.",
      cancellation: "Free cancellation up to 48 hours prior to arrival.",
      pets: "Pets are not allowed in this room category."
    },
    reviews: [
      { author: "Evelyn Ross", rating: 5, date: "May 12, 2026", comment: "An absolutely stunning room. The garden view in the morning is magical, and the butler service was impeccable." },
      { author: "Rajesh Kumar", rating: 4, date: "April 28, 2026", comment: "Beautifully styled room. Extremely comfortable bed. The selection in the minibar was premium." }
    ]
  },
  {
    id: "executive-room",
    name: "Royal Executive Club Haven",
    type: "Executive Room",
    price: 22000,
    rating: 4.9,
    reviewsCount: 98,
    size: "60 m²",
    occupancy: "2 Adults, 1 Child",
    bedType: "Super King Bed",
    view: "Skyline & River View",
    image: "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Designed for discerning travellers and business executives, the Royal Executive Club Haven features access to the exclusive Club Lounge. Enjoy complimentary high tea, evening cocktails, and private boardrooms. The room is equipped with a state-of-the-art workspace, automated climate control, and panoramas of the historic Hooghly River.",
    amenities: ["Club Lounge Access", "Free High-Speed WiFi", "24/7 Butler Service", "Complimentary High Tea", "Executive Workspace", "Premium Mini Bar", "Marble Bath", "Smart IP TV"],
    policies: {
      checkIn: "Check-in from 2:00 PM. Lounge check-in option included.",
      checkOut: "Check-out by 12:00 PM. Complimentary late check-out till 3:00 PM (subject to availability).",
      cancellation: "Free cancellation up to 24 hours prior to arrival.",
      pets: "Pets are not allowed."
    },
    reviews: [
      { author: "Michael Vance", rating: 5, date: "June 2, 2026", comment: "The Executive lounge access alone is worth it. Highly recommend for business trips." },
      { author: "Aanya Mehta", rating: 5, date: "May 20, 2026", comment: "Fantastic views of the river. The workspace was highly ergonomic and the butler service was incredibly prompt." }
    ]
  },
  {
    id: "family-suite",
    name: "Grand Imperial Family Residence",
    type: "Family Suite",
    price: 34000,
    rating: 4.85,
    reviewsCount: 86,
    size: "95 m²",
    occupancy: "4 Adults, 2 Children",
    bedType: "1 King & 2 Twin Beds",
    view: "Infinity Pool & Gardens",
    image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1505692795793-20f545c809a3?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "An elegant two-bedroom suite offering unparalleled space and sophistication for families. The Grand Imperial Family Residence boasts a spacious central living room, a dining table for six, and custom children's amenities. Floor-to-ceiling windows open onto balconies overlooking our spectacular infinity pool and lush resort grounds.",
    amenities: ["Two Private Bedrooms", "Separate Living & Dining Areas", "Free High-Speed WiFi", "24/7 Butler Service", "Complimentary Laundry Service", "Marble Baths (Two)", "Three Smart TVs", "Kid's Welcome Kit"],
    policies: {
      checkIn: "Check-in from 2:00 PM.",
      checkOut: "Check-out by 12:00 PM.",
      cancellation: "Free cancellation up to 72 hours prior to arrival.",
      pets: "Small pets (under 10kg) welcome with prior notification."
    },
    reviews: [
      { author: "The Sterling Family", rating: 5, date: "June 15, 2026", comment: "Our kids loved the welcome goodies. The suite is massive and extremely luxurious. We will return!" },
      { author: "Vikram Sen", rating: 4, date: "June 1, 2026", comment: "Very spacious, excellent decor, though room service took a bit longer due to the peak weekend." }
    ]
  },
  {
    id: "lake-view-suite",
    name: "Prana Lake View Serenity Suite",
    type: "Lake View Suite",
    price: 42000,
    rating: 4.95,
    reviewsCount: 74,
    size: "80 m²",
    occupancy: "2 Adults",
    bedType: "King Bed",
    view: "Pristine Lake & Mountain View",
    image: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1611891487122-207579d67d98?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Perched majestically at the water's edge, the Prana Serenity Suite offers a private retreat designed for tranquility. Features custom bay windows, a private outdoor deck with sun loungers, and an open-air stone bath. Enjoy complimentary private boat safaris at sunset and private yoga classes on your terrace.",
    amenities: ["Private Sun Deck", "Outdoor Stone Bath", "Complimentary Sunset Cruise", "Daily Yoga & Wellness Session", "Free High-Speed WiFi", "24/7 Butler Service", "Premium Wine Cooler", "Pillow Menu"],
    policies: {
      checkIn: "Check-in from 2:00 PM.",
      checkOut: "Check-out by 12:00 PM.",
      cancellation: "Free cancellation up to 5 days prior to arrival.",
      pets: "Pets are not allowed."
    },
    reviews: [
      { author: "Julianne Moore", rating: 5, date: "June 10, 2026", comment: "Waking up to the calm water and mountains was a dream. The sunset cruise was a highlight of our trip." },
      { author: "Amit Sharma", rating: 5, date: "May 25, 2026", comment: "Pure magic. The stone bath is incredible. Worth every rupee." }
    ]
  },
  {
    id: "presidential-suite",
    name: "Maharajah Grand Presidential Mansion",
    type: "Presidential Suite",
    price: 85000,
    rating: 5.0,
    reviewsCount: 42,
    size: "180 m²",
    occupancy: "4 Adults",
    bedType: "Two Royal Emperor Beds",
    view: "360° Lake & Palace Panorama",
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "The crown jewel of Hotel Sahana. The Maharajah Suite is a magnificent palace-wing layout offering absolute privacy. Accessible via a private elevator, this suite includes two opulent bedrooms, a dining saloon for ten, a private cinema room, and an infinity pool on the rooftop terrace. Complete with a dedicated chef, chauffeur service, and personal security detail.",
    amenities: ["Private Rooftop Pool", "Private Elevator Access", "Dedicated Chef & Chauffeur", "24/7 Royal Butler Team", "Private Cinema Room", "Luxury Yacht Airport Transfer", "Gold-Plated Fixtures", "Caviar & Champagne Welcome Bar"],
    policies: {
      checkIn: "Flexible Check-in. Dedicated liaison handles registration.",
      checkOut: "Flexible Check-out.",
      cancellation: "Free cancellation up to 7 days prior to arrival.",
      pets: "All pets welcome with dedicated pet butler."
    },
    reviews: [
      { author: "Lord H. Harrington", rating: 5, date: "June 20, 2026", comment: "Exceptional security, absolute luxury, and unmatched grandeur. Truly a palatial residence." },
      { author: "Sofia Coppola", rating: 5, date: "May 30, 2026", comment: "The design details, the private cinema, and the staff's discretion were absolutely top tier. A true masterpiece." }
    ]
  }
];

export const foodCategories = ["All Specials", "Breakfast", "Lunch", "Dinner", "Desserts", "Drinks"];

export const foodMenuItems = [
  // Breakfast
  {
    id: "bf-1",
    name: "Truffle & Gold Leaf Benedict",
    category: "Breakfast",
    price: 1250,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?auto=format&fit=crop&w=600&q=80",
    description: "Organic poached heritage eggs, house-cured wild boar pancetta, luxury Périgord black truffle shavings, covered in 24k gold leaf and saffron hollandaise on brioche.",
    popular: true
  },
  {
    id: "bf-2",
    name: "Saffron Infused Quinoa Oats",
    category: "Breakfast",
    price: 850,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1517881917430-e70dfb3610aa?auto=format&fit=crop&w=600&q=80",
    description: "Slow-cooked organic oats and white quinoa in almond milk, scented with Kashmiri saffron, topped with wild berries, organic honey, and sliced marcona almonds."
  },
  {
    id: "bf-3",
    name: "Pistachio Croissant Supreme",
    category: "Breakfast",
    price: 950,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80",
    description: "Double-baked buttery pastry loaded with artisan Sicilian pistachio paste, glazed with orange blossom water, topped with crushed green pistachios and edible gold dust."
  },
  
  // Lunch
  {
    id: "ln-1",
    name: "Pan-Seared Chilean Sea Bass",
    category: "Lunch",
    price: 2450,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=600&q=80",
    description: "Patagonian sea bass fillet, wild mushroom dashi broth, organic microgreens, glazed baby bok choy, served with hand-picked wild rice.",
    popular: true
  },
  {
    id: "ln-2",
    name: "Wagyu Beef Slider Quartet",
    category: "Lunch",
    price: 2800,
    rating: 4.85,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80",
    description: "Four custom bite-size A5 Wagyu beef patties, melted aged gruyère, caramelized fig spread, toasted brioche buns, served with truffle matchstick fries.",
    popular: true
  },
  {
    id: "ln-3",
    name: "Saffron Lobster Risotto",
    category: "Lunch",
    price: 2650,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80",
    description: "Acquerello carnaroli rice slow-cooked in rich lobster bisque, infused with saffron threads, topped with butter-poached Maine lobster claw and micro herbs."
  },

  // Dinner
  {
    id: "dn-1",
    name: "Gold Leaf Filet Mignon",
    category: "Dinner",
    price: 4200,
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80",
    description: "Prime dry-aged Angus beef tenderloin wrapped in delicate gold foil, charcoal-grilled to perfection, accompanied by a decadent bone marrow sauce and pomme purée.",
    popular: true
  },
  {
    id: "dn-2",
    name: "Caviar & Champagne Capellini",
    category: "Dinner",
    price: 3900,
    rating: 4.95,
    image: "https://images.unsplash.com/photo-1621510456681-23a23cfb5f57?auto=format&fit=crop&w=600&q=80",
    description: "Artisan angel hair pasta tossed in a velvety butter sauce scented with vintage Dom Pérignon, crowned with 30 grams of premium Beluga Caviar and chives.",
    popular: true
  },
  {
    id: "dn-3",
    name: "Rosemary Crusted Lamb Rack",
    category: "Dinner",
    price: 3500,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1514516345957-556ca7d90a29?auto=format&fit=crop&w=600&q=80",
    description: "New Zealand lamb rack crusted with sea salt and organic garden rosemary, wood-fire roasted, served with port-poached baby pears and mint pea purée."
  },

  // Desserts
  {
    id: "ds-1",
    name: "Valrhona Chocolate Lava Dome",
    category: "Desserts",
    price: 950,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80",
    description: "Decadent Valrhona dark chocolate cake with a molten core of white chocolate ganache, flambéed tableside with Grand Marnier liqueur, served with Madagascar vanilla gelato.",
    popular: true
  },
  {
    id: "ds-2",
    name: "Deconstructed Rose Kulfi",
    category: "Desserts",
    price: 850,
    rating: 4.75,
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80",
    description: "Rich condensed-milk cardamon kulfi crumbled over pistachio sponge cake, garnished with crystallised rose petals, rabri foam, and edible flower blossoms."
  },
  {
    id: "ds-3",
    name: "Grand Marnier Soufflé",
    category: "Desserts",
    price: 1100,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1579372786545-d24232daf58c?auto=format&fit=crop&w=600&q=80",
    description: "Light and airy orange liqueur soufflé baked to a towering height, dusted with confectioner's sugar, served with a warm vanilla bean crème anglaise pour-over."
  },

  // Drinks
  {
    id: "dr-1",
    name: "Imperial Saffron Elixir",
    category: "Drinks",
    price: 950,
    rating: 4.85,
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80",
    description: "Kashmiri saffron threads, gold leaf flakes, botanical gin, elderflower liqueur, fresh lemon juice, splash of tonic water, smoked with applewood.",
    popular: true
  },
  {
    id: "dr-2",
    name: "Smoked Rosemary Old Fashioned",
    category: "Drinks",
    price: 1200,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=600&q=80",
    description: "Single-barrel reserve bourbon, custom angostura-orange bitters, organic brown sugar syrup, stirred with clear block ice in a glass pre-smoked with fresh pine needles.",
    popular: true
  },
  {
    id: "dr-3",
    name: "Dom Pérignon Vintage Glass",
    category: "Drinks",
    price: 3500,
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1594487788084-256564619717?auto=format&fit=crop&w=600&q=80",
    description: "A flawless glass of vintage Dom Pérignon Champagne. Crisp, elegant bouquet, notes of white flowers, stone fruits, toasted brioche, served in a chilled crystal flute."
  }
];

export const hotelGallery = [
  { category: "Rooms", title: "Presidential Bedroom Mansion", image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=80" },
  { category: "Rooms", title: "Lake View Balcony Sunrise", image: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=800&q=80" },
  { category: "Restaurant", title: "Main Dining Saloon", image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80" },
  { category: "Restaurant", title: "Lakeside Sunset Canopy", image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80" },
  { category: "Pool", title: "Infinity Pool at Dusk", image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=800&q=80" },
  { category: "Pool", title: "Sun Lounger Serenity Deck", image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80" },
  { category: "Wellness", title: "Traditional Ayurvedic Spa", image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80" },
  { category: "Wellness", title: "State-of-the-Art Fitness Center", image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80" },
  { category: "Resort", title: "Palace Lobby Entrance", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80" },
  { category: "Resort", title: "Conference Grand Hall", image: "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?auto=format&fit=crop&w=800&q=80" }
];

export const clientReviews = [
  {
    name: "Lady Penelope Thorne",
    role: "Connoisseur Travele",
    text: "My stay at Sahana was a masterclass in luxury. The staff anticipated my every need before I could voice it. Waking up to the pristine view of the lake in the Presidential Suite is an experience I will never forget.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&h=150&q=80"
  },
  {
    name: "Dr. Kabir Sen",
    role: "Executive Board Member",
    text: "The Chef's Tasting Menu at the restaurant is easily Michelin-grade. Every dish is a work of art, layered with subtle spices and paired beautifully with vintage selections. A culinary triumph.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80"
  },
  {
    name: "Serena Williams",
    role: "Leisure Traveler",
    text: "An oasis of tranquility. The Ayurvedic spa was absolutely rejuvenating, and the infinity pool at sunset feels like you are swimming directly into the skyline. Truly ₹50 lakh level luxury.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80"
  }
];

export const mockDashboardData = {
  stats: {
    nightsStayed: 24,
    pointsEarned: 12500,
    activeBookings: 2,
    totalExpenses: 284000
  },
  myBookings: [
    {
      id: "BK-8739",
      roomName: "Prana Lake View Serenity Suite",
      checkIn: "2026-07-15",
      checkOut: "2026-07-18",
      guests: "2 Adults",
      status: "Confirmed",
      total: 126000,
      image: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=300&q=80"
    },
    {
      id: "BK-4290",
      roomName: "Deluxe Heritage Sanctuary",
      checkIn: "2026-08-02",
      checkOut: "2026-08-04",
      guests: "2 Adults",
      status: "Pending Payment",
      total: 29000,
      image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=300&q=80"
    }
  ],
  myReservations: [
    {
      id: "RS-1024",
      guests: 4,
      date: "2026-07-15",
      time: "20:00",
      zone: "Poolside Terrace",
      occasion: "Anniversary",
      status: "Confirmed"
    },
    {
      id: "RS-0953",
      guests: 2,
      date: "2026-06-20",
      time: "13:30",
      zone: "Main Salon",
      occasion: "Business Lunch",
      status: "Completed"
    }
  ],
  myFoodOrders: [
    {
      id: "OD-4820",
      date: "2026-06-20",
      items: [
        { name: "Wagyu Beef Slider Quartet", qty: 1, price: 2800 },
        { name: "Smoked Rosemary Old Fashioned", qty: 2, price: 2400 }
      ],
      total: 5200,
      status: "Delivered"
    }
  ]
};

export const adminDashboardData = {
  summary: {
    revenue: "₹24,85,300",
    revenueGrowth: "+18%",
    bookingsCount: 342,
    bookingsGrowth: "+12%",
    availableRooms: 12,
    occupiedRooms: 38,
    tableReservations: 18,
    todayOrders: 32
  },
  recentBookings: [
    { id: "BK-9021", guestName: "Sarah Jenkins", roomType: "Presidential Suite", date: "2026-06-27", status: "Checked In", amount: "₹1,70,000" },
    { id: "BK-9020", guestName: "Vikram Malhotra", roomType: "Lake View Suite", date: "2026-06-27", status: "Confirmed", amount: "₹84,000" },
    { id: "BK-9019", guestName: "Clara Dupont", roomType: "Deluxe Room", date: "2026-06-26", status: "Confirmed", amount: "₹29,000" },
    { id: "BK-9018", guestName: "John Thompson", roomType: "Executive Room", date: "2026-06-26", status: "Checked Out", amount: "₹44,000" }
  ],
  recentOrders: [
    { id: "OD-9801", guestRoom: "Room 402", item: "Gold Leaf Filet Mignon", qty: 2, total: "₹8,400", time: "18:45", status: "In Kitchen" },
    { id: "OD-9800", guestRoom: "Room 105", item: "Truffle Eggs Benedict", qty: 1, total: "₹1,250", time: "18:32", status: "Delivered" },
    { id: "OD-9799", guestRoom: "Table 5 (Lobby)", item: "Dom Pérignon Vintage Glass", qty: 3, total: "₹10,500", time: "18:15", status: "Delivered" }
  ]
};
