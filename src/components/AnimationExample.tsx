'use client';

import { AnimationText, AnimationSection } from './ui/Animation';

/**
 * Example component demonstrating how to use AnimationText and AnimationSection
 * This file shows various animation effects and configurations
 */
const AnimationExample = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section with Fade In Animation */}
            <AnimationSection
                animation="fadeIn"
                timing="slow"
                delay="short"
                background="gradient"
                className="text-white"
            >
                <div className="container mx-auto px-4 text-center">
                    <AnimationText
                        as="h1"
                        animation="slideInUp"
                        timing="normal"
                        delay="medium"
                        className="text-4xl md:text-6xl font-bold mb-4"
                    >
                        Welcome to Our Platform
                    </AnimationText>
                    <AnimationText
                        as="p"
                        animation="slideInUp"
                        timing="normal"
                        delay="long"
                        className="text-xl md:text-2xl mb-8"
                    >
                        Experience smooth animations and beautiful transitions
                    </AnimationText>
                </div>
            </AnimationSection>

            {/* Features Section with Scroll Animations */}
            <AnimationSection
                animation="fadeIn"
                trigger="onScroll"
                background="white"
                className="py-20"
            >
                <div className="container mx-auto px-4">
                    <AnimationText
                        as="h2"
                        animation="slideInLeft"
                        trigger="onScroll"
                        timing="normal"
                        className="text-3xl font-bold text-center mb-12 text-gray-800"
                    >
                        Our Features
                    </AnimationText>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <AnimationText
                            as="div"
                            animation="slideInUp"
                            trigger="onScroll"
                            timing="normal"
                            delay="short"
                            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                        >
                            <h3 className="text-xl font-semibold mb-4">Smooth Animations</h3>
                            <p className="text-gray-600">
                                Beautiful fade and slide effects that enhance user experience
                            </p>
                        </AnimationText>

                        {/* Feature 2 */}
                        <AnimationText
                            as="div"
                            animation="slideInUp"
                            trigger="onScroll"
                            timing="normal"
                            delay="medium"
                            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                        >
                            <h3 className="text-xl font-semibold mb-4">Scroll Triggers</h3>
                            <p className="text-gray-600">
                                Animations that trigger when elements come into view
                            </p>
                        </AnimationText>

                        {/* Feature 3 */}
                        <AnimationText
                            as="div"
                            animation="slideInUp"
                            trigger="onScroll"
                            timing="normal"
                            delay="long"
                            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                        >
                            <h3 className="text-xl font-semibold mb-4">Customizable</h3>
                            <p className="text-gray-600">
                                Flexible timing, delays, and animation types
                            </p>
                        </AnimationText>
                    </div>
                </div>
            </AnimationSection>

            {/* Interactive Section with Hover Animations */}
            <AnimationSection
                animation="fadeIn"
                trigger="onScroll"
                background="gray"
                className="py-20"
            >
                <div className="container mx-auto px-4 text-center">
                    <AnimationText
                        as="h2"
                        animation="slideInRight"
                        trigger="onScroll"
                        timing="normal"
                        className="text-3xl font-bold mb-12 text-gray-800"
                    >
                        Interactive Elements
                    </AnimationText>

                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {/* Hover Animation Example */}
                        <AnimationText
                            as="div"
                            animation="slideInLeft"
                            trigger="onHover"
                            timing="fast"
                            className="bg-primary-600 text-white p-8 rounded-lg cursor-pointer"
                        >
                            <h3 className="text-xl font-semibold mb-4">Hover Me!</h3>
                            <p>This element animates when you hover over it</p>
                        </AnimationText>

                        {/* Mount Animation Example */}
                        <AnimationText
                            as="div"
                            animation="slideInRight"
                            trigger="onMount"
                            timing="normal"
                            delay="short"
                            className="bg-secondary-600 text-white p-8 rounded-lg"
                        >
                            <h3 className="text-xl font-semibold mb-4">Auto Animation</h3>
                            <p>This element animates automatically when mounted</p>
                        </AnimationText>
                    </div>
                </div>
            </AnimationSection>

            {/* Text Animations Section */}
            <AnimationSection
                animation="fadeIn"
                trigger="onScroll"
                background="white"
                className="py-20"
            >
                <div className="container mx-auto px-4">
                    <AnimationText
                        as="h2"
                        animation="slideInDown"
                        trigger="onScroll"
                        timing="normal"
                        className="text-3xl font-bold text-center mb-12 text-gray-800"
                    >
                        Text Animation Examples
                    </AnimationText>

                    <div className="space-y-8 max-w-4xl mx-auto">
                        {/* Different Text Elements */}
                        <AnimationText
                            as="h3"
                            animation="slideInLeft"
                            trigger="onScroll"
                            timing="normal"
                            delay="short"
                            className="text-2xl font-semibold text-gray-700"
                        >
                            Heading with Slide In Left
                        </AnimationText>

                        <AnimationText
                            as="p"
                            animation="slideInRight"
                            trigger="onScroll"
                            timing="normal"
                            delay="medium"
                            className="text-lg text-gray-600 leading-relaxed"
                        >
                            This paragraph slides in from the right with a medium delay.
                            It demonstrates how text content can be animated smoothly into view.
                        </AnimationText>

                        <AnimationText
                            as="div"
                            animation="fadeIn"
                            trigger="onScroll"
                            timing="slow"
                            delay="long"
                            className="bg-gray-100 p-6 rounded-lg"
                        >
                            <h4 className="text-lg font-semibold mb-2">Fade In Effect</h4>
                            <p className="text-gray-600">
                                This content fades in slowly with a long delay, creating a
                                staggered animation effect.
                            </p>
                        </AnimationText>
                    </div>
                </div>
            </AnimationSection>

            {/* Footer */}
            <AnimationSection
                animation="slideInUp"
                trigger="onScroll"
                background="primary"
                className="py-12"
            >
                <div className="container mx-auto px-4 text-center text-white">
                    <AnimationText
                        as="p"
                        animation="fadeIn"
                        trigger="onScroll"
                        timing="normal"
                        delay="short"
                        className="text-lg"
                    >
                        Animation components make your website more engaging and interactive!
                    </AnimationText>
                </div>
            </AnimationSection>
        </div>
    );
};

export default AnimationExample;
