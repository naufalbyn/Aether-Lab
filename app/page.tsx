import Capabilities from "@/components/sections/Capabilities";
import Experiments from "@/components/sections/Experiments";
import Founder from "@/components/sections/Founder";
import Hero from "@/components/sections/Hero";
import Navbar from "@/components/layout/Navbar";
import Philosophy from "@/components/sections/Philosophy";
import SelectedBuilds from "@/components/sections/SelectedBuilds";
import StartProject from "@/components/sections/StartProject";
import Statement from "@/components/sections/Statement";
import Technology from "@/components/sections/Technology";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />

      <Hero />

      <Statement />

      <Capabilities />

      <SelectedBuilds />

      <Technology />

      <Experiments />

      <Philosophy />

      <Founder />

      <StartProject />

      <Footer />
    </main>
  );
}