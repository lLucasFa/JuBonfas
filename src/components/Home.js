import React, { useEffect, useState } from 'react';
import { auth, firestore } from '../firebase';
import { Link } from 'react-router-dom';

const Home = ({ currentUser }) => {
  const [userName, setUserName] = useState('');
  const [userPoints, setUserPoints] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (currentUser) {
      const fetchUserData = async () => {
        try {
          const userRef = firestore.collection('users').doc(currentUser.uid);
          const userDoc = await userRef.get();
          if (userDoc.exists) {
            const userData = userDoc.data();
            setUserName(userData.fullName);
            setUserPoints(userData.points);
            setIsAdmin(userData.email === 'jubonfas@tattoo.com');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };

      fetchUserData();
    }
  }, [currentUser]);

  const handleLogout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div>
      {currentUser ? (
        <div>
          <h2>Bem-vindo, {userName}!</h2>
          <p>Você possui {userPoints} pontos.</p>
          <button onClick={handleLogout}>Logout</button>
          {isAdmin && <Link to="/admindashboard">Dashboard</Link>}
        </div>
      ) : (
        <div>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      )}
    </div>
  );
};

export default Home;
