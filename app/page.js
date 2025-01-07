'use client';

import { AuthProvider, useAuth } from '@/context/AuthContext';
import LoginForm from './components/loginForm';
import TicketForm from './components/ticketForm';

export default function HomePage() {
  return (
    <AuthProvider>
      <div className="container">
        <MainContent />
      </div>
    </AuthProvider>
  );
}

function MainContent() {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? <TicketForm /> : <LoginForm />;
}
