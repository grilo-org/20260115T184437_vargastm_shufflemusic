export interface Album {
  id: number
  albumCover: string
  albumTitle: string
  artist: string
  albumNumber: string
  releaseDate: string
  duration: string
  audioSrc: string
}

export const albums: Album[] = [
  {
    id: 1,
    albumCover:
      'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=800&h=800&fit=crop',
    albumTitle: 'ECHOES OF TIME',
    artist: 'SHUFFLE',
    albumNumber: '012',
    releaseDate: '2023',
    duration: 'Single',
    audioSrc: '/music/Aves-JoyRide.mp3',
  },
  {
    id: 2,
    albumCover:
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=800&fit=crop',
    albumTitle: 'NEON DREAMS',
    artist: 'SHUFFLE',
    albumNumber: '077',
    releaseDate: '2024',
    duration: 'Single',
    audioSrc: '/music/GiorgioVitte-Crush.mp3',
  },
  {
    id: 3,
    albumCover:
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=800&fit=crop',
    albumTitle: 'MIDNIGHT PULSE',
    artist: 'SHUFFLE',
    albumNumber: '091',
    releaseDate: '2025',
    duration: 'Single',
    audioSrc: '/music/GiorgioVitte-Crush.mp3',
  },
]
