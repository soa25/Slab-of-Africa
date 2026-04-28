export interface Artwork {
  id: number
  title: string
  artist: string
  material: string
  size: string
  year: number
  image: string
  aspectRatio: 'portrait' | 'landscape' | 'square'
  featured?: boolean
  description?: string
  images?: string[]
  note?: string
}

export interface Artist {
  id: number
  name: string
  image: string
  born: string
  origin: string
  bio: string
  extended: string
  signature: string
}

export interface Fair {
  id: number
  name: string
  location: string
  year: number
  dates: string
  description: string
  images: string[]
  highlight: string
}

export const recentAdditions: Artwork[] = [
  // 1
  {
    id: 76,
    title: 'Apple of My Eye',
    artist: 'Dominic Benhura',
    material: 'Springstone and Dolomite',
    size: '36 × 15 × 8 in',
    year: 2024,
    image: '/images/recent/apple-of-my-eye-dominic.jpg',
    aspectRatio: 'portrait',
    description: 'Placeholder description for this work.',
    images: ['/images/recent/apple-of-my-eye-dominic.jpg'],
  },
  // 2
  {
    id: 2,
    title: 'Family Discussion',
    artist: 'Bywell Sango',
    material: 'Green Opal',
    size: '29 × 16.5 in',
    year: 2024,
    image: '/images/recent/Family%20Discussion.jpg',
    aspectRatio: 'portrait',
    description: 'Placeholder description for this work.',
    images: [
      '/images/recent/Family%20Discussion.jpg',
      '/images/recent/Family%20Discussion/Family%20Discussion%202%20.jpg',
    ],
  },
  // 3
  {
    id: 4,
    title: 'Infinity',
    artist: 'Gift Rusere',
    material: 'Spring Stone',
    size: '32 × 12.5 in',
    year: 2024,
    image: '/images/recent/Infinity.jpg',
    aspectRatio: 'portrait',
    description: 'Placeholder description for this work.',
    images: [
      '/images/recent/Infinity.jpg',
      '/images/recent/Infinity/DSC_0177.jpg',
    ],
  },
  // 4
  {
    id: 77,
    title: 'Happiness',
    artist: 'Dominic Benhura',
    material: 'Springstone',
    size: '37 × 9 × 7 in',
    year: 2024,
    image: '/images/recent/happiness-dominic.jpg',
    aspectRatio: 'portrait',
    description: 'Placeholder description for this work.',
    images: ['/images/recent/happiness-dominic.jpg'],
  },
  // 5
  {
    id: 1,
    title: 'Bonded Souls',
    artist: 'Gift Rusere',
    material: 'Green Opal',
    size: '19 × 15 in',
    year: 2024,
    image: '/images/recent/Bonded%20Souls.jpg',
    aspectRatio: 'portrait',
    featured: true,
    description: 'Placeholder description for this work.',
    images: [
      '/images/recent/Bonded%20Souls.jpg',
      '/images/recent/Bonded%20Souls/Bonded%20Souls%202%20.jpg',
      '/images/recent/Bonded%20Souls/DSC_0195.jpg',
      '/images/recent/Bonded%20Souls/DSC_0197.jpg',
    ],
  },
  // 6
  {
    id: 7,
    title: 'Lovers',
    artist: 'Lovemore Bonjisi',
    material: 'Cobalt',
    size: '27.5 × 16.5 in',
    year: 2024,
    image: '/images/recent/DSC_0163.jpg',
    aspectRatio: 'portrait',
    description: 'Placeholder description for this work.',
    images: [
      '/images/recent/DSC_0163.jpg',
      '/images/recent/Lovers/DSC_0168.jpg',
      '/images/recent/Lovers/Lovers.jpg',
    ],
  },
  // 7
  {
    id: 9,
    title: 'Abstract',
    artist: 'Tafadzwa Mamvura',
    material: 'Red Jasper',
    size: '24 × 11 × 8.5 in',
    year: 2024,
    image: '/images/recent/DSC_0456.jpg',
    aspectRatio: 'portrait',
    description: 'Placeholder description for this work.',
    images: [
      '/images/recent/DSC_0456.jpg',
      '/images/recent/Abstract%20(red)/DSC_0451.jpg',
      '/images/recent/Abstract%20(red)/DSC_0452.jpg',
      '/images/recent/Abstract%20(red)/DSC_0454.jpg',
    ],
  },
  // 8
  {
    id: 84,
    title: 'Dancing Away',
    artist: 'Dominic Benhura',
    material: 'Springstone',
    size: '40 × 22 × 9 in',
    year: 2024,
    image: '/images/recent/dancing-away-dominic.jpg',
    aspectRatio: 'portrait',
    description: 'Placeholder description for this work.',
    images: ['/images/recent/dancing-away-dominic.jpg'],
  },
  // 9
  {
    id: 8,
    title: 'Riches of True Love',
    artist: 'Itayi Mupumha',
    material: 'Leopard Stone',
    size: '22 × 8.5 in',
    year: 2024,
    image: '/images/recent/DSC_0438.jpg',
    aspectRatio: 'portrait',
    description: 'Placeholder description for this work.',
    images: [
      '/images/recent/DSC_0438.jpg',
      '/images/recent/Riches%20of%20True%20Love/DSC_0439.jpg',
      '/images/recent/Riches%20of%20True%20Love/DSC_0441.jpg',
      '/images/recent/Riches%20of%20True%20Love/DSC_0444.jpg',
    ],
  },
  // 10
  {
    id: 78,
    title: 'Calling Bird',
    artist: 'Dominic Benhura',
    material: 'Springstone',
    size: '42 × 30 × 4 in',
    year: 2024,
    image: '/images/recent/calling-bird-dominic.jpg',
    aspectRatio: 'portrait',
    description: 'Placeholder description for this work.',
    images: ['/images/recent/calling-bird-dominic.jpg'],
  },
  // 11
  {
    id: 5,
    title: 'Trusting',
    artist: 'Bywell Sango',
    material: 'Dolomite',
    size: '26.5 × 9 in',
    year: 2024,
    image: '/images/recent/Trusting.jpg',
    aspectRatio: 'portrait',
    description: 'Placeholder description for this work.',
    images: [
      '/images/recent/Trusting.jpg',
      '/images/recent/Trusting/DSC_0182.jpg',
      '/images/recent/Trusting/DSC_0183.jpg',
      '/images/recent/Trusting/DSC_0184.jpg',
    ],
  },
  // 12
  {
    id: 83,
    title: 'Joyous Moment',
    artist: 'Dominic Benhura',
    material: 'Springstone',
    size: '18 × 19 × 4 in',
    year: 2024,
    image: '/images/recent/Joyous-moment-dominic.jpg',
    aspectRatio: 'square',
    description: 'Placeholder description for this work.',
    images: ['/images/recent/Joyous-moment-dominic.jpg'],
  },
  // 13
  {
    id: 3,
    title: 'Watchmen',
    artist: 'Phillip Mlima',
    material: 'Springstone',
    size: '11 × 11 in',
    year: 2024,
    image: '/images/recent/Watchmen.jpg',
    aspectRatio: 'portrait',
    description: 'Placeholder description for this work.',
    note: 'Sold as a set or individually',
    images: [
      '/images/recent/Watchmen.jpg',
      '/images/recent/Watchmen%201/DSC_0137.jpg',
    ],
  },
  // 14
  {
    id: 79,
    title: 'Happy Trio',
    artist: 'Dominic Benhura',
    material: 'Springstone',
    size: '16 × 27 × 4 in',
    year: 2024,
    image: '/images/recent/happy-trio-dominic.jpg',
    aspectRatio: 'landscape',
    description: 'Placeholder description for this work.',
    images: ['/images/recent/happy-trio-dominic.jpg'],
  },
  // 15
  {
    id: 6,
    title: 'Watchmen',
    artist: 'Phillip Mlima',
    material: 'Springstone',
    size: '11 × 11 in',
    year: 2024,
    image: '/images/recent/DSC_0138.jpg',
    aspectRatio: 'portrait',
    description: 'Placeholder description for this work.',
    note: 'Sold as a set or individually',
    images: [
      '/images/recent/DSC_0138.jpg',
      '/images/recent/Watchmen%202/DSC_0140.jpg',
    ],
  },
  // 16
  {
    id: 82,
    title: 'Relaxing with Mum',
    artist: 'Dominic Benhura',
    material: 'Springstone',
    size: '17 × 21 × 5 in',
    year: 2024,
    image: '/images/recent/relaxing-with-mum-dominic.jpg',
    aspectRatio: 'landscape',
    description: 'Placeholder description for this work.',
    images: ['/images/recent/relaxing-with-mum-dominic.jpg'],
  },
  // 17
  {
    id: 10,
    title: 'Abstract',
    artist: 'Graham Rugoyi',
    material: 'Green Opal',
    size: '32 × 13.5 in',
    year: 2024,
    image: '/images/recent/DSC_0469.jpg',
    aspectRatio: 'portrait',
    description: 'Placeholder description for this work.',
    images: [
      '/images/recent/DSC_0469.jpg',
      '/images/recent/Abstract%20(green)/DSC_0467.jpg',
      '/images/recent/Abstract%20(green)/DSC_0470.jpg',
      '/images/recent/Abstract%20(green)/DSC_0472.jpg',
    ],
  },
  // 18
  {
    id: 80,
    title: 'I Like It Mum',
    artist: 'Dominic Benhura',
    material: 'Springstone',
    size: '25 × 7 × 6 in',
    year: 2024,
    image: '/images/recent/I-like-it-mum-dominic.jpg',
    aspectRatio: 'portrait',
    description: 'Placeholder description for this work.',
    images: ['/images/recent/I-like-it-mum-dominic.jpg'],
  },
  // 19
  {
    id: 81,
    title: 'Pat Cake',
    artist: 'Dominic Benhura',
    material: 'Springstone',
    size: '16 × 14 × 5 in',
    year: 2024,
    image: '/images/recent/pat-cake-dominic.jpg',
    aspectRatio: 'portrait',
    description: 'Placeholder description for this work.',
    images: ['/images/recent/pat-cake-dominic.jpg'],
  },
  // 20
  {
    id: 75,
    title: 'Feeling Great',
    artist: 'Dominic Benhura',
    material: 'Springstone and Dolomite',
    size: '31 × 22 × 8 in',
    year: 2024,
    image: '/images/recent/feeling-great-dominic.jpg',
    aspectRatio: 'portrait',
    description: 'Placeholder description for this work.',
    images: ['/images/recent/feeling-great-dominic.jpg'],
  },
]

export const collectionWorks: Artwork[] = [
  { id: 16, title: 'Work 06', artist: 'Artist Name', material: 'Stone', size: '—', year: 2024, image: '/images/collection/DSC_0942.jpg', aspectRatio: 'portrait' },
  { id: 74, title: 'Work 62', artist: 'Artist Name', material: 'Stone', size: '—', year: 2024, image: '/images/collection/one%20more%20.jpg', aspectRatio: 'portrait' },
  { id: 65, title: 'Work 55', artist: 'Artist Name', material: 'Stone', size: '—', year: 2024, image: '/images/collection/DSC_1181.jpg', aspectRatio: 'portrait' },
  { id: 24, title: 'Work 14', artist: 'Artist Name', material: 'Stone', size: '—', year: 2024, image: '/images/collection/DSC_1031.jpg', aspectRatio: 'landscape' },
  { id: 29, title: 'Work 19', artist: 'Artist Name', material: 'Stone', size: '—', year: 2024, image: '/images/collection/DSC_1046.jpg', aspectRatio: 'portrait' },
  { id: 30, title: 'Work 20', artist: 'Artist Name', material: 'Stone', size: '—', year: 2024, image: '/images/collection/DSC_1052.jpg', aspectRatio: 'portrait' },
  { id: 50, title: 'Work 40', artist: 'Artist Name', material: 'Stone', size: '—', year: 2024, image: '/images/collection/DSC_1116.jpg', aspectRatio: 'portrait' },
  { id: 64, title: 'Work 54', artist: 'Artist Name', material: 'Stone', size: '—', year: 2024, image: '/images/collection/DSC_1171.jpg', aspectRatio: 'portrait' },
  { id: 12, title: 'Work 02', artist: 'Artist Name', material: 'Stone', size: '—', year: 2024, image: '/images/collection/DSC_.jpg', aspectRatio: 'portrait' },
  { id: 67, title: 'Work 57', artist: 'Artist Name', material: 'Stone', size: '—', year: 2024, image: '/images/collection/DSC_1194.jpg', aspectRatio: 'portrait' },
  { id: 46, title: 'Work 36', artist: 'Artist Name', material: 'Stone', size: '—', year: 2024, image: '/images/collection/DSC_1108.jpg', aspectRatio: 'portrait' },
  { id: 72, title: 'Hand Stand', artist: 'Artist Name', material: 'Stone', size: '—', year: 2024, image: '/images/collection/Hand-stand.jpg', aspectRatio: 'portrait' },
  { id: 48, title: 'Work 38', artist: 'Artist Name', material: 'Stone', size: '—', year: 2024, image: '/images/collection/DSC_1113.jpg', aspectRatio: 'portrait' },
  { id: 27, title: 'Work 17', artist: 'Artist Name', material: 'Stone', size: '—', year: 2024, image: '/images/collection/DSC_1039.jpg', aspectRatio: 'portrait' },
  { id: 58, title: 'Work 48', artist: 'Artist Name', material: 'Stone', size: '—', year: 2024, image: '/images/collection/DSC_1140.jpg', aspectRatio: 'portrait' },
  { id: 70, title: 'Work 60', artist: 'Artist Name', material: 'Stone', size: '—', year: 2024, image: '/images/collection/DSC_1204.jpg', aspectRatio: 'portrait' },
  { id: 56, title: 'Work 46', artist: 'Artist Name', material: 'Stone', size: '—', year: 2024, image: '/images/collection/DSC_1129.jpg', aspectRatio: 'portrait' },
  { id: 66, title: 'Work 56', artist: 'Artist Name', material: 'Stone', size: '—', year: 2024, image: '/images/collection/DSC_1184.jpg', aspectRatio: 'portrait' },
  { id: 69, title: 'Work 59', artist: 'Artist Name', material: 'Stone', size: '—', year: 2024, image: '/images/collection/DSC_1200.jpg', aspectRatio: 'landscape' },
  { id: 43, title: 'Work 33', artist: 'Artist Name', material: 'Stone', size: '—', year: 2024, image: '/images/collection/DSC_1102.jpg', aspectRatio: 'portrait' },
  { id: 35, title: 'Work 25', artist: 'Artist Name', material: 'Stone', size: '—', year: 2024, image: '/images/collection/DSC_1077.jpg', aspectRatio: 'portrait' },
  { id: 33, title: 'Work 23', artist: 'Artist Name', material: 'Stone', size: '—', year: 2024, image: '/images/collection/DSC_1074.jpg', aspectRatio: 'portrait' },
  { id: 73, title: 'Untitled', artist: 'Artist Name', material: 'Stone', size: '—', year: 2024, image: '/images/collection/Untitled.jpg', aspectRatio: 'portrait' },
  { id: 40, title: 'Work 30', artist: 'Artist Name', material: 'Stone', size: '—', year: 2024, image: '/images/collection/DSC_1094.jpg', aspectRatio: 'portrait' },
  { id: 45, title: 'Work 35', artist: 'Artist Name', material: 'Stone', size: '—', year: 2024, image: '/images/collection/DSC_1107.jpg', aspectRatio: 'portrait' },
  { id: 37, title: 'Work 27', artist: 'Artist Name', material: 'Stone', size: '—', year: 2024, image: '/images/collection/DSC_1081.jpg', aspectRatio: 'portrait' },
  { id: 18, title: 'Work 08', artist: 'Artist Name', material: 'Stone', size: '—', year: 2024, image: '/images/collection/DSC_0952.jpg', aspectRatio: 'portrait' },
  { id: 52, title: 'Work 42', artist: 'Artist Name', material: 'Stone', size: '—', year: 2024, image: '/images/collection/DSC_1119.jpg', aspectRatio: 'portrait' },
  { id: 26, title: 'Work 16', artist: 'Artist Name', material: 'Stone', size: '—', year: 2024, image: '/images/collection/DSC_1034.jpg', aspectRatio: 'portrait' },
  { id: 42, title: 'Work 32', artist: 'Artist Name', material: 'Stone', size: '—', year: 2024, image: '/images/collection/DSC_1099.jpg', aspectRatio: 'portrait' },
  { id: 28, title: 'Work 18', artist: 'Artist Name', material: 'Stone', size: '—', year: 2024, image: '/images/collection/DSC_1041.jpg', aspectRatio: 'portrait' },
  { id: 22, title: 'Work 12', artist: 'Artist Name', material: 'Stone', size: '—', year: 2024, image: '/images/collection/DSC_1004.jpg', aspectRatio: 'portrait' },
  { id: 63, title: 'Work 53', artist: 'Artist Name', material: 'Stone', size: '—', year: 2024, image: '/images/collection/DSC_1167.jpg', aspectRatio: 'landscape' },
  { id: 34, title: 'Work 24', artist: 'Artist Name', material: 'Stone', size: '—', year: 2024, image: '/images/collection/DSC_1075.jpg', aspectRatio: 'portrait' },
  { id: 23, title: 'Work 13', artist: 'Artist Name', material: 'Stone', size: '—', year: 2024, image: '/images/collection/DSC_1027.jpg', aspectRatio: 'landscape' },
  { id: 54, title: 'Work 44', artist: 'Artist Name', material: 'Stone', size: '—', year: 2024, image: '/images/collection/DSC_1122.jpg', aspectRatio: 'portrait' },
  { id: 47, title: 'Work 37', artist: 'Artist Name', material: 'Stone', size: '—', year: 2024, image: '/images/collection/DSC_1109.jpg', aspectRatio: 'portrait' },
  { id: 21, title: 'Work 11', artist: 'Artist Name', material: 'Stone', size: '—', year: 2024, image: '/images/collection/DSC_0999.jpg', aspectRatio: 'portrait' },
  { id: 20, title: 'Work 10', artist: 'Artist Name', material: 'Stone', size: '—', year: 2024, image: '/images/collection/DSC_096.jpg', aspectRatio: 'portrait' },
  { id: 71, title: 'Work 61', artist: 'Artist Name', material: 'Stone', size: '—', year: 2024, image: '/images/collection/DSC_1207.jpg', aspectRatio: 'portrait' },
  { id: 32, title: 'Work 22', artist: 'Artist Name', material: 'Stone', size: '—', year: 2024, image: '/images/collection/DSC_1058.jpg', aspectRatio: 'portrait' },
  { id: 19, title: 'Work 09', artist: 'Artist Name', material: 'Stone', size: '—', year: 2024, image: '/images/collection/DSC_0958.jpg', aspectRatio: 'portrait' },
  { id: 57, title: 'Work 47', artist: 'Artist Name', material: 'Stone', size: '—', year: 2024, image: '/images/collection/DSC_1130.jpg', aspectRatio: 'portrait' },
  { id: 36, title: 'Work 26', artist: 'Artist Name', material: 'Stone', size: '—', year: 2024, image: '/images/collection/DSC_1079.jpg', aspectRatio: 'portrait' },
  { id: 39, title: 'Work 29', artist: 'Artist Name', material: 'Stone', size: '—', year: 2024, image: '/images/collection/DSC_1089.jpg', aspectRatio: 'portrait' },
  { id: 13, title: 'Work 03', artist: 'Artist Name', material: 'Stone', size: '—', year: 2024, image: '/images/collection/DSC_0093.jpg', aspectRatio: 'portrait' },
  { id: 41, title: 'Work 31', artist: 'Artist Name', material: 'Stone', size: '—', year: 2024, image: '/images/collection/DSC_1095.jpg', aspectRatio: 'portrait' },
  { id: 14, title: 'Work 04', artist: 'Artist Name', material: 'Stone', size: '—', year: 2024, image: '/images/collection/DSC_0906.jpg', aspectRatio: 'portrait' },
  { id: 51, title: 'Work 41', artist: 'Artist Name', material: 'Stone', size: '—', year: 2024, image: '/images/collection/DSC_1117.jpg', aspectRatio: 'portrait' },
  { id: 11, title: 'Work 01', artist: 'Artist Name', material: 'Stone', size: '—', year: 2024, image: '/images/collection/2nd%20background%20rmvd.jpg', aspectRatio: 'portrait' },
  { id: 53, title: 'Work 43', artist: 'Artist Name', material: 'Stone', size: '—', year: 2024, image: '/images/collection/DSC_1120.jpg', aspectRatio: 'portrait' },
  { id: 31, title: 'Work 21', artist: 'Artist Name', material: 'Stone', size: '—', year: 2024, image: '/images/collection/DSC_1053.jpg', aspectRatio: 'portrait' },
  { id: 60, title: 'Work 50', artist: 'Artist Name', material: 'Stone', size: '—', year: 2024, image: '/images/collection/DSC_1150.jpg', aspectRatio: 'portrait' },
  { id: 17, title: 'Work 07', artist: 'Artist Name', material: 'Stone', size: '—', year: 2024, image: '/images/collection/DSC_0945.jpg', aspectRatio: 'portrait' },
  { id: 25, title: 'Work 15', artist: 'Artist Name', material: 'Stone', size: '—', year: 2024, image: '/images/collection/DSC_1032.jpg', aspectRatio: 'portrait' },
  { id: 62, title: 'Work 52', artist: 'Artist Name', material: 'Stone', size: '—', year: 2024, image: '/images/collection/DSC_1161.jpg', aspectRatio: 'portrait' },
  { id: 38, title: 'Work 28', artist: 'Artist Name', material: 'Stone', size: '—', year: 2024, image: '/images/collection/DSC_1088.jpg', aspectRatio: 'portrait' },
  { id: 59, title: 'Work 49', artist: 'Artist Name', material: 'Stone', size: '—', year: 2024, image: '/images/collection/DSC_1141.jpg', aspectRatio: 'portrait' },
  { id: 49, title: 'Work 39', artist: 'Artist Name', material: 'Stone', size: '—', year: 2024, image: '/images/collection/DSC_1115.jpg', aspectRatio: 'portrait' },
  { id: 55, title: 'Work 45', artist: 'Artist Name', material: 'Stone', size: '—', year: 2024, image: '/images/collection/DSC_1127.jpg', aspectRatio: 'landscape' },
  { id: 15, title: 'Work 05', artist: 'Artist Name', material: 'Stone', size: '—', year: 2024, image: '/images/collection/DSC_0936.jpg', aspectRatio: 'portrait' },
  { id: 44, title: 'Work 34', artist: 'Artist Name', material: 'Stone', size: '—', year: 2024, image: '/images/collection/DSC_1106.jpg', aspectRatio: 'portrait' },
  { id: 61, title: 'Work 51', artist: 'Artist Name', material: 'Stone', size: '—', year: 2024, image: '/images/collection/DSC_1160.jpg', aspectRatio: 'landscape' },
  { id: 68, title: 'Work 58', artist: 'Artist Name', material: 'Stone', size: '—', year: 2024, image: '/images/collection/DSC_1196.jpg', aspectRatio: 'portrait' },
]

// Combined array used by the inquire page dropdown
export const collection: Artwork[] = [...recentAdditions, ...collectionWorks]

export const artists: Artist[] = [
  {
    id: 1,
    name: 'Dominic Benhura',
    image: 'https://picsum.photos/seed/slab-a1/700/860',
    born: '1968',
    origin: 'Harare, Zimbabwe',
    bio: 'One of Zimbabwe\'s most celebrated Shona sculptors, Dominic Benhura has spent over four decades transforming raw serpentine and springstone into works of extraordinary emotional depth. His signature style — fluid, organic forms that seem to breathe — has earned him international recognition and a permanent place in major collections worldwide.',
    extended: 'Benhura grew up in the rich artistic community around Harare, learning the traditions of Shona stone sculpture from masters who themselves learned from the first generation of the modern Shona movement. What sets Benhura apart is his ability to capture fleeting human moments — a mother\'s touch, a child\'s wonder, the stillness before sleep — with a warmth that transcends the hardness of stone. His work has been exhibited across Europe, the United States, and Japan, and he continues to carve from his studio outside Harare, where he also mentors young sculptors.',
    signature: 'Fluid human forms, mother and child motifs, extraordinary surface finish',
  },
  {
    id: 2,
    name: 'Agnes Nyanhongo',
    image: 'https://picsum.photos/seed/slab-a2/680/820',
    born: '1960',
    origin: 'Guruve, Zimbabwe',
    bio: 'Daughter of the legendary Joseph Ndandarika, Agnes Nyanhongo emerged from one of Zimbabwe\'s most celebrated artistic lineages to forge her own powerfully distinct voice. Working primarily in springstone and opal stone, her sculptures explore feminine grace, spiritual seeking, and the interior life of women in contemporary Africa.',
    extended: 'Nyanhongo\'s work is instantly recognizable for its refined elegance and psychological depth. Where many Shona sculptors favor dynamic movement, Nyanhongo finds power in stillness — her figures often seem caught in private moments of reflection or prayer, their eyes closed or turned inward. She has won numerous international awards and her work is held in collections from Washington D.C. to Vienna. She remains deeply connected to the Zimbabwean stone-sculpting community, participating in workshops and speaking extensively about the spiritual dimensions of the work.',
    signature: 'Meditative female figures, intricate surface texture, rare stone varieties',
  },
  {
    id: 3,
    name: 'Tafadzwa Chiwawa',
    image: 'https://picsum.photos/seed/slab-a3/640/800',
    born: '1985',
    origin: 'Mutare, Zimbabwe',
    bio: 'The youngest of the three artists represented by Slab of Africa, Tafadzwa Chiwawa brings a bold, abstract sensibility to Shona sculpture\'s ancient traditions. Working in serpentine and the rare verdite found only in eastern Zimbabwe, his large-scale works push the boundaries of what stone can express.',
    extended: 'Chiwawa studied at the National Gallery of Zimbabwe before spending time in Berlin and São Paulo, where exposure to international contemporary art deepened his already unconventional approach. His sculptures often resist easy interpretation — forms suggest faces, bodies, and forces of nature without committing to any single reading. This ambiguity is intentional: Chiwawa believes the viewer must complete the sculpture. His largest work to date, "Spirit of the River," measures over two and a half feet and was exhibited at the 2024 UNTITLED Art Fair to considerable critical attention.',
    signature: 'Large-scale abstract forms, verdite stone, deliberate ambiguity',
  },
]

export const fairs: Fair[] = [
  {
    id: 1,
    name: 'UNTITLED, Art Fair',
    location: 'San Francisco, CA',
    year: 2024,
    dates: 'January 18–21, 2024',
    description: 'Slab of Africa\'s debut at UNTITLED San Francisco marked a turning point — the gallery\'s first major fair presentation, and an immediate critical success. Three of the six works presented sold within the first day of the VIP preview. Chiwawa\'s "Spirit of the River" became the focal piece of the booth, drawing sustained attention from collectors, curators, and art writers.',
    images: [
      'https://picsum.photos/seed/slab-f1a/800/580',
      'https://picsum.photos/seed/slab-f1b/600/720',
      'https://picsum.photos/seed/slab-f1c/740/500',
    ],
    highlight: 'Debut fair. 4 of 6 works sold. Critical press coverage in SF Chronicle and Artforum online.',
  },
  {
    id: 2,
    name: 'Art Miami',
    location: 'Miami Beach, FL',
    year: 2023,
    dates: 'December 6–10, 2023',
    description: 'Art Miami brought Slab of Africa to an international audience for the first time. The gallery presented eight works by Benhura and Nyanhongo, with a focused presentation that emphasized the range of Shona sculpture\'s emotional vocabulary. The fair drew collectors from Europe, Latin America, and the Gulf — several of whom made their first acquisitions of Zimbabwean stone sculpture.',
    images: [
      'https://picsum.photos/seed/slab-f2a/760/540',
      'https://picsum.photos/seed/slab-f2b/580/700',
      'https://picsum.photos/seed/slab-f2c/820/560',
    ],
    highlight: 'International collector debut. Benhura\'s "Woman with Child" acquired for permanent collection.',
  },
  {
    id: 3,
    name: 'The Armory Show',
    location: 'New York, NY',
    year: 2023,
    dates: 'September 7–10, 2023',
    description: 'The Armory Show represents one of the most competitive art fair environments in North America. Slab of Africa presented alongside major international galleries, positioning Shona sculpture within a global contemporary art dialogue. The booth\'s design — minimal, stone-toned, with dramatic spotlighting — drew sustained foot traffic and resulted in the gallery\'s most significant institutional conversations to date.',
    images: [
      'https://picsum.photos/seed/slab-f3a/780/560',
      'https://picsum.photos/seed/slab-f3b/620/760',
      'https://picsum.photos/seed/slab-f3c/840/580',
    ],
    highlight: 'Institutional dialogue with three major museum curators. Featured in Artnet and Artsy coverage.',
  },
]
