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
  {
    id: 1,
    title: 'Bonded Souls',
    artist: 'Artist Name',
    material: 'Stone',
    size: '—',
    year: 2024,
    image: '/images/recent/Bonded%20Souls.jpg',
    aspectRatio: 'portrait',
    featured: true,
    description: 'Placeholder description for this work.',
  },
  {
    id: 2,
    title: 'Family Discussion',
    artist: 'Artist Name',
    material: 'Stone',
    size: '—',
    year: 2024,
    image: '/images/recent/Family%20Discussion.jpg',
    aspectRatio: 'portrait',
    description: 'Placeholder description for this work.',
  },
  {
    id: 3,
    title: 'Watchmen',
    artist: 'Artist Name',
    material: 'Stone',
    size: '—',
    year: 2024,
    image: '/images/recent/Watchmen.jpg',
    aspectRatio: 'portrait',
    description: 'Placeholder description for this work.',
  },
  {
    id: 4,
    title: 'Infinity',
    artist: 'Artist Name',
    material: 'Stone',
    size: '—',
    year: 2024,
    image: '/images/recent/Infinity.jpg',
    aspectRatio: 'portrait',
    description: 'Placeholder description for this work.',
  },
  {
    id: 5,
    title: 'Trusting',
    artist: 'Artist Name',
    material: 'Stone',
    size: '—',
    year: 2024,
    image: '/images/recent/Trusting.jpg',
    aspectRatio: 'portrait',
    description: 'Placeholder description for this work.',
  },
  {
    id: 6,
    title: 'Work 06',
    artist: 'Artist Name',
    material: 'Stone',
    size: '—',
    year: 2024,
    image: '/images/recent/DSC_0138.jpg',
    aspectRatio: 'portrait',
    description: 'Placeholder description for this work.',
  },
  {
    id: 7,
    title: 'Work 07',
    artist: 'Artist Name',
    material: 'Stone',
    size: '—',
    year: 2024,
    image: '/images/recent/DSC_0163.jpg',
    aspectRatio: 'portrait',
    description: 'Placeholder description for this work.',
  },
  {
    id: 8,
    title: 'Work 08',
    artist: 'Artist Name',
    material: 'Stone',
    size: '—',
    year: 2024,
    image: '/images/recent/DSC_0438.jpg',
    aspectRatio: 'portrait',
    description: 'Placeholder description for this work.',
  },
  {
    id: 9,
    title: 'Work 09',
    artist: 'Artist Name',
    material: 'Stone',
    size: '—',
    year: 2024,
    image: '/images/recent/DSC_0456.jpg',
    aspectRatio: 'portrait',
    description: 'Placeholder description for this work.',
  },
  {
    id: 10,
    title: 'Work 10',
    artist: 'Artist Name',
    material: 'Stone',
    size: '—',
    year: 2024,
    image: '/images/recent/DSC_0469.jpg',
    aspectRatio: 'portrait',
    description: 'Placeholder description for this work.',
  },
]

export const collectionWorks: Artwork[] = [
  { id: 11, title: 'Work 01', artist: 'Artist Name', material: 'Stone', size: '—', year: 2024, image: '/images/collection/2nd%20background%20rmvd.jpg', aspectRatio: 'portrait' },
  { id: 12, title: 'Work 02', artist: 'Artist Name', material: 'Stone', size: '—', year: 2024, image: '/images/collection/DSC_.jpg', aspectRatio: 'portrait' },
  { id: 13, title: 'Work 03', artist: 'Artist Name', material: 'Stone', size: '—', year: 2024, image: '/images/collection/DSC_0093.jpg', aspectRatio: 'portrait' },
  { id: 14, title: 'Work 04', artist: 'Artist Name', material: 'Stone', size: '—', year: 2024, image: '/images/collection/DSC_0906.jpg', aspectRatio: 'portrait' },
  { id: 15, title: 'Work 05', artist: 'Artist Name', material: 'Stone', size: '—', year: 2024, image: '/images/collection/DSC_0936.jpg', aspectRatio: 'portrait' },
  { id: 16, title: 'Work 06', artist: 'Artist Name', material: 'Stone', size: '—', year: 2024, image: '/images/collection/DSC_0942.jpg', aspectRatio: 'portrait' },
  { id: 17, title: 'Work 07', artist: 'Artist Name', material: 'Stone', size: '—', year: 2024, image: '/images/collection/DSC_0945.jpg', aspectRatio: 'portrait' },
  { id: 18, title: 'Work 08', artist: 'Artist Name', material: 'Stone', size: '—', year: 2024, image: '/images/collection/DSC_0952.jpg', aspectRatio: 'portrait' },
  { id: 19, title: 'Work 09', artist: 'Artist Name', material: 'Stone', size: '—', year: 2024, image: '/images/collection/DSC_0958.jpg', aspectRatio: 'portrait' },
  { id: 20, title: 'Work 10', artist: 'Artist Name', material: 'Stone', size: '—', year: 2024, image: '/images/collection/DSC_096.jpg', aspectRatio: 'portrait' },
  { id: 21, title: 'Work 11', artist: 'Artist Name', material: 'Stone', size: '—', year: 2024, image: '/images/collection/DSC_0999.jpg', aspectRatio: 'portrait' },
  { id: 22, title: 'Work 12', artist: 'Artist Name', material: 'Stone', size: '—', year: 2024, image: '/images/collection/DSC_1004.jpg', aspectRatio: 'portrait' },
  { id: 23, title: 'Work 13', artist: 'Artist Name', material: 'Stone', size: '—', year: 2024, image: '/images/collection/DSC_1027.jpg', aspectRatio: 'landscape' },
  { id: 24, title: 'Work 14', artist: 'Artist Name', material: 'Stone', size: '—', year: 2024, image: '/images/collection/DSC_1031.jpg', aspectRatio: 'landscape' },
  { id: 25, title: 'Work 15', artist: 'Artist Name', material: 'Stone', size: '—', year: 2024, image: '/images/collection/DSC_1032.jpg', aspectRatio: 'portrait' },
  { id: 26, title: 'Work 16', artist: 'Artist Name', material: 'Stone', size: '—', year: 2024, image: '/images/collection/DSC_1034.jpg', aspectRatio: 'portrait' },
  { id: 27, title: 'Work 17', artist: 'Artist Name', material: 'Stone', size: '—', year: 2024, image: '/images/collection/DSC_1039.jpg', aspectRatio: 'portrait' },
  { id: 28, title: 'Work 18', artist: 'Artist Name', material: 'Stone', size: '—', year: 2024, image: '/images/collection/DSC_1041.jpg', aspectRatio: 'portrait' },
  { id: 29, title: 'Work 19', artist: 'Artist Name', material: 'Stone', size: '—', year: 2024, image: '/images/collection/DSC_1046.jpg', aspectRatio: 'portrait' },
  { id: 30, title: 'Work 20', artist: 'Artist Name', material: 'Stone', size: '—', year: 2024, image: '/images/collection/DSC_1052.jpg', aspectRatio: 'portrait' },
  { id: 31, title: 'Work 21', artist: 'Artist Name', material: 'Stone', size: '—', year: 2024, image: '/images/collection/DSC_1053.jpg', aspectRatio: 'portrait' },
  { id: 32, title: 'Work 22', artist: 'Artist Name', material: 'Stone', size: '—', year: 2024, image: '/images/collection/DSC_1058.jpg', aspectRatio: 'portrait' },
  { id: 33, title: 'Work 23', artist: 'Artist Name', material: 'Stone', size: '—', year: 2024, image: '/images/collection/DSC_1074.jpg', aspectRatio: 'portrait' },
  { id: 34, title: 'Work 24', artist: 'Artist Name', material: 'Stone', size: '—', year: 2024, image: '/images/collection/DSC_1075.jpg', aspectRatio: 'portrait' },
  { id: 35, title: 'Work 25', artist: 'Artist Name', material: 'Stone', size: '—', year: 2024, image: '/images/collection/DSC_1077.jpg', aspectRatio: 'portrait' },
  { id: 36, title: 'Work 26', artist: 'Artist Name', material: 'Stone', size: '—', year: 2024, image: '/images/collection/DSC_1079.jpg', aspectRatio: 'portrait' },
  { id: 37, title: 'Work 27', artist: 'Artist Name', material: 'Stone', size: '—', year: 2024, image: '/images/collection/DSC_1081.jpg', aspectRatio: 'portrait' },
  { id: 38, title: 'Work 28', artist: 'Artist Name', material: 'Stone', size: '—', year: 2024, image: '/images/collection/DSC_1088.jpg', aspectRatio: 'portrait' },
  { id: 39, title: 'Work 29', artist: 'Artist Name', material: 'Stone', size: '—', year: 2024, image: '/images/collection/DSC_1089.jpg', aspectRatio: 'portrait' },
  { id: 40, title: 'Work 30', artist: 'Artist Name', material: 'Stone', size: '—', year: 2024, image: '/images/collection/DSC_1094.jpg', aspectRatio: 'portrait' },
  { id: 41, title: 'Work 31', artist: 'Artist Name', material: 'Stone', size: '—', year: 2024, image: '/images/collection/DSC_1095.jpg', aspectRatio: 'portrait' },
  { id: 42, title: 'Work 32', artist: 'Artist Name', material: 'Stone', size: '—', year: 2024, image: '/images/collection/DSC_1099.jpg', aspectRatio: 'portrait' },
  { id: 43, title: 'Work 33', artist: 'Artist Name', material: 'Stone', size: '—', year: 2024, image: '/images/collection/DSC_1102.jpg', aspectRatio: 'portrait' },
  { id: 44, title: 'Work 34', artist: 'Artist Name', material: 'Stone', size: '—', year: 2024, image: '/images/collection/DSC_1106.jpg', aspectRatio: 'portrait' },
  { id: 45, title: 'Work 35', artist: 'Artist Name', material: 'Stone', size: '—', year: 2024, image: '/images/collection/DSC_1107.jpg', aspectRatio: 'portrait' },
  { id: 46, title: 'Work 36', artist: 'Artist Name', material: 'Stone', size: '—', year: 2024, image: '/images/collection/DSC_1108.jpg', aspectRatio: 'portrait' },
  { id: 47, title: 'Work 37', artist: 'Artist Name', material: 'Stone', size: '—', year: 2024, image: '/images/collection/DSC_1109.jpg', aspectRatio: 'portrait' },
  { id: 48, title: 'Work 38', artist: 'Artist Name', material: 'Stone', size: '—', year: 2024, image: '/images/collection/DSC_1113.jpg', aspectRatio: 'portrait' },
  { id: 49, title: 'Work 39', artist: 'Artist Name', material: 'Stone', size: '—', year: 2024, image: '/images/collection/DSC_1115.jpg', aspectRatio: 'portrait' },
  { id: 50, title: 'Work 40', artist: 'Artist Name', material: 'Stone', size: '—', year: 2024, image: '/images/collection/DSC_1116.jpg', aspectRatio: 'portrait' },
  { id: 51, title: 'Work 41', artist: 'Artist Name', material: 'Stone', size: '—', year: 2024, image: '/images/collection/DSC_1117.jpg', aspectRatio: 'portrait' },
  { id: 52, title: 'Work 42', artist: 'Artist Name', material: 'Stone', size: '—', year: 2024, image: '/images/collection/DSC_1119.jpg', aspectRatio: 'portrait' },
  { id: 53, title: 'Work 43', artist: 'Artist Name', material: 'Stone', size: '—', year: 2024, image: '/images/collection/DSC_1120.jpg', aspectRatio: 'portrait' },
  { id: 54, title: 'Work 44', artist: 'Artist Name', material: 'Stone', size: '—', year: 2024, image: '/images/collection/DSC_1122.jpg', aspectRatio: 'portrait' },
  { id: 55, title: 'Work 45', artist: 'Artist Name', material: 'Stone', size: '—', year: 2024, image: '/images/collection/DSC_1127.jpg', aspectRatio: 'landscape' },
  { id: 56, title: 'Work 46', artist: 'Artist Name', material: 'Stone', size: '—', year: 2024, image: '/images/collection/DSC_1129.jpg', aspectRatio: 'portrait' },
  { id: 57, title: 'Work 47', artist: 'Artist Name', material: 'Stone', size: '—', year: 2024, image: '/images/collection/DSC_1130.jpg', aspectRatio: 'portrait' },
  { id: 58, title: 'Work 48', artist: 'Artist Name', material: 'Stone', size: '—', year: 2024, image: '/images/collection/DSC_1140.jpg', aspectRatio: 'portrait' },
  { id: 59, title: 'Work 49', artist: 'Artist Name', material: 'Stone', size: '—', year: 2024, image: '/images/collection/DSC_1141.jpg', aspectRatio: 'portrait' },
  { id: 60, title: 'Work 50', artist: 'Artist Name', material: 'Stone', size: '—', year: 2024, image: '/images/collection/DSC_1150.jpg', aspectRatio: 'portrait' },
  { id: 61, title: 'Work 51', artist: 'Artist Name', material: 'Stone', size: '—', year: 2024, image: '/images/collection/DSC_1160.jpg', aspectRatio: 'landscape' },
  { id: 62, title: 'Work 52', artist: 'Artist Name', material: 'Stone', size: '—', year: 2024, image: '/images/collection/DSC_1161.jpg', aspectRatio: 'portrait' },
  { id: 63, title: 'Work 53', artist: 'Artist Name', material: 'Stone', size: '—', year: 2024, image: '/images/collection/DSC_1167.jpg', aspectRatio: 'landscape' },
  { id: 64, title: 'Work 54', artist: 'Artist Name', material: 'Stone', size: '—', year: 2024, image: '/images/collection/DSC_1171.jpg', aspectRatio: 'portrait' },
  { id: 65, title: 'Work 55', artist: 'Artist Name', material: 'Stone', size: '—', year: 2024, image: '/images/collection/DSC_1181.jpg', aspectRatio: 'portrait' },
  { id: 66, title: 'Work 56', artist: 'Artist Name', material: 'Stone', size: '—', year: 2024, image: '/images/collection/DSC_1184.jpg', aspectRatio: 'portrait' },
  { id: 67, title: 'Work 57', artist: 'Artist Name', material: 'Stone', size: '—', year: 2024, image: '/images/collection/DSC_1194.jpg', aspectRatio: 'portrait' },
  { id: 68, title: 'Work 58', artist: 'Artist Name', material: 'Stone', size: '—', year: 2024, image: '/images/collection/DSC_1196.jpg', aspectRatio: 'portrait' },
  { id: 69, title: 'Work 59', artist: 'Artist Name', material: 'Stone', size: '—', year: 2024, image: '/images/collection/DSC_1200.jpg', aspectRatio: 'landscape' },
  { id: 70, title: 'Work 60', artist: 'Artist Name', material: 'Stone', size: '—', year: 2024, image: '/images/collection/DSC_1204.jpg', aspectRatio: 'portrait' },
  { id: 71, title: 'Work 61', artist: 'Artist Name', material: 'Stone', size: '—', year: 2024, image: '/images/collection/DSC_1207.jpg', aspectRatio: 'portrait' },
  { id: 72, title: 'Hand Stand', artist: 'Artist Name', material: 'Stone', size: '—', year: 2024, image: '/images/collection/Hand-stand.jpg', aspectRatio: 'portrait' },
  { id: 73, title: 'Untitled', artist: 'Artist Name', material: 'Stone', size: '—', year: 2024, image: '/images/collection/Untitled.jpg', aspectRatio: 'portrait' },
  { id: 74, title: 'Work 62', artist: 'Artist Name', material: 'Stone', size: '—', year: 2024, image: '/images/collection/one%20more%20.jpg', aspectRatio: 'portrait' },
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
