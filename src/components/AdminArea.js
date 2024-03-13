// AdminArea.js
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom'; // Alteração da importação de Redirect para Navigate
import { auth, firestore } from '../firebase';
import AdminDashboard from './AdminDashboard'; // Importe o componente AdminDashboard

const AdminArea = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdminPermission = async () => {
      try {
        const currentUser = auth.currentUser;
        if (currentUser) {
          // Consulta o Firestore para verificar se o usuário é um administrador
          const userDoc = await firestore.collection('users').doc(currentUser.uid).get();
          const userData = userDoc.data();
          if (userData && userData.isAdmin) {
            setIsAdmin(true);
          }
        }
      } catch (error) {
        console.error('Error checking admin permission:', error);
      }
    };

    checkAdminPermission();
  }, []);

  if (!isAdmin) {
    // Redireciona para a página inicial se o usuário não for um administrador
    return <Navigate to="/" />;
  }

  // Renderiza o AdminDashboard se o usuário for um administrador
  return <AdminDashboard />;
};

export default AdminArea;
