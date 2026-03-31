import Hero from "@/components/Hero";
import Services from "@/components/Services";
import FeaturedProjects from "@/components/FeaturedProjects";
import Process from "@/components/Process";
import CTA from "@/components/CTA";

// 🔑 Analogía Angular:
// - Este archivo es tu "HomeComponent" template
// - En Angular tendrías <app-hero>, <app-services>, etc. en el HTML
// - En React, importas y usas directamente: <Hero />, <Services />, etc.
// - No necesitas declarar nada en un "module" — solo importar y usar

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <FeaturedProjects />
      <Process />
      <CTA />
    </>
  );
}
