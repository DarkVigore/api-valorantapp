import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [agents, setAgents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const fetchData = async (page) => {
    try {
      const response = await axios.get(`https://valorant-api.com/v1/agents?isPlayableCharacter=true`);
      const totalAgents = response.data.data.length;
      const totalPages = Math.ceil(totalAgents / 4);
      setTotalPages(totalPages);

      const startIndex = (page - 1) * 4;
      const endIndex = startIndex + 4;
      const agentsForPage = response.data.data.slice(startIndex, endIndex);
      setAgents(agentsForPage);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="container">
      <h1 className="title">Lista de agentes de Valorant</h1>
      <ul className="agent-list">
        {agents.map((agent) => (
          <li key={agent.uuid} className="agent-item">
            <img className="agent-image" src={agent.displayIcon} alt={agent.displayName} />
            <span className="agent-name">{agent.displayName}</span>
          </li>
        ))}
      </ul>
      <div className="pagination">
        <button className="pagination-button" onClick={handlePrevPage} disabled={currentPage === 1}>
          Anterior
        </button>
        <button className="pagination-button" onClick={handleNextPage} disabled={currentPage === totalPages}>
          Siguiente
        </button>
      </div>
    </div>
  );
}

export default App;

