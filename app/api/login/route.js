import axios from 'axios';

export async function POST(request) {
  const { email,user, apiToken } = await request.json();

  const jiraUrl = `https://${user}.atlassian.net/rest/api/3/myself`;

  try {
    const response = await axios.get(jiraUrl, {
      auth: {
        username: email,
        password: apiToken,
      },
    });
    
    return new Response(JSON.stringify({ message: `Welcome ${response.data.displayName}!` }), {
      status: 200,
    });
  } catch (error) {
    console.error('Authentication failed:', error);
    return new Response('Invalid credentials', { status: 401 });
  }
}
