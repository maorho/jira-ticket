'use client';
import { useState } from 'react';
import LoginForm from './components/loginForm';
import TicketForm from './components/ticketForm';

export default function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username,setUserName] = useState('');
  return (
    <div className="container">
      {isLoggedIn ? (
        <TicketForm user={username}/>
      ) : (
        <LoginForm user={username} setUser={setUserName} onLogin={setIsLoggedIn} />
      )}
    </div>
  );
}
