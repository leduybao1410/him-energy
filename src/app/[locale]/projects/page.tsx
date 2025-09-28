'use client';

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
    ProjectShowcaseSection,
    ProjectImpactSection,
    ProjectStoriesSection,
    ContactSection
} from "@/components/sections";

export default function Projects() {
    return (
        <div className="min-h-screen bg-secondary w-full align-center justify-center">
            <Header />
            <ProjectShowcaseSection />
            <ProjectImpactSection />
            <ProjectStoriesSection />
            <ContactSection />
            <Footer />
        </div>
    );
}
