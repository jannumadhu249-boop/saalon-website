import React from 'react';
import Navbar from "../../components/layout/Navbar";
import Footer from '../../components/layout/Footer';  
import './Dashboard.css';
import { Link } from 'react-router-dom';

const Dashboard = () => {

  const stats = { pending: 12, completed: 48, confirmed: 23, cancelled: 5, };

//   const handleBookNow = () => {
//     alert('Redirect to appointment booking page');
//     navigate('/appointment')
//   };

  return (
    <div className="dashboard-container">
        <Navbar />
      <div className="dashboard-content mt-5">
        <h1 className="dashboard-title">Appointment Dashboard</h1>
        <p className="dashboard-subtitle">Welcome back! Here’s an overview of your appointments.</p>

        {/* Four cards */}
        <div className="cards-grid">
          <div className="stat-card pending">
            <div className="card-icon">
                <i className="fas fa-clock"></i> 
            </div>
            <div className="card-info">
              <h3>Pending</h3>
              <p className="stat-number">{stats.pending}</p>
            </div>
          </div>

          <div className="stat-card completed">
            <div className="card-icon">
                <i className="fas fa-check-circle"></i> 
            </div>
            <div className="card-info">
              <h3>Completed</h3>
              <p className="stat-number">{stats.completed}</p>
            </div>
          </div>

          <div className="stat-card confirmed">
            <div className="card-icon">
                <i className="fas fa-calendar-check"></i>
            </div>
            <div className="card-info">
              <h3>Confirmed</h3>
              <p className="stat-number">{stats.confirmed}</p>
            </div>
          </div>

          <div className="stat-card cancelled">
            <div className="card-icon">
                <i className="fas fa-ban"></i>
            </div>
            <div className="card-info">
              <h3>Cancelled</h3>
              <p className="stat-number">{stats.cancelled}</p>
            </div>
          </div>
        </div>

        {/* Book Now button */}
        <div className="book-now-wrapper mb-5">
          <Link className="book-now-btn" to="/appointment">
            📖 Book Now
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;