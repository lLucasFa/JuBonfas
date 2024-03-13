import React, { useState } from 'react';
import { auth, firestore } from '../firebase';

const LoginForm = ({ onRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null); // Adicione um estado para armazenar a mensagem de erro

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await auth.signInWithEmailAndPassword(email, password);
      const user = auth.currentUser;
      if (user && user.email === 'jubonfas@tattoo.com') {
        // Redirecionar para a página AdminDashboard se o usuário for um administrador
        window.location.href = '/admindashboard';
      } else {
        // Redirecionar para a página Home se o usuário não for um administrador
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
    window.location.href = '/'; // Redireciona para a página inicial (Home)
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      {errorMessage && <p>{errorMessage}</p>} {/* Exibe a mensagem de erro abaixo do botão de login */}
      <button onClick={() => window.location.href = '/'}>Voltar</button> {/* Botão para voltar para a Home */}
      <p><a href="#" onClick={handleForgotPassword}>Esqueceu sua senha?</a></p> {/* Adiciona um link para redefinir a senha */}
    </div>
  );
};

export default LoginForm;
