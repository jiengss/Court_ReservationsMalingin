import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  IconEye, 
  IconEyeOff, 
  IconAlertCircle, 
  IconBasketball, 
  IconVolleyball, 
  IconPickleball, 
  IconCheckCircle,
  IconMapPin,
  IconClock
} from '../components/Icons';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    if (password !== passwordConfirmation) {
      setError('Passwords do not match.');
      return;
    }

    setIsSubmitting(true);
    try {
      await register(name, email, password);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Registration failed. Please check your details and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="responsive-auth-container" style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)',
      padding: '24px 16px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Dynamic Background Glow Effects */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        left: '15%',
        width: '500px',
        height: '500px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(99, 102, 241, 0.25) 0%, rgba(99, 102, 241, 0) 70%)',
        filter: 'blur(40px)',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-10%',
        right: '10%',
        width: '450px',
        height: '450px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(16, 185, 129, 0.2) 0%, rgba(16, 185, 129, 0) 70%)',
        filter: 'blur(50px)',
        pointerEvents: 'none'
      }} />

      {/* Main Container */}
      <div className="responsive-auth-box" style={{
        width: '100%',
        maxWidth: '1040px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
        backdropFilter: 'blur(20px)',
        borderRadius: '24px',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.08)',
        overflow: 'hidden',
        position: 'relative',
        zIndex: 1
      }}>

        {/* Left Side: Civic Branding */}
        <div className="responsive-auth-side auth-showcase-side" style={{
          padding: '44px 36px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: 'linear-gradient(180deg, rgba(30, 27, 75, 0.7) 0%, rgba(15, 23, 42, 0.9) 100%)',
          borderRight: '1px solid rgba(255, 255, 255, 0.08)'
        }}>
          <div>
            {/* Official Logos Header */}
            <div className="brand-header" style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '28px' }}>
              <div style={{
                position: 'relative',
                display: 'flex',
                padding: '2px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #f59e0b, #ef4444)'
              }}>
                <img
                  src="/barangay-malingin-seal.jpg"
                  alt="Barangay Malingin Seal"
                  className="seal-img"
                  style={{ width: '52px', height: '52px', borderRadius: '50%', objectFit: 'cover', display: 'block' }}
                />
              </div>
              <div style={{
                position: 'relative',
                display: 'flex',
                padding: '2px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #3b82f6, #10b981)'
              }}>
                <img
                  src="/sk-malingin-seal.jpg"
                  alt="SK Malingin Seal"
                  className="seal-img"
                  style={{ width: '52px', height: '52px', borderRadius: '50%', objectFit: 'cover', display: 'block' }}
                />
              </div>
              <div>
                <div style={{
                  fontSize: '11px',
                  fontWeight: '700',
                  color: '#fbbf24',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em'
                }}>
                  Official Portal
                </div>
                <div style={{ fontSize: '16px', fontWeight: '800', color: '#ffffff', letterSpacing: '-0.02em' }}>
                  Barangay Malingin
                </div>
              </div>
            </div>

            {/* Title & Tagline */}
            <div style={{ marginBottom: '28px' }}>
              <h1 style={{
                fontSize: '32px',
                fontWeight: '800',
                lineHeight: 1.2,
                color: '#ffffff',
                marginBottom: '12px',
                letterSpacing: '-0.03em'
              }}>
                Create Player Account
              </h1>
              <p className="auth-showcase-hide-mobile" style={{ fontSize: '14px', color: '#94a3b8', lineHeight: 1.6 }}>
                Join the official Barangay Malingin court booking platform to reserve basketball, volleyball, and pickleball game sessions.
              </p>
            </div>

            {/* Benefits */}
            <div className="auth-showcase-hide-mobile" style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#e2e8f0', fontSize: '13px' }}>
                <span style={{ color: '#10b981' }}><IconCheckCircle size={18} /></span>
                <span>Instant reservation confirmation without paper forms</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#e2e8f0', fontSize: '13px' }}>
                <span style={{ color: '#10b981' }}><IconCheckCircle size={18} /></span>
                <span>Automatic double-booking conflict prevention</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#e2e8f0', fontSize: '13px' }}>
                <span style={{ color: '#10b981' }}><IconCheckCircle size={18} /></span>
                <span>Live timeline view of available court slots today</span>
              </div>
            </div>
          </div>

          <div className="auth-showcase-hide-mobile" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '12px',
            color: '#64748b',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            paddingTop: '16px'
          }}>
            <IconMapPin size={15} />
            <span>Poblacion Malingin, Bogo City, Cebu 6010</span>
          </div>
        </div>

        {/* Right Side: Registration Form */}
        <div className="responsive-auth-side" style={{
          padding: '44px 36px',
          backgroundColor: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          {/* Navigation Tabs */}
          <div style={{
            display: 'flex',
            backgroundColor: '#f1f5f9',
            padding: '4px',
            borderRadius: '12px',
            marginBottom: '28px'
          }}>
            <Link
              to="/login"
              style={{
                flex: 1,
                padding: '9px 12px',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                textAlign: 'center',
                textDecoration: 'none',
                color: '#64748b',
                transition: 'color 0.15s ease'
              }}
            >
              Sign In
            </Link>
            <button
              type="button"
              style={{
                flex: 1,
                padding: '9px 12px',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '700',
                border: 'none',
                backgroundColor: '#ffffff',
                color: '#0f172a',
                boxShadow: '0 2px 8px rgba(15, 23, 42, 0.08)',
                cursor: 'default'
              }}
            >
              Register
            </button>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#0f172a', marginBottom: '6px' }}>
              Sign Up
            </h2>
            <p style={{ fontSize: '13px', color: '#64748b' }}>
              Fill out your details to get started.
            </p>
          </div>

          {error && (
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '10px',
              backgroundColor: '#fef2f2',
              border: '1px solid #fee2e2',
              color: '#b91c1c',
              padding: '12px 14px',
              borderRadius: '10px',
              marginBottom: '20px',
              fontSize: '13px'
            }}>
              <IconAlertCircle size={17} />
              <div style={{ flex: 1 }}>{error}</div>
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '5px' }}>
                Full Name
              </label>
              <input
                type="text"
                placeholder="Juan Dela Cruz"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoComplete="name"
                style={{
                  width: '100%',
                  padding: '11px 14px',
                  borderRadius: '10px',
                  border: '1.5px solid #cbd5e1',
                  backgroundColor: '#f8fafc',
                  fontSize: '14px',
                  color: '#0f172a'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '5px' }}>
                Email Address
              </label>
              <input
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                style={{
                  width: '100%',
                  padding: '11px 14px',
                  borderRadius: '10px',
                  border: '1.5px solid #cbd5e1',
                  backgroundColor: '#f8fafc',
                  fontSize: '14px',
                  color: '#0f172a'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '5px' }}>
                Password (min. 8 characters)
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="new-password"
                  style={{
                    width: '100%',
                    padding: '11px 42px 11px 14px',
                    borderRadius: '10px',
                    border: '1.5px solid #cbd5e1',
                    backgroundColor: '#f8fafc',
                    fontSize: '14px',
                    color: '#0f172a'
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#94a3b8',
                    display: 'flex',
                    padding: '4px'
                  }}
                >
                  {showPassword ? <IconEyeOff size={18} /> : <IconEye size={18} />}
                </button>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '5px' }}>
                Confirm Password
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                required
                autoComplete="new-password"
                style={{
                  width: '100%',
                  padding: '11px 14px',
                  borderRadius: '10px',
                  border: '1.5px solid #cbd5e1',
                  backgroundColor: '#f8fafc',
                  fontSize: '14px',
                  color: '#0f172a'
                }}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                width: '100%',
                padding: '13px',
                borderRadius: '10px',
                border: 'none',
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                color: '#ffffff',
                fontSize: '15px',
                fontWeight: '700',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                boxShadow: '0 4px 14px rgba(16, 185, 129, 0.35)',
                transition: 'all 0.15s ease',
                marginTop: '8px'
              }}
            >
              {isSubmitting ? 'Creating Account...' : 'Complete Registration'}
            </button>
          </form>

          <p style={{ marginTop: '20px', textAlign: 'center', fontSize: '13px', color: '#64748b' }}>
            Already registered?{' '}
            <Link to="/login" style={{ color: '#4f46e5', fontWeight: '700', textDecoration: 'none' }}>
              Sign in here
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Register;