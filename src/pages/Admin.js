// AdminArea.js
import React, { useEffect, useState } from 'react';
import { auth } from '../firebase';

const AdminArea = () => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div>
      <h2>Admin Area</h2>
      {currentUser && (
        <p>Logged in as: {currentUser.email}</p>
      )}
      <p>This is the admin area where you can manage users.</p>
    </div>
  );
};

export default AdminArea;
