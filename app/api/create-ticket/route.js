export async function POST(request) {
  const { project_id, title, description, occurrences, email, apiToken,username } = await request.json();
  if (!email || !apiToken || !project_id || !title || !occurrences) {
    return console.error( 'Required fields are missing' );
  }
  const occ = Number(occurrences);
  const jiraUrl = `https://${username}.atlassian.net/rest/api/3/issue`;
  try {
    const response = await fetch(jiraUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${Buffer.from(`${email}:${apiToken}`).toString('base64')}`, // Encode email and API token in Base64
      },
      body: JSON.stringify({
        fields: {
          project: { key: project_id }, 
          description: {
            type: "doc",
            version: 1,
            content: [
                {
                    type: "paragraph",
                    content: [
                        {
                            text: description,
                            type: "text",
                        },
                    ],
                },
            ],
        },
          issuetype: { name: 'Task' },
          summary: title,
          customfield_10038: occ, 
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error response from Jira:', errorData);
      return new Response(JSON.stringify(errorData), { status: response.status });
    }

    const responseData = await response.json();
    console.log('Issue created successfully:', responseData);

    return new Response(
      JSON.stringify({ ticketUrl: `https://${username}.atlassian.net/browse/${responseData.key}` }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error creating ticket:', error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
