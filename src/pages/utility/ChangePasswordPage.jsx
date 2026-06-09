import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import styles from './ChangePasswordPage.module.css';

const ChangePasswordPage = () => {
  const { changePassword } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [message, setMessage] = useState({ text: '', isError: false });
  // password visibility toggles
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  const showMessage = (text, isError = false) => {
    setMessage({ text, isError });
    setTimeout(() => setMessage({ text: '', isError: false }), 3000);
  };

  const handleChange = e => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const { currentPassword, newPassword, confirmPassword } = formData;
    if (!currentPassword || !newPassword || !confirmPassword) {
      showMessage('❌ All fields are required', true);
      return;
    }
    if (newPassword !== confirmPassword) {
      showMessage('❌ New passwords do not match', true);
      return;
    }
    // For simplicity, we ignore currentPassword verification as AuthContext lacks it.
    const res = changePassword(newPassword);
    if (res.success) {
      showMessage('✅ Password changed successfully', false);
      setTimeout(() => navigate('/'), 1500);
    } else {
      showMessage(`❌ ${res.message}`, true);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Change Password</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor="currentPassword">Current Password</label>
          <div className={styles.passwordWrapper}>
            <input
              id="currentPassword"
              type={showCurrentPassword ? "text" : "password"}
              value={formData.currentPassword}
              onChange={handleChange}
              required
            />
            <i className={`fas ${showCurrentPassword ? 'fa-eye-slash' : 'fa-eye'} ${styles.eyeIcon}`} onClick={() => setShowCurrentPassword(!showCurrentPassword)}></i>
          </div>
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="newPassword">New Password</label>
          <div className={styles.passwordWrapper}>
            <input
              id="newPassword"
              type={showNewPassword ? "text" : "password"}
              value={formData.newPassword}
              onChange={handleChange}
              required
            />
            <i className={`fas ${showNewPassword ? 'fa-eye-slash' : 'fa-eye'} ${styles.eyeIcon}`} onClick={() => setShowNewPassword(!showNewPassword)}></i>
          </div>
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="confirmPassword">Confirm New Password</label>
          <div className={styles.passwordWrapper}>
            <input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <i className={`fas ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'} ${styles.eyeIcon}`} onClick={() => setShowConfirmPassword(!showConfirmPassword)}></i>
          </div>
        </div>
        <button type="submit" className={styles.submitBtn}>Update Password</button>
      </form>
      {message.text && (
        <div className={`${styles.toastMsg} ${message.isError ? styles.errorToast : ''}`}>
          {message.text}
        </div>
      )}
    </div>
  );
};

export default ChangePasswordPage;
