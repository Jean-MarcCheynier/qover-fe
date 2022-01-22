import React from 'react';
import './App.module.scss';
import Auth from './features/auth/AuthForm';
import AuthBg from './features/auth/AuthBg';
import CoverForm from './features/cover/CoverForm';

function App() {
  return (
    <div className="App">
      <AuthBg><Auth /></AuthBg>
      <CoverForm />
    </div>
  );
}

export default App;
