import { useEffect, useState } from 'react';
import NavLink from '../../components/nav_link';
import company_logo from '../../assets/company-logo.png';
import CircularIcon from '../../components/circular_icon';
import StandardButton from '../../components/standard_button';
import { useNavigate } from 'react-router-dom';

const LandingHeader = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 520);

  // Effect to handle window resize event
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 520);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div
      className="navigator d-flex align-items-center"
      style={{
        padding: '10px 20px',
        backgroundColor: '#f8f9fa',
        borderBottom: '1px solid #ddd',
        flexDirection: isMobile ? 'column':'row',
        justifyContent: isMobile ? 'center':'space-between',
        fontFamily: 'Montaga'
      }}
    >
      {/* Logo Section */}
      <div className="leading" style={{width: '30%'}}>
        <img src={company_logo} alt="Company Logo" style={{ height: isMobile ? '40px':'50px', cursor: 'pointer' }}/>
      </div>

      {/* Navigation Links */}
      <div className="nav-icons" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '16px', margin: isMobile ? '20px 0' : '0', padding: isMobile ? '0 40px':'0', width: isMobile? '100%': '25%' }}>
        <NavLink link='' placeholder='Home'/>
        <NavLink link='' placeholder='Features'/>
        <NavLink link='' placeholder='About'/>
      </div>

      {/* Actions: Icons + Login Button */}
      <div className="action d-flex align-items-center" style={{ display: 'flex', gap: '20px', width: isMobile? '100%':'33%', justifyContent: isMobile ? 'space-between' : 'flex-end' }}>
        <CircularIcon icon='fas fa-envelope'/>
        <CircularIcon icon='fas fa-map-marker-alt'/>
        <StandardButton placeholder='Get Started' onClickFunction={() => navigate('/auth')}/>
      </div>
    </div>
  );
};

export default LandingHeader;
