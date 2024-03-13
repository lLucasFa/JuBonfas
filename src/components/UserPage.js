// UserPage.js
import React from 'react';

const UserPage = ({ user }) => {
  return (
    <div>
      <h2>User Information</h2>
      <p><strong>Full Name:</strong> {user.fullName}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Phone Number:</strong> {user.phoneNumber}</p>
      <p><strong>Instagram:</strong> {user.instagram}</p>
      <p><strong>Points:</strong> {user.points}</p>
    </div>
  );
};

export default UserPage;
