import React, { useState } from 'react';
import { auth, firestore } from '../firebase';

const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Estado para controlar a visibilidade da senha
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [instagram, setInstagram] = useState('');
  const [errorMessage, setErrorMessage] = useState(null); // Estado para armazenar a mensagem de erro

  // Função para formatar o número de telefone
  const formatPhoneNumber = (input) => {
    // Remove todos os caracteres que não são dígitos
    const cleaned = ('' + input).replace(/\D/g, '');
    // Aplica a máscara de telefone (XX) XXXXX-XXXX
    const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return input;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Verificar se a senha atende aos critérios de segurança
      if (password.length < 8 || !/\d/.test(password) || !/[A-Z]/.test(password)) {
        setErrorMessage('A senha deve ter no mínimo 8 caracteres, conter pelo menos um número e uma letra maiúscula.');
        return;
      }

      const userCredential = await auth.createUserWithEmailAndPassword(email, password);
      const { uid } = userCredential.user;
      await firestore.collection('users').doc(uid).set({
        email: email,
        fullName: fullName,
        phoneNumber: phoneNumber,
        instagram: instagram,
        points: 6, // Defina pontos como 0 no momento do registro
        // Adicione outros detalhes do usuário, se necessário
      });

      // Envie o e-mail de verificação
      await userCredential.user.sendEmailVerification();

      // Após o registro bem-sucedido, redirecione o usuário para a página de home ou exiba uma mensagem de sucesso
      // Por exemplo:
      alert('Cadastro realizado com sucesso! Verifique seu e-mail para confirmar sua conta.');

      // Limpe os campos do formulário após o registro
      setEmail('');
      setPassword('');
      setFullName('');
      setPhoneNumber('');
      setInstagram('');
      setErrorMessage(null); // Limpe a mensagem de erro
    } catch (error) {
      console.error('Error registering user:', error);
      if (error.code === 'auth/email-already-in-use') {
        setErrorMessage('Este email já está sendo usado. Por favor, insira um email diferente.');
      } else {
        setErrorMessage('Erro ao registrar usuário. Por favor, tente novamente mais tarde.');
      }
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <div style={{ position: 'relative' }}>
          <input type={showPassword ? "text" : "password"} placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)' }}>
            {showPassword ? "Ocultar" : "Ver"}
          </button>
        </div>
        <input type="text" placeholder="Nome Completo" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
        <input type="text" placeholder="(XX) XXXXX-XXXX" value={formatPhoneNumber(phoneNumber)} onChange={(e) => setPhoneNumber(e.target.value)} required /> {/* Formato do telefone */}
        <input type="text" placeholder="@usuário" value={instagram} onChange={(e) => setInstagram(e.target.value)} required />
        <button type="submit">Register</button>
      </form>
      {errorMessage && <p>{errorMessage}</p>} {/* Exibe a mensagem de erro */}
      <button onClick={() => window.location.href = '/'}>Voltar</button> {/* Botão para voltar para a Home */}
    </div>
  );
};

export default RegisterForm;
