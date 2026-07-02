import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { Marquee } from "@/components/site/Marquee";
import { Services } from "@/components/site/Services";
import { Work } from "@/components/site/Work";
import { About } from "@/components/site/About";
import { Process } from "@/components/site/Process";
import { Testimonials } from "@/components/site/Testimonials";
import { CTA } from "@/components/site/CTA";
import { InquiryForm } from "@/components/site/InquiryForm";
import { Footer } from "@/components/site/Footer";
import { Cursor } from "@/components/site/Cursor";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <main className="relative min-h-screen bg-background text-foreground">
        <Cursor />
        <Nav />
        <Hero />
        <Marquee />
        <Services />
        <Work />
        <About />
        <Process />
        <Testimonials />
        <CTA />
        <InquiryForm />
        <Footer />
    </main>
  );
}
