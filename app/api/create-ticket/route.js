import axios from 'axios';

export async function POST(request) {
  const { project_id, title, description, occurrences, email, apiToken,username } = await request.json();

  const jiraUrl = `https://maorhomri1.atlassian.net/rest/api/3/issue`;

  try {
    const response = await fetch(jiraUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${btoa(`${email}:${apiToken}`)}`, // Encode email and API token in Base64
      },
      body: JSON.stringify({
        fields: {
          project: { key: project_id },
          summary: title,
          description: description,
          issuetype: { name: 'Task' },
          customfield_Occurrences: occurrences,
        },
      }),
    });

    console.log(response.json().data)


    return new Response(
      JSON.stringify({ ticketUrl: `https://maorhomri1.atlassian.net/browse/` }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error creating ticket:', error);
    return new Response('Error creating ticket', { status: 500 });
  }
}
 