'use client';

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
    HeroSection,
    AboutSection,
    ServicesSection,
    StatsSection,
    TestimonialsSection,
    ContactSection
} from "@/components/sections";

export default function Home() {
    return (
        <div className="min-h-screen bg-secondary w-full align-center justify-center">
            <Header />
            <HeroSection />
            <AboutSection />
            <ServicesSection />
            <StatsSection />
            <TestimonialsSection />
            <ContactSection />
            <Footer />
        </div>
    );
}
