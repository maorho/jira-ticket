'use client';

import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';

const TicketForm = () => {
  const [projectId, setProjectId] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [occurrences, setOccurrences] = useState('');
  const [ticketUrl, setTicketUrl] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const {email, apiToken, user} = useAuth();
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const ticketData = {
      project_id: projectId,
      title: title,
      description: description,
      occurrences: occurrences,
      email: email,
      apiToken: apiToken,
      username: user,
    };

    try {
      const response = await fetch('/api/create-ticket', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ticketData),
      });
      
     

      if (!response.ok) {
        throw new Error('Failed to create the ticket. Please check your input.');
      }

      const data = await response.json();
      setTicketUrl(data.ticketUrl); 
      setErrorMessage('');
    } catch (error) {
      console.error('Error creating ticket:', error);
      setErrorMessage(error.message || 'An error occurred. Please try again.');
    }
  };

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Create Jira Ticket</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Project ID:</label>
          <input
            type="text"
            className="form-control"
            value={projectId}
            onChange={(e) => setProjectId(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Title:</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description:</label>
          <textarea
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Occurrences:</label>
          <input
            type="number"
            className="form-control"
            value={occurrences}
            onChange={(e) => setOccurrences(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">Create Ticket</button>
      </form>
      {ticketUrl && (
        <div className="mt-4 text-center">
          <p>
            Ticket created!{' '}
            <a href={ticketUrl} target="_blank" rel="noopener noreferrer">
              View Ticket
            </a>
          </p>
        </div>
      )}
      {errorMessage && (
        <div className="alert alert-danger mt-3" role="alert">
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default TicketForm;
