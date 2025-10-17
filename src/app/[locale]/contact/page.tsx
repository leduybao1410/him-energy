import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
    ContactHeroSection,
    ContactInfoSection,
    ContactFormSection,
    ContactMapSection,
    ContactSection
} from "@/components/sections";

export default function Contact() {
    return (
        <div className="min-h-screen bg-secondary w-full align-center justify-center">
            <ContactHeroSection />
            <ContactInfoSection />
            <ContactFormSection />
            <ContactMapSection />
            <ContactSection />
        </div>
    );
}
