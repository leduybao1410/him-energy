'use client';

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
    MissionSection,
    TeamSection,
    HistorySection,
    ContactSection
} from "@/components/sections";

export default function About() {
    return (
        <div className="min-h-screen bg-secondary w-full align-center justify-center">
            <MissionSection />
            <TeamSection />
            <HistorySection />
            <ContactSection />
        </div>
    );
}
