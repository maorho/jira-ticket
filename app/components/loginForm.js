'use client';

import { useAuth } from "@/context/AuthContext";



const LoginForm = () => {
  let { user, email, apiToken, login,setUser,setEmailContext,setApiTokenContext} = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const credentials = { email,user, apiToken };

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        const data = await response.json();
        login();
      } else {
        alert('Invalid credentials!');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Login to Jira</h1>
      <form onSubmit={handleSubmit}>
      <div className="mb-3">
          <label className="form-label">Username:</label>
          <input
            type="taxt"
            className="form-control"
            placeholder='write the start of your email for example: example@gmail.com -> example'
            value={user}
            onChange={(e) => setUser(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email:</label>
          <input
            type="email"
            className="form-control"
            onChange={(e) => setEmailContext(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">API Token:</label>
          <input
            type="password"
            className="form-control"
            value={apiToken}
            onChange={(e) => setApiTokenContext(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
