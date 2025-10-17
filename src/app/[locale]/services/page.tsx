'use client';

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
    ServicesHeroSection,
    ServicesOverviewSection,
    ServicesProcessSection,
    ContactSection
} from "@/components/sections";

export default function Services() {
    return (
        <div className="min-h-screen bg-secondary w-full align-center justify-center">
            <ServicesHeroSection />
            <ServicesOverviewSection />
            <ServicesProcessSection />
            <ContactSection />
        </div>
    );
}
