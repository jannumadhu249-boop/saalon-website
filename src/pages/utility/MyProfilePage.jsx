// src/pages/MyProfilePage.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import PageWrapper from '../../components/layout/PageWrapper';
import styles from './MyProfilePage.module.css';

const DEFAULT_AVATAR = '/assets/img/logo-scuts.png';

// Dummy profile data – visible when user is not logged in
const DUMMY_PROFILE = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '+91 98765 43210',
  address: '123, Salon Street, Andheri West, Mumbai - 400053',
  gender: 'Male'
};

const MyProfilePage = () => {
  const { user } = useAuth();
  const [avatarUrl, setAvatarUrl] = useState('');

  // Use real user data if available, otherwise dummy
  const profile = user || DUMMY_PROFILE;

  useEffect(() => {
    if (user) {
      const savedAvatar = localStorage.getItem('userAvatar');
      if (savedAvatar) setAvatarUrl(savedAvatar);
    }
  }, [user]);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarUrl(reader.result);
        if (user) localStorage.setItem('userAvatar', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <PageWrapper title="My Profile">
      <div className={styles.container}>
        <div className={styles.avatarContainer}>
          <img src={avatarUrl || DEFAULT_AVATAR} alt="Profile" className={styles.avatarImg} />
          <input type="file" accept="image/*" id="avatarInput" onChange={handleAvatarChange} style={{ display: 'none' }} />
          <label htmlFor="avatarInput" className={styles.uploadBtn}>Change</label>
        </div>
        <h2 className={styles.title}>My Profile</h2>
        
        <div className={styles.infoGroup}>
          <label>Full Name</label>
          <p className={styles.infoValue}>{profile.name || '—'}</p>
        </div>
        
        <div className={styles.infoGroup}>
          <label>Email</label>
          <p className={styles.infoValue}>{profile.email || '—'}</p>
        </div>
        
        <div className={styles.infoGroup}>
          <label>Phone</label>
          <p className={styles.infoValue}>{profile.phone || '—'}</p>
        </div>
        
        <div className={styles.infoGroup}>
          <label>Address</label>
          <p className={styles.infoValue}>{profile.address || '—'}</p>
        </div>
        
        <div className={styles.infoGroup}>
          <label>Gender</label>
          <p className={styles.infoValue}>{profile.gender || '—'}</p>
        </div>
      </div>
    </PageWrapper>
  );
};

export default MyProfilePage;