import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';

function UserForm() {
  const [inputName, setInputName] = useState('');
  const { setName } = useContext(UserContext);
  
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setName(inputName);
    navigate('/quiz');
  }

  function handleChange(e) {
    setInputName(e.target.value);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor='name'>Name:</label>
        <input type='text' name='name' id='name' onChange={handleChange} />
        <button type='submit'>Start Quiz</button>
      </form>
    </>
  );
}

export default UserForm;
