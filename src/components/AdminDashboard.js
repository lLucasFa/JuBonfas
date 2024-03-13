import React, { useEffect, useState } from 'react';
import { auth, firestore } from '../firebase';
import './AdminDashboard.css'; // Importe o arquivo CSS

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [budgets, setBudgets] = useState([]);


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await firestore.collection('users').get();
        const userList = [];
        querySnapshot.forEach((doc) => {
          userList.push({ id: doc.id, ...doc.data() });
        });
        setUsers(userList);
      } catch (error) {
        console.error('Error getting users:', error);
      }
    };

    fetchUsers();

    // Verificar se o usuário atual é o usuário permitido
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleAddPoints = async (userId) => {
    try {
      if (currentUser && currentUser.email === 'jubonfas@tattoo.com') {
        const userRef = firestore.collection('users').doc(userId);
        const userDoc = await userRef.get();
        if (userDoc.exists) {
          const { points } = userDoc.data();
          await userRef.update({ points: points + 1 }); // Adiciona 1 ponto
          const updatedUsers = users.map((user) => {
            if (user.id === userId) {
              return { ...user, points: points + 1 }; // Atualiza o valor do usuário com 1 ponto adicionado
            }
            return user;
          });
          setUsers(updatedUsers);
        }
      } else {
        console.log('Acesso negado. Você não tem permissão para executar esta ação.');
      }
    } catch (error) {
      console.error('Error adding points:', error);
    }
  };

  // Função para permitir a edição manual do campo de pontos
  const handleEditPoints = async (userId, newPoints) => {
    try {
      if (currentUser && currentUser.email === 'jubonfas@tattoo.com') {
        const userRef = firestore.collection('users').doc(userId);
        await userRef.update({ points: newPoints }); // Atualiza os pontos para o novo valor
        const updatedUsers = users.map((user) => {
          if (user.id === userId) {
            return { ...user, points: newPoints }; // Atualiza o valor do usuário com os pontos editados
          }
          return user;
        });
        setUsers(updatedUsers);
      } else {
        console.log('Acesso negado. Você não tem permissão para executar esta ação.');
      }
    } catch (error) {
      console.error('Error editing points:', error);
    }
  };

  const handleRemovePoints = async (userId) => {
    try {
      if (currentUser && currentUser.email === 'jubonfas@tattoo.com') {
        const userRef = firestore.collection('users').doc(userId);
        const userDoc = await userRef.get();
        if (userDoc.exists) {
          const { points } = userDoc.data();
          await userRef.update({ points: points - 1 }); // Remove 1 ponto
          const updatedUsers = users.map((user) => {
            if (user.id === userId) {
              return { ...user, points: points - 1 }; // Atualiza o valor do usuário com 1 ponto removido
            }
            return user;
          });
          setUsers(updatedUsers);
        }
      } else {
        console.log('Acesso negado. Você não tem permissão para executar esta ação.');
      }
    } catch (error) {
      console.error('Error removing points:', error);
    }
  };

  if (!currentUser || currentUser.email !== 'jubonfas@tattoo.com') {
    return (
      <div>
        <p>Acesso negado. Você não tem permissão para acessar esta página.</p>
        <button onClick={() => window.location.href = '/'}>Voltar</button>
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
            <th>Actions</th>
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
                {/* Campo de pontos com função de edição manual */}
                <input
                  type="number"
                  value={user.points}
                  onChange={(e) => handleEditPoints(user.id, parseInt(e.target.value))}
                />
              </td>
              <td className="admin-dashboard-button-container">
                <button onClick={() => handleAddPoints(user.id)}>Add Points</button>
                <button onClick={() => handleRemovePoints(user.id)}>Remove Points</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => window.location.href = '/'}>Voltar</button> {/* Botão para voltar para a Home */}
    </div>
  );
};

export default AdminDashboard;
