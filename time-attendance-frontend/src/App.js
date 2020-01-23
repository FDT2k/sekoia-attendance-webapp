import React from 'react';
import Header from './components/Header';
import UsersGrid from './components/UsersGrid';
import './App.css';

const users = [{ name: 'Quentin' }, { name: 'Bob' }];

function App() {
  return (
    <div className="App">
      <Header />
      <UsersGrid users={users} />
    </div>
  );
}

export default App;
