// AdminRegisterForm.js
import React, { useState } from 'react';
import { auth } from '../firebase';

function AdminRegisterForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await auth.createUserWithEmailAndPassword(email, password);
      alert('Usuário administrador criado com sucesso!');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <h2>Register Admin</h2>
      <form onSubmit={handleRegister}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Register Admin</button>
      </form>
    </div>
  );
}

export default AdminRegisterForm;
