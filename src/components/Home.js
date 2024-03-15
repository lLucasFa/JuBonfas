import React, { useEffect, useState } from 'react';
import { auth, firestore } from '../firebase';
import { Link } from 'react-router-dom';
import './Home.css'; // Importe o arquivo de estilos CSS
import { FaSignOutAlt } from 'react-icons/fa'; // Importe o ícone de saída
import { IoPersonCircleOutline } from 'react-icons/io5'; // Importe o ícone de usuário
import image1 from '../img/image2.png'; // Importe a primeira imagem
import image2 from '../img/ju.png'; // Importe a segunda imagem

const Home = ({ currentUser }) => {
  const [userName, setUserName] = useState('');
  const [userPoints, setUserPoints] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para controlar a abertura e fechamento do menu

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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div>
      <div className="home-container">
        {/* Menu navbar */}
        <nav className={`navbar ${isMenuOpen ? 'open' : ''}`}>
          <Link to="/" onClick={closeMenu}>HOME</Link>
          <Link to="/orcamento" onClick={closeMenu}>ORÇAMENTO</Link>
          <Link to="/gallery" onClick={closeMenu}>GALERIA</Link>
          <Link to="/cuidados" onClick={closeMenu}>CUIDADOS</Link>
          <Link to="/sobre" onClick={closeMenu}>SOBRE</Link>
          <Link to="/perguntas" onClick={closeMenu}>PERGUNTAS</Link>
          {/* Botão de fechar o menu */}
          {isMenuOpen && (
            <button onClick={closeMenu} className="close-menu">Fechar</button>
          )}
        </nav>

        {/* User Info */}
        <div className="user-info">
          {currentUser ? (
            <div className="user-header">
              <IoPersonCircleOutline className="avatar" />
              <div>
                <p className="user-name">{userName}</p>
                <p className="user-points">{userPoints} Pontos</p>
              </div>
            </div>
          ) : (
          <div className="login-register-links">
              <Link className='login-text' to="/login">login/</Link>
              <Link className='register-text' to="/register">Cadastro</Link>
          </div>
          )}
          {/* Botão de logout */}
          {currentUser && (
            <button onClick={handleLogout} className="logout-button">
              <FaSignOutAlt />
            </button>
          )}
        </div>

        {/* Exibição das imagens */}
        <div className="image-container">
          <img className='img1' src={image1} alt="Imagem 1" />
        </div>
        <div className="image-container second-image">
          <img src={image2} alt="Imagem 2" />
          <div>
            <h2>Minha história:</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
              veniam, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
              minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
              ex ea commodo consequat
            </p>
            <Link to="/sobre">
              <button className="ver-mais-button">Ver Mais</button>
            </Link>
          </div>
        </div>


        {/* Botão de toggle para abrir e fechar o menu */}
        <button onClick={toggleMenu} className="menu-toggle">
          ☰
        </button>
      </div>
    </div>
  );
};

export default Home;
