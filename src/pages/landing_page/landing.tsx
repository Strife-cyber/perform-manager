import LandingHeader from "./landing_header"
import LandingHero from "./landing_hero";
import './landing.css';

const Landing = () => {
    return (
    <div style={{background: 'linear-gradient(135deg, #FFFDE1, #E0FFFF)', minHeight: '100vh'}}>
        <LandingHeader/>
        <LandingHero/>
    </div>
    )
}

export default Landing;