import hero_image from '../../assets/hero-image.webp';
import StandardButton from '../../components/standard_button';

const ExtraData = () => {
    return (
        <div className="extra-background d-flex flex-column justify-content-center align-items-center" style={{ height: '100vh', position: 'relative' }}>
            <div className="image-container">
                <img className="hero-image" src={hero_image} alt="Some people talking" />
                <div className="text-overlay">
                    <h2 className="fade-in">Empowering Employee Excellence in Banking</h2>
                    <h3 className="slide-up">Enhance performance evaluations to drive service quality and client satisfaction.</h3>
                </div>
            </div>
            <p className="fade-in-delay">
                In the banking industry, safeguarding sensitive information is paramount. Our Performance Feedback Manager prioritizes data security to ensure that both employee evaluations and client data remain protected.
            </p>
            <StandardButton placeholder='Learn More' />
        </div>
    );
};

export default ExtraData;
