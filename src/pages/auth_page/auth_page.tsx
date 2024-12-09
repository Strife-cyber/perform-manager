import React, { useState } from 'react';
import TextFieldComponent from '../../components/text_field_component';
import StandardButton from '../../components/standard_button';
import useUser, { User } from '../../requests/user_requests';

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [userData, setUserData] = useState<User>({
    name: '',
    email: '',
    password: ''
  });
  const { register_user, login_user } = useUser();

  const toggleAuthMode = () => {
    setIsLogin((prev) => !prev);
  };

  const register = async () => {
    const { name, email, password } = userData;
    if (name && email && password) {
      try {
        await register_user({ name, email, password });
        alert('Registration successful!');
      } catch (error) {
        alert('Error registering. Please try again.');
        console.error(error);
      }
    } else {
      alert('Please fill in all fields.');
    }
  };

  const login = async () => {
    const { email, password } = userData;
    if (email && password) {
      try {
        await login_user(email, password);
        alert('Login successful!');
      } catch (error) {
        alert('Error logging in. Please try again.');
        console.error(error);
      }
    } else {
      alert('Please fill in all fields.');
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = event.target;
    setUserData((prevData) => {
      const newUserData = { ...prevData };
      if (index === 0) newUserData.name = value;
      if (index === 1) newUserData.email = value;
      if (index === 2) newUserData.password = value;
      return newUserData;
    });
  };

  return (
    <div style={styles.authPage}>
      <div style={styles.authBackground}>
        <div style={styles.overlay} />
      </div>

      <div style={styles.formContainer}>
        <h1 style={styles.welcomeTitle}>Welcome {isLogin ? 'Back' : 'Aboard'}!</h1>
        <p style={styles.welcomeText}>
          {isLogin ? 'Sign in to access your account' : 'Join us and start your journey!'}
        </p>

        <div style={styles.formCard}>
          {!isLogin && (
            <>
              <TextFieldComponent
                width="80%"
                placeholder="Enter Your Name"
                value={userData.name}
                onChange={(event) => handleChange(event, 0)} // Pass index 0 for name
              />
              <div className="spacer" style={{ height: '15px' }} />
            </>
          )}
          <TextFieldComponent
            width="80%"
            placeholder="Enter Your Email"
            inputType="email"
            value={userData.email}
            onChange={(event) => handleChange(event, 1)} // Pass index 1 for email
          />
          <div className="spacer" style={{ height: '15px' }} />
          <TextFieldComponent
            width="80%"
            placeholder="Enter Your Password"
            inputType="password"
            value={userData.password}
            onChange={(event) => handleChange(event, 2)} // Pass index 2 for password
          />
          <div className="spacer" style={{ height: '15px' }} />
          <StandardButton
            placeholder={isLogin ? 'Login' : 'Sign Up'}
            onClickFunction={isLogin ? login : register}
          />

          <p style={styles.toggleText}>
            {isLogin ? "Don't have an account?" : 'Already a member?'}
            <span style={styles.toggleLink} onClick={toggleAuthMode}>
              {isLogin ? ' Sign Up' : ' Login'}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  authPage: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    fontFamily: "'Montaga', sans-serif",
    position: 'relative',
    overflow: 'hidden',
    color: 'black'
  },
  authBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -2,
    backgroundColor: '#E0FFFF'
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(135deg, #FFFDE1, #E0FFFF)',
    zIndex: -1
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    color: 'black',
    width: '80%',
    maxWidth: '650px',
    padding: '20px',
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '10px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
    backdropFilter: 'blur(10px)',
    margin: '20px'
  },
  welcomeTitle: {
    fontFamily: "'Montaga', cursive",
    fontSize: '2rem',
    margin: 0
  },
  welcomeText: {
    fontFamily: "'Pacifico', cursive",
    margin: '10px 0 20px',
    fontSize: '1.1rem'
  },
  formCard: {
    width: '100%',
    color: '#fff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '20px 0'
  },
  toggleText: {
    marginTop: '15px',
    fontSize: '0.9rem',
    fontFamily: 'Pacifico',
    color: 'black'
  },
  toggleLink: {
    color: 'blue',
    cursor: 'pointer',
    fontWeight: 'bold'
  }
};

export default AuthPage;
