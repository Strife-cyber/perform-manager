import React from 'react';

interface HeroFieldProps {
    image: string;
    alt: string;
    title: string;
    description: string;
}

const HeroField: React.FC<HeroFieldProps> = ({ image, alt, title, description }) => {
    return (
        <div
            className="hero-field d-flex flex-column align-items-center justify-content-between"
            style={{
                width: '300px',
                height: '290px',
                backgroundColor: '#f8f9fa',
                padding: '20px',
                borderRadius: '12px',
                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                fontFamily: 'Montaga'
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px)';
                e.currentTarget.style.boxShadow = '0px 8px 15px rgba(0, 0, 0, 0.2)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0px)';
                e.currentTarget.style.boxShadow = '0px 4px 6px rgba(0, 0, 0, 0.1)';
            }}
        >
            <img
                src={image}
                alt={alt}
                style={{
                    width: '100px',
                    marginBottom: '10px',
                }}
            />
            <h2
                className="text-center"
                style={{
                    fontSize: '1.25rem',
                    fontWeight: '600',
                    color: '#555',
                    marginBottom: '10px',
                }}
            >
                {title}
            </h2>
            <p
                style={{
                    textAlign: 'center',
                    color: '#777',
                    fontSize: '0.9rem',
                }}
            >
                {description}
            </p>
        </div>
    );
};

export default HeroField;
