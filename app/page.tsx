import {
  AboutSection,
  ContactSection,
  EventsSection,
  HeroSection,
  LiveSetsSection,
  ReleasesSection,
} from '@/components/sections'

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ReleasesSection />
      <LiveSetsSection />
      <EventsSection />
      <ContactSection />
    </>
  )
}
