import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { auth } from './firebase';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import UserArea from './components/UserArea';
import GalleryPage from './components/GalleryPage';
import Home from './components/Home';
import AdminDashboard from './components/AdminDashboard'; // Importe o componente AdminDashboard
import BudgetPage from './components/BudgetPage'; // Importe o componente BudgetPage
import Profile from './components/Profile'; // Importe o componente Profile
import './App.css';

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleRegister = (email, password) => {
    auth.createUserWithEmailAndPassword(email, password)
      .then(userCredential => {
        // Registro bem-sucedido
      })
      .catch(error => {
        console.error('Error registering:', error);
      });
  };

  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm onRegister={handleRegister} />} />
          <Route path="/user" element={<UserArea user={currentUser} />} />
          <Route path="/" element={<Home currentUser={currentUser} />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/admindashboard" element={<AdminDashboard />} />
          <Route path="/budget" element={<BudgetPage currentUser={currentUser} />} />
          <Route path="/profile" element={<Profile currentUser={currentUser} />} /> {/* Adicione esta rota para o Profile */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
