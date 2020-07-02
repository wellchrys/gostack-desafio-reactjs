import React, { useState, useEffect } from "react";

import api from "./services/api"

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data)
    })
  }, [])

  async function handleAddRepository() {
    try {
      const response = await api.post('/repositories', {
        title: `test reactjs ${Date.now()}`,
        url: 'http://test.com.br',
        techs: ['1 - test', '2 - test', '3 - test']
      })
  
      const repo = response.data
  
      setRepositories([...repositories, repo])
    } catch (error) {
      console.log(error)
      alert(`Erro ao adicionar, tente novamente`);
    }
  }

  async function handleRemoveRepository(id) {
    try { 
      await api.delete(`/repositories/${id}`)

      setRepositories(repositories.filter(repo => repo.id !== id));
    } catch (error) {
      console.log(error)
      alert(`Erro ao deletar, tente novamente`);
    }   
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repo =>
          <li key={repo.id}>
            {repo.title}
            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
