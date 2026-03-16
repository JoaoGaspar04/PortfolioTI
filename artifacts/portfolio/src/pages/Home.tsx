import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Experience } from "@/components/sections/Experience";
import { Certifications } from "@/components/sections/Certifications";
import { Badges } from "@/components/sections/Badges";
import { Projects } from "@/components/sections/Projects";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col relative selection:bg-primary/30 selection:text-primary-foreground">
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[128px] pointer-events-none -z-10" />
      <div className="fixed bottom-0 right-1/4 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[128px] pointer-events-none -z-10" />

      <Navbar />

      <main className="flex-grow">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Certifications />
        <Badges />
        <Projects />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
