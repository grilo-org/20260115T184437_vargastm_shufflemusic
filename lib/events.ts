export interface Event {
  id: number
  title: string
  date: string
  location: string
  venue: string
  description: string
  image: string
}

export const events: Event[] = [
  {
    id: 1,
    title: 'Sunset Sessions',
    date: '15 Mar 2027',
    location: 'São Paulo, SP',
    venue: 'Club XYZ',
    description:
      'An intimate evening of melodic techno and progressive house under the stars.',
    image: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg',
  },
  {
    id: 2,
    title: 'Underground Vibes',
    date: '28 Feb 2027',
    location: 'Rio de Janeiro, RJ',
    venue: 'Warehouse District',
    description:
      'Deep underground session featuring the latest in electronic music.',
    image: 'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg',
  },
  {
    id: 3,
    title: 'Beach Festival',
    date: '10 Jan 2027',
    location: 'Florianópolis, SC',
    venue: 'Praia Mole',
    description:
      'Sunset to sunrise electronic music experience on beach at Magic Island.',
    image: 'https://images.pexels.com/photos/2263436/pexels-photo-2263436.jpeg',
  },
]
