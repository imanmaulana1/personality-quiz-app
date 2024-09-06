import React, { useContext } from 'react';
import { UserContext } from './UserContext';
import { useNavigate } from 'react-router-dom';

function Results({ element, artwork, loading, onReset }) {
  const { name, setName } = useContext(UserContext);
  const navigate = useNavigate();

  function handleReset() {
    setName('');
    onReset();
    navigate('/');
  }

  return (
    <div>
      <p>
        <strong>{name ?? 'Guest'}</strong>, your element is:
        <strong>{element}</strong>
      </p>

      {loading && <p>Loading a piece of art for you...</p>}

      {artwork ? (
        <>
          <div className='artwork'>
            <button className='btn-reset' onClick={handleReset}>
              Reset
            </button>
            <h2>{artwork.title}</h2>
            <img src={artwork.primaryImage} alt={artwork.title} />
            <p>{artwork.artistDisplayName}</p>
            <p>{artwork.objectDate}</p>
          </div>
        </>
      ) : (
        <p>No artwork found.</p>
      )}
    </div>
  );
}

export default Results;
