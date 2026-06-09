import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import styles from './Register.module.css';

const Register = () => {
  const navigate = useNavigate();
  const { register: authRegister } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    gender: '',
    address: '',
    password: '',
    confirmPassword: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState({ text: '', isError: false });

  const showMessage = (text, isError = false) => {
    setMessage({ text, isError });
    setTimeout(() => setMessage({ text: '', isError: false }), 3000);
  };

  const handleChange = (e) => {
    const { id, name, value } = e.target;
    const key = name || id;
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, phone, email, gender, address, password } = formData;

    if (!name.trim()) return showMessage('❌ Full name is required', true);
    if (!phone.trim()) return showMessage('❌ Phone number is required', true);
    if (!/^[\+\d\s\-\(\)]{6,}$/.test(phone)) return showMessage('📞 Enter a valid phone number', true);
    if (!email.trim()) return showMessage('❌ Email is required', true);
    if (!/^[^\s@]+@([^\s@]+\.)+[^\s@]+$/.test(email)) return showMessage('✉️ Valid email required', true);
    if (!gender) return showMessage('⚥ Please select your gender', true);
    if (!address.trim()) return showMessage('📍 Address cannot be blank', true);
    if (!password.trim()) return showMessage('🔒 Please create a password', true);
    if (password.length < 6) return showMessage('🔐 Password must be at least 6 characters', true);
    if (formData.confirmPassword !== password) return showMessage('❌ Passwords do not match', true);

    const res = authRegister(formData);
    if (res.success) {
      showMessage(`🎉 Welcome ${name}! Account successfully created.`, false);
      setFormData({ name: '', phone: '', email: '', gender: '', address: '', password: '' });
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } else {
      showMessage(`❌ ${res.message}`, true);
    }
  };

  return (
    <div className={styles.authCard}>
      <div className={styles.splitContainer}>
        {/* Left side */}
        <div className={styles.imageSide}>
          <div className={styles.bgImg}></div>
          <div className={styles.overlayContent}>
            <div className={styles.brand}>
              <img src="assets/img/logo-scuts.png" alt="Scuts" />
            </div>
            <div className={styles.heroText}>
              <h2>Join the future<br />of digital access</h2>
              <p>Create your account in seconds.</p>
            </div>
            <div className={styles.featureList}>
              <div className={styles.feature}><i className="fas fa-user-check"></i> <span>Secure identity</span></div>
              <div className={styles.feature}><i className="fas fa-globe"></i> <span>Global access</span></div>
              <div className={styles.feature}><i className="fas fa-headset"></i> <span>Priority support</span></div>
            </div>
          </div>
        </div>

        {/* Right side - registration form */}
        <div className={styles.formSide}>
          <div className={styles.formHeader}>
            <h1>Create account</h1>
            <p>Fill in the details below</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <label><i className="fas fa-user"></i> Full Name</label>
              <input type="text" id="name" value={formData.name} onChange={handleChange} placeholder="e.g., Alex Johnson" />
            </div>
            <div className={styles.inputGroup}>
              <label><i className="fas fa-phone-alt"></i> Phone Number</label>
              <input type="tel" id="phone" value={formData.phone} maxLength={10} onChange={handleChange} placeholder="+1 234 567 8900" />
            </div>
            <div className={styles.inputGroup}>
              <label><i className="fas fa-envelope"></i> Email Address</label>
              <input type="email" id="email" value={formData.email} onChange={handleChange} placeholder="hello@example.com" />
            </div>
            <div className={styles.inputGroup}>
              <div className={styles.genderGroup}>
                <label htmlFor="gender" className={styles.genderLabel}><i className="fas fa-venus-mars"></i> Gender</label>
                <div className={styles.genderContainer}>
                  <label className={styles.genderOption}>
                    <input type="radio" id="gender-male" name="gender" value="Male" checked={formData.gender === 'Male'} onChange={handleChange} />
                    <span className={styles.radioCircle}></span> Male
                  </label>
                  <label className={styles.genderOption}>
                    <input type="radio" id="gender-female" name="gender" value="Female" checked={formData.gender === 'Female'} onChange={handleChange} />
                    <span className={styles.radioCircle}></span> Female
                  </label>
                  <label className={styles.genderOption}>
                    <input type="radio" id="gender-nonbinary" name="gender" value="Non-binary" checked={formData.gender === 'Non-binary'} onChange={handleChange} />
                    <span className={styles.radioCircle}></span> Non-binary
                  </label>
                  <label className={styles.genderOption}>
                    <input type="radio" id="gender-no" name="gender" value="Prefer not to say" checked={formData.gender === 'Prefer not to say'} onChange={handleChange} />
                    <span className={styles.radioCircle}></span> Prefer not to say
                  </label>
                </div>
              </div>
            </div>
            <div className={styles.inputGroup}>
              <label><i className="fas fa-map-marker-alt"></i> Address</label>
              <input type="text" id="address" value={formData.address} onChange={handleChange} placeholder="Street, city, postal code" />
            </div>
            <div className={styles.inputGroup}>
              <label><i className="fas fa-lock"></i> Password</label>
              <div className={styles.passwordWrapper}>
                <input type={showPassword ? "text" : "password"} id="password" value={formData.password} onChange={handleChange} placeholder="Create a strong password" />
                <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'} ${styles.eyeIcon}`} onClick={() => setShowPassword(!showPassword)}></i>
              </div>
              <label><i className="fas fa-lock"></i> Confirm Password</label>
              <div className={styles.passwordWrapper}>
                <input type={showPassword ? "text" : "password"} id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm password" />
                <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'} ${styles.eyeIcon}`} onClick={() => setShowPassword(!showPassword)}></i>
              </div>
            </div>

            <button type="submit" className={styles.authBtn}>
              <i className="fas fa-user-plus"></i> Sign up
            </button>
          </form>

          <div className={styles.toggleNote}>
            Already have an account? <a href="/login">Log in</a>
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

export default Register;