// LoginForm.js

import React, { useState } from 'react';
import { auth } from '../firebase';
import './LoginForm.css'; // Importa o novo arquivo de estilos CSS

const NewLoginForm = ({ onRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await auth.signInWithEmailAndPassword(email, password);
      const user = auth.currentUser;
      if (user && user.email === 'jubonfas@tattoo.com') {
        window.location.href = '/admindashboard';
      } else {
        window.location.href = '/';
      }
    } catch (error) {
      console.error('Error logging in:', error);
      if (error.code === 'auth/user-not-found') {
        setErrorMessage('Email não cadastrado. Por favor, verifique suas credenciais.');
      } else if (error.code === 'auth/invalid-credential') {
        setErrorMessage('Credencial inválida. Por favor, verifique suas credenciais.');
      } else {
        setErrorMessage('Erro ao fazer login. Por favor, tente novamente mais tarde.');
      }
    }
  };

  const handleForgotPassword = async () => {
    try {
      await auth.sendPasswordResetEmail(email);
      alert('Um email de redefinição de senha foi enviado para o seu endereço de email.');
    } catch (error) {
      console.error('Error sending password reset email:', error);
      setErrorMessage('Erro ao enviar o email de redefinição de senha. Por favor insira a cima seu e-mail, tente novamente mais tarde.');
    }
  };

  const handleGoToHome = () => {
    window.location.href = '/';
  };

  return (
    <div className="new-form-container">
      <form onSubmit={handleLogin} className="new-form-wrapper">
        <div className="new-input-field">
          <label className="new-input-label" htmlFor="new-email">
            Email
          </label>
          <input
            className="new-input"
            id="new-email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="new-input-field">
          <label className="new-input-label" htmlFor="new-password">
            Password
          </label>
          <button className="new-forgot-password" onClick={handleForgotPassword}>
            Esqueceu a Senha?
          </button>
          <input
            className="new-input"
            id="new-password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <button className="new-login-button" type="submit">
          Sign In
        </button>
        {errorMessage && <p className="new-error-message">{errorMessage}</p>}
        <button className="new-back-button" onClick={handleGoToHome}>
          Voltar para a Home
        </button>
      </form>
    </div>
  );
};

export default NewLoginForm;
