import React, { useState, useEffect } from 'react';
import { firestore } from '../firebase';
import { Link } from 'react-router-dom'; // Importe Link para usar o redirecionamento
import './Profile.css'; // Importe o arquivo de estilos CSS

const Profile = ({ currentUser }) => {
  const [userData, setUserData] = useState({
    fullName: '',
    phoneNumber: '',
    instagram: '',
  });
  const [isEditing, setIsEditing] = useState(false); // Estado para controlar se o usuário está editando

  // Função para carregar os dados do usuário
  const loadUserData = async () => {
    try {
      const userRef = firestore.collection('users').doc(currentUser.uid);
      const userDoc = await userRef.get();
      if (userDoc.exists) {
        const userData = userDoc.data();
        setUserData(userData);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleGoToHome = () => {
    window.location.href = '/';
  };

  // Carrega os dados do usuário quando o componente é montado
  useEffect(() => {
    if (currentUser) {
      loadUserData();
    }
  }, [currentUser]);

  // Função para atualizar os dados do usuário
  const updateUser = async () => {
    try {
      const userRef = firestore.collection('users').doc(currentUser.uid);
      await userRef.update(userData);
      setIsEditing(false);
      alert('Dados atualizados com sucesso!');
    } catch (error) {
      console.error('Error updating user data:', error);
      alert('Erro ao atualizar os dados. Por favor, tente novamente mais tarde.');
    }
  };

  return (
    <div className="profile-container">
      <h2>Meu Perfil</h2>
      {isEditing ? (
        <div className="user-info1">
          <input type="text" value={userData.fullName} onChange={(e) => setUserData({ ...userData, fullName: e.target.value })} />
          <input type="text" value={userData.phoneNumber} onChange={(e) => setUserData({ ...userData, phoneNumber: e.target.value })} />
          <input type="text" value={userData.instagram} onChange={(e) => setUserData({ ...userData, instagram: e.target.value })} />
          <button onClick={updateUser}>Salvar</button>
        </div>
      ) : (
        <div className="user-info1">
          <p>Nome: {userData.fullName}</p>
          <p>Telefone: {userData.phoneNumber}</p>
          <p>Instagram: {userData.instagram}</p>
          <button onClick={() => setIsEditing(true)}>Editar</button>
        </div>
      )}
        <button className="new-back-button2" onClick={handleGoToHome}>
          Voltar para a Home
        </button>    </div>
  );
};

export default Profile;
