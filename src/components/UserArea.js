import React, { useState, useEffect } from 'react';
import { firestore } from '../firebase';

const UserArea = ({ user }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const userRef = firestore.collection('users').doc(user.uid);
      const doc = await userRef.get();
      if (doc.exists) {
        setUserData(doc.data());
      } else {
        console.log('No such document!');
      }
    };

    if (user) {
      fetchUserData();
    }
  }, [user]);

  return (
    <div>
      {userData && (
        <div>
          <h2>Welcome, {userData.username}!</h2>
          <p>Your points: {userData.points}</p>
        </div>
      )}
    </div>
  );
};

export default UserArea;
