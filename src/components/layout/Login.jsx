import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import styles from './Login.module.css';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [message, setMessage] = useState({ text: '', isError: false });

  const showMessage = (text, isError = false) => {
    setMessage({ text, isError });
    setTimeout(() => setMessage({ text: '', isError: false }), 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!identifier.trim()) {
      showMessage('❌ Please enter email or phone number', true);
      return;
    }
    if (!password.trim()) {
      showMessage('❌ Password cannot be empty', true);
      return;
    }
    if (password.length < 4) {
      showMessage('⚠️ Password must be at least 4 characters', true);
      return;
    }
    
    const res = login(identifier, password);
    if (res.success) {
      showMessage(`✅ ${res.message}`, false);
      setTimeout(() => {
        navigate('/');
      }, 1000);
    } else {
      showMessage(`❌ ${res.message}`, true);
    }
  };

  const handleForgot = (e) => {
    e.preventDefault();
    showMessage('📧 Password reset link sent to your registered contact.', false);
  };

  return (
    <div className={styles.authCard}>
      <div className={styles.splitContainer}>
        {/* Left side - image & branding */}
        <div className={styles.imageSide}>
          <div className={styles.bgImg}></div>
          <div className={styles.overlayContent}>
            <div className={styles.brand}>
              <img src="assets/img/logo-scuts.png" alt="Scuts" />
            </div>
            <div className={styles.heroText}>
              <h2>Welcome back<br />to your account</h2>
              <p>Secure, seamless & lightning fast access.</p>
            </div>
            <div className={styles.featureList}>
              <div className={styles.feature}><i className="fas fa-check-circle"></i> <span>End-to-end encrypted</span></div>
              <div className={styles.feature}><i className="fas fa-mobile-alt"></i> <span>Fully responsive</span></div>
              <div className={styles.feature}><i className="fas fa-clock"></i> <span>24/7 support</span></div>
            </div>
          </div>
        </div>

        {/* Right side - login form */}
        <div className={styles.formSide}>
          <div className={styles.formHeader}>
            <h1>Sign in</h1>
            <p>Use your email or phone to continue</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <label><i className="fas fa-envelope"></i> Phone Number or Email</label>
              <input
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="+1 234 567 8900 / hello@example.com"
              />
            </div>
            <div className={styles.inputGroup}>
              <label><i className="fas fa-lock"></i> Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>

            <div className={styles.rowFlex}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                /> Remember me
              </label>
              <a href="/forgot-password" className="">Forgot password?</a>
            </div>

            <button type="submit" className={styles.authBtn}>
              <i className="fas fa-arrow-right-to-bracket"></i> Log in
            </button>
          </form>

          <div className={styles.toggleNote}>
            New here? <a href="/register">Create an account</a>
          </div>

          {message.text && (
            <div className={`${styles.toastMsg} ${message.isError ? styles.errorToast : ''}`}>
              <i className={`fas ${message.isError ? 'fa-circle-exclamation' : 'fa-circle-check'}`}></i> {message.text}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;