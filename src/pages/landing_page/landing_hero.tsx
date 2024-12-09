import HeroField from './hero_field';
import forms from '../../assets/forms.svg';
import { useEffect, useState } from 'react';
import feedback from '../../assets/feedback.webp';
import progress from '../../assets/progress.svg';

const LandingHero = () => {
    const [animate, setAnimate] = useState(false);
    const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 768);

    useEffect(() => {
        setTimeout(() => {
            setAnimate(true);
        }, 300);

        const handleResize = () => {
            setIsMobile(window.innerWidth <= 520);
        };
    
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div
            className="landing-hero d-flex flex-column align-items-center justify-content-between"
            style={{
                margin: '5%',
                animation: animate ? 'fadeIn 1s ease-out' : 'none',
            }}
        >
            {/* Hero Header */}
            <h1
                className="text-center"
                style={{
                    fontFamily: 'Montaga, serif',
                    fontWeight: 'bold',
                    fontSize: isMobile ? '1.5rem':'2rem',
                    lineHeight: '1.5',
                    maxWidth: isMobile ? '400px' : '600px',
                    color: '#333',
                    marginBottom: '10%',
                }}
            >
                Streamlining employee performance evaluation and feedback for growth and development.
            </h1>

            {/* Hero Fields */}
            <div
                className="hero-fields d-flex justify-content-between flex-wrap"
                style={{
                    width: '100%',
                    gap: '20px',
                    marginTop: '20px',
                    justifyContent: 'center',
                    flexDirection: isMobile ? 'column' : 'row', // Stack items vertically on mobile
                    alignItems: isMobile ? 'center' : 'flex-start', // Center-align items on mobile
                }}
            >
                <HeroField
                    image={forms}
                    alt="Evaluation Form Here"
                    title="Performance Evaluations"
                    description="Simplify employee performance reviews with intuitive tools."
                />
                <HeroField
                    image={feedback}
                    alt="Feedback Image Here"
                    title="Feedback Sharing"
                    description="Foster growth with constructive employee feedback."
                />
                <HeroField
                    image={progress}
                    alt="Rising Chart Here"
                    title="Progress Tracking"
                    description="Track employee growth with insightful metrics."
                />
            </div>
        </div>
    );
};

export default LandingHero;
