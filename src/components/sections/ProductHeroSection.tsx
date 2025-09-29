'use client';

import { useTranslations } from 'next-intl';
import { Container, Section } from '@/components/ui';

const ProductHeroSection = () => {
    const t = useTranslations('products');

    return (
        <Section className="bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 py-20">
            <Container>
                <div className="text-center max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6">
                        {t('hero.title')}
                    </h1>
                    <p className="text-xl md:text-2xl text-secondary mb-8 font-medium">
                        {t('hero.subtitle')}
                    </p>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                        {t('hero.description')}
                    </p>
                </div>
            </Container>
        </Section>
    );
};

export default ProductHeroSection;
