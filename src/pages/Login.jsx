import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
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

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
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

        {/* Left Side: Brand & Civic Showcase */}
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
            <div style={{ marginBottom: '32px' }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 12px',
                borderRadius: '9999px',
                backgroundColor: 'rgba(16, 185, 129, 0.15)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                color: '#34d399',
                fontSize: '12px',
                fontWeight: '600',
                marginBottom: '16px'
              }}>
                <span style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#10b981',
                  boxShadow: '0 0 10px #10b981'
                }} />
                Facility Open · 06:00 AM – 10:00 PM
              </div>

              <h1 style={{
                fontSize: '32px',
                fontWeight: '800',
                lineHeight: 1.2,
                color: '#ffffff',
                marginBottom: '12px',
                letterSpacing: '-0.03em'
              }}>
                Barangay Sports Complex
              </h1>
              <p className="auth-showcase-hide-mobile" style={{ fontSize: '14px', color: '#94a3b8', lineHeight: 1.6 }}>
                Reserve the covered court for official games, youth tournaments, and community events with instant online slot verification.
              </p>
            </div>

            {/* Sport Feature Cards */}
            <div className="auth-showcase-hide-mobile" style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '10px 14px',
                borderRadius: '12px',
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.06)'
              }}>
                <div style={{ color: '#fb923c' }}><IconBasketball size={20} /></div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: '700', color: '#f1f5f9' }}>Basketball Arena</div>
                  <div style={{ fontSize: '11px', color: '#94a3b8' }}>Standard hardwood paint, fiber boards & night lights</div>
                </div>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '10px 14px',
                borderRadius: '12px',
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.06)'
              }}>
                <div style={{ color: '#c084fc' }}><IconVolleyball size={20} /></div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: '700', color: '#f1f5f9' }}>Volleyball Setup</div>
                  <div style={{ fontSize: '11px', color: '#94a3b8' }}>Tournament-grade net & official court boundaries</div>
                </div>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '10px 14px',
                borderRadius: '12px',
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.06)'
              }}>
                <div style={{ color: '#2dd4bf' }}><IconPickleball size={20} /></div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: '700', color: '#f1f5f9' }}>Pickleball & Badminton</div>
                  <div style={{ fontSize: '11px', color: '#94a3b8' }}>Dual portable court setup with center dividing lines</div>
                </div>
              </div>
            </div>
          </div>

          {/* Location Footer */}
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

        {/* Right Side: Auth Form Card */}
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
              Sign In
            </button>
            <Link
              to="/register"
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
              Register
            </Link>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#0f172a', marginBottom: '6px' }}>
              Welcome Back
            </h2>
            <p style={{ fontSize: '13px', color: '#64748b' }}>
              Enter your credentials to manage your court reservations.
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

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>
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
                  padding: '12px 14px',
                  borderRadius: '10px',
                  border: '1.5px solid #cbd5e1',
                  backgroundColor: '#f8fafc',
                  fontSize: '14px',
                  color: '#0f172a',
                  transition: 'all 0.15s ease'
                }}
              />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155' }}>
                  Password
                </label>
              </div>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  style={{
                    width: '100%',
                    padding: '12px 42px 12px 14px',
                    borderRadius: '10px',
                    border: '1.5px solid #cbd5e1',
                    backgroundColor: '#f8fafc',
                    fontSize: '14px',
                    color: '#0f172a',
                    transition: 'all 0.15s ease'
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
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <IconEyeOff size={18} /> : <IconEye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                width: '100%',
                padding: '13px',
                borderRadius: '10px',
                border: 'none',
                background: 'linear-gradient(135deg, #4f46e5 0%, #3b82f6 100%)',
                color: '#ffffff',
                fontSize: '15px',
                fontWeight: '700',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                boxShadow: '0 4px 14px rgba(79, 70, 229, 0.35)',
                transition: 'all 0.15s ease',
                marginTop: '6px'
              }}
            >
              {isSubmitting ? 'Signing in...' : 'Sign In to CourtPulse'}
            </button>
          </form>

          {/* Quick Info */}
          <div style={{
            marginTop: '24px',
            padding: '12px 14px',
            borderRadius: '10px',
            backgroundColor: '#f8fafc',
            border: '1px dashed #cbd5e1',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '12px',
            color: '#64748b'
          }}>
            <IconClock size={16} />
            <span>Reservations open daily from 6:00 AM to 10:00 PM</span>
          </div>

          <p style={{ marginTop: '24px', textAlign: 'center', fontSize: '13px', color: '#64748b' }}>
            New player?{' '}
            <Link to="/register" style={{ color: '#4f46e5', fontWeight: '700', textDecoration: 'none' }}>
              Create an account here
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Login;