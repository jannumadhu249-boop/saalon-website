// import React from 'react';
// import { useAuth } from '../../context/AuthContext';
// import styles from './MyBookingsPage.module.css';

// const MyBookingsPage = () => {
//   const { getUserBookings } = useAuth();
//   const bookings = getUserBookings();

//   if (!bookings || bookings.length === 0) {
//     return (
//       <div className={styles.container}>
//         <h2 className={styles.title}>My Bookings</h2>
//         <p className={styles.empty}>You have no bookings yet.</p>
//       </div>
//     );
//   }

//   return (
//     <div className={styles.container}>
//       <h2 className={styles.title}>My Bookings</h2>
//       <ul className={styles.list}>
//         {bookings.map(b => (
//           <li key={b.id} className={styles.item}>
//             <div className={styles.info}>
//               <span className={styles.date}>Date: {new Date(b.date).toLocaleString()}</span>
//               <span className={styles.status}>Status: {b.status}</span>
//             </div>
//             <div className={styles.details}>
//               <strong>Total:</strong> ₹{b.total?.toFixed(2) ?? '0.00'}
//             </div>
//             <div className={styles.items}>
//               <strong>Items:</strong>
//               <ul>
//                 {/* {b.items && b.items.map((item, idx) => (
//                   <li key={idx}>{item.name || item.title || `Item ${idx + 1}`}</li>
//                 ))} */}
//                 {b.items && b.items.map((item, idx) => (
//                   <li key={idx}>{item.name} × {item.quantity}</li>
//                 ))}
//               </ul>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default MyBookingsPage;




// src/pages/MyBookingsPage.jsx
import React from 'react';
import { useAuth } from '../../context/AuthContext';
import PageWrapper from '../../components/layout/PageWrapper';
import Breadcrumb from '../../components/layout/Breadcrumb';
import styles from './MyBookingsPage.module.css';

const MyBookingsPage = () => {
  const { getUserBookings } = useAuth();
  let bookings = getUserBookings();

  // 🎯 DUMMY DATA – remove when real bookings exist
  if (!bookings || bookings.length === 0) {
    bookings = [
      {
        id: 9991,
        date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'Confirmed',
        total: 1850,
        items: [
          { name: 'Hair Cut - Senior Stylist', quantity: 1, price: 800 },
          { name: 'Beard Trim', quantity: 1, price: 450 },
          { name: 'Moroccan Oil Head Massage', quantity: 1, price: 600 }
        ]
      },
      {
        id: 9992,
        date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'Completed',
        total: 2500,
        items: [
          { name: 'Global Hair Coloring', quantity: 1, price: 2500 }
        ]
      },
      {
        id: 9993,
        date: new Date().toISOString(),
        status: 'Pending',
        total: 1200,
        items: [
          { name: 'Aroma Next Manicure - Men', quantity: 2, price: 600 }
        ]
      }
    ];
  }
  // END DUMMY DATA

  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'My Bookings', path: '/my-bookings' }
  ];

  if (!bookings || bookings.length === 0) {
    return (
      <PageWrapper title="My Bookings">
        <Breadcrumb items={breadcrumbItems} />
        <section className="space overflow-hidden">
          <div className="container">
            <div className="text-center py-5">
              <h2>No Bookings Yet</h2>
              <p>You haven't booked any services.</p>
              <Link to="/services" className="th-btn style1 mt-4">
                Browse Services
              </Link>
            </div>
          </div>
        </section>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper title="My Bookings">
      <Breadcrumb items={breadcrumbItems} />
      
      <section className="space overflow-hidden">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 mx-auto">
              <h1 className="mb-4" style={{ fontWeight: 600 }}>My Bookings</h1>
              
              {bookings.map(booking => (
                <div key={booking.id} className={styles.bookingCard}>
                  <div className={styles.bookingHeader}>
                    <div>
                      <span className={styles.bookingDate}>
                        📅 {new Date(booking.date || booking.createdAt).toLocaleDateString()}
                      </span>
                      <span className={styles.bookingTime}>
                        ⏱ {new Date(booking.date || booking.createdAt).toLocaleTimeString()}
                      </span>
                    </div>
                    <span className={`${styles.statusBadge} ${styles[booking.status.toLowerCase()]}`}>
                      {booking.status}
                    </span>
                  </div>
                  
                  <div className={styles.bookingBody}>
                    <div className={styles.servicesList}>
                      <strong>Services:</strong>
                      <ul>
                        {booking.items.map((item, idx) => (
                          <li key={idx}>
                            {item.name} <span className={styles.quantity}>× {item.quantity}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className={styles.bookingTotal}>
                      <strong>Total:</strong> ₹{booking.total?.toFixed(2) ?? '0.00'}
                    </div>
                    {booking.paymentMethod && (
                      <div className={styles.paymentMethod}>
                        <strong>Paid via:</strong> {booking.paymentMethod.toUpperCase()}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
};

export default MyBookingsPage;


