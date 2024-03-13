import React, { useState, useEffect } from 'react';
import { firestore, auth } from '../firebase';

const BudgetPage = () => {
  const [tamanhoTatuagem, setTamanhoTatuagem] = useState('');
  const [localTatuagem, setLocalTatuagem] = useState('');
  const [imagemReferencia, setImagemReferencia] = useState(null);
  const [userName, setUserName] = useState('');
  const [customUserName, setCustomUserName] = useState('');

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        if (auth.currentUser) {
          const userRef = firestore.collection('users').doc(auth.currentUser.uid);
          const userDoc = await userRef.get();
          if (userDoc.exists) {
            const userData = userDoc.data();
            setUserName(userData.fullName);
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserName();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Enviar os dados do orçamento para o backend (Firestore)
      await firestore.collection('budgets').add({
        userId: auth.currentUser ? auth.currentUser.uid : null,
        userName: auth.currentUser ? userName : customUserName,
        tamanhoTatuagem,
        localTatuagem,
        imagemReferenciaURL: null, // Coloque a lógica para enviar a imagem para o Firebase Storage e obter a URL aqui
      });

      // Limpar os campos após o envio do orçamento
      setTamanhoTatuagem('');
      setLocalTatuagem('');
      setImagemReferencia(null);
      setCustomUserName(''); // Limpar o nome personalizado
      
      // Adicione qualquer lógica adicional aqui, como exibir uma mensagem de sucesso para o usuário
    } catch (error) {
      console.error('Error submitting budget:', error);
      // Adicione qualquer lógica adicional aqui para lidar com erros
    }
  };

  return (
    <div>
      <h2>Enviar Orçamento</h2>
      {!auth.currentUser && (
        <div>
          <label>Nome:</label>
          <input type="text" value={customUserName} onChange={(e) => setCustomUserName(e.target.value)} />
        </div>
      )}
      <p>Solicitado por: {auth.currentUser ? userName : customUserName}</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Tamanho da Tatuagem (em cm):</label>
          <input type="text" value={tamanhoTatuagem} onChange={(e) => setTamanhoTatuagem(e.target.value)} />
        </div>
        <div>
          <label>Local da Tatuagem:</label>
          <input type="text" value={localTatuagem} onChange={(e) => setLocalTatuagem(e.target.value)} />
        </div>
        <div>
          <label>Imagem de Referência:</label>
          <input type="file" accept="image/*" onChange={(e) => setImagemReferencia(e.target.files[0])} />
        </div>
        <button type="submit">Enviar Orçamento</button>
      </form>
    </div>
  );
};

export default BudgetPage;
