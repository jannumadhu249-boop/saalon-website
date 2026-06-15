import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import './ForgotPassword.css';

// Demo logo – replace with your actual image
const LOGO_URL = 'assets/img/logo-scuts.png';

const ForgotPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');

  // Step 1: Forgot password state
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [globalMessage, setGlobalMessage] = useState({ text: '', type: '' });
  let messageTimeout = useRef(null);

  // Step 2: Reset password state (only if token exists)
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isResetting, setIsResetting] = useState(false);

  // Clear global message after 7 seconds
  useEffect(() => {
    if (globalMessage.text) {
      if (messageTimeout.current) clearTimeout(messageTimeout.current);
      messageTimeout.current = setTimeout(() => {
        setGlobalMessage({ text: '', type: '' });
      }, 7000);
    }
    return () => {
      if (messageTimeout.current) clearTimeout(messageTimeout.current);
    };
  }, [globalMessage]);

  // ---------- Step 1: Send reset link ----------
  const validateEmail = (emailValue) => {
    const emailRegex = /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/;
    return emailRegex.test(emailValue.trim());
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (emailError) setEmailError('');
    if (globalMessage.text) setGlobalMessage({ text: '', type: '' });
  };

  // Simulate sending email (backend call)
  const sendResetLink = async (emailAddress) => {
    // In real app: POST /api/forgot-password
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`[DEMO] Reset link sent to ${emailAddress}`);
        resolve({ success: true });
      }, 1300);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmedEmail = email.trim();
    setEmailError('');
    setGlobalMessage({ text: '', type: '' });

    if (!trimmedEmail) {
      setEmailError('Email address is required');
      return;
    }
    if (!validateEmail(trimmedEmail)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    try {
      await sendResetLink(trimmedEmail);
      // Simulated email sent – show instructions
      setGlobalMessage({
        text: `📧 <strong>Reset link sent!</strong><br/>We've sent a password reset link to ${trimmedEmail}.<br/>Click the link in the email to create a new password.<br/><br/><em>Demo: use the link below to simulate email click:</em>`,
        type: 'success'
      });
      // Also show a clickable demo link (for testing without actual email)
      // This mimics the user clicking the email link
    } catch (err) {
      setGlobalMessage({
        text: 'Something went wrong. Please try again.',
        type: 'info'
      });
    } finally {
      setIsLoading(false);
    }
  };

  // ---------- Step 2: Reset password (when token is present) ----------
  const validatePassword = (pass) => {
    return pass.length >= 6;
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setPasswordError('');
    setGlobalMessage({ text: '', type: '' });

    if (!newPassword) {
      setPasswordError('New password is required');
      return;
    }
    if (!validatePassword(newPassword)) {
      setPasswordError('Password must be at least 6 characters');
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }

    setIsResetting(true);
    try {
      // Simulate API call to reset password using token
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setGlobalMessage({
        text: '✅ Password reset successful! You can now log in with your new password.',
        type: 'success'
      });
      // Redirect to login after 2 seconds
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setGlobalMessage({
        text: 'Reset failed. Please try again or request a new link.',
        type: 'info'
      });
    } finally {
      setIsResetting(false);
    }
  };

  // If token exists, show reset password form
  if (token) {
    return (
      <div className="forgot-password-container">
        <div className="reset-card">
          <div className="card-top-bar"></div>
          <div className="card-content">
            <div className="icon-wrapper">
              <div className="icon-bg">
                <img src={LOGO_URL} alt="Reset Password" />
              </div>
            </div>
            <h1 className="title">Create new password</h1>
            <p className="subtitle">Your new password must be different from previous ones.</p>

            <form onSubmit={handleResetPassword}>
              <div className="form-group">
                <label htmlFor="newPassword" className="form-label">New password</label>
                <div className="input-wrapper">
                  <span className="input-icon">
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </span>
                  <input
                    id="newPassword"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className={`password-input ${passwordError ? 'error' : ''}`}
                    placeholder="••••••"
                    disabled={isResetting}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword" className="form-label">Confirm password</label>
                <div className="input-wrapper">
                  <span className="input-icon">
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </span>
                  <input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={`password-input ${passwordError ? 'error' : ''}`}
                    placeholder="••••••"
                    disabled={isResetting}
                  />
                </div>
                {passwordError && <div className="error-message">{passwordError}</div>}
              </div>

              <button type="submit" className="submit-btn" disabled={isResetting}>
                {isResetting ? (
                  <>
                    <span className="spinner"></span>
                    <span>Resetting...</span>
                  </>
                ) : (
                  <span>Reset password</span>
                )}
              </button>
            </form>

            {globalMessage.text && (
              <div className={`global-message ${globalMessage.type}`} dangerouslySetInnerHTML={{ __html: globalMessage.text }} />
            )}

            <div className="back-link">
              <a href="/login">Back to sign in</a>
            </div>
          </div>
        </div>
      </div>
    );
  }


  return (
    <div className="forgot-password-container">
      <div className="reset-card">
        <div className="card-top-bar"></div>
        <div className="card-content">
          <div className="icon-wrapper">
            <div className="icon-bg">
              <img src={LOGO_URL} alt="Forgot Password" />
            </div>
          </div>
          <h1 className="title">Forgot password?</h1>
          <p className="subtitle">No worries, we'll send you reset instructions.</p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email address</label>
              <div className="input-wrapper">
                <span className="input-icon">
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </span>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={handleInputChange}
                  className={`email-input ${emailError ? 'error' : ''}`}
                  placeholder="you@company.com"
                  disabled={isLoading}
                />
              </div>
              {emailError && <div className="error-message">{emailError}</div>}
            </div>

            <button type="submit" className="submit-btn mt-4" disabled={isLoading}>
              {isLoading ? (
                <>
                  <span className="spinner"></span>
                  <span>Sending...</span>
                </>
              ) : (
                <span>Send reset link</span>
              )}
            </button>
          </form>

          {globalMessage.text && (
            <div className={`global-message ${globalMessage.type}`} dangerouslySetInnerHTML={{ __html: globalMessage.text }} />
          )}

          <div className="back-link">
            <a href="/login">Back to sign in</a>
          </div>

          {/* Demo helper: show a clickable link to simulate email click (only for testing) */}
          {globalMessage.type === 'success' && (
            <div style={{ marginTop: '1rem', textAlign: 'center', fontSize: '0.8rem' }}>
              <hr style={{ margin: '0.75rem 0' }} />
              <p><strong>📬 Demo mode:</strong> Click below to simulate opening the email link:</p>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  // Simulate token from email – use a dummy token
                  navigate('/forgot-password?token=demoResetToken123');
                }}
                style={{ color: 'var(--primary-orange)', fontWeight: 'bold' }}
              >
                🔗 Click here to reset your password (demo link)
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;