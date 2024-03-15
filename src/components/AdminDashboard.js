import React, { useEffect, useState } from 'react';
import { auth, firestore } from '../firebase';
import './AdminDashboard.css'; // Importe o arquivo CSS

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [manualPoints, setManualPoints] = useState(0); // Adiciona estado para armazenar os pontos manualmente inseridos

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await firestore.collection('users').get();
        const userList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setUsers(userList);
      } catch (error) {
        console.error('Error getting users:', error);
      }
    };

    fetchUsers();

    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handlePointsAction = async (userId, action, points = null) => {
    try {
      if (currentUser && currentUser.email === 'jubonfas@tattoo.com') {
        const userRef = firestore.collection('users').doc(userId);
        const userDoc = await userRef.get();
        if (userDoc.exists) {
          const { points: userPoints } = userDoc.data();
          let newPoints = userPoints;
          if (action === 'add') {
            newPoints += points;
          } else if (action === 'remove') {
            newPoints -= points;
          } else if (action === 'edit') {
            newPoints = points;
          }
          await userRef.update({ points: newPoints });
          const updatedUsers = users.map((user) => {
            if (user.id === userId) {
              return { ...user, points: newPoints };
            }
            return user;
          });
          setUsers(updatedUsers);
        }
      } else {
        console.log('Acesso negado. Você não tem permissão para executar esta ação.');
      }
    } catch (error) {
      console.error(`Error ${action === 'add' ? 'adding' : action === 'edit' ? 'editing' : 'removing'} points:`, error);
    }
  };

  const handleManualPointsChange = (e) => {
    setManualPoints(parseInt(e.target.value)); // Converte para número inteiro e atualiza o estado
  };

  if (!currentUser || currentUser.email !== 'jubonfas@tattoo.com') {
    return (
      <div>
        <p>Acesso negado. Você não tem permissão para acessar esta página.</p>
        <button className='back-button' onClick={() => window.location.href = '/'}>Voltar</button>
      </div>
    );
  }

  return (
    <div className="admin-dashboard-container">
      <h2 className="admin-dashboard-title">Admin Dashboard</h2>
      <table className="admin-dashboard-table">
        <thead>
          <tr>
            <th>Email</th>
            <th>Full Name</th>
            <th>Phone Number</th>
            <th>Instagram</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.email}</td>
              <td>{user.fullName}</td>
              <td>{user.phoneNumber}</td>
              <td>{user.instagram}</td>
              <td>
                <input
                  type="number"
                  value={user.points}
                  onChange={(e) => handlePointsAction(user.id, 'edit', parseInt(e.target.value))}
                />
              </td>
              {/* <td className="admin-dashboard-button-container">
                <button onClick={() => handlePointsAction(user.id, 'add', manualPoints)}>Add Points</button>
                <button onClick={() => handlePointsAction(user.id, 'remove', manualPoints)}>Remove Points</button>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>

      <button className='back-button' onClick={() => window.location.href = '/'}>Back</button>
    </div>
  );
};

export default AdminDashboard;