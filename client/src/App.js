import React, { useState } from 'react';
import './App.css';

function App() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
      e.preventDefault();
      console.log("calling API")
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'standard', email: email })
    };
    fetch('http://localhost:8080/createConnectedAccount', requestOptions)
        .then(response => response.json())
        .then(data => alert('You have submitted ' + data.accountId));
  } 

  return (
    <div className="App">
      <header className="App-header">
      <form className='form' onSubmit={handleSubmit}>
                <div className='form-control'>
                    <label htmlFor='email'>Email: </label>
                    <input
                        type='text'
                        id='email'
                        name='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <button type='submit'>Add person</button>
      </form>
      </header>
    </div>
  );
}

export default App;
