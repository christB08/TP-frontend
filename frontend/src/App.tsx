import React, { useEffect, useState } from 'react';

interface Computer {
  id: number;
  brand: string;
  model: string;
  processor?: string;
  ram?: number;
  storage?: number;
  purchase_date?: string;
  price?: number;
}

function App() {
  const [computers, setComputers] = useState<Computer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/data`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Erreur réseau');
        }
        return res.json();
      })
      .then((data) => {
        setComputers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Erreur :', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="loading">Chargement...</div>;
  if (error) return <div className="error">Erreur : {error}</div>;

  return (
    <div
      className="container"
      style={{
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#fff',
        color: '#000',          // Texte en noir
      }}
    >
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Liste des ordinateurs</h1>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {computers.map((comp) => (
          <li
            key={comp.id}
            style={{
              backgroundColor: '#f9f9f9',
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '20px',
              marginBottom: '15px',
              boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
              color: '#000',  // Texte en noir dans chaque item
            }}
          >
            <strong>Modèle :</strong> {comp.model}<br />
            <strong>Marque :</strong> {comp.brand}<br />
            <strong>Processeur :</strong> {comp.processor ?? 'Inconnu'}<br />
            <strong>RAM :</strong> {comp.ram ? `${comp.ram} Go` : 'Non spécifiée'}<br />
            <strong>Stockage :</strong> {comp.storage ? `${comp.storage} Go` : 'Non spécifié'}<br />
            <strong>Prix :</strong> {comp.price ? `${comp.price} €` : 'Non spécifié'}<br />
            <strong>Date d'achat :</strong> {comp.purchase_date ?? 'Non spécifiée'}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
