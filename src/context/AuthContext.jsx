// import { createContext, useContext, useState, useEffect } from 'react'

// const AuthContext = createContext()

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null)
//   const [users, setUsers] = useState([])
//   const [bookings, setBookings] = useState([])

//   // Load initial state from localStorage
//   useEffect(() => {
//     try {
//       const savedUser = localStorage.getItem('schun-auth-user')
//       if (savedUser) {
//         setUser(JSON.parse(savedUser))
//       }

//       const savedUsers = localStorage.getItem('schun-auth-users')
//       if (savedUsers) {
//         setUsers(JSON.parse(savedUsers))
//       } else {
//         // Initialize with a default mock user for testing if empty
//         const defaultUser = {
//           name: 'Demo Customer',
//           email: 'demo@example.com',
//           phone: '1234567890',
//           password: 'password123',
//           gender: 'Male',
//           address: '123 Salon St, Berlin'
//         }
//         setUsers([defaultUser])
//         localStorage.setItem('schun-auth-users', JSON.stringify([defaultUser]))
//       }

//       const savedBookings = localStorage.getItem('schun-auth-bookings')
//       if (savedBookings) {
//         setBookings(JSON.parse(savedBookings))
//       }
//     } catch (e) {
//       console.error('Failed to load auth data from storage:', e)
//     }
//   }, [])

//   // Save changes to localStorage
//   useEffect(() => {
//     if (user) {
//       localStorage.setItem('schun-auth-user', JSON.stringify(user))
//     } else {
//       localStorage.removeItem('schun-auth-user')
//     }
//   }, [user])

//   const login = (email, password) => {
//     const foundUser = users.find(
//       u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
//     )
//     if (foundUser) {
//       setUser(foundUser)
//       return { success: true, message: 'Welcome back!' }
//     }
//     return { success: false, message: 'Invalid email or password' }
//   }

//   const register = (userData) => {
//     const emailExists = users.some(
//       u => u.email.toLowerCase() === userData.email.toLowerCase()
//     )
//     if (emailExists) {
//       return { success: false, message: 'Email already registered' }
//     }

//     const newUsers = [...users, userData]
//     setUsers(newUsers)
//     localStorage.setItem('schun-auth-users', JSON.stringify(newUsers))
//     setUser(userData)
//     return { success: true, message: 'Account successfully created!' }
//   }

//   const logout = () => {
//     setUser(null)
//   }

//   const updateProfile = (updatedProfile) => {
//     if (!user) return { success: false, message: 'No active session' }

//     // Update in users list
//     const updatedUsers = users.map(u => 
//       u.email.toLowerCase() === user.email.toLowerCase() ? { ...u, ...updatedProfile } : u
//     )
//     setUsers(updatedUsers)
//     localStorage.setItem('schun-auth-users', JSON.stringify(updatedUsers))

//     // Update active user session
//     setUser(prev => ({ ...prev, ...updatedProfile }))
//     return { success: true, message: 'Profile updated successfully' }
//   }

//   const changePassword = (newPassword) => {
//     if (!user) return { success: false, message: 'No active session' }

//     // Update in users list
//     const updatedUsers = users.map(u => 
//       u.email.toLowerCase() === user.email.toLowerCase() ? { ...u, password: newPassword } : u
//     )
//     setUsers(updatedUsers)
//     localStorage.setItem('schun-auth-users', JSON.stringify(updatedUsers))

//     // Update active user session password
//     setUser(prev => ({ ...prev, password: newPassword }))
//     return { success: true, message: 'Password changed successfully' }
//   }

//   // const addBooking = (bookingData) => {
//   //   const newBooking = {
//   //     id: Date.now(),
//   //     userEmail: user ? user.email : 'guest',
//   //     createdAt: new Date().toISOString(),
//   //     status: 'Confirmed',
//   //     ...bookingData
//   //   }

//   //   const updatedBookings = [newBooking, ...bookings]
//   //   setBookings(updatedBookings)
//   //   localStorage.setItem('schun-auth-bookings', JSON.stringify(updatedBookings))
//   //   return newBooking
//   // }

//   const addBooking = (booking) => {
//     const newBooking = {
//       ...booking,
//       id: Date.now(),          // unique ID
//       bookingDate: new Date().toISOString(),
//     };
//     setBookings(prev => [newBooking, ...prev]);
//     // Also store in localStorage if needed
//     localStorage.setItem('userBookings', JSON.stringify([newBooking, ...bookings]));
//   };

//   const getUserBookings = () => {
//     if (!user) return []
//     return bookings.filter(b => b.userEmail === user.email)
//   }

//   const value = {
//     user,
//     users,
//     bookings,
//     login,
//     register,
//     logout,
//     updateProfile,
//     changePassword,
//     addBooking,
//     getUserBookings
//   }

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
// }

// export const useAuth = () => {
//   const context = useContext(AuthContext)
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider')
//   }
//   return context
// }

// export default AuthContext





// src/context/AuthContext.js
import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [users, setUsers] = useState([])
  const [bookings, setBookings] = useState([])

  // Load initial state from localStorage
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('schun-auth-user')
      if (savedUser) setUser(JSON.parse(savedUser))

      const savedUsers = localStorage.getItem('schun-auth-users')
      if (savedUsers) {
        setUsers(JSON.parse(savedUsers))
      } else {
        const defaultUser = {
          name: 'Demo Customer',
          email: 'demo@example.com',
          phone: '1234567890',
          password: 'password123',
          gender: 'Male',
          address: '123 Salon St, Berlin'
        }
        setUsers([defaultUser])
        localStorage.setItem('schun-auth-users', JSON.stringify([defaultUser]))
      }

      const savedBookings = localStorage.getItem('schun-auth-bookings')
      if (savedBookings) {
        setBookings(JSON.parse(savedBookings))
      }
    } catch (e) {
      console.error('Failed to load auth data:', e)
    }
  }, [])

  // Save user session
  useEffect(() => {
    if (user) {
      localStorage.setItem('schun-auth-user', JSON.stringify(user))
    } else {
      localStorage.removeItem('schun-auth-user')
    }
  }, [user])

  const login = (email, password) => {
    const foundUser = users.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    )
    if (foundUser) {
      setUser(foundUser)
      return { success: true, message: 'Welcome back!' }
    }
    return { success: false, message: 'Invalid email or password' }
  }

  const register = (userData) => {
    const emailExists = users.some(
      u => u.email.toLowerCase() === userData.email.toLowerCase()
    )
    if (emailExists) {
      return { success: false, message: 'Email already registered' }
    }
    const newUsers = [...users, userData]
    setUsers(newUsers)
    localStorage.setItem('schun-auth-users', JSON.stringify(newUsers))
    setUser(userData)
    return { success: true, message: 'Account successfully created!' }
  }

  const logout = () => {
    setUser(null)
  }

  const updateProfile = (updatedProfile) => {
    if (!user) return { success: false, message: 'No active session' }
    const updatedUsers = users.map(u =>
      u.email.toLowerCase() === user.email.toLowerCase() ? { ...u, ...updatedProfile } : u
    )
    setUsers(updatedUsers)
    localStorage.setItem('schun-auth-users', JSON.stringify(updatedUsers))
    setUser(prev => ({ ...prev, ...updatedProfile }))
    return { success: true, message: 'Profile updated successfully' }
  }

  const changePassword = (newPassword) => {
    if (!user) return { success: false, message: 'No active session' }
    const updatedUsers = users.map(u =>
      u.email.toLowerCase() === user.email.toLowerCase() ? { ...u, password: newPassword } : u
    )
    setUsers(updatedUsers)
    localStorage.setItem('schun-auth-users', JSON.stringify(updatedUsers))
    setUser(prev => ({ ...prev, password: newPassword }))
    return { success: true, message: 'Password changed successfully' }
  }

  // ✅ CORRECTED addBooking
  const addBooking = (bookingData) => {
    const newBooking = {
      id: Date.now(),
      userEmail: user ? user.email : 'guest',   // ← essential for filtering
      createdAt: new Date().toISOString(),
      status: 'Confirmed',
      ...bookingData,  // contains items, total, date, etc.
    }
    const updatedBookings = [newBooking, ...bookings]
    setBookings(updatedBookings)
    localStorage.setItem('schun-auth-bookings', JSON.stringify(updatedBookings)) // ← correct key
    return newBooking
  }

  // ✅ getUserBookings filters by logged-in user
  const getUserBookings = () => {
    if (!user) return []
    return bookings.filter(b => b.userEmail === user.email)
  }

  const value = {
    user,
    users,
    bookings,
    login,
    register,
    logout,
    updateProfile,
    changePassword,
    addBooking,
    getUserBookings
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within an AuthProvider')
  return context
}

export default AuthContext