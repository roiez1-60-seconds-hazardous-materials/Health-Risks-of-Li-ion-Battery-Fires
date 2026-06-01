'use client';
import ParticleBackground from '@/components/ParticleBackground';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Scope from '@/components/Scope';
import Metals from '@/components/Metals';
import PlumeFloor from '@/components/PlumeFloor';
import Layers from '@/components/Layers';
import Pah from '@/components/Pah';
import Fluoride from '@/components/Fluoride';
import Mutagenicity from '@/components/Mutagenicity';
import Recommendations from '@/components/Recommendations';
import Sources from '@/components/Sources';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="relative">
      <ParticleBackground />
      <Navbar />
      <Hero />
      <Scope />
      <Metals />
      <PlumeFloor />
      <Layers />
      <Pah />
      <Fluoride />
      <Mutagenicity />
      <Recommendations />
      <Sources />
      <Footer />
    </main>
  );
}
