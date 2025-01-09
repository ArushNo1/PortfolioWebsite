// src/app/page.tsx
import Navbar from '@/components/Navbar';
import Homepage from '@/components/Homepage';
import About from '@/components/About';
import Skills from '@/components/Skills';

export default function Home() {
  return (
    <div>
      <Navbar />
      <Homepage />
      <About />
      <Skills />
    </div>
  );
}